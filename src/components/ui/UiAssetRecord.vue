<script setup lang="ts">
/**
 * Product-UI illustration: one asset record with service history and the next
 * inspection. Mirrors fca_assets fields (make, model, install year, location).
 */
withDefaults(
  defineProps<{
    name?: string
    meta?: string
    history?: { date: string; event: string }[]
    next?: string
    summary?: string
  }>(),
  {
    name: 'RTU-3 \u00B7 Rooftop unit',
    meta: 'Carrier 48TC \u00B7 2011 \u00B7 Building B',
    history: () => [
      { date: 'Sep 12', event: 'Heating stage not firing \u2014 igniter replaced' },
      { date: 'Aug 21', event: 'Heating stage not firing \u2014 reset' },
      { date: 'May 03', event: 'Spring inspection \u2014 filters, belts' },
    ],
    next: 'Next inspection Oct 15 \u00B7 3 failures in 30 days',
    summary: 'Asset record for a rooftop unit showing make, model, install year, three service-history entries, and the next scheduled inspection.',
  },
)
</script>

<template>
  <figure class="ui-card ui-asset" role="img" :aria-label="summary">
    <div class="ui-asset-head" aria-hidden="true">
      <span class="ui-asset-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M7 7V4h10v3M8 12h8" /></svg>
      </span>
      <span class="ui-asset-titles">
        <span class="ui-asset-name">{{ name }}</span>
        <span class="ui-asset-meta">{{ meta }}</span>
      </span>
    </div>
    <div aria-hidden="true">
      <span class="ui-label">Service history</span>
      <ul class="ui-asset-history">
        <li v-for="row in history" :key="row.date + row.event">
          <span class="ui-asset-date">{{ row.date }}</span>
          <span class="ui-asset-event">{{ row.event }}</span>
        </li>
      </ul>
    </div>
    <p class="ui-note ui-asset-next" aria-hidden="true">{{ next }}</p>
  </figure>
</template>

<style scoped>
.ui-asset-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ui-asset-icon {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  color: var(--accent);
}
.ui-asset-titles {
  display: grid;
  min-width: 0;
}
.ui-asset-name {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-asset-meta {
  font-size: 11.5px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-asset-history {
  list-style: none;
  margin: 6px 0 0;
  padding: 0;
  display: grid;
}
.ui-asset-history li {
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 8px;
  padding: 5px 0;
  border-top: 1px solid var(--line-soft);
  font-size: 12px;
  line-height: 1.35;
}
.ui-asset-date { color: var(--muted); }
.ui-asset-event { color: var(--ink-2); min-width: 0; }
.ui-asset-next {
  font-weight: 600;
  color: var(--accent);
}
</style>
