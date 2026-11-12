import assert from 'node:assert/strict'
import { chromium, webkit } from 'playwright'

const base = process.env.DESIGN_BASE_URL ?? 'http://127.0.0.1:4178'
for (const [name, engine] of Object.entries({ chromium, webkit })) {
  const browser = await engine.launch()
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } })
      for (const path of [
        '/',
        '/facilities-operations/',
        '/building-intelligence/',
        '/integrations/',
      ]) {
        const label = `${name} ${width}px ${path}`
        await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' })
        await page.evaluate(() => document.fonts.ready)
        await page.evaluate(() =>
          window.scrollTo({
            top: document.documentElement.scrollHeight - innerHeight - 200,
            behavior: 'instant',
          }),
        )
        await page.waitForTimeout(80)
        await page.mouse.wheel(0, 400)
        await page.waitForFunction(
          () => Math.abs(scrollY - (document.documentElement.scrollHeight - innerHeight)) < 1,
        )
        assert.equal(
          await page.locator('header.nav').evaluate((el) => el.classList.contains('hide')),
          true,
          `${label}: header hides on downward scroll`,
        )
        // Reproduce Safari's out-of-range scrollY values and their rebound.
        const states = await page.evaluate(() => {
          const bottom = document.documentElement.scrollHeight - innerHeight
          const original = Object.getOwnPropertyDescriptor(window, 'scrollY')
          const states = []
          for (const offset of [90, 50, 20, 0, -0.5, 0]) {
            Object.defineProperty(window, 'scrollY', { configurable: true, value: bottom + offset })
            window.dispatchEvent(new Event('scroll'))
            states.push(document.querySelector('header.nav').classList.contains('hide'))
          }
          if (original) Object.defineProperty(window, 'scrollY', original)
          else delete window.scrollY
          return states
        })
        assert.deepEqual(
          states,
          Array(6).fill(true),
          `${label}: footer rebound never toggles the header`,
        )
        const positions = await page.evaluate(async () => {
          const samples = []
          for (let i = 0; i < 30; i++) {
            await new Promise((resolve) => requestAnimationFrame(resolve))
            samples.push([
              scrollY,
              document.documentElement.scrollHeight,
              document.querySelector('.ft-bar').getBoundingClientRect().top,
            ])
          }
          return samples
        })
        for (let i = 0; i < 3; i++) {
          assert.ok(
            Math.max(...positions.map((row) => row[i])) -
              Math.min(...positions.map((row) => row[i])) <=
              1,
            `${label}: bottom viewport and footer stay still`,
          )
        }
        await page.mouse.wheel(0, -120)
        await page.waitForFunction(
          () => !document.querySelector('header.nav').classList.contains('hide'),
        )
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
        await page.waitForFunction(() => scrollY === 0)
        assert.equal(
          await page.locator('header.nav').evaluate((el) => el.classList.contains('hide')),
          false,
          `${label}: header returns on intentional upward scroll`,
        )
      }
      await page.close()
    }
    console.log(
      `${name}: desktop/mobile footer stability, Safari rebound, and upward navigation passed on all four source layouts.`,
    )
  } finally {
    await browser.close()
  }
}
