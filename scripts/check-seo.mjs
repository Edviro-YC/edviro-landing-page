import assert from 'node:assert/strict'
import { glob, readFile, access } from 'node:fs/promises'
import { join } from 'node:path'

// Check the HTML crawlers actually receive, not just source configuration.
const origin = 'https://edviro.com'
const rows = []
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]))
const decode = (s) => s.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"')
for await (const file of glob('dist/**/*.html')) {
  const html = await readFile(file, 'utf8')
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0]))
  const meta = (key) => metas.filter((m) => m.name === key || m.property === key)
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attributes(m[0])).filter((a) => a.rel === 'canonical')
  const titles = [...html.matchAll(/<title>(.*?)<\/title>/gs)]
  assert.equal(titles.length, 1, `${file}: one title`)
  assert.equal(canonical.length, 1, `${file}: one canonical`)
  const url = canonical[0].href
  assert.equal(new URL(url).origin, origin, `${file}: canonical domain`)
  assert.ok(url.endsWith('/'), `${file}: canonical trailing slash`)
  assert.equal(meta('description').length, 1, `${file}: one description`)
  assert.ok(meta('description')[0].content.length > 30, `${file}: useful description`)
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${file}: one H1`)
  for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'twitter:title', 'twitter:image']) {
    assert.equal(meta(key).length, 1, `${file}: ${key}`)
  }
  assert.equal(meta('og:url')[0].content, url)
  assert.equal(meta('og:title')[0].content, titles[0][1], `${file}: branded share title`)
  assert.equal(meta('twitter:title')[0].content, titles[0][1])
  const image = new URL(meta('og:image')[0].content)
  assert.equal(image.origin, origin)
  await access(join('dist', image.pathname))
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]))
  for (const schema of schemas) {
    assert.equal(schema['@context'], 'https://schema.org')
    assert.ok(schema['@type'])
    assert.ok(!JSON.stringify(schema).includes('https://edviroenergy.com'), `${file}: stale schema URL`)
  }
  const noindex = meta('robots').some((m) => m.content.includes('noindex'))
  if (!noindex) assert.ok(schemas.length > 0, `${file}: structured data`)
  const links = [...html.matchAll(/<a\b[^>]*>/g)].map((m) => attributes(m[0]).href).filter(Boolean).map(decode)
  rows.push({ file, url, title: decode(titles[0][1]), noindex, links, html })
}
assert.equal(new Set(rows.map((r) => r.title)).size, rows.length, 'Unique page titles')
const indexed = rows.filter((r) => !r.noindex)
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
assert.deepEqual(sitemapUrls.sort(), indexed.map((r) => r.url).sort(), 'Sitemap exactly matches indexable HTML')
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${origin}/sitemap.xml`))
const home = rows.find((r) => r.url === `${origin}/`)
assert.equal(home.title, 'Put your facilities on autopilot | Edviro')
assert.ok(home.html.includes('Edviro is facilities management software'))
assert.ok(rows.find((r) => r.url === `${origin}/demo-booked/`)?.noindex)

// Every marketing page must be reachable within three clicks. Also catch
// broken internal destinations, while honoring intentional edge redirects.
const redirects = await readFile('dist/_redirects', 'utf8')
const redirectedPaths = new Set(redirects.split('\n').filter((r) => r.startsWith('/')).map((r) => r.split(/\s+/)[0].replace(/\/$/, '')))
const byUrl = new Map(rows.map((r) => [r.url, r]))
for (const row of rows) {
  row.destinations = []
  for (const href of row.links) {
    const target = new URL(href, row.url)
    if (target.origin !== origin) continue
    const path = target.pathname.replace(/\/$/, '') || '/'
    if (redirectedPaths.has(path)) continue
    // Astro owns the /blog namespace, served through Netlify's origin rewrite.
    if (path.startsWith('/blog/')) {
      assert.ok(redirects.includes('/blog/*  https://edviro-blog.netlify.app/blog/:splat  200'))
      continue
    }
    const dest = `${origin}${path === '/' ? '/' : `${path}/`}`
    assert.ok(byUrl.has(dest), `${row.file}: missing internal page ${href}`)
    row.destinations.push(dest)
  }
}
const depth = new Map([[home.url, 0]])
const queue = [home.url]
for (const url of queue) for (const next of byUrl.get(url).destinations) {
  if (depth.has(next)) continue
  depth.set(next, depth.get(url) + 1)
  queue.push(next)
}
for (const row of indexed) assert.ok(depth.get(row.url) <= 3, `${row.url}: more than three clicks from home`)
for (const old of ['http://edviroenergy.com', 'https://edviroenergy.com', 'http://www.edviroenergy.com', 'https://www.edviroenergy.com', 'http://home.edviroenergy.com', 'https://home.edviroenergy.com', 'http://edviro-landing-page.netlify.app', 'https://edviro-landing-page.netlify.app', 'http://www.edviro.com', 'https://www.edviro.com', 'http://edviro.com']) {
  assert.ok(redirects.includes(`${old}/*  ${origin}/:splat  301!`), `Missing forced host redirect: ${old}`)
}
assert.ok(!redirects.includes(`https://edviro.com/*`), 'No canonical-host redirect loop')
assert.ok(!redirects.includes('https://*'), 'Host redirects must not capture deploy previews or unrelated subdomains')
console.log(`SEO checks passed: ${rows.length} HTML pages, ${indexed.length} sitemap URLs, metadata, JSON-LD, links, crawl depth, and migration rules.`)

assert.ok(redirects.includes('/blog/*  https://edviro-blog.netlify.app/blog/:splat  200'))
assert.ok(redirects.includes('/blog  https://edviro-blog.netlify.app/blog/  200'))
assert.ok(!redirects.includes('/blog  /blog/  301'), 'Netlify normalizes slash matching; this would loop at the proxied index')
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes('Sitemap: https://edviro.com/blog/sitemap-index.xml'))
assert.ok(home.html.includes('name="share-your-story"'), 'Netlify must detect the proxied blog form on the receiving site')
