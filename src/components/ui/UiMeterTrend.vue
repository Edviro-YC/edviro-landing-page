<script setup lang="ts">
/**
 * Product-UI illustration: a meter trend against its learned baseline band.
 * `anomaly` flags a departure from normal; `verified` shows the drop after a
 * fix. Illustrative values only, no customer data.
 */
withDefaults(
  defineProps<{
    variant?: 'anomaly' | 'verified'
    title?: string
    flag?: string
    summary?: string
  }>(),
  {
    variant: 'anomaly',
    title: 'Main meter · 7 days',
    flag: 'After-hours load +38%',
    summary: 'Chart of a week of meter readings against the learned baseline band, with one departure flagged.',
  },
)
</script>

<template>
  <figure class="ui-card ui-trend" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-trend-title">{{ title }}</span>
      <span class="ui-pill" :class="variant === 'verified' ? 'is-ok' : 'is-warn'">{{ flag }}</span>
    </div>
    <svg class="ui-trend-svg" viewBox="0 0 240 92" aria-hidden="true" preserveAspectRatio="none">
      <!-- learned baseline band -->
      <path d="M0 50 C30 46 50 58 80 52 S130 44 160 50 S210 60 240 52 L240 74 C210 80 180 70 160 72 S120 62 80 70 S40 66 0 70 Z" fill="var(--accent)" fill-opacity="0.1" />
      <!-- baseline center -->
      <path d="M0 60 C30 56 50 66 80 61 S130 53 160 61 S210 70 240 63" fill="none" stroke="var(--accent)" stroke-opacity="0.45" stroke-width="1.2" stroke-dasharray="3 3" />
      <template v-if="variant === 'anomaly'">
        <!-- actual: normal, then rises after-hours -->
        <path d="M0 62 C30 58 50 66 80 62 S120 56 140 60" fill="none" stroke="var(--ink)" stroke-width="1.8" />
        <path d="M140 60 C155 40 170 26 190 24 S225 30 240 28" fill="none" stroke="var(--warn)" stroke-width="2" />
        <circle cx="190" cy="24" r="3.2" fill="var(--warn)" />
        <line x1="140" y1="6" x2="140" y2="86" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="2 3" />
      </template>
      <template v-else>
        <!-- actual: elevated, then drops inside the band after the fix -->
        <path d="M0 30 C30 26 50 34 80 30 S110 24 128 28" fill="none" stroke="var(--warn)" stroke-width="2" />
        <path d="M128 28 C138 48 150 62 170 64 S215 62 240 63" fill="none" stroke="var(--ink)" stroke-width="1.8" />
        <circle cx="128" cy="28" r="3.2" fill="var(--accent)" />
        <line x1="128" y1="6" x2="128" y2="86" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="2 3" />
      </template>
    </svg>
    <div class="ui-trend-axis" aria-hidden="true">
      <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
    </div>
  </figure>
</template>

<style scoped>
.ui-trend {
  gap: 8px;
  padding-bottom: 12px;
}
.ui-trend-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-trend-svg {
  width: 100%;
  height: 92px;
  display: block;
}
.ui-trend-axis {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--muted);
}
</style>
