<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BOOK_DEMO_PATH, SITE_TAGLINE } from '@/seo/site'
import OutcomeTriad from '@/components/OutcomeTriad.vue'

/**
 * Hero: neutral category line, one promise, two CTAs, and the outcome triad
 * (energy, money, time) beside the copy. The message → reviewed work order →
 * verified fix demo lives in MessageDemoSection, right after the loop.
 * Copy budget is 35 words; the visual carries the "why".
 */
</script>

<template>
  <section id="top" class="hero">
    <div class="shell hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">{{ SITE_TAGLINE }}</p>
        <h1 class="hero-h1">Find building problems.<br /><span style="color: var(--accent);">Get them fixed.</span></h1>
        <p class="hero-lede">Edviro autonomously finds and fixes waste. Facilities managers do not need more dashboards or alarms — they need systems that continuously improve and take action. Alarms, inefficiencies, and staff requests become reviewed work orders, dispatched technicians, and verified results across every site you run.</p>
        <div class="hero-ctas">
          <RouterLink :to="BOOK_DEMO_PATH" class="btn btn-primary">Book a demo</RouterLink>
          <a href="#how-it-works" class="btn btn-outline">See how it works</a>
        </div>
        <a
          href="https://www.ycombinator.com/companies/edviro"
          target="_blank"
          rel="noopener noreferrer"
          class="yc-badge"
        >
          <span class="yc-mark" aria-hidden="true">Y</span>
          Backed by Y Combinator
        </a>
      </div>
      <div class="hero-visual">
        <slot>
          <OutcomeTriad />
        </slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 64px 32px 56px;
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 48px;
  align-items: center;
}
.hero-copy {
  min-width: 0;
}
.hero-h1 {
  margin: 0;
  font-weight: 500;
  font-size: clamp(38px, 4.8vw, 62px);
  line-height: 1.06;
  letter-spacing: var(--track-display);
  text-wrap: balance;
}
.hero-lede {
  margin: 22px 0 0;
  max-width: 540px;
  font-size: 18px;
  line-height: 1.55;
  color: var(--ink-2);
  text-wrap: pretty;
}
.hero-note {
  margin: 12px 0 0;
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
}
.hero-ctas {
  margin-top: 28px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.yc-badge {
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  background: var(--card);
  border: 1px solid var(--line);
  padding: 6px 13px 6px 8px;
  text-decoration: none;
}
.yc-mark {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: #FB651E;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.hero-visual {
  min-width: 0;
}
@media (max-width: 980px) {
  .hero { padding: 48px 32px 40px; }
  .hero-grid { grid-template-columns: minmax(0, 1fr); gap: 36px; }
  .hero-lede { max-width: 620px; }
  /* Stacked: cap the frame's width and center it under the copy. */
  .hero-visual { width: 100%; max-width: 720px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .hero { padding-left: 20px; padding-right: 20px; }
}
</style>
