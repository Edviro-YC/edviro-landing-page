<script setup lang="ts">
/**
 * Product-UI illustration: after-hours load for one zone before and after an
 * approved schedule change, on the same evening axis. The verified delta is
 * a share of load, never a dollar figure. Illustrative values only.
 */
withDefaults(
  defineProps<{
    title?: string
    delta?: string
    beforeLabel?: string
    afterLabel?: string
    note?: string
    summary?: string
  }>(),
  {
    title: 'Floor 4 East · HVAC kW',
    delta: '\u221241% after-hours kWh',
    beforeLabel: 'Week before',
    afterLabel: 'After change',
    note: 'Verified over five weeknights against the same-weekday baseline.',
    summary:
      'Line chart of HVAC power for Floor 4 East from 4 pm to 6 am. The week-before line stays high all night; the after-change line drops at 6:30 pm and stays low until it ramps back before 6 am. Verified delta: 41 percent less after-hours energy.',
  },
)
</script>

<template>
  <figure class="ui-card ui-load" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-load-title">{{ title }}</span>
      <span class="ui-pill is-ok">{{ delta }}</span>
    </div>
    <svg class="ui-load-svg" viewBox="0 0 300 90" aria-hidden="true">
      <!-- gridlines -->
      <line x1="0" y1="28" x2="300" y2="28" stroke="var(--line-soft)" stroke-width="1" />
      <line x1="0" y1="56" x2="300" y2="56" stroke="var(--line-soft)" stroke-width="1" />
      <line x1="0" y1="84" x2="300" y2="84" stroke="var(--line)" stroke-width="1" />
      <!-- week before: high through the night -->
      <path d="M0 30 C25 28 50 34 75 32 S140 30 175 33 S250 30 300 36" fill="none" stroke="var(--line-strong)" stroke-width="1.8" stroke-dasharray="4 3" />
      <!-- after change: drops at 6:30 pm, ramps back before 6 am -->
      <path d="M0 31 C18 30 34 33 50 32 L54 32 C66 46 72 64 82 70 S190 76 250 74 C270 72 283 56 300 40" fill="none" stroke="var(--accent)" stroke-width="2" />
      <!-- schedule change marker (6:30 pm ≈ 18% of the 4 pm – 6 am axis) -->
      <line x1="54" y1="8" x2="54" y2="88" stroke="var(--ink)" stroke-width="1" stroke-dasharray="2 3" />
      <circle cx="54" cy="32" r="3" fill="var(--accent)" />
    </svg>
    <div class="ui-load-axis" aria-hidden="true">
      <span style="left: 0">4 pm</span>
      <span style="left: 18%; transform: translateX(-50%)">6:30 pm</span>
      <span style="left: 57%; transform: translateX(-50%)">midnight</span>
      <span style="right: 0">6 am</span>
    </div>
    <div class="ui-load-legend" aria-hidden="true">
      <span><i class="is-before" /> {{ beforeLabel }}</span>
      <span><i class="is-after" /> {{ afterLabel }}</span>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-load { gap: 8px; }
.ui-load-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-load-svg {
  width: 100%;
  height: auto;
  aspect-ratio: 300 / 90;
  display: block;
}
.ui-load-axis {
  position: relative;
  height: 14px;
  font-size: 10.5px;
  color: var(--muted);
}
.ui-load-axis span { position: absolute; top: 0; white-space: nowrap; }
.ui-load-legend {
  display: flex;
  gap: 14px;
  font-size: 11px;
  color: var(--ink-2);
}
.ui-load-legend span { display: inline-flex; align-items: center; gap: 6px; }
.ui-load-legend i {
  display: inline-block;
  width: 14px;
  height: 0;
  border-top: 2px solid var(--line-strong);
}
.ui-load-legend i.is-before { border-top-style: dashed; }
.ui-load-legend i.is-after { border-top-color: var(--accent); }
</style>
