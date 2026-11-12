// Render brand assets from the same SVG artwork and Geist font as the website.
// Run npm run generate:brand (first: npx playwright install chromium).
// Or set BRAND_BROWSER_PATH to an installed Chromium/Chrome executable.
import { readFile, writeFile, copyFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const uri = async (path, mime) => `data:${mime};base64,${(await readFile(path)).toString('base64')}`
const logo = await uri('src/assets/img/edviro-logo.svg', 'image/svg+xml')
const mark = (await readFile('src/assets/img/edviro-icon.svg', 'utf8')).replace(/<\?xml[^>]*\?>/, '')
const font = await uri('src/assets/fonts/geist-latin.woff2', 'font/woff2')
const browser = await chromium.launch({ executablePath: process.env.BRAND_BROWSER_PATH || undefined })
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><html><head><style>
    @font-face { font-family: Geist; src: url('${font}') format('woff2'); font-weight: 100 900; }
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 1200px; height: 630px; }
    body { font-family: Geist, sans-serif; color: #0D1512; background: #fff; padding: 58px 72px 0; }
    header { display: flex; align-items: center; justify-content: space-between; }
    header img { width: 205px; height: 50px; }
    header span { color: #5F6B65; font-size: 19px; }
    h1 { margin: 66px 0 23px; font-size: 88px; line-height: 1.04; letter-spacing: -4px; font-weight: 500; }
    h1 span { display: block; color: #0B7A3E; }
    p { margin: 0; font-size: 26px; line-height: 1.5; color: #445049; letter-spacing: -.45px; }
    footer { position: absolute; left: 0; right: 0; bottom: 0; height: 92px; padding: 0 72px;
      display: flex; align-items: center; justify-content: space-between; background: #F4F7F4; border-top: 1px solid #e5eae6; }
    footer strong { font-size: 24px; font-weight: 500; color: #0B7A3E; }
    footer div { display: flex; align-items: center; gap: 11px; font-size: 18px; }
    footer b { display: flex; width: 24px; height: 24px; align-items: center; justify-content: center; background: #F26522; color: white; font-size: 18px; font-weight: 400; }
  </style></head><body>
    <header><img src="${logo}" alt="Edviro"><span>Your AI facilities crew.</span></header>
    <h1>Put your facilities<span>on autopilot.</span></h1>
    <p>Find the problem. Coordinate the fix. Verify the result.</p>
    <footer><strong>edviro.com</strong><div><b>Y</b>Backed by Y Combinator</div></footer>
  </body></html>`)
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode())) })
  await page.screenshot({ path: 'public/edviro-autopilot-2026.png' })
  // Keep existing external embeds working while metadata gets a fresh image URL.
  await copyFile('public/edviro-autopilot-2026.png', 'public/og-image.png')

  const iconSvg = (fraction, background = '#fff') => {
    const height = 100 * fraction
    const width = height * 73 / 100
    return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100"><rect width="100" height="100" fill="${background}"/>${mark.replace('<svg ', `<svg x="${(100-width)/2}" y="${(100-height)/2}" width="${width}" height="${height}" `)}</svg>`
  }
  const favicon = iconSvg(.88)
  await writeFile('public/favicon.svg', favicon)
  const pngs = new Map()
  for (const [name, size, fraction] of [
    ['favicon-16x16.png', 16, .88], ['favicon-32x32.png', 32, .88],
    ['apple-touch-icon.png', 180, .72], ['android-chrome-192x192.png', 192, .72],
    ['android-chrome-512x512.png', 512, .72], ['android-chrome-maskable-512x512.png', 512, .62],
    ['logo-icon.png', 512, .88],
  ]) {
    await page.setViewportSize({ width: size, height: size })
    await page.setContent(`<style>html,body{margin:0;width:100%;height:100%;}body>svg{display:block;width:100%;height:100%;}</style>${iconSvg(fraction)}`)
    const png = await page.screenshot({ path: `public/${name}` })
    pngs.set(size, pngs.get(size) ?? png)
  }
  // ICO directory with PNG payloads, supported by current browsers/Windows.
  const entries = [16, 32].map(size => ({ size, png: pngs.get(size) }))
  const header = Buffer.alloc(6 + entries.length * 16)
  header.writeUInt16LE(1, 2); header.writeUInt16LE(entries.length, 4)
  let offset = header.length
  entries.forEach(({ size, png }, i) => {
    const at = 6 + i * 16
    header[at] = size; header[at + 1] = size
    header.writeUInt16LE(1, at + 4); header.writeUInt16LE(32, at + 6)
    header.writeUInt32LE(png.length, at + 8); header.writeUInt32LE(offset, at + 12)
    offset += png.length
  })
  await writeFile('public/favicon.ico', Buffer.concat([header, ...entries.map(e => e.png)]))
  console.log('Generated 1200×630 social card, current-logo icons, and mask-safe app icon.')
} finally {
  await browser.close()
}
