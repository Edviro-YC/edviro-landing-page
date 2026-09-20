<script setup lang="ts">
/**
 * Product-UI illustration: one work-order record end to end — where it came
 * from, how it was categorized and approved, who got it, the asset history it
 * carried, what came back from the field, and the verification that closed
 * it. The rows are the capability list, shown as a record instead of chips.
 * Illustrative data.
 */
export type RecordRow = { label: string; text: string; tone?: 'review' | 'verified' | 'ok'; pill?: string }

withDefaults(
  defineProps<{
    code?: string
    site?: string
    priority?: 'Urgent' | 'High' | 'Medium' | 'Low'
    title?: string
    rows?: RecordRow[]
    summary?: string
  }>(),
  {
    code: 'WO-2418',
    site: 'Lincoln HS',
    priority: 'High',
    title: 'Room 214 too hot · RTU-3',
    rows: () => [
      { label: 'Source', text: 'Message · Ms. Alvarez · 8:12 am' },
      { label: 'Category', text: 'HVAC · Comfort · priority proposed from 3 repeat calls', tone: 'review', pill: 'Director approved' },
      { label: 'Assigned', text: 'D. Park · HVAC · notified on mobile 8:31 am' },
      { label: 'Asset', text: 'RTU-3 · belt replaced Feb 3 · damper actuator flagged twice' },
      { label: 'Field', text: '2 photos · actuator replaced · 45 min · 1 part' },
      { label: 'Verified', text: 'Room at 72 °F within 2 h · after-hours load back to baseline', tone: 'verified', pill: 'Verified' },
    ],
    summary:
      'One work-order record for Room 214 too hot at Lincoln High School, high priority. Source: a staff message at 8:12 am. Category: HVAC comfort, priority proposed from three repeat calls, approved by the director. Assigned to D. Park, HVAC, notified on mobile. Asset RTU-3 with its service history attached. Field update: two photos, actuator replaced, 45 minutes, one part. Verified: room at 72 degrees within two hours and after-hours load back to baseline.',
  },
)

const PRIORITY_TONE: Record<string, string> = { Urgent: 'is-danger', High: 'is-warn', Medium: 'is-info', Low: '' }
</script>

<template>
  <figure class="ui-card ui-wor" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label">{{ code }} · {{ site }}</span>
      <span class="ui-pill is-sm" :class="PRIORITY_TONE[priority]">{{ priority }}</span>
    </div>
    <p class="ui-wor-title" aria-hidden="true">{{ title }}</p>
    <ol class="ui-wor-rows" aria-hidden="true">
      <li v-for="r in rows" :key="r.label" :class="r.tone ? `is-${r.tone}` : ''">
        <span class="ui-wor-dot" />
        <span class="ui-wor-label">{{ r.label }}</span>
        <span class="ui-wor-text">{{ r.text }}</span>
        <span v-if="r.pill" class="ui-pill is-sm ui-wor-pill" :class="r.tone === 'verified' ? 'is-verified' : 'is-review'">{{ r.pill }}</span>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.ui-wor { container-type: inline-size; }
.ui-wor-title {
  margin: -4px 0 0;
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: var(--ink);
  text-wrap: pretty;
}
.ui-wor-rows {
  list-style: none;
  margin: 2px 0 0;
  padding: 0;
  display: grid;
  gap: 0;
}
.ui-wor-rows li {
  position: relative;
  display: grid;
  grid-template-columns: 14px 64px minmax(0, 1fr) auto;
  gap: 4px 10px;
  align-items: baseline;
  padding: 7px 0;
  font-size: 12.5px;
  line-height: 1.4;
  color: var(--ink-2);
}
/* The rail down the left reads as the record's timeline. */
.ui-wor-rows li::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 1.5px;
  background: var(--line);
}
.ui-wor-rows li:first-child::before { top: 50%; }
.ui-wor-rows li:last-child::before { bottom: 50%; }
.ui-wor-dot {
  position: relative;
  z-index: 1;
  align-self: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--line-strong);
  background: var(--card);
}
li.is-review .ui-wor-dot { border-color: var(--warn); background: var(--status-review-bg); }
li.is-verified .ui-wor-dot { border-color: var(--accent); background: var(--accent); }
.ui-wor-label {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted-2);
}
.ui-wor-text { min-width: 0; text-wrap: pretty; }
.ui-wor-pill { align-self: center; }
.ui-wor-rows li.is-verified .ui-wor-text { color: var(--ink); font-weight: 500; }

@container (max-width: 380px) {
  .ui-wor-rows li { grid-template-columns: 14px minmax(0, 1fr); }
  .ui-wor-label { grid-column: 2; }
  .ui-wor-text { grid-column: 2; }
  .ui-wor-pill { grid-column: 2; justify-self: start; }
}
</style>
