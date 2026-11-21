/**
 * Who is asking: classifies a request's User-Agent for the AEO router.
 *
 * Only AI assistants and AI crawlers can get the agent view. Search engines
 * (Googlebot, Bingbot, Applebot and every other Google/Microsoft crawler),
 * link-preview bots, browser-driving agents and people always get the human
 * page. Search engines are checked first, so a user agent that names both a
 * search crawler and an AI token is treated as search.
 *
 * Tokens come from each operator's published crawler documentation (checked
 * 2026-11-21); see the AEO exploration in edviro-specs for the sources.
 * User agents can be spoofed. That is harmless here because the agent view
 * carries the same content as the human page; it only matters for analytics.
 */

export type AgentClass =
  | 'ai-user' // fetches a page because a person asked an assistant a question
  | 'ai-search' // indexes pages for an AI search or answer product
  | 'ai-training' // collects pages that may train models
  | 'search' // classic search engines: never routed
  | 'preview' // link unfurlers: never routed
  | 'browser-agent' // agents driving a real browser: never routed

export interface Agent {
  id: string
  operator: string
  token: string
  class: AgentClass
}

type Rule = [token: string, operator: string, cls: AgentClass]

/** Checked first. Any match means the human page, whatever else the UA says. */
const NEVER_ROUTE: Rule[] = [
  // Every Google crawler and fetcher, including Googlebot (which also feeds
  // AI Overviews and AI Mode), Google-InspectionTool, GoogleOther,
  // Google-CloudVertexBot, AdsBot-Google, Storebot-Google, FeedFetcher-Google.
  ['Google', 'google', 'search'],
  ['bingbot', 'microsoft', 'search'], // also grounds Copilot answers
  ['BingPreview', 'microsoft', 'search'],
  ['msnbot', 'microsoft', 'search'],
  ['adidxbot', 'microsoft', 'search'],
  ['Applebot', 'apple', 'search'], // Siri/Spotlight search; Applebot-Extended is robots.txt-only
  ['DuckDuckBot', 'duckduckgo', 'search'],
  ['YandexBot', 'yandex', 'search'],
  ['Baiduspider', 'baidu', 'search'],
  ['Slurp', 'yahoo', 'search'],
  ['facebookexternalhit', 'meta', 'preview'],
  ['Twitterbot', 'x', 'preview'],
  ['LinkedInBot', 'linkedin', 'preview'],
  ['Slackbot', 'slack', 'preview'],
  ['Discordbot', 'discord', 'preview'],
  ['WhatsApp', 'meta', 'preview'],
  ['TelegramBot', 'telegram', 'preview'],
  ['Claude-Agent', 'anthropic', 'browser-agent'],
]

/** AI assistants and crawlers that may get the agent view. */
export const AI_AGENTS: Rule[] = [
  ['ChatGPT-User', 'openai', 'ai-user'],
  ['OAI-SearchBot', 'openai', 'ai-search'],
  ['GPTBot', 'openai', 'ai-training'],
  ['Claude-User', 'anthropic', 'ai-user'],
  ['Claude-SearchBot', 'anthropic', 'ai-search'],
  ['ClaudeBot', 'anthropic', 'ai-training'],
  ['Claude-Web', 'anthropic', 'ai-user'], // retired token, still seen
  ['anthropic-ai', 'anthropic', 'ai-training'], // retired token, still seen
  ['Perplexity-User', 'perplexity', 'ai-user'],
  ['PerplexityBot', 'perplexity', 'ai-search'],
  ['MistralAI-User', 'mistral', 'ai-user'],
  ['MistralAI-Index', 'mistral', 'ai-search'],
  ['MistralAI-Training', 'mistral', 'ai-training'],
  ['DuckAssistBot', 'duckduckgo', 'ai-user'],
  ['Meta-ExternalFetcher', 'meta', 'ai-user'],
  ['Meta-WebIndexer', 'meta', 'ai-search'],
  ['Meta-ExternalAgent', 'meta', 'ai-training'],
  ['Amzn-User', 'amazon', 'ai-user'],
  ['Amzn-SearchBot', 'amazon', 'ai-search'],
  ['Amazonbot', 'amazon', 'ai-training'],
  ['YouBot', 'you', 'ai-search'],
  ['CCBot', 'commoncrawl', 'ai-training'],
  ['Bytespider', 'bytedance', 'ai-training'],
  ['cohere-ai', 'cohere', 'ai-training'],
]

/** Classes the router may send to the agent view. */
export const ROUTABLE: ReadonlySet<AgentClass> = new Set<AgentClass>(['ai-user', 'ai-search', 'ai-training'])

function tokenPattern(token: string): RegExp {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // A token must stand alone: "Claude-User" must not match inside "Claude-UserX".
  return new RegExp(`(^|[^a-z0-9-])${escaped}(?=$|[^a-z0-9-])`, 'i')
}

const COMPILED: Array<[RegExp, Rule]> = [...NEVER_ROUTE, ...AI_AGENTS].map((rule) => [
  // Google rule matches as a substring so every Google crawler name is caught.
  rule[0] === 'Google' ? /google/i : tokenPattern(rule[0]),
  rule,
])

/** The agent behind a User-Agent header, or null for browsers and unknown clients. */
export function classifyAgent(userAgent: string | null | undefined): Agent | null {
  if (!userAgent) return null
  for (const [pattern, [token, operator, cls]] of COMPILED) {
    if (pattern.test(userAgent)) {
      return { id: token.toLowerCase(), operator, token, class: cls }
    }
  }
  return null
}

/**
 * Cheap pre-filter for the edge function's `header` match, so requests from
 * people never invoke the function at all. Must match every AI_AGENTS token
 * (a unit test checks); the classifier above makes the real decision. Kept
 * as a plain alternation with both cases spelled out because the routing
 * layer's regex flags are not documented.
 */
export const USER_AGENT_PREFILTER =
  '.*(ChatGPT-User|OAI-SearchBot|GPTBot|Claude-User|Claude-SearchBot|ClaudeBot|Claude-Web|anthropic-ai|Perplexity-User|PerplexityBot|MistralAI-|DuckAssistBot|Meta-ExternalFetcher|meta-externalfetcher|Meta-WebIndexer|meta-webindexer|Meta-ExternalAgent|meta-externalagent|Amzn-User|Amzn-SearchBot|Amazonbot|YouBot|CCBot|Bytespider|cohere-ai).*'
