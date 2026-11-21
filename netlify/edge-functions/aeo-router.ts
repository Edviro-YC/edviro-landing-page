/**
 * AEO router: gives AI assistants and AI crawlers the simplified agent view
 * of an edviro.com page, at the same URL, with the same content.
 *
 * - Off unless AEO_ROUTING is "pilot" (only DEFAULT_PILOT_PATHS / AEO_PILOT_PATHS)
 *   or "all", and AEO_ORIGIN is an https origin (the edviro-aeo Netlify site).
 * - Only AI agents (see ../aeo/agents.ts). Googlebot, Bingbot, every other
 *   search crawler, link previews, browser agents and people get the human
 *   page. People never invoke this function: the `header` match below only
 *   lets AI user agents through.
 * - Fails open: any error, timeout, non-200 from either side, or an agent
 *   page built from an older version of the human page means the human page.
 * - Optional, env-gated measurement: AEO_POSTHOG=on sends one server-side
 *   PostHog event per AI-agent page request (`ai_agent_request`).
 *
 * The agent pages come from Edviro-YC/edviro-aeo, which rebuilds from the
 * live site and fails its build if a page says anything the human page
 * does not visibly say.
 */
import type { Config, Context } from '@netlify/edge-functions'
import { classifyAgent, type Agent } from '../aeo/agents.ts'
import {
  addVaryUserAgent,
  debugHeader,
  decide,
  readEnv,
  sourceMatches,
  type RouterEnv,
} from '../aeo/route.ts'
import { POSTHOG_HOST, POSTHOG_KEY } from '../../src/seo/site.ts'

const DEBUG_HEADER = 'x-edviro-aeo'
const CONDITIONAL_HEADERS = ['if-none-match', 'if-modified-since', 'if-match', 'if-unmodified-since', 'if-range']

export default async function aeoRouter(request: Request, context: Context) {
  const agent = classifyAgent(request.headers.get('user-agent'))
  if (!agent) return // not an agent we know: untouched

  const env = readEnv((name) => Netlify.env.get(name))
  const url = new URL(request.url)
  const decision = decide({ method: request.method, pathname: url.pathname, agent, env })
  if (!decision.route) {
    track(context, env, agent, url.pathname, 'human', decision.reason)
    return // continue to the human page untouched
  }

  const { response, variant, reason } = await serve(request, context, env, agent, url)
  track(context, env, agent, url.pathname, variant, reason)
  return response
}

async function serve(request: Request, context: Context, env: RouterEnv, agent: Agent, url: URL) {
  const aeoUrl = new URL(url.pathname, env.origin!)
  const aeoPromise = fetch(aeoUrl, {
    method: request.method === 'HEAD' ? 'HEAD' : 'GET',
    headers: { accept: 'text/html', 'user-agent': 'EdviroAEORouter/1.0 (+https://edviro.com/)' },
    redirect: 'manual',
    signal: AbortSignal.timeout(env.timeoutMs),
  }).catch((error: unknown) => error as Error)

  // Always fetch the human page too (without conditional headers, so it is a
  // full 200 with its ETag). It is the fallback for every failure, and its
  // ETag proves the agent page was built from the version served now.
  const headers = new Headers(request.headers)
  for (const name of CONDITIONAL_HEADERS) headers.delete(name)
  const human = await context.next(new Request(request, { headers }))
  const aeo = await aeoPromise

  const fallback = async (why: string) => {
    if (!(aeo instanceof Error)) await aeo.body?.cancel().catch(() => {})
    return { response: humanResponse(human, agent, why), variant: 'human' as const, reason: why }
  }

  if (human.status !== 200) return fallback(`human-status-${human.status}`)
  if (aeo instanceof Error) return fallback(aeo.name === 'TimeoutError' ? 'aeo-timeout' : 'aeo-error')
  if (aeo.status !== 200) return fallback(`aeo-status-${aeo.status}`)
  if (!(aeo.headers.get('content-type') || '').includes('text/html')) return fallback('aeo-not-html')
  if (env.requireSourceMatch && !sourceMatches(aeo.headers.get('x-aeo-source-etag'), human.headers.get('etag'))) {
    return fallback('source-changed')
  }

  await human.body?.cancel().catch(() => {})
  return {
    response: new Response(request.method === 'HEAD' ? null : aeo.body, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
        vary: 'User-Agent',
        [DEBUG_HEADER]: debugHeader('aeo', agent, env.mode),
      },
    }),
    variant: 'aeo' as const,
    reason: env.mode,
  }
}

function humanResponse(human: Response, agent: Agent, why: string): Response {
  const headers = new Headers(human.headers)
  headers.set('vary', addVaryUserAgent(headers.get('vary')))
  headers.set(DEBUG_HEADER, debugHeader('human', agent, why))
  return new Response(human.body, { status: human.status, statusText: human.statusText, headers })
}

/** Server-side PostHog capture, only when AEO_POSTHOG=on. Never blocks or fails the request. */
function track(context: Context, env: RouterEnv, agent: Agent, path: string, variant: 'aeo' | 'human', reason: string) {
  if (!env.posthog) return
  const event = {
    api_key: POSTHOG_KEY,
    event: 'ai_agent_request',
    distinct_id: `ai-agent:${agent.id}`,
    timestamp: new Date().toISOString(),
    properties: {
      agent: agent.id,
      agent_operator: agent.operator,
      agent_class: agent.class,
      path,
      variant,
      reason,
      routing_mode: env.mode,
      pilot_path: env.pilotPaths.has(path),
      $current_url: `https://edviro.com${path}`,
      $process_person_profile: false,
    },
  }
  const sent = fetch(`${POSTHOG_HOST}/i/v0/e/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(event),
    signal: AbortSignal.timeout(3000),
  }).catch(() => {})
  context.waitUntil?.(sent)
}

export const config: Config = {
  path: '/*',
  // Static assets, feeds and metadata never get the agent view.
  excludedPath: [
    '/assets/*',
    '/blog/_astro/*',
    '/blog/og/*',
    '/blog/pagefind/*',
    '/.netlify/*',
    '/*.js',
    '/*.css',
    '/*.map',
    '/*.json',
    '/*.xml',
    '/*.txt',
    '/*.ico',
    '/*.png',
    '/*.jpg',
    '/*.jpeg',
    '/*.webp',
    '/*.avif',
    '/*.gif',
    '/*.svg',
    '/*.woff2',
    '/*.webmanifest',
    '/*.ics',
    '/*.pdf',
  ],
  // Only AI user agents invoke the function (must stay in sync with
  // USER_AGENT_PREFILTER in ../aeo/agents.ts; a unit test checks the copy).
  header: {
    'user-agent':
      '.*(ChatGPT-User|OAI-SearchBot|GPTBot|Claude-User|Claude-SearchBot|ClaudeBot|Claude-Web|anthropic-ai|Perplexity-User|PerplexityBot|MistralAI-|DuckAssistBot|Meta-ExternalFetcher|meta-externalfetcher|Meta-WebIndexer|meta-webindexer|Meta-ExternalAgent|meta-externalagent|Amzn-User|Amzn-SearchBot|Amazonbot|YouBot|CCBot|Bytespider|cohere-ai).*',
  },
  // If the function itself throws, skip it and serve the human page.
  onError: 'bypass',
}
