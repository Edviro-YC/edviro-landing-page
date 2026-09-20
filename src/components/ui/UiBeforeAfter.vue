<script setup lang="ts">
/**
 * Product-UI illustration: baseline vs after-fix comparison with the verified
 * delta. Illustrative values; report-backed figures live in ReportExcerpts.
 */
withDefaults(
  defineProps<{
    title?: string
    beforeLabel?: string
    afterLabel?: string
    /** After bar length as a fraction of the baseline bar (0–1). */
    ratio?: number
    delta?: string
    note?: string
    summary?: string
  }>(),
  {
    title: 'Verification · RTU-3 fix',
    beforeLabel: 'Baseline',
    afterLabel: 'After fix',
    ratio: 0.82,
    delta: '\u221218% kWh',
    note: 'Verified over 30 days against the learned baseline',
    summary: 'Bar comparison: energy after the fix is 18% below the learned baseline, verified over 30 days.',
  },
)
</script>

<template>
  <figure class="ui-card ui-ba" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-ba-title">{{ title }}</span>
      <span class="ui-pill is-ok">{{ delta }}</span>
    </div>
    <div class="ui-ba-rows" aria-hidden="true">
      <div class="ui-ba-row">
        <span class="ui-ba-name">{{ beforeLabel }}</span>
        <span class="ui-ba-track"><span class="ui-ba-bar is-before" style="width: 100%" /></span>
      </div>
      <div class="ui-ba-row">
        <span class="ui-ba-name">{{ afterLabel }}</span>
        <span class="ui-ba-track"><span class="ui-ba-bar is-after" :style="{ width: `${Math.round(ratio * 100)}%` }" /></span>
      </div>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-ba-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-ba-rows {
  display: grid;
  gap: 8px;
}
.ui-ba-row {
  display: grid;
  grid-template-columns: 64px 1fr;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--ink-2);
}
.ui-ba-track {
  display: block;
  height: 14px;
  border-radius: 6px;
  background: var(--surface);
  overflow: hidden;
}
.ui-ba-bar {
  display: block;
  height: 100%;
  border-radius: 6px;
}
.ui-ba-bar.is-before { background: var(--line-strong); }
.ui-ba-bar.is-after { background: var(--accent); }
</style>
