<script setup lang="ts">
/**
 * Product-UI illustration: one capital question — replace or keep repairing —
 * answered by simulating both options against the building's own model.
 * Bars are ten-year cost relative to the worse option; the winner carries a
 * payback figure. Illustrative values only, no customer data.
 */
export type Scenario = {
  label: string
  detail: string
  /** Bar length as a fraction of the longest bar (0–1). */
  ratio: number
  cost: string
  winner?: boolean
}

withDefaults(
  defineProps<{
    title?: string
    flag?: string
    question?: string
    scenarios?: Scenario[]
    result?: string
    note?: string
    summary?: string
  }>(),
  {
    title: 'Simulation · Boiler-2',
    flag: 'Modeled on your data',
    question: 'Replace now, or keep repairing?',
    scenarios: () => [
      { label: 'Keep repairing', detail: 'Repair cost rising 3 years · efficiency 78%', ratio: 1, cost: '$412k' },
      { label: 'Replace FY27', detail: 'Condensing boiler · efficiency 94% · rebate applied', ratio: 0.71, cost: '$293k', winner: true },
    ],
    result: 'Replace wins · payback 6.2 years · verified after install',
    note: '10-year cost, projected from metered use and your tariff, not industry averages.',
    summary:
      'Simulation comparing two options for Boiler-2 over ten years: keep repairing at a projected $412k, or replace in FY27 with a condensing boiler at $293k. Replace wins with a 6.2-year payback, to be verified after installation.',
  },
)
</script>

<template>
  <figure class="ui-card ui-scn" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-scn-title">{{ title }}</span>
      <span class="ui-pill is-info">{{ flag }}</span>
    </div>
    <p class="ui-scn-q" aria-hidden="true">{{ question }}</p>
    <ul class="ui-scn-list" aria-hidden="true">
      <li v-for="s in scenarios" :key="s.label" class="ui-scn-row" :class="{ 'is-winner': s.winner }">
        <div class="ui-scn-meta">
          <span class="ui-scn-label">{{ s.label }}</span>
          <span class="ui-scn-detail">{{ s.detail }}</span>
        </div>
        <div class="ui-scn-bar-wrap">
          <span class="ui-scn-bar" :style="{ width: `${s.ratio * 100}%` }"></span>
          <span class="ui-scn-cost">{{ s.cost }}</span>
        </div>
      </li>
    </ul>
    <div class="ui-scn-result" aria-hidden="true">
      <span class="ui-pill is-verified">Recommendation</span>
      <span>{{ result }}</span>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-scn { gap: 10px; }
.ui-scn-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-scn-q {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.ui-scn-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.ui-scn-row {
  display: grid;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface);
}
.ui-scn-row.is-winner {
  background: var(--card);
  border: 1px solid var(--accent);
}
.ui-scn-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
  min-width: 0;
}
.ui-scn-label {
  font-size: 12.5px;
  font-weight: 600;
}
.ui-scn-detail {
  font-size: 11px;
  color: var(--muted-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-scn-bar-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
}
.ui-scn-bar {
  display: block;
  height: 10px;
  border-radius: 5px;
  background: var(--line-strong);
  transition: width 400ms ease;
}
.is-winner .ui-scn-bar { background: var(--accent); }
.ui-scn-cost {
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.ui-scn-result {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--ink);
}
</style>
