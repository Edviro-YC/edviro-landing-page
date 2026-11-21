// End-to-end behaviour of the edge function with a stubbed Netlify runtime:
// a fake context.next() for the human page and a stubbed fetch for the AEO
// origin and PostHog. Runs in Node (the handler only uses web APIs).
import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'

const GPTBOT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot'
const GOOGLEBOT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'
const ETAG = '4a277ccafce7ff0ae76ead93ee86e105'

let vars: Record<string, string> = {}
let aeoResponse: () => Promise<Response> = async () => new Response('')
let fetched: string[] = []
let captured: unknown[] = []
const realFetch = globalThis.fetch

beforeEach(() => {
  vars = { AEO_ROUTING: 'pilot', AEO_ORIGIN: 'https://edviro-aeo.netlify.app' }
  fetched = []
  captured = []
  aeoResponse = async () => new Response('<html><body><main><h1>Agent view</h1></main></body></html>', {
    headers: { 'content-type': 'text/html; charset=UTF-8', 'x-aeo-source-etag': ETAG },
  })
  ;(globalThis as any).Netlify = { env: { get: (name: string) => vars[name] } }
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input)
    fetched.push(url)
    if (url.includes('posthog.com')) {
      captured.push(JSON.parse(String(init?.body)))
      return new Response('{}')
    }
    return aeoResponse()
  }) as typeof fetch
})

afterEach(() => {
  globalThis.fetch = realFetch
})

function context(human: { status?: number; etag?: string | null; body?: string } = {}) {
  const calls: Request[] = []
  const waits: Promise<unknown>[] = []
  return {
    calls,
    waits,
    next: async (request: Request) => {
      calls.push(request)
      const headers = new Headers({ 'content-type': 'text/html; charset=UTF-8', vary: 'Accept-Encoding' })
      if (human.etag !== null) headers.set('etag', human.etag ?? `"${ETAG}-ssl"`)
      return new Response(human.body ?? '<html><body>Human page</body></html>', { status: human.status ?? 200, headers })
    },
    waitUntil: (p: Promise<unknown>) => waits.push(p),
  }
}

const { default: router } = await import('../edge-functions/aeo-router.ts')
const call = (path: string, ua: string, ctx = context(), init: RequestInit = {}) =>
  router(new Request(`https://edviro.com${path}`, { ...init, headers: { 'user-agent': ua, ...(init.headers || {}) } }), ctx as any)

test('people and search engines pass through untouched', async () => {
  for (const ua of [CHROME, GOOGLEBOT]) {
    const ctx = context()
    assert.equal(await call('/work-orders/', ua, ctx), undefined)
    assert.equal(ctx.calls.length, 0)
  }
  assert.deepEqual(fetched, [])
})

test('off by default: no AEO_ROUTING means the human page', async () => {
  vars = {}
  assert.equal(await call('/work-orders/', GPTBOT), undefined)
  assert.deepEqual(fetched, [])
})

test('pilot path + AI agent + matching source: agent view with Vary and debug header', async () => {
  const ctx = context()
  const res = await call('/work-orders/', GPTBOT, ctx, { headers: { 'if-none-match': '"stale"' } })
  assert.ok(res)
  assert.equal(res.status, 200)
  assert.equal(await res.text(), '<html><body><main><h1>Agent view</h1></main></body></html>')
  assert.equal(res.headers.get('vary'), 'User-Agent')
  assert.equal(res.headers.get('x-edviro-aeo'), 'aeo; agent=gptbot; mode=pilot')
  assert.equal(res.headers.get('x-aeo-source-etag'), null, 'origin headers are not passed through')
  assert.deepEqual(fetched, ['https://edviro-aeo.netlify.app/work-orders/'])
  assert.equal(ctx.calls[0].headers.get('if-none-match'), null, 'human fetch is unconditional')
})

test('non-pilot path in pilot mode is not routed', async () => {
  assert.equal(await call('/measurement-and-verification/', GPTBOT), undefined)
  assert.deepEqual(fetched, [])
})

test('fails open to the human page: changed source, AEO 404, AEO error, AEO timeout, human non-200', async () => {
  const cases: Array<[string, () => void, ReturnType<typeof context>]> = [
    ['source-changed', () => {}, context({ etag: '"0000000000000000-ssl"' })],
    ['source-changed', () => {}, context({ etag: null })],
    ['aeo-status-404', () => { aeoResponse = async () => new Response('nope', { status: 404 }) }, context()],
    ['aeo-error', () => { aeoResponse = async () => { throw new TypeError('network') } }, context()],
    ['aeo-not-html', () => { aeoResponse = async () => new Response('{}', { headers: { 'content-type': 'application/json' } }) }, context()],
    ['human-status-404', () => {}, context({ status: 404, body: 'Not found' })],
  ]
  for (const [reason, arrange, ctx] of cases) {
    arrange()
    const res = await call('/work-orders/', GPTBOT, ctx)
    assert.ok(res, reason)
    assert.equal(res.headers.get('x-edviro-aeo'), `human; agent=gptbot; reason=${reason}`)
    assert.equal(res.headers.get('vary'), 'Accept-Encoding, User-Agent')
    assert.match(await res.text(), /Human page|Not found/)
    aeoResponse = async () => new Response('<html></html>', { headers: { 'content-type': 'text/html', 'x-aeo-source-etag': ETAG } })
  }
})

test('timeout falls back to the human page', async () => {
  vars.AEO_TIMEOUT_MS = '100'
  aeoResponse = () => new Promise((_, reject) => setTimeout(() => reject(new DOMException('timed out', 'TimeoutError')), 150))
  const res = await call('/work-orders/', GPTBOT)
  assert.equal(res?.headers.get('x-edviro-aeo'), 'human; agent=gptbot; reason=aeo-timeout')
})

test('source pinning can be switched off for deploy previews', async () => {
  vars.AEO_REQUIRE_SOURCE_MATCH = 'off'
  const res = await call('/work-orders/', GPTBOT, context({ etag: '"different-ssl"' }))
  assert.equal(res?.headers.get('x-edviro-aeo'), 'aeo; agent=gptbot; mode=pilot')
})

test('HEAD gets headers only', async () => {
  const res = await call('/work-orders/', GPTBOT, context(), { method: 'HEAD' })
  assert.equal(res?.status, 200)
  assert.equal(await res?.text(), '')
})

test('PostHog capture only when AEO_POSTHOG=on, for routed and unrouted agent requests', async () => {
  await call('/work-orders/', GPTBOT)
  assert.equal(captured.length, 0)
  vars.AEO_POSTHOG = 'on'
  const ctx = context()
  await call('/work-orders/', GPTBOT, ctx)
  vars.AEO_ROUTING = 'off'
  await call('/faq/', GPTBOT, ctx)
  await Promise.all(ctx.waits)
  assert.equal(captured.length, 2)
  const [routed, unrouted] = captured as Array<{ event: string; distinct_id: string; api_key: string; properties: Record<string, unknown> }>
  assert.equal(routed.event, 'ai_agent_request')
  assert.equal(routed.distinct_id, 'ai-agent:gptbot')
  assert.match(routed.api_key, /^phc_/)
  assert.deepEqual(
    { agent: routed.properties.agent, path: routed.properties.path, variant: routed.properties.variant, pilot_path: routed.properties.pilot_path },
    { agent: 'gptbot', path: '/work-orders/', variant: 'aeo', pilot_path: true },
  )
  assert.equal(routed.properties.$process_person_profile, false)
  assert.deepEqual({ variant: unrouted.properties.variant, reason: unrouted.properties.reason }, { variant: 'human', reason: 'routing-off' })
})
