<script setup lang="ts">
/**
 * Product-UI illustration: twelve months of one asset's history on a single
 * timeline — repeat failures, routine inspections, the runtime creep that
 * preceded the last failure — ending in the review flag the pattern raised.
 * Illustrative values only, no customer data.
 */
export type TimelineEvent = {
  /** 0–11, month offset from the left edge. */
  month: number
  label: string
  kind: 'failure' | 'inspection' | 'signal'
}

const MONTHS = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

withDefaults(
  defineProps<{
    title?: string
    flag?: string
    meta?: string
    events?: TimelineEvent[]
    outcome?: string
    summary?: string
  }>(),
  {
    title: 'RTU-7 · Jefferson ES · 12 months',
    flag: 'Repair-or-replace review',
    meta: 'Carrier 48TC · 10 ton · installed 2011 · serves Rooms 210–218',
    events: () => [
      { month: 1, label: 'Belt replaced · WO-4102', kind: 'failure' },
      { month: 2, label: 'Quarterly inspection', kind: 'inspection' },
      { month: 5, label: 'Belt replaced, pulley aligned · WO-4477', kind: 'failure' },
      { month: 5.9, label: 'Quarterly inspection', kind: 'inspection' },
      { month: 8.8, label: 'Quarterly inspection', kind: 'inspection' },
      { month: 10.4, label: 'Runtime +18%', kind: 'signal' },
      { month: 11.3, label: 'Belt replaced · WO-4821', kind: 'failure' },
    ],
    outcome: '3 failures in 12 months → added to the FY27 capital review',
    summary:
      'Twelve-month timeline for rooftop unit RTU-7 at Jefferson Elementary: belt failures in October, February, and August, three quarterly inspections, and an 18% runtime increase before the last failure. The pattern of three failures in twelve months flags the unit for repair-or-replace review and adds it to the FY27 capital review.',
  },
)

const pct = (m: number) => `${(m / 11) * 100}%`
</script>

<template>
  <figure class="ui-card ui-ftl" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-ftl-title">{{ title }}</span>
      <span class="ui-pill is-warn">{{ flag }}</span>
    </div>
    <p class="ui-ftl-meta" aria-hidden="true">{{ meta }}</p>

    <div class="ui-ftl-track" aria-hidden="true">
      <span class="ui-ftl-rail"></span>
      <span
        v-for="e in events"
        :key="e.label + e.month"
        class="ui-ftl-mark"
        :class="`is-${e.kind}`"
        :style="{ left: pct(e.month) }"
      ></span>
    </div>
    <div class="ui-ftl-axis" aria-hidden="true">
      <span v-for="m in MONTHS" :key="m">{{ m }}</span>
    </div>

    <ul class="ui-ftl-list" aria-hidden="true">
      <li v-for="e in events.filter((x) => x.kind !== 'inspection')" :key="e.label" class="ui-ftl-item" :class="`is-${e.kind}`">
        <span class="ui-ftl-dot"></span>
        <span class="ui-ftl-label">{{ e.label }}</span>
        <span class="ui-ftl-when">{{ MONTHS[Math.round(e.month)] }}</span>
      </li>
      <li class="ui-ftl-item is-inspection">
        <span class="ui-ftl-dot"></span>
        <span class="ui-ftl-label">Quarterly inspection · filter, coil, drain</span>
        <span class="ui-ftl-when">×{{ events.filter((x) => x.kind === 'inspection').length }}</span>
      </li>
    </ul>

    <div class="ui-ftl-outcome" aria-hidden="true">
      <span class="ui-pill is-review">Pattern flagged</span>
      <span>{{ outcome }}</span>
    </div>
  </figure>
</template>

<style scoped>
.ui-ftl { gap: 8px; }
.ui-ftl-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-ftl-meta {
  margin: 0;
  font-size: 11.5px;
  color: var(--ink-2);
}
.ui-ftl-track {
  position: relative;
  height: 26px;
  margin: 6px 6px 0;
}
.ui-ftl-rail {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  border-top: 1.5px solid var(--line-strong);
}
.ui-ftl-mark {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: var(--card);
  border: 1.5px solid var(--line-strong);
}
.ui-ftl-mark.is-failure {
  width: 14px;
  height: 14px;
  background: var(--warn);
  border-color: var(--warn);
}
.ui-ftl-mark.is-signal {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: var(--status-info-ink);
  border-color: var(--status-info-ink);
  transform: translate(-50%, -50%) rotate(45deg);
}
.ui-ftl-axis {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  font-size: 9.5px;
  color: var(--muted);
  text-align: center;
  margin: 0 -6px;
}
.ui-ftl-list {
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  display: grid;
  gap: 5px;
}
.ui-ftl-item {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  font-size: 12px;
}
.ui-ftl-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--line-strong);
}
.is-failure .ui-ftl-dot { background: var(--warn); }
.is-signal .ui-ftl-dot { background: var(--status-info-ink); border-radius: 2px; transform: rotate(45deg); }
.ui-ftl-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--ink);
}
.is-inspection .ui-ftl-label { color: var(--ink-2); }
.ui-ftl-when {
  font-size: 10.5px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.ui-ftl-outcome {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 8px;
  border-top: 1px solid var(--line);
  font-size: 12px;
  color: var(--ink);
}
</style>
