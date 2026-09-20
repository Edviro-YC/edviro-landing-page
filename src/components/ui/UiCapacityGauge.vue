<script setup lang="ts">
/**
 * Product-UI illustration: cooling headroom for one pod as a horizontal
 * gauge — today's load, the modeled headroom to the design inlet limit, and
 * one simulated density scenario placed against it. Illustrative values.
 */
withDefaults(
  defineProps<{
    title?: string
    flag?: string
    usedLabel?: string
    /** Share of design capacity in use today (0–1). */
    used?: number
    headroomLabel?: string
    /** Where the simulated scenario lands on the same scale (0–1). */
    scenarioAt?: number
    scenarioLabel?: string
    limitLabel?: string
    note?: string
    summary?: string
  }>(),
  {
    title: 'Pod 3 · Cooling headroom',
    flag: 'N+1 · design inlet 27 °C',
    usedLabel: 'Today · 760 kW',
    used: 0.64,
    headroomLabel: 'Headroom · 240 kW',
    scenarioAt: 0.86,
    scenarioLabel: 'Scenario · +12 racks at 17 kW',
    limitLabel: 'Design inlet limit',
    note: 'Headroom is recomputed as load and layout change; the scenario is simulated, not applied.',
    summary:
      'Capacity gauge for Pod 3: today’s load of 760 kW uses 64 percent of design cooling capacity, leaving a modeled headroom of 240 kW. A simulated scenario adding twelve racks at 17 kW lands at 86 percent, inside the design inlet limit. Illustrative values.',
  },
)
</script>

<template>
  <figure class="ui-card ui-gauge" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-gauge-title">{{ title }}</span>
      <span class="ui-pill is-info">{{ flag }}</span>
    </div>
    <div class="ui-gauge-body" aria-hidden="true">
      <div class="ui-gauge-track">
        <span class="ui-gauge-used" :style="{ width: `${Math.round(used * 100)}%` }" />
        <span class="ui-gauge-scenario" :style="{ left: `${Math.round(scenarioAt * 100)}%` }" />
        <span class="ui-gauge-limit" />
      </div>
      <div class="ui-gauge-labels">
        <span class="ui-gauge-l is-used">{{ usedLabel }}</span>
        <span class="ui-gauge-l is-head">{{ headroomLabel }}</span>
      </div>
      <ul class="ui-gauge-legend">
        <li><i class="is-scenario" /> {{ scenarioLabel }}</li>
        <li><i class="is-limit" /> {{ limitLabel }}</li>
      </ul>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-gauge { gap: 8px; }
.ui-gauge-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-gauge-body { display: grid; gap: 8px; }
.ui-gauge-track {
  position: relative;
  margin-top: 10px;
  height: 22px;
  border-radius: 8px;
  background: var(--status-ok-bg);
  overflow: visible;
}
.ui-gauge-used {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 8px 0 0 8px;
  background: var(--accent);
}
.ui-gauge-scenario {
  position: absolute;
  top: -4px;
  bottom: -4px;
  width: 2px;
  margin-left: -1px;
  background: var(--status-info-ink);
}
.ui-gauge-scenario::after {
  content: '';
  position: absolute;
  top: -5px;
  left: -4px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid var(--status-info-ink);
}
.ui-gauge-limit {
  position: absolute;
  top: -2px;
  bottom: -2px;
  right: 0;
  width: 2px;
  background: var(--status-warn-ink);
  border-radius: 1px;
}
.ui-gauge-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.ui-gauge-l.is-used { color: var(--accent); }
.ui-gauge-l.is-head { color: var(--muted-2); }
.ui-gauge-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
  font-size: 11px;
  color: var(--ink-2);
}
.ui-gauge-legend li { display: flex; align-items: center; gap: 7px; }
.ui-gauge-legend i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--accent);
}
.ui-gauge-legend i.is-scenario { background: var(--status-info-ink); width: 3px; border-radius: 1px; margin: 0 3.5px; }
.ui-gauge-legend i.is-limit { background: var(--status-warn-ink); width: 3px; border-radius: 1px; margin: 0 3.5px; }
</style>
