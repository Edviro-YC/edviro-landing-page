<script setup lang="ts">
/**
 * Product-UI illustration: an independent energy baseline as M&V practice
 * draws it — daily consumption plotted against outdoor temperature, with the
 * fitted model and its uncertainty band. Illustrative values only.
 */
withDefaults(
  defineProps<{
    title?: string
    flag?: string
    note?: string
    summary?: string
  }>(),
  {
    title: 'Tower A · Baseline fit',
    flag: 'Locked · fit-out',
    note: 'Fit to 62 days of metered data before occupancy; every later claim is measured against it.',
    summary:
      'Scatter chart of daily kWh against outdoor temperature for Tower A, with a fitted baseline curve and its uncertainty band. The baseline is locked during fit-out from 62 days of metered data.',
  },
)

/**
 * Fixed scatter around the fitted curve so SSR and client render identically.
 * The curve is the usual U: heating load on cold days, cooling load on hot
 * days, a flat base in between (SVG y grows downward, so low y = more kWh).
 */
const POINTS: [number, number][] = [
  [10, 32], [20, 39], [30, 41], [39, 47], [48, 49], [59, 54], [69, 56], [79, 60],
  [90, 61], [100, 64], [112, 65], [122, 67], [135, 68], [148, 67], [159, 69], [170, 66],
  [182, 67], [195, 63], [208, 62], [220, 60], [232, 55], [245, 52], [258, 46], [270, 43], [285, 34],
  [25, 36], [55, 57], [88, 58], [119, 69], [155, 65], [188, 68], [215, 57], [250, 54], [278, 36],
]
const FIT = 'M0 28 C60 62 110 70 150 68 S240 60 300 22'
</script>

<template>
  <figure class="ui-card ui-fit" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-fit-title">{{ title }}</span>
      <span class="ui-pill is-ok">{{ flag }}</span>
    </div>
    <svg class="ui-fit-svg" viewBox="0 0 300 90" aria-hidden="true">
      <!-- uncertainty band: the fit drawn wide and faint -->
      <path :d="FIT" fill="none" stroke="var(--accent)" stroke-opacity="0.12" stroke-width="16" stroke-linecap="round" />
      <!-- fitted baseline -->
      <path :d="FIT" fill="none" stroke="var(--accent)" stroke-width="1.8" />
      <!-- measured days -->
      <circle v-for="([x, y], i) in POINTS" :key="i" :cx="x" :cy="y" r="2.2" fill="var(--ink)" fill-opacity="0.7" />
      <line x1="0" y1="86" x2="300" y2="86" stroke="var(--line)" stroke-width="1" />
    </svg>
    <div class="ui-fit-axis" aria-hidden="true">
      <span>Cold days</span><span>Outdoor temperature →</span><span>Hot days</span>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-fit { gap: 8px; }
.ui-fit-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-fit-svg {
  width: 100%;
  height: auto;
  aspect-ratio: 300 / 90;
  max-height: 120px;
  display: block;
}
.ui-fit-axis {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--muted);
}
</style>
