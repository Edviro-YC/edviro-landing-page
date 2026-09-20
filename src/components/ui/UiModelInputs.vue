<script setup lang="ts">
/**
 * Product-UI illustration: the data sources Edviro already reads to run a
 * building day to day, converging into the living operational model that
 * capital planning simulates against. No extra setup is the point, so the
 * inputs are the ordinary ones. Illustrative values only.
 */
withDefaults(
  defineProps<{
    inputs?: string[]
    modelTitle?: string
    modelMeta?: string
    flag?: string
    summary?: string
  }>(),
  {
    inputs: () => ['Utility bills', 'Interval meters', 'BMS points', 'Weather', 'Tariffs', 'Asset records', 'Work orders and fixes'],
    modelTitle: 'Living model · Building B',
    modelMeta: 'Calibrated nightly against metered data',
    flag: 'No extra setup',
    summary:
      'Seven data sources — utility bills, interval meters, BMS points, weather, tariffs, asset records, and work orders and fixes — flow into a living operational model of Building B that is calibrated nightly against metered data.',
  },
)
</script>

<template>
  <figure class="ui-card ui-inputs" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label">Model inputs</span>
      <span class="ui-pill is-info">{{ flag }}</span>
    </div>
    <div class="ui-inputs-body" aria-hidden="true">
      <ul class="ui-inputs-list">
        <li v-for="input in inputs" :key="input" class="ui-inputs-item">
          <span class="ui-inputs-dot"></span>
          <span>{{ input }}</span>
        </li>
      </ul>
      <svg class="ui-inputs-lines" viewBox="0 0 40 100" preserveAspectRatio="none">
        <path v-for="(input, i) in inputs" :key="input" :d="`M0 ${((i + 0.5) / inputs.length) * 100} C 20 ${((i + 0.5) / inputs.length) * 100}, 20 50, 40 50`" fill="none" stroke="var(--line-strong)" stroke-width="1.2" vector-effect="non-scaling-stroke" />
      </svg>
      <div class="ui-inputs-model">
        <span class="ui-inputs-model-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7l8-4 8 4-8 4z M4 7v10l8 4 8-4V7 M12 11v10" /></svg>
        </span>
        <span class="ui-inputs-model-title">{{ modelTitle }}</span>
        <span class="ui-inputs-model-meta">{{ modelMeta }}</span>
        <span class="ui-pill is-ok is-sm">Answers "what if"</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.ui-inputs { gap: 12px; }
.ui-inputs-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 36px minmax(0, 1.1fr);
  align-items: stretch;
  min-width: 0;
}
.ui-inputs-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  align-content: space-between;
  gap: 4px;
}
.ui-inputs-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--ink);
  padding: 4px 8px;
  background: var(--surface);
  border-radius: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-inputs-dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.ui-inputs-lines {
  width: 36px;
  height: 100%;
  display: block;
}
.ui-inputs-model {
  align-self: center;
  display: grid;
  gap: 5px;
  justify-items: start;
  padding: 14px;
  background: var(--dark);
  color: var(--on-dark);
  border-radius: 12px;
  min-width: 0;
}
.ui-inputs-model-icon {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--dark-2);
  color: var(--success-bright);
  margin-bottom: 2px;
}
.ui-inputs-model-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.ui-inputs-model-meta {
  font-size: 11px;
  line-height: 1.4;
  color: var(--on-dark-muted);
}
@media (max-width: 420px) {
  .ui-inputs-body { grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .ui-inputs-lines { display: none; }
  .ui-inputs-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
