import assert from 'node:assert/strict'
import { test } from 'node:test'
import { classifyAgent } from './agents.ts'
import { DEFAULT_PILOT_PATHS, addVaryUserAgent, decide, isPagePath, normalizeEtag, readEnv, sourceMatches } from './route.ts'

const env = (vars: Record<string, string>) => readEnv((name) => vars[name])
const gptbot = classifyAgent('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot')
const googlebot = classifyAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
const ORIGIN = { AEO_ORIGIN: 'https://edviro-aeo.netlify.app' }

test('routing is off by default and for anything but pilot/all with an https origin', () => {
  assert.equal(readEnv(() => undefined).mode, 'off')
  assert.equal(env({ AEO_ROUTING: 'on', ...ORIGIN }).mode, 'off')
  assert.equal(env({ AEO_ROUTING: 'PILOT', ...ORIGIN }).mode, 'pilot')
  assert.equal(env({ AEO_ROUTING: 'all', AEO_ORIGIN: 'http://edviro-aeo.netlify.app' }).origin, null)
  assert.equal(env({ AEO_ROUTING: 'all', AEO_ORIGIN: 'not a url' }).origin, null)
  const d = decide({ method: 'GET', pathname: '/work-orders/', agent: gptbot, env: readEnv(() => undefined) })
  assert.deepEqual(d, { route: false, reason: 'routing-off' })
  assert.deepEqual(decide({ method: 'GET', pathname: '/work-orders/', agent: gptbot, env: env({ AEO_ROUTING: 'all' }) }), { route: false, reason: 'no-origin' })
})

test('pilot mode routes only pilot paths; all mode routes every page path', () => {
  const pilot = env({ AEO_ROUTING: 'pilot', ...ORIGIN })
  assert.deepEqual(decide({ method: 'GET', pathname: '/work-orders/', agent: gptbot, env: pilot }), { route: true, reason: 'pilot' })
  assert.deepEqual(decide({ method: 'GET', pathname: '/measurement-and-verification/', agent: gptbot, env: pilot }), { route: false, reason: 'not-in-pilot' })
  assert.equal(decide({ method: 'GET', pathname: '/work-orders', agent: gptbot, env: pilot }).route, false, 'slashless variant 301s for people too')
  const all = env({ AEO_ROUTING: 'all', ...ORIGIN })
  assert.deepEqual(decide({ method: 'HEAD', pathname: '/blog/demand-charges-explained-for-schools/', agent: gptbot, env: all }), { route: true, reason: 'all' })
  const custom = env({ AEO_ROUTING: 'pilot', AEO_PILOT_PATHS: '/faq/, /about/', ...ORIGIN })
  assert.equal(decide({ method: 'GET', pathname: '/about/', agent: gptbot, env: custom }).route, true)
  assert.equal(decide({ method: 'GET', pathname: '/work-orders/', agent: gptbot, env: custom }).route, false)
})

test('never routed: search engines, people, non-GET, assets', () => {
  const all = env({ AEO_ROUTING: 'all', ...ORIGIN })
  assert.deepEqual(decide({ method: 'GET', pathname: '/work-orders/', agent: googlebot, env: all }), { route: false, reason: 'class-search' })
  assert.deepEqual(decide({ method: 'GET', pathname: '/work-orders/', agent: null, env: all }), { route: false, reason: 'not-an-agent' })
  assert.deepEqual(decide({ method: 'POST', pathname: '/work-orders/', agent: gptbot, env: all }), { route: false, reason: 'method' })
  for (const p of ['/assets/app.js', '/blog/_astro/x.css', '/sitemap.xml', '/robots.txt', '/llms.txt', '/blog/og/tall/home.jpg', '/blog/rss.xml']) {
    assert.equal(isPagePath(p), false, p)
    assert.deepEqual(decide({ method: 'GET', pathname: p, agent: gptbot, env: all }), { route: false, reason: 'not-a-page' })
  }
  for (const p of ['/', '/faq/', '/blog/', '/solutions/schools/k-12/']) assert.equal(isPagePath(p), true, p)
})

test('settings: timeout bounds, source pinning on by default, PostHog off by default', () => {
  assert.equal(env({}).timeoutMs, 1500)
  assert.equal(env({ AEO_TIMEOUT_MS: '50' }).timeoutMs, 1500)
  assert.equal(env({ AEO_TIMEOUT_MS: '2500' }).timeoutMs, 2500)
  assert.equal(env({}).requireSourceMatch, true)
  assert.equal(env({ AEO_REQUIRE_SOURCE_MATCH: 'off' }).requireSourceMatch, false)
  assert.equal(env({}).posthog, false)
  assert.equal(env({ AEO_POSTHOG: 'on' }).posthog, true)
  assert.deepEqual([...env({}).pilotPaths], DEFAULT_PILOT_PATHS)
})

test('agent page is served only when built from the human page being served', () => {
  assert.equal(normalizeEtag('W/"4a277ccafce7ff0ae76ead93ee86e105-ssl-df"'), '4a277ccafce7ff0ae76ead93ee86e105')
  assert.equal(sourceMatches('4a277ccafce7ff0ae76ead93ee86e105', '"4a277ccafce7ff0ae76ead93ee86e105-ssl"'), true)
  assert.equal(sourceMatches('4a277ccafce7ff0ae76ead93ee86e105', '"0000-ssl"'), false)
  assert.equal(sourceMatches(null, '"4a27-ssl"'), false)
  assert.equal(sourceMatches('4a27', null), false)
})

test('Vary gains User-Agent once', () => {
  assert.equal(addVaryUserAgent('Accept-Encoding'), 'Accept-Encoding, User-Agent')
  assert.equal(addVaryUserAgent('accept-encoding, user-agent'), 'accept-encoding, user-agent')
  assert.equal(addVaryUserAgent(null), 'User-Agent')
})
