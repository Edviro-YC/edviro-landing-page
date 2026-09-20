<script setup lang="ts">
/**
 * Product-UI illustration: the telemetry feeds a site already exports, as
 * Edviro reads them for a thermal-model pilot. Each row is one feed with its
 * latest value and a fill bar against a plausible range. Illustrative values.
 */
type Feed = { name: string; value: string; fill: number }

withDefaults(
  defineProps<{
    title?: string
    flag?: string
    feeds?: Feed[]
    note?: string
    summary?: string
  }>(),
  {
    title: 'Pod 3 · Telemetry',
    flag: '5 feeds · existing exports',
    feeds: () => [
      { name: 'Rack power (PDU)', value: '760 kW', fill: 0.64 },
      { name: 'CRAH supply temp', value: '18.4 °C', fill: 0.38 },
      { name: 'Return temp', value: '29.8 °C', fill: 0.7 },
      { name: 'Inlet sensors (48)', value: '21.1 – 26.3 °C', fill: 0.56 },
      { name: 'Chilled water ΔT', value: '6.2 K', fill: 0.48 },
    ],
    note: 'Nothing new installed: power, cooling, and environmental feeds the site already records.',
    summary:
      'Telemetry list for Pod 3 with five existing feeds: rack power 760 kW, CRAH supply temperature 18.4 °C, return temperature 29.8 °C, 48 inlet sensors reading 21.1 to 26.3 °C, chilled-water delta-T 6.2 K.',
  },
)
</script>

<template>
  <figure class="ui-card ui-tele" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-tele-title">{{ title }}</span>
      <span class="ui-pill">{{ flag }}</span>
    </div>
    <ul class="ui-tele-rows" aria-hidden="true">
      <li v-for="feed in feeds" :key="feed.name" class="ui-tele-row">
        <span class="ui-tele-name">{{ feed.name }}</span>
        <span class="ui-tele-value">{{ feed.value }}</span>
        <span class="ui-tele-track"><span class="ui-tele-fill" :style="{ width: `${Math.round(feed.fill * 100)}%` }" /></span>
      </li>
    </ul>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-tele { gap: 8px; }
.ui-tele-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-tele-rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 7px;
}
.ui-tele-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 3px 10px;
  font-size: 12px;
}
.ui-tele-name { color: var(--ink-2); }
.ui-tele-value {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.ui-tele-track {
  grid-column: 1 / -1;
  display: block;
  height: 4px;
  border-radius: 3px;
  background: var(--surface);
  overflow: hidden;
}
.ui-tele-fill {
  display: block;
  height: 100%;
  border-radius: 3px;
  background: var(--accent);
}
</style>
