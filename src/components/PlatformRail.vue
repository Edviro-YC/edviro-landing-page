<script setup lang="ts">
import type { Component } from 'vue'
import { RouterLink } from 'vue-router'
import { CAPITAL_PLANNING_PATH, MV_PATH, PLATFORM_ASSETS_PATH, PLATFORM_WORK_ORDERS_PATH } from '@/seo/site'
import UiWorkQueue from '@/components/ui/UiWorkQueue.vue'
import UiMeterTrend from '@/components/ui/UiMeterTrend.vue'
import UiAssetRecord from '@/components/ui/UiAssetRecord.vue'
import UiBeforeAfter from '@/components/ui/UiBeforeAfter.vue'

/**
 * Capability rail: one product-UI illustration per capability, one sentence
 * each, linking to the dedicated platform route where one exists. Tile ids
 * (#work-orders, #diagnostics, #assets, #planning) are kept as legacy anchors.
 */
type Tile = {
  id: string
  title: string
  body: string
  ui: Component
  uiProps?: Record<string, unknown>
  to?: string
  linkText?: string
}

withDefaults(
  defineProps<{
    eyebrow?: string
    heading?: string
    lede?: string
  }>(),
  {
    eyebrow: 'Platform',
    heading: 'One place for every site, asset, and fix.',
    lede: 'Use Edviro as your CMMS, or connect the one you already have.',
  },
)

const tiles: Tile[] = [
  {
    id: 'work-orders',
    title: 'Work orders',
    body: 'AI-native work orders streamline dispatch and management across large teams.',
    ui: UiWorkQueue,
    to: PLATFORM_WORK_ORDERS_PATH,
    linkText: 'Work orders',
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics',
    body: 'Edviro learns each site\u2019s baseline and flags anomalies, with the likely cause.',
    ui: UiMeterTrend,
    // The tile column is narrow; the axis already says "7 days".
    uiProps: { title: 'Main meter', flag: 'After-hours +38%' },
  },
  {
    id: 'assets',
    title: 'Assets and inspections',
    body: 'Easy asset tagging with our mobile app. Scan nameplates and maintain a detailed report on service history, documents, and inspection schedules.',
    ui: UiAssetRecord,
    to: PLATFORM_ASSETS_PATH,
    linkText: 'Asset management',
  },
  {
    id: 'planning',
    title: 'Verification and planning',
    body: 'Verified results and repeat failures help repair-or-replace decisions and capital plans.',
    ui: UiBeforeAfter,
    to: CAPITAL_PLANNING_PATH,
    linkText: 'Capital planning',
  },
]
</script>

<template>
  <section id="solutions" class="section">
    <div class="shell">
      <div class="rail-head">
        <div>
          <p class="eyebrow">{{ eyebrow }}</p>
          <h2 class="h2">{{ heading }}</h2>
        </div>
        <p class="lede">{{ lede }}</p>
      </div>

      <div class="rail">
        <article v-for="tile in tiles" :id="tile.id" :key="tile.id" class="tile">
          <!-- #mv is a legacy deep link into the old planning section. -->
          <span v-if="tile.id === 'planning'" id="mv" aria-hidden="true" class="anchor-alias"></span>
          <div class="tile-ui">
            <component :is="tile.ui" v-bind="tile.uiProps ?? {}" />
          </div>
          <div class="tile-copy">
            <h3 class="tile-title">{{ tile.title }}</h3>
            <p class="tile-body">{{ tile.body }}</p>
            <RouterLink v-if="tile.to" :to="tile.to" class="text-link tile-link">{{ tile.linkText }} →</RouterLink>
          </div>
        </article>
      </div>

      <p class="rail-foot">
        <RouterLink :to="MV_PATH" class="text-link">How verification works →</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.rail-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px 48px;
  align-items: end;
  margin-bottom: 36px;
}
.rail-head .lede { margin: 0; }
.rail {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
.tile {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 22px;
  align-items: center;
  padding: 20px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 20px;
  min-width: 0;
}
.anchor-alias {
  position: absolute;
  top: 0;
  left: 0;
}
.tile-ui {
  min-width: 0;
}
.tile-copy {
  display: grid;
  gap: 8px;
  align-content: center;
  min-width: 0;
}
.tile-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.015em;
  text-wrap: balance;
}
.tile-body {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--ink-2);
  text-wrap: pretty;
}
.tile-link {
  font-size: 14.5px;
  justify-self: start;
}
.rail-foot {
  margin: 18px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-size: 13px;
  color: var(--muted-2);
}
.rail-foot .text-link { font-size: 13px; }
@media (max-width: 1024px) {
  .rail { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 768px) {
  .rail-head { grid-template-columns: minmax(0, 1fr); margin-bottom: 26px; }
}
@media (max-width: 560px) {
  .tile { grid-template-columns: minmax(0, 1fr); gap: 16px; padding: 16px; }
}
</style>
