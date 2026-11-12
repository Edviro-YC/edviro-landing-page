import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

// Run against `npm run preview -- --host 127.0.0.1 --port 4178` after building.
const base = process.env.DESIGN_BASE_URL ?? 'http://127.0.0.1:4178'
const output = process.env.DESIGN_SCREENSHOTS
if (output) await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const errors = []
const missing = new Set()
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
// Keep automated visits out of analytics and ad services.
await context.route('**/*', (route) =>
  new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort(),
)
context.on('page', (page) => {
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.url().startsWith(base) && response.status() >= 400) missing.add(response.url())
  })
})
const page = await context.newPage()
const go = async (path) => {
  await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' })
  await page.locator('h1').waitFor()
  assert.equal(await page.locator('h1').count(), 1, `${path}: one main heading`)
}
const shot = async (name) => {
  if (output) await page.screenshot({ path: `${output}/${name}.png`, animations: 'disabled' })
}
try {
  await go('/')
  assert.match(await page.locator('h1').innerText(), /Infrastructure that runs itself/)
  assert.equal(
    await page.locator('.hp-scene, .hp-stack, .hp-tabs').count(),
    0,
    'Removed hero animation',
  )
  assert.match(await page.locator('#modules').innerText(), /Free with your AI Crew subscription/)
  assert.equal(await page.locator('.hero .nd-btn').first().getAttribute('href'), '/demo/')
  await shot('home-desktop')

  const faq = page.locator('#faq details').nth(1)
  await faq.locator('summary').click()
  assert.equal(await faq.getAttribute('open'), '', 'FAQ disclosure opens')
  await faq.locator('summary').click()
  assert.equal(await faq.getAttribute('open'), null, 'FAQ disclosure closes')

  await page.locator('.capability-nav a').first().click()
  await page.waitForFunction(() =>
    document.querySelector('[data-capability="diagnostics"] .media')?.classList.contains('in'),
  )
  await page.waitForFunction(
    () =>
      Number(
        getComputedStyle(document.querySelector('[data-capability="diagnostics"] .ill-alert'))
          .opacity,
      ) > 0.95,
  )
  assert.equal(
    await page
      .locator('[data-capability="diagnostics"] p')
      .evaluate((el) => getComputedStyle(el).color),
    'rgb(192, 206, 195)',
    'Dark-section body contrast',
  )
  // A sticky panel's visual position must not trap anchor navigation on the last panel.
  await page.waitForFunction(
    () =>
      document.querySelector('[data-capability="planning"]').getBoundingClientRect().top >
      innerHeight,
  )
  assert.equal(
    await page.locator('.capability-nav a').first().getAttribute('aria-current'),
    'location',
  )
  await shot('platform-desktop')

  const carousel = page.locator('.building-carousel')
  await page.getByRole('button', { name: 'Next building types' }).click()
  await page.waitForFunction(() => document.querySelector('.building-carousel').scrollLeft > 20)
  assert.equal(
    await page.getByRole('button', { name: 'Previous building types' }).isEnabled(),
    true,
  )
  await page.getByRole('button', { name: 'Previous building types' }).click()
  await page.waitForFunction(() => document.querySelector('.building-carousel').scrollLeft < 2)
  await carousel.locator('.building-card').first().hover()
  await page.waitForFunction(
    () => Number(getComputedStyle(document.querySelector('.building-card .night')).opacity) > 0.95,
  )
  await shot('buildings-desktop')

  await page.locator('#how').scrollIntoViewIfNeeded()
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.illustrated-loop [data-reveal]')].every((el) =>
      el.classList.contains('in'),
    ),
  )
  assert.equal(await page.locator('.illustrated-loop li').count(), 5)
  await shot('loop-desktop')

  // Check affected page layouts, including the legacy school/privacy renderers.
  const routes = [
    '/',
    '/facilities-operations/',
    '/building-intelligence/',
    '/integrations/',
    '/work-orders/',
    '/asset-management/',
    '/measurement-and-verification/',
    '/capital-planning/',
    '/results/',
    '/solutions/data-centers/',
    '/solutions/schools/',
    '/school-work-order-software/',
    '/privacy/',
  ]
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const path of routes) {
      await go(path)
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        `${width}px ${path}: no horizontal page overflow`,
      )
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute('href'),
        `https://edviro.com${path}`,
      )
      if (width === 360 && path === '/') await shot('home-mobile')
      if (width === 1440 && path === '/building-intelligence/') {
        await page.waitForFunction(() =>
          document.querySelector('.page-hero .media')?.classList.contains('in'),
        )
        await shot('intelligence-desktop')
      }
    }
  }

  // Exercise route changes through the mobile menu, not only full page loads.
  await page.setViewportSize({ width: 390, height: 844 })
  await go('/')
  const toggle = page.getByRole('button', { name: 'Menu', exact: true })
  await toggle.click()
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true')
  await page.locator('.mobile-menu').getByRole('link', { name: 'Work orders', exact: true }).click()
  await page.waitForURL('**/work-orders/')
  assert.match(await page.locator('h1').innerText(), /Work orders that close/)
  assert.equal(await page.locator('.mobile-menu').count(), 0)
  assert.equal(
    await page.locator('.page-hero .ill-rows').count(),
    1,
    'Work-order artwork after client navigation',
  )
  await shot('work-orders-mobile')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await go('/building-intelligence/')
  assert.equal(
    await page.locator('.page-hero .ill-card').evaluate((el) => getComputedStyle(el).opacity),
    '1',
  )
  assert.equal(
    await page.locator('.page-hero .ill-card').evaluate((el) => getComputedStyle(el).animationName),
    'none',
  )
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.waitForFunction(() =>
    document.querySelector('.page-hero .media')?.classList.contains('anim'),
  )

  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  })
  const staticPage = await noJs.newPage()
  await staticPage.goto(base)
  assert.match(await staticPage.locator('h1').innerText(), /Infrastructure/)
  assert.equal(
    await staticPage.locator('[data-reveal].anim').count(),
    0,
    'SSR content is not hidden without JS',
  )
  await noJs.close()

  assert.deepEqual(errors, [], 'No application errors or hydration failures')
  assert.deepEqual([...missing], [], 'All local assets and routes load')
  console.log(
    'Design checks passed: 39 responsive page views, carousel, day/night hover, FAQ, mobile navigation, motion preferences, SSR visibility, assets, and runtime errors.',
  )
} finally {
  await browser.close()
}
