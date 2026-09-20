<script setup lang="ts">
/**
 * Product-UI illustration: hourly occupancy for one zone (device counts from
 * the WiFi controller) against the HVAC mode the zone was actually in. The
 * signal is the gap: people leave at 6 pm, the zone stays in occupied mode.
 * Illustrative values only.
 */
withDefaults(
  defineProps<{
    title?: string
    flag?: string
    /** Hourly device counts, 2 pm → 10 pm (9 bars). */
    counts?: number[]
    note?: string
    summary?: string
  }>(),
  {
    title: 'Floor 4 East · WiFi devices',
    flag: 'Still in occupied mode',
    counts: () => [58, 61, 55, 42, 9, 3, 2, 1, 1],
    note: 'Devices fall to near zero after 6 pm; the zone is still conditioned as occupied.',
    summary:
      'Bar chart of hourly WiFi device counts for Floor 4 East from 2 pm to 10 pm: about sixty devices until 5 pm, then near zero after 6 pm, while the HVAC mode band stays “occupied” for every hour.',
  },
)

const MAX = 64
const W = 240
const BAR_TOP = 10
const BAR_BOTTOM = 84
const STEP = W / 9
</script>

<template>
  <figure class="ui-card ui-occ" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-occ-title">{{ title }}</span>
      <span class="ui-pill is-warn">{{ flag }}</span>
    </div>
    <!-- HVAC mode band: occupied for the whole window (HTML so it never stretches) -->
    <div class="ui-occ-band" aria-hidden="true">HVAC · Occupied mode, 2 pm – 10 pm</div>
    <svg class="ui-occ-svg" :viewBox="`0 0 ${W} 90`" aria-hidden="true">
      <!-- device count bars -->
      <g v-for="(n, i) in counts" :key="i">
        <rect
          :x="i * STEP + 4"
          :y="BAR_BOTTOM - (n / MAX) * (BAR_BOTTOM - BAR_TOP)"
          :width="STEP - 8"
          :height="(n / MAX) * (BAR_BOTTOM - BAR_TOP)"
          rx="2"
          :fill="i >= 4 ? 'var(--line-strong)' : 'var(--accent)'"
        />
      </g>
      <!-- 6 pm marker -->
      <line :x1="4 * STEP" y1="6" :x2="4 * STEP" y2="88" stroke="var(--ink)" stroke-width="1" stroke-dasharray="2 3" />
      <line x1="0" :y1="BAR_BOTTOM" :x2="W" :y2="BAR_BOTTOM" stroke="var(--line)" stroke-width="1" />
    </svg>
    <div class="ui-occ-axis" aria-hidden="true">
      <span style="left: 0">2 pm</span>
      <span :style="{ left: `${(4 / 9) * 100}%`, transform: 'translateX(-50%)' }">6 pm</span>
      <span style="right: 0">10 pm</span>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-occ { gap: 8px; }
.ui-occ-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-occ-band {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--status-warn-bg);
  color: var(--status-warn-ink);
}
.ui-occ-svg {
  width: 100%;
  height: auto;
  aspect-ratio: 240 / 90;
  display: block;
}
.ui-occ-axis {
  position: relative;
  height: 14px;
  font-size: 10.5px;
  color: var(--muted);
}
.ui-occ-axis span { position: absolute; top: 0; white-space: nowrap; }
</style>
