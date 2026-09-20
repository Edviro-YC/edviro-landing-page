<script setup lang="ts">
/**
 * Product-UI illustration: one diagnosis card — the likely cause, the evidence
 * behind it, and the drafted work order still waiting on a person. Same shape
 * as anomaly_cases → work order in the app. Illustrative values only.
 */
withDefaults(
  defineProps<{
    label?: string
    title?: string
    evidence?: string[]
    /** Footer pill text, e.g. "WO-2418 · Awaiting review · D. Park". */
    footer?: string
    footerTone?: 'review' | 'ok' | 'info' | 'warn' | 'verified'
    summary?: string
  }>(),
  {
    label: 'Likely cause',
    title: 'Schedule override left RTU-3 in occupied mode overnight',
    evidence: () => ['Runtime 11 pm – 6 am, 4 nights', 'Setpoint held at 68°F', 'No calendar event on site'],
    footer: 'WO-2418 · Awaiting review · D. Park',
    footerTone: 'review',
    summary:
      'Diagnosis card: likely cause is a schedule override leaving RTU-3 in occupied mode overnight, with three evidence points and a work order awaiting review.',
  },
)
</script>

<template>
  <figure class="ui-card ui-cause" role="img" :aria-label="summary">
    <div class="ui-cause-body" aria-hidden="true">
      <span class="ui-label">{{ label }}</span>
      <p class="ui-cause-title">{{ title }}</p>
      <ul class="ui-cause-evidence">
        <li v-for="line in evidence" :key="line">{{ line }}</li>
      </ul>
      <span v-if="footer" class="ui-pill ui-cause-footer" :class="`is-${footerTone}`">{{ footer }}</span>
    </div>
  </figure>
</template>

<style scoped>
.ui-cause-body {
  display: grid;
  gap: 8px;
}
.ui-cause-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}
.ui-cause-evidence {
  margin: 0;
  padding: 0 0 0 14px;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--ink-2);
}
.ui-cause-evidence li::marker { color: var(--muted); }
.ui-cause-footer {
  justify-self: start;
  white-space: normal;
}
</style>
