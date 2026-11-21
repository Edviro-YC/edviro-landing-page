/**
 * Routing decision for the AEO router: should this request get the agent
 * view of the page? Pure functions, so they are unit-tested in Node and run
 * unchanged in the Netlify edge runtime.
 */
import { ROUTABLE, type Agent } from './agents.ts'

export type RoutingMode = 'off' | 'pilot' | 'all'

/**
 * Treatment group for the pilot: the work-order, CMMS and asset pages.
 * Keep identical to `pilot` in edviro-aeo's aeo.config.json. Override per
 * deploy context with AEO_PILOT_PATHS (comma-separated) if needed.
 */
export const DEFAULT_PILOT_PATHS = [
  '/work-orders/',
  '/cmms-for-schools/',
  '/school-work-order-software/',
  '/asset-management/',
  '/school-asset-management-software/',
  '/blog/work-orders-bridge-school-staff-facilities-teams/',
  '/blog/replace-or-integrate-school-district-cmms/',
]

export interface RouterEnv {
  mode: RoutingMode
  origin: URL | null
  pilotPaths: Set<string>
  timeoutMs: number
  requireSourceMatch: boolean
  posthog: boolean
}

/** Read router settings. Anything missing or malformed means routing is off. */
export function readEnv(get: (name: string) => string | undefined): RouterEnv {
  const rawMode = (get('AEO_ROUTING') || '').trim().toLowerCase()
  const mode: RoutingMode = rawMode === 'pilot' || rawMode === 'all' ? rawMode : 'off'
  let origin: URL | null = null
  try {
    const raw = (get('AEO_ORIGIN') || '').trim()
    if (raw) {
      const url = new URL(raw)
      if (url.protocol === 'https:') origin = new URL(url.origin)
    }
  } catch {
    origin = null
  }
  const pilotList = (get('AEO_PILOT_PATHS') || '').split(',').map((p) => p.trim()).filter(Boolean)
  const timeout = Number.parseInt(get('AEO_TIMEOUT_MS') || '', 10)
  return {
    mode,
    origin,
    pilotPaths: new Set(pilotList.length ? pilotList : DEFAULT_PILOT_PATHS),
    timeoutMs: Number.isFinite(timeout) && timeout >= 100 && timeout <= 10_000 ? timeout : 1500,
    requireSourceMatch: (get('AEO_REQUIRE_SOURCE_MATCH') || '').trim().toLowerCase() !== 'off',
    posthog: (get('AEO_POSTHOG') || '').trim().toLowerCase() === 'on',
  }
}

const NON_PAGE_PREFIXES = ['/assets/', '/blog/_astro/', '/blog/og/', '/blog/pagefind/', '/.netlify/', '/_aeo/']

/** True for HTML page paths; false for assets, feeds and other files. */
export function isPagePath(pathname: string): boolean {
  if (NON_PAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false
  const last = pathname.split('/').pop() || ''
  return !last.includes('.') || last.endsWith('.html')
}

export interface Decision {
  route: boolean
  reason: string
}

export function decide(input: { method: string; pathname: string; agent: Agent | null; env: RouterEnv }): Decision {
  const { method, pathname, agent, env } = input
  if (!agent || !ROUTABLE.has(agent.class)) return { route: false, reason: agent ? `class-${agent.class}` : 'not-an-agent' }
  if (method !== 'GET' && method !== 'HEAD') return { route: false, reason: 'method' }
  if (!isPagePath(pathname)) return { route: false, reason: 'not-a-page' }
  if (env.mode === 'off') return { route: false, reason: 'routing-off' }
  if (!env.origin) return { route: false, reason: 'no-origin' }
  if (env.mode === 'pilot' && !env.pilotPaths.has(pathname)) return { route: false, reason: 'not-in-pilot' }
  return { route: true, reason: env.mode }
}

/** Netlify ETags look like "hash-ssl" or W/"hash-ssl-df"; compare the hash only. */
export function normalizeEtag(etag: string | null | undefined): string | null {
  if (!etag) return null
  const bare = etag.trim().replace(/^W\//, '').replace(/^"|"$/g, '')
  return bare.split('-')[0] || null
}

/**
 * Whether the agent page was built from the human page being served now.
 * The AEO build stamps each page with X-AEO-Source-ETag; after a landing or
 * blog deploy the stamp stops matching until the AEO site rebuilds, and in
 * that window agents get the human page.
 */
export function sourceMatches(aeoSourceEtag: string | null, humanEtag: string | null): boolean {
  const pinned = normalizeEtag(aeoSourceEtag)
  const current = normalizeEtag(humanEtag)
  return Boolean(pinned && current && pinned === current)
}

/** The debug header value, e.g. "aeo; agent=gptbot; mode=pilot" or "human; reason=source-changed". */
export function debugHeader(variant: 'aeo' | 'human', agent: Agent, detail: string): string {
  return variant === 'aeo' ? `aeo; agent=${agent.id}; mode=${detail}` : `human; agent=${agent.id}; reason=${detail}`
}

/** Append User-Agent to a Vary header without duplicating it. */
export function addVaryUserAgent(vary: string | null): string {
  const parts = (vary || '').split(',').map((v) => v.trim()).filter(Boolean)
  if (!parts.some((p) => p.toLowerCase() === 'user-agent' || p === '*')) parts.push('User-Agent')
  return parts.join(', ')
}
