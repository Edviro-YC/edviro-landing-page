<script setup lang="ts">
/**
 * Product-UI illustration of how a quote is scoped: the platform's modules
 * as toggles, some on and some off, priced per connected site. No dollar
 * figures — the number is worked out on the call. Illustrative.
 */
export type QuoteModule = { name: string; detail: string; on: boolean }

withDefaults(
  defineProps<{
    title?: string
    flag?: string
    modules?: QuoteModule[]
    footLabel?: string
    footValue?: string
    note?: string
    summary?: string
  }>(),
  {
    title: 'Quote · 6 connected sites',
    flag: 'Scoped on the call',
    modules: () => [
      { name: 'Energy and diagnostics', detail: 'Meters, bills, BMS signals', on: true },
      { name: 'Work orders', detail: 'Native or connected to your CMMS', on: true },
      { name: 'Assets and inspections', detail: 'Add when you are ready', on: false },
      { name: 'Capital planning', detail: 'Add when you are ready', on: false },
    ],
    footLabel: 'Per connected site',
    footValue: 'Quoted on the call',
    note: 'No hardware, no install project, nothing bundled to unlock something else.',
    summary:
      'Quote builder for six connected sites. Four modules as toggles: energy and diagnostics on, work orders on, assets and inspections off, capital planning off. Priced per connected site; the number is quoted on the call. No hardware, no install project, nothing bundled.',
  },
)
</script>

<template>
  <figure class="ui-card ui-quote" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label">{{ title }}</span>
      <span class="ui-pill is-info">{{ flag }}</span>
    </div>
    <ul class="ui-quote-rows" aria-hidden="true">
      <li v-for="m in modules" :key="m.name" :class="{ 'is-on': m.on }">
        <span class="ui-quote-toggle"><i /></span>
        <span class="ui-quote-main">
          <span class="ui-quote-name">{{ m.name }}</span>
          <span class="ui-quote-detail">{{ m.detail }}</span>
        </span>
        <span class="ui-pill is-sm" :class="m.on ? 'is-ok' : ''">{{ m.on ? 'On' : 'Later' }}</span>
      </li>
    </ul>
    <div class="ui-quote-foot" aria-hidden="true">
      <span class="ui-label">{{ footLabel }}</span>
      <span class="ui-quote-value">{{ footValue }}</span>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-quote-rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.ui-quote-rows li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid var(--line-soft);
  border-radius: 10px;
  background: var(--surface-2);
}
.ui-quote-rows li.is-on { background: var(--card); border-color: var(--line); }
.ui-quote-toggle {
  position: relative;
  width: 30px;
  height: 18px;
  border-radius: 999px;
  background: var(--line-strong);
  transition: background-color 200ms ease;
}
.ui-quote-toggle i {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--card);
  box-shadow: 0 1px 2px rgba(23, 29, 26, 0.25);
  transition: transform 200ms ease;
}
.is-on .ui-quote-toggle { background: var(--accent); }
.is-on .ui-quote-toggle i { transform: translateX(12px); }
.ui-quote-main { display: grid; gap: 1px; min-width: 0; }
.ui-quote-name { font-size: 13px; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ui-quote-detail { font-size: 11.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
li:not(.is-on) .ui-quote-name { color: var(--muted-2); }
.ui-quote-foot {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--line);
}
.ui-quote-value { font-size: 13px; font-weight: 600; color: var(--ink); }
</style>
