import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { AI_AGENTS, ROUTABLE, USER_AGENT_PREFILTER, classifyAgent } from './agents.ts'

// Real user-agent strings from each operator's crawler documentation.
const AI_UAS: Array<[string, string, string]> = [
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot', 'gptbot', 'ai-training'],
  ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot', 'oai-searchbot', 'ai-search'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot', 'chatgpt-user', 'ai-user'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', 'claudebot', 'ai-training'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-User/1.0; +Claude-User@anthropic.com)', 'claude-user', 'ai-user'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)', 'claude-searchbot', 'ai-search'],
  ['Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)', 'perplexitybot', 'ai-search'],
  ['Mozilla/5.0 (compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)', 'perplexity-user', 'ai-user'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-User/1.0; +https://docs.mistral.ai/robots)', 'mistralai-user', 'ai-user'],
  ['DuckAssistBot/1.2; (+http://duckduckgo.com/duckassistbot.html)', 'duckassistbot', 'ai-user'],
  ['meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)', 'meta-externalagent', 'ai-training'],
  ['meta-externalfetcher/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)', 'meta-externalfetcher', 'ai-user'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot) Chrome/119.0.6045.214 Safari/537.36', 'amazonbot', 'ai-training'],
  ['CCBot/2.0 (https://commoncrawl.org/faq/)', 'ccbot', 'ai-training'],
]

const NEVER_UAS: Array<[string, string | null]> = [
  ['Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.69 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'search'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/131.0.6778.69 Safari/537.36', 'search'],
  ['Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)', 'search'],
  ['Mozilla/5.0 (compatible; GoogleOther)', 'search'],
  ['Mozilla/5.0 (compatible; Google-CloudVertexBot; +https://cloud.google.com/enterprise-search)', 'search'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36', 'search'],
  ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)', 'search'],
  ['DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)', 'search'],
  ['facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)', 'preview'],
  ['LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)', 'preview'],
  ['Mozilla/5.0 (compatible; Claude-Agent/1.0)', 'browser-agent'],
  // A spoof that names both: search wins, so Google never sees the agent view.
  ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) GPTBot/1.4', 'search'],
  // People and ordinary tools.
  ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', null],
  ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1', null],
  ['curl/8.7.1', null],
  ['', null],
]

test('AI assistants and crawlers are recognized with their class', () => {
  for (const [ua, id, cls] of AI_UAS) {
    const agent = classifyAgent(ua)
    assert.ok(agent, ua)
    assert.equal(agent.id, id, ua)
    assert.equal(agent.class, cls, ua)
    assert.ok(ROUTABLE.has(agent.class), ua)
  }
})

test('search engines, previews, browser agents and people are never routable', () => {
  for (const [ua, cls] of NEVER_UAS) {
    const agent = classifyAgent(ua)
    assert.equal(agent?.class ?? null, cls, ua)
    assert.ok(!agent || !ROUTABLE.has(agent.class), ua)
  }
})

test('tokens match whole words only', () => {
  assert.equal(classifyAgent('Mozilla/5.0 (compatible; NotGPTBotReally/1.0)'), null)
  assert.equal(classifyAgent('gptbot/1.4')?.id, 'gptbot')
})

test('the header pre-filter lets every AI agent through and keeps people out', () => {
  const prefilter = new RegExp(USER_AGENT_PREFILTER)
  for (const [token] of AI_AGENTS) assert.ok(prefilter.test(`Mozilla/5.0 (compatible; ${token}/1.0)`), token)
  for (const [ua] of AI_UAS) assert.ok(prefilter.test(ua), ua)
  assert.equal(prefilter.test('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/142.0.0.0 Safari/537.36'), false)
})

test('the edge function config carries the same pre-filter', () => {
  const source = readFileSync(new URL('../edge-functions/aeo-router.ts', import.meta.url), 'utf8')
  const literal = source.match(/header:\s*\{\s*'user-agent':\s*'([^']+)'/)?.[1]
  assert.equal(literal, USER_AGENT_PREFILTER)
})
