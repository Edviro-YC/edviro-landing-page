import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// Use the actual prerendered, indexable pages so new routes cannot be omitted
// and confirmation/redirect pages cannot accidentally enter the sitemap.
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const groups = await Promise.all(entries.map((entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : []
  }))
  return groups.flat()
}

const urls = []
for (const path of await htmlFiles('dist')) {
  const html = await readFile(path, 'utf8')
  if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)) continue
  const url = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1]
  if (!url?.startsWith('https://edviro.com/')) throw new Error(`Invalid canonical in ${path}: ${url}`)
  urls.push(url)
}
if (!urls.length || new Set(urls).size !== urls.length) throw new Error('Empty or duplicate sitemap URLs')

// Omit lastmod rather than invent a fresh modification date on every build.
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.sort().map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile('dist/sitemap.xml', xml)
console.log(`Sitemap: ${urls.length} indexable pages`)
