<script setup lang="ts">
/**
 * Product-UI illustration: measured consumption against the design model,
 * period by period, with the variance that triggered review. Grouped bars,
 * one pair per period; periods over the model are tinted. Illustrative.
 */
type Period = { label: string; model: number; measured: number }

withDefaults(
  defineProps<{
    title?: string
    flag?: string
    periods?: Period[]
    /** Variance (fraction) above which a measured bar is tinted as over-model. */
    threshold?: number
    note?: string
    summary?: string
  }>(),
  {
    title: 'Tower A · Model vs measured',
    flag: '+8% · flagged to GC',
    periods: () => [
      { label: 'Wk 1', model: 52, measured: 53 },
      { label: 'Wk 2', model: 55, measured: 56 },
      { label: 'Wk 3', model: 57, measured: 62 },
      { label: 'Wk 4', model: 58, measured: 63 },
      { label: 'Wk 5', model: 58, measured: 59 },
      { label: 'Wk 6', model: 57, measured: 56 },
    ],
    threshold: 0.05,
    note: 'Weeks 3–4 ran 8–9% over the design model; after the commissioning fix, measured returned to model.',
    summary:
      'Grouped bar chart of weekly energy for Tower A: design model beside measured for six weeks. Weeks 3 and 4 measured 8 to 9 percent above the model and were flagged to the general contractor; weeks 5 and 6 returned to model after the commissioning fix.',
  },
)

const MAX = 70
</script>

<template>
  <figure class="ui-card ui-var" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-var-title">{{ title }}</span>
      <span class="ui-pill is-warn">{{ flag }}</span>
    </div>
    <div class="ui-var-chart" aria-hidden="true">
      <div v-for="p in periods" :key="p.label" class="ui-var-group">
        <span class="ui-var-bars">
          <span class="ui-var-bar is-model" :style="{ height: `${Math.round((p.model / MAX) * 100)}%` }" />
          <span
            class="ui-var-bar is-measured"
            :class="{ 'is-over': (p.measured - p.model) / p.model > threshold }"
            :style="{ height: `${Math.round((p.measured / MAX) * 100)}%` }"
          />
        </span>
        <span class="ui-var-label">{{ p.label }}</span>
      </div>
    </div>
    <div class="ui-var-legend" aria-hidden="true">
      <span><i class="is-model" /> Design model</span>
      <span><i class="is-measured" /> Measured</span>
      <span><i class="is-over" /> Over model</span>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-var { gap: 8px; }
.ui-var-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-var-chart {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 8px;
  height: 116px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 16px;
  position: relative;
}
.ui-var-group {
  position: relative;
  display: grid;
  grid-template-rows: 1fr;
  min-width: 0;
}
.ui-var-bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  height: 100%;
}
.ui-var-bar {
  display: block;
  width: 38%;
  max-width: 14px;
  border-radius: 3px 3px 0 0;
}
.ui-var-bar.is-model { background: var(--line-strong); }
.ui-var-bar.is-measured { background: var(--accent); }
.ui-var-bar.is-measured.is-over { background: var(--warn); }
.ui-var-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -16px;
  text-align: center;
  font-size: 10.5px;
  color: var(--muted);
  white-space: nowrap;
}
.ui-var-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  font-size: 11px;
  color: var(--ink-2);
}
.ui-var-legend span { display: inline-flex; align-items: center; gap: 6px; }
.ui-var-legend i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--line-strong);
}
.ui-var-legend i.is-measured { background: var(--accent); }
.ui-var-legend i.is-over { background: var(--warn); }
</style>
