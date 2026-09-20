<script setup lang="ts">
/**
 * Product-UI illustration: ranked capital priorities, each traced back to the
 * maintenance record that justifies it (repeat failures, rising repair cost,
 * verified savings). Decisions read Repair / Replace / Project; no dollar
 * figures, because the point is the evidence trail. Illustrative values only.
 */
export type CapitalRow = {
  title: string
  evidence: string
  decision: 'Replace' | 'Repair' | 'Project'
  when?: string
}

const DECISION_TONE: Record<CapitalRow['decision'], string> = {
  Replace: 'is-warn',
  Repair: 'is-info',
  Project: 'is-ok',
}

withDefaults(
  defineProps<{
    title?: string
    flag?: string
    rows?: CapitalRow[]
    note?: string
    summary?: string
  }>(),
  {
    title: 'Capital plan · Ranked priorities',
    flag: 'From the asset record',
    rows: () => [
      { title: 'Boiler-2 · Building B', evidence: '3 failures in 12 months · repair cost rising 3 years', decision: 'Replace', when: 'FY27' },
      { title: 'RTU-3 to RTU-6 · Building A', evidence: '2011 units · igniter faults on three of four', decision: 'Replace', when: 'FY28' },
      { title: 'Chiller-1 compressor · Building C', evidence: 'Single fault · 6 years of remaining life', decision: 'Repair', when: 'This quarter' },
      { title: 'Gym lighting controls', evidence: 'After-hours runtime verified · payback from measured use', decision: 'Project', when: 'FY27' },
    ],
    note: 'Each line traces back to inspections, work orders, and measured performance, not a wish list.',
    summary:
      'Ranked capital priorities with the evidence behind each: replace Boiler-2 in FY27 after three failures in twelve months and three years of rising repair cost; replace RTU-3 through RTU-6 in FY28 for 2011 units with igniter faults; repair the Chiller-1 compressor this quarter; a gym lighting-controls project in FY27 justified by verified after-hours runtime.',
  },
)
</script>

<template>
  <figure class="ui-card ui-cap" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-cap-title">{{ title }}</span>
      <span class="ui-pill">{{ flag }}</span>
    </div>
    <ol class="ui-cap-rows" aria-hidden="true">
      <li v-for="(row, i) in rows" :key="row.title" class="ui-cap-row">
        <span class="ui-cap-rank">{{ i + 1 }}</span>
        <span class="ui-cap-main">
          <span class="ui-cap-name">{{ row.title }}</span>
          <span class="ui-cap-evidence">{{ row.evidence }}</span>
        </span>
        <span class="ui-cap-side">
          <span class="ui-pill is-sm" :class="DECISION_TONE[row.decision]">{{ row.decision }}</span>
          <span v-if="row.when" class="ui-cap-when">{{ row.when }}</span>
        </span>
      </li>
    </ol>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-cap { gap: 8px; }
.ui-cap-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-cap-rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.ui-cap-row {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 8px;
  background: var(--surface);
}
.ui-cap-rank {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  background: var(--ink);
  color: var(--on-dark);
}
.ui-cap-main {
  display: grid;
  gap: 1px;
  min-width: 0;
}
.ui-cap-name {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-cap-evidence {
  font-size: 11.5px;
  color: var(--ink-2);
  line-height: 1.35;
}
.ui-cap-side {
  display: grid;
  justify-items: end;
  gap: 3px;
}
.ui-cap-when {
  font-size: 10.5px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
