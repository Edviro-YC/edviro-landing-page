<script setup lang="ts">
/**
 * Product-UI illustration: daily peak demand for one billing month. One bar
 * per day; the single highest bar sets the month's demand charge and is
 * tinted, with a dashed line at the peak the site would have held without
 * it. Illustrative values only.
 */
withDefaults(
  defineProps<{
    title?: string
    flag?: string
    /** Daily peak kW, one per bar. */
    peaks?: number[]
    /** Peak the site typically holds; drawn as the dashed line. */
    typical?: number
    note?: string
    summary?: string
  }>(),
  {
    title: 'Main meter · Daily peak kW',
    flag: 'One spike set the charge',
    peaks: () => [312, 328, 341, 335, 296, 301, 356, 372, 364, 412, 358, 349, 337, 330, 322, 344, 351, 339, 318, 309],
    typical: 375,
    note: 'Day 10: a hard start after a shutdown. Staggered starts would have held the month under 375 kW.',
    summary:
      'Bar chart of daily peak demand for one billing month. Most days peak between 300 and 370 kilowatts; one day spikes to 412 kilowatts and sets the demand charge for the whole month. A dashed line marks the 375-kilowatt peak the site otherwise holds.',
  },
)

const H = 60
</script>

<template>
  <figure class="ui-card ui-peaks" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-peaks-title">{{ title }}</span>
      <span class="ui-pill is-warn">{{ flag }}</span>
    </div>
    <div class="ui-peaks-chart" aria-hidden="true">
      <span class="ui-peaks-line" :style="{ bottom: `${(typical / Math.max(...peaks)) * 100}%` }">
        <span class="ui-peaks-linelabel">{{ typical }} kW</span>
      </span>
      <span
        v-for="(p, i) in peaks"
        :key="i"
        class="ui-peaks-bar"
        :class="{ 'is-max': p === Math.max(...peaks) }"
        :style="{ height: `${(p / Math.max(...peaks)) * H}px` }"
      >
        <span v-if="p === Math.max(...peaks)" class="ui-peaks-max">{{ p }} kW</span>
      </span>
    </div>
    <div class="ui-peaks-axis" aria-hidden="true"><span>Day 1</span><span>Day {{ peaks.length }}</span></div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-peaks-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ui-peaks-chart {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 60px;
  margin-top: 14px;
  padding-top: 0;
}
.ui-peaks-bar {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  background: var(--line-strong);
  border-radius: 2px 2px 0 0;
}
.ui-peaks-bar.is-max { background: var(--warn); }
.ui-peaks-max {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 4px);
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 600;
  color: var(--status-warn-ink);
  white-space: nowrap;
}
.ui-peaks-line {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1.5px dashed var(--muted-2);
}
.ui-peaks-linelabel {
  position: absolute;
  right: 0;
  bottom: 3px;
  font-size: 10px;
  font-weight: 600;
  color: var(--ink-2);
}
.ui-peaks-axis {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--muted);
  margin-top: -4px;
}
</style>
