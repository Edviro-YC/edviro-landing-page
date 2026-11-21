import { WHATS_NEW_FEED_PATH } from '@/seo/site'

/**
 * One product update from the blog's JSON feed (/blog/whats-new.json, built by
 * edviro-blog). The feed is `{ items: [{ id, title, lede, date, url, tags }] }`,
 * newest first; this side keeps only what the homepage strip shows.
 */
export interface WhatsNewItem {
  title: string
  lede: string
  /** YYYY-MM-DD */
  date: string
  /** Root-relative, e.g. /blog/whats-new/2026-11-21_01/ */
  path: string
}

const DATE = /^\d{4}-\d{2}-\d{2}$/
const UPDATE_PATH = /^\/blog\/whats-new\/[\w-]+\/$/
const FEED_TIMEOUT_MS = 4000

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

/**
 * Validates the feed and keeps the newest `limit` well-formed items. Anything
 * unexpected (wrong shape, a link off the What's New section) is dropped, so a
 * bad feed shows fewer items or none, never a broken strip.
 */
export function parseWhatsNewFeed(data: unknown, limit = 3): WhatsNewItem[] {
  const items = (data as { items?: unknown } | null)?.items
  if (!Array.isArray(items)) return []
  const parsed: WhatsNewItem[] = []
  for (const raw of items) {
    const item = raw as Record<string, unknown> | null
    const title = text(item?.title)
    const lede = text(item?.lede)
    const date = text(item?.date)
    let path = ''
    try {
      const url = new URL(text(item?.url), 'https://edviro.com')
      if (url.origin === 'https://edviro.com') path = url.pathname
    } catch {
      path = ''
    }
    if (title && lede && DATE.test(date) && UPDATE_PATH.test(path))
      parsed.push({ title, lede, date, path })
    if (parsed.length === limit) break
  }
  return parsed
}

/**
 * Fetches the latest updates in the browser. Resolves to [] on any failure
 * (offline, timeout, 404, HTML instead of JSON in local dev), so callers can
 * simply hide the strip.
 */
export async function fetchWhatsNew(limit = 3): Promise<WhatsNewItem[]> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), FEED_TIMEOUT_MS)
  try {
    const response = await fetch(WHATS_NEW_FEED_PATH, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return []
    return parseWhatsNewFeed(await response.json(), limit)
  } catch {
    return []
  } finally {
    window.clearTimeout(timer)
  }
}

export const formatUpdateDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
