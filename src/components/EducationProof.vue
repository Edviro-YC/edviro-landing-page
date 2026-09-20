<script setup lang="ts">
import { RouterLink } from 'vue-router'
import pausdLogo from '@/assets/img/pausd-logo.svg'
import lgsuhsdLogo from '@/assets/img/lgsuhsd-logo.png'
import { EDU_LIVE_SITES, EDU_VERIFIED_SAVINGS, SCHOOL_ENERGY_PATH } from '@/seo/site'

/**
 * Education proof, labeled as such, placed below the neutral product story.
 * This is the one homepage section where school vocabulary belongs.
 *
 * Every figure and logo below has an owner and a source. Re-confirm before
 * each deploy; never add operational metrics from conversational estimates.
 */
defineProps<{
  /**
   * Renders the procurement slot. Stays false until the Sourcewell (or other)
   * listing is confirmed live, the exact approved wording is in hand, and logo
   * rights are in writing. Owner: Tanuj. Nothing is published in the slot yet.
   */
  showProcurement?: boolean
}>()

// The two figures come from src/seo/site.ts, which carries their owner and
// source notes; the same constants feed the Book-a-demo, FAQ, and school
// energy FAQ answers so the numbers cannot drift.
// 24/7 is a product fact, not a customer metric: the nightly pipeline and the
// case agent cover every connected site (flask-server + edviro-caseagent).
const metrics = [
  { value: EDU_VERIFIED_SAVINGS, label: 'verified savings for education customers' },
  { value: String(EDU_LIVE_SITES), label: 'school sites live and expanding' },
  { value: '24/7', label: 'monitoring across every connected site' },
]

// District logos. Owner: Tanuj. Source: added 2026-08-25 (commit 797ea60) from
// the previous FeaturedCustomers strip; both are live customers. Confirm the
// written logo permission for each district is on file before the next deploy.
// Intrinsic ratios: PAUSD SVG 238×74.6; LGSUHSD PNG 800×482. Rendered heights keep both visually equal.
const logos = [
  { src: pausdLogo, alt: 'Palo Alto Unified School District', width: 191, height: 60 },
  { src: lgsuhsdLogo, alt: 'Los Gatos-Saratoga Union High School District', width: 139, height: 84 },
]
</script>

<template>
  <section id="results" class="section edu">
    <!-- #customers is the legacy anchor for the old logo strip. -->
    <span id="customers" aria-hidden="true" class="anchor-alias"></span>
    <div class="shell">
      <div class="edu-grid">
        <div class="edu-copy">
          <p class="eyebrow">Education proof</p>
          <h2 class="h2">Proven in school districts first.</h2>
          <p class="lede">Edviro’s deepest deployments are K‑12 districts; the results below are education results.</p>
          <div class="edu-links">
            <RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link">Energy management software for schools →</RouterLink>
          </div>
        </div>

        <div class="edu-proof">
          <dl class="edu-metrics">
            <div v-for="m in metrics" :key="m.value" class="edu-metric">
              <dt class="edu-metric-label">{{ m.label }}</dt>
              <dd class="edu-metric-value">{{ m.value }}</dd>
            </div>
          </dl>
          <ul class="edu-logos" aria-label="Featured education customers">
            <li v-for="logo in logos" :key="logo.alt">
              <img :src="logo.src" :alt="logo.alt" :width="logo.width" :height="logo.height" loading="lazy" decoding="async" class="edu-logo" />
            </li>
          </ul>
          <div v-if="showProcurement" class="edu-procurement">
            <slot name="procurement" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu { position: relative; }
.anchor-alias {
  position: absolute;
  top: 0;
  left: 0;
}
.edu-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 40px 64px;
  align-items: center;
}
.edu-copy { min-width: 0; }
.edu-links {
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 15px;
}
.edu-proof {
  display: grid;
  gap: 28px;
  min-width: 0;
}
.edu-metrics {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.edu-metric {
  display: flex;
  flex-direction: column-reverse;
  /* column-reverse packs from the bottom; flex-end pins values to the top rule so all three align. */
  justify-content: flex-end;
  gap: 10px;
  border-top: 1.5px solid var(--ink);
  padding-top: 16px;
  min-width: 0;
}
.edu-metric-value {
  margin: 0;
  font-size: clamp(34px, 3.6vw, 48px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: var(--track-display);
}
.edu-metric-label {
  font-size: 13.5px;
  line-height: 1.4;
  color: var(--muted-2);
}
.edu-logos {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px 40px;
}
.edu-logo {
  display: block;
  height: auto;
  filter: grayscale(1);
  mix-blend-mode: multiply;
  opacity: 0.88;
}
.edu-procurement {
  padding-top: 20px;
  border-top: 1px solid var(--line);
}
@media (max-width: 900px) {
  .edu-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}
@media (max-width: 520px) {
  .edu-metrics { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  /* row-reverse + flex-end packs value then label from the left; the fixed value width keeps labels in one column. */
  .edu-metric { flex-direction: row-reverse; align-items: baseline; gap: 14px; }
  .edu-metric-value { flex: none; min-width: 5ch; }
}
</style>
