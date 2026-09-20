<script setup lang="ts">
/**
 * Product-UI illustration: the savings report a board or owner actually
 * reads — measures, verified savings against the learned baseline, the
 * method, and whether the savings held. Illustrative values only.
 */
export type ReportRow = { label: string; value: string; tone?: 'ok' | 'verified' | 'info' | 'warn' }

withDefaults(
  defineProps<{
    title?: string
    flag?: string
    rows?: ReportRow[]
    note?: string
    summary?: string
  }>(),
  {
    title: 'Savings report · FY26 Q3 · 3 sites',
    flag: 'Board-ready',
    rows: () => [
      { label: 'Measures', value: 'RTU-3 schedule fix · Boiler-2 aquastat · Gym lighting controls' },
      { label: 'Verified savings', value: '−14% kWh · −9% therms vs baseline', tone: 'verified' },
      { label: 'Method', value: 'Learned baseline · weather- and schedule-adjusted' },
      { label: 'Persistence', value: 'Held through 90 days · 1 measure reopened', tone: 'ok' },
      { label: 'Reviewed by', value: 'Facilities director · Business office' },
    ],
    note: 'Every line traces to metered data against a documented baseline.',
    summary:
      'Savings report for three sites in FY26 Q3: three measures, verified savings of 14% electricity and 9% gas against the learned baseline, a weather- and schedule-adjusted method, savings held through 90 days with one measure reopened, reviewed by the facilities director and business office.',
  },
)
</script>

<template>
  <figure class="ui-card ui-rep" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-rep-title">{{ title }}</span>
      <span class="ui-pill is-ok">{{ flag }}</span>
    </div>
    <dl class="ui-rep-rows" aria-hidden="true">
      <div v-for="r in rows" :key="r.label" class="ui-rep-row">
        <dt>{{ r.label }}</dt>
        <dd :class="r.tone ? `is-${r.tone}` : ''">
          <span v-if="r.tone" class="ui-rep-dot"></span>{{ r.value }}
        </dd>
      </div>
    </dl>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-rep { gap: 10px; }
.ui-rep-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-rep-rows {
  margin: 0;
  display: grid;
  gap: 6px;
}
.ui-rep-row {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 10px;
  align-items: baseline;
  padding: 8px 10px;
  background: var(--surface);
  border-radius: 8px;
  font-size: 12px;
}
.ui-rep-row dt {
  font-weight: 600;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.ui-rep-row dd {
  margin: 0;
  color: var(--ink);
  line-height: 1.4;
  display: flex;
  align-items: baseline;
  gap: 7px;
  text-wrap: pretty;
}
.ui-rep-row dd.is-verified { font-weight: 600; }
.ui-rep-dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  transform: translateY(0.5px);
}
.is-warn .ui-rep-dot { background: var(--warn); }
.is-info .ui-rep-dot { background: var(--status-info-ink); }
@media (max-width: 420px) {
  .ui-rep-row { grid-template-columns: minmax(0, 1fr); gap: 2px; }
}
</style>
