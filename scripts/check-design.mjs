import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const record = process.argv.includes('--record-reference')
const base = process.env.DESIGN_BASE_URL ?? 'http://127.0.0.1:4178'
const reference = process.env.DESIGN_REFERENCE_URL ?? 'http://127.0.0.1:4189'
const fixture = new URL('./fixtures/awesomic-styles.json', import.meta.url)
const output = process.env.DESIGN_SCREENSHOTS
if (output) await mkdir(output, { recursive: true })
const layouts = [
  {
    path: '/',
    source: '/index.html',
    selectors: {
      '.hero h1': ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'],
      '#p-find .media': ['width', 'height', 'borderRadius'],
      '.panel ul': ['width', 'padding', 'borderRadius', 'borderWidth'],
      '.ill-card': ['left', 'top', 'padding', 'borderRadius', 'fontFamily'],
      '.ill-alert': [
        'width',
        'padding',
        'borderRadius',
        'animationName',
        'animationDuration',
        'animationDelay',
      ],
      '.pb-stage.nodes': ['width', 'height', 'borderRadius'],
      '.wires .w': ['animationName', 'animationDuration', 'strokeDasharray'],
      '.loop .sm': ['width', 'height', 'borderRadius'],
      '.loop .sm .pop': ['animationName', 'animationDuration', 'animationDelay'],
      '.loop .sm svg': ['animationName', 'animationDuration', 'animationDelay'],
      '.dv-card': ['padding', 'borderRadius'],
      '.dv .st.on .ac': ['animationName', 'animationDuration'],
      '.rview': ['width', 'borderRadius'],
      '.sec-card': ['width', 'padding', 'borderRadius'],
    },
  },
  {
    path: '/facilities-operations/',
    source: '/how-edviro-works.html',
    selectors: {
      '.hero h1': ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight'],
      '.wku-r': ['width', 'padding', 'borderRadius'],
      '.wku-card': ['padding', 'borderRadius'],
      '.hl-art': ['width', 'aspectRatio'],
      '.hl .tr': ['padding', 'borderRadius'],
      '.hl .hn-pl .pl1': ['animationName', 'animationDuration', 'animationDelay'],
    },
  },
  {
    path: '/building-intelligence/',
    source: '/intelligence.html',
    selectors: {
      '.hero h1': ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight'],
      '#product .app': ['width', 'gridTemplateColumns', 'borderRadius'],
      '.app-c': ['padding', 'borderRadius'],
      '.ib-mk .wku-r': ['width', 'padding', 'borderRadius'],
    },
  },
  {
    path: '/integrations/',
    source: '/integrations.html',
    selectors: {
      '.hero h1': ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight'],
      '.lg-track': [
        'display',
        'gap',
        'animationName',
        'animationDuration',
        'animationIterationCount',
      ],
      '.lg-track img': ['height', 'maxWidth', 'objectFit'],
      '#controls .chips': ['display', 'gridTemplateColumns', 'gap'],
      '#controls .chips li': ['padding', 'borderRadius', 'minHeight', 'fontSize'],
    },
  },
]
const browser = await chromium.launch({ headless: true })
const errors = [],
  missing = new Set()
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
await context.route('**/*', (route) =>
  [new URL(base).origin, new URL(reference).origin].includes(new URL(route.request().url()).origin)
    ? route.continue()
    : route.abort(),
)
context.on('page', (page) => {
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.url().startsWith(base) && response.status() >= 400) missing.add(response.url())
  })
})
const page = await context.newPage()
const goto = async (path) => {
  await page.goto(new URL(path, record ? reference : base).href, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
}
const prepareStyles = async () =>
  page.evaluate(() => {
    document
      .querySelectorAll('.media,.pb-after,.logo-wall')
      .forEach((el) => el.classList.add('anim', 'in'))
    document.querySelector('.loop')?.classList.add('in')
    const hl = document.querySelector('.hl')
    if (hl) {
      hl.dataset.s = '1'
      hl.classList.add('auto')
    }
    document.querySelector('.dv .st')?.classList.add('on')
  })
const styles = async (selectors) =>
  page.evaluate(
    (selectors) =>
      Object.fromEntries(
        Object.entries(selectors).map(([selector, properties]) => {
          const element = document.querySelector(selector)
          if (!element) throw new Error(`Missing source element ${selector}`)
          const style = getComputedStyle(element)
          return [
            selector,
            Object.fromEntries(
              properties.map((property) => [
                property,
                style[property].replace(/-[a-f0-9]{8}\b/g, ''),
              ]),
            ),
          ]
        }),
      ),
    selectors,
  )
const mismatches = []
const sameStyle = (actual, expected, label) => {
  if (actual === expected) return
  if (/px/.test(actual) && /px/.test(expected)) {
    const a = actual.match(/-?\d*\.?\d+/g)?.map(Number) ?? [],
      b = expected.match(/-?\d*\.?\d+/g)?.map(Number) ?? []
    if (a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < 0.5)) return
  }
  mismatches.push({ label, actual, expected })
}
const shot = async (name) => {
  if (output) {
    await page.evaluate(async () => {
      await Promise.all(
        document
          .getAnimations()
          .filter((animation) => Number.isFinite(animation.effect?.getTiming().iterations))
          .map((animation) => animation.finished.catch(() => {})),
      )
    })
    await page.screenshot({ path: `${output}/${name}.png` })
  }
}
try {
  const expected = record ? {} : JSON.parse(await readFile(fixture, 'utf8'))
  let comparisons = 0
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const layout of layouts) {
      await goto(record ? layout.source : layout.path)
      await prepareStyles()
      const actual = await styles(layout.selectors),
        key = `${width}:${layout.path}`
      if (record) expected[key] = actual
      else
        for (const [selector, properties] of Object.entries(expected[key]))
          for (const [property, value] of Object.entries(properties)) {
            sameStyle(actual[selector][property], value, `${key} ${selector} ${property}`)
            comparisons++
          }
    }
  }
  if (!record) assert.deepEqual(mismatches, [], 'Source style and animation fidelity')
  if (record) {
    await writeFile(fixture, JSON.stringify(expected, null, 2) + '\n')
    console.log(
      'Recorded computed styles and animation timing from the original four Awesomic pages at 390px and 1440px.',
    )
  } else {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await goto('/')
    assert.equal(
      await page.locator('.hp-scene,.hp-stack,.hp-tabs').count(),
      0,
      'Rejected hero stack remains removed',
    )
    assert.match(await page.locator('h1').innerText(), /Infrastructure that runs itself/)
    assert.equal(await page.locator('.nav .btn').innerText(), 'Book a demo')
    assert.equal(
      await page.locator('.nav .btn').evaluate((el) => getComputedStyle(el).color),
      'rgb(251, 248, 242)',
      'Header CTA label remains visible',
    )
    await shot('verified-home-hero')
    const faq = page.locator('.fq').nth(1)
    await faq.getByRole('button').click()
    assert.equal(await faq.getByRole('button').getAttribute('aria-expanded'), 'true')
    await faq.getByRole('button').click()
    assert.equal(await faq.getByRole('button').getAttribute('aria-expanded'), 'false')
    await page.locator('.platform .tabs a').first().click()
    await page.waitForFunction(() =>
      document.querySelector('#p-find .media')?.classList.contains('in'),
    )
    await page.waitForFunction(
      () =>
        document.querySelector('[data-panel-anchor="p-plan"]').getBoundingClientRect().top >
        innerHeight,
    )
    const alert = page.locator('#p-find .ill-alert')
    await page.waitForFunction(
      () => Number(getComputedStyle(document.querySelector('#p-find .ill-alert')).opacity) > 0.99,
    )
    assert.match(await alert.evaluate((el) => getComputedStyle(el).animationName), /ilFloat/)
    await shot('verified-home-platform')
    await page.locator('#problem').scrollIntoViewIfNeeded()
    await page.waitForFunction(() => document.querySelector('.pb-after')?.classList.contains('in'))
    const time = await page
      .locator('.wires .w')
      .first()
      .evaluate((el) => el.getAnimations()[0]?.currentTime)
    await page.waitForFunction(
      (time) => document.querySelector('.wires .w')?.getAnimations()[0]?.currentTime > time + 100,
      time,
    )
    assert.equal(
      await page.locator('.wires path').count(),
      3,
      'All original diagram wires are drawn and animated',
    )
    await shot('verified-home-problem')
    await page.locator('#how').scrollIntoViewIfNeeded()
    await page.waitForFunction(() => document.querySelector('.loop')?.classList.contains('in'))
    assert.match(
      await page
        .locator('.loop .sm .pop')
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
      /hwFloat/,
    )
    await shot('verified-home-loop')
    await page.locator('#decisions').scrollIntoViewIfNeeded()
    await page.locator('.drows button').nth(2).click()
    await page.waitForFunction(
      () => document.querySelector('.dv [data-k="tag"]')?.textContent === 'Capital plan',
    )
    assert.equal(await page.locator('.dv .st.on').getAttribute('data-s'), '2')
    await shot('verified-home-decisions')
    await page.locator('#results').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: 'Next customer' }).click()
    assert.equal(await page.locator('.rcount b').innerText(), '2')
    assert.equal(await page.locator('.rslide').first().getAttribute('aria-hidden'), 'true')
    await page.locator('.sec-next').click()
    await page.waitForFunction(() => document.querySelector('.sec-view').scrollLeft > 20)
    await page.locator('.sec-prev').click()
    await page.waitForFunction(() => document.querySelector('.sec-view').scrollLeft < 2)
    assert.match(
      await page
        .locator('.sec-card .hot i')
        .first()
        .evaluate((el) => getComputedStyle(el, '::after').animationName),
      /hotPulse/,
      'Original building hotspot pulse remains active',
    )
    await page.locator('.sec-card').first().hover()
    await page.waitForFunction(
      () => Number(getComputedStyle(document.querySelector('.sec-card .night')).opacity) > 0.99,
    )

    await goto('/facilities-operations/')
    await page.locator('#example').scrollIntoViewIfNeeded()
    await page.locator('.wku-pp').click()
    await page.locator('.wku-l button').nth(2).click()
    assert.equal(await page.locator('.wku-l button').nth(2).getAttribute('aria-selected'), 'true')
    await page.locator('#trust').scrollIntoViewIfNeeded()
    await page.waitForFunction(() => document.querySelector('.hl')?.dataset.s === '1')
    await page.locator('.hl .tr').nth(2).focus()
    assert.equal(await page.locator('.hl').getAttribute('data-s'), '3')
    await shot('verified-how-trust')
    await goto('/integrations/')
    assert.match(
      await page.locator('.lg-track').evaluate((el) => getComputedStyle(el).animationName),
      /lgScroll/,
    )
    const before = await page
      .locator('.lg-track')
      .evaluate((el) => el.getAnimations()[0]?.currentTime)
    await page.waitForFunction(
      (before) =>
        document.querySelector('.lg-track')?.getAnimations()[0]?.currentTime > before + 100,
      before,
    )
    await shot('verified-integrations')

    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      for (const path of [
        '/',
        '/facilities-operations/',
        '/building-intelligence/',
        '/integrations/',
        '/work-orders/',
        '/asset-management/',
        '/results/',
        '/solutions/schools/',
        '/privacy/',
      ]) {
        await goto(path)
        assert.equal(await page.locator('h1').count(), 1, `${path}: one heading`)
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          true,
          `${width}px ${path}: no page overflow`,
        )
        assert.equal(
          await page.locator('link[rel="canonical"]').getAttribute('href'),
          `https://edviro.com${path}`,
        )
      }
    }
    await page.setViewportSize({ width: 390, height: 844 })
    await goto('/')
    await page.getByRole('button', { name: 'Menu', exact: true }).click()
    await page
      .locator('#aw-mobile-menu')
      .getByRole('link', { name: 'Building intelligence', exact: true })
      .click()
    await page.waitForURL('**/building-intelligence/')
    assert.match(await page.locator('h1').innerText(), /Fault detection/)
    assert.equal(await page.locator('#aw-mobile-menu').count(), 0)
    await shot('verified-intelligence-mobile')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await goto('/integrations/')
    assert.equal(
      await page.locator('.lg-track').evaluate((el) => getComputedStyle(el).animationName),
      'none',
    )
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.waitForFunction(
      () => document.querySelector('.lg-track')?.getAnimations().length > 0,
    )
    await goto('/')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.locator('#how').scrollIntoViewIfNeeded()
    assert.equal(
      await page
        .locator('.loop .sm .pop')
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
      'none',
    )
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.waitForFunction(() => document.querySelector('.loop')?.classList.contains('in'))
    assert.match(
      await page
        .locator('.loop .sm .pop')
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
      /hwFloat/,
    )
    const staticContext = await browser.newContext({ javaScriptEnabled: false })
    const staticPage = await staticContext.newPage()
    await staticPage.goto(base)
    assert.match(await staticPage.locator('h1').innerText(), /Infrastructure/)
    assert.equal(
      await staticPage
        .locator('.loop .card')
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
      '1',
    )
    await staticContext.close()
    assert.deepEqual(errors, [], 'No application/hydration errors')
    assert.deepEqual([...missing], [], 'All page assets load')
    console.log(
      `Design checks passed: ${comparisons} original-style and animation comparisons; source diagrams, charts, carousels, timeline, isometric controls, marquee, 27 responsive views, mobile routing, live motion changes, SSR, and assets.`,
    )
  }
} finally {
  await browser.close()
}
