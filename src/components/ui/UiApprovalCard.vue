<script setup lang="ts">
/**
 * Product-UI illustration: one proposed action and the approval trail it
 * went through. Mirrors case_pending_actions → approve → execute: Edviro
 * proposes, a named person approves, then the action is applied. The human
 * step is drawn as the gate so approval stays visible. Illustrative values.
 */
export type TrailEntry = {
  text: string
  time?: string
  /** `human` marks the approval gate; `pending` renders as not-yet-done. */
  state?: 'done' | 'human' | 'pending'
}

withDefaults(
  defineProps<{
    label?: string
    title?: string
    details?: string[]
    trail?: TrailEntry[]
    status?: string
    statusTone?: 'review' | 'ok' | 'info' | 'warn' | 'verified'
    summary?: string
  }>(),
  {
    label: 'Proposed action',
    title: 'Set Floor 4 East to unoccupied from 6:30 pm; restore on first arrival',
    details: () => ['Zone: Floor 4 East · 12 VAV boxes', 'Restore trigger: badge-in or first WiFi device', 'Applies through the existing BMS schedule'],
    trail: () => [
      { text: 'Proposed by Edviro', time: '6:12 pm', state: 'done' },
      { text: 'Awaiting approval', time: '', state: 'done' },
      { text: 'Approved by facilities · M. Reyes', time: '6:40 pm', state: 'human' },
      { text: 'Applied via BMS schedule', time: '6:41 pm', state: 'done' },
    ],
    status: 'Approved',
    statusTone: 'ok',
    summary:
      'Proposed action card: set Floor 4 East to unoccupied from 6:30 pm and restore on first arrival. Trail: proposed by Edviro at 6:12 pm, awaiting approval, approved by facilities (M. Reyes) at 6:40 pm, applied through the BMS schedule at 6:41 pm.',
  },
)
</script>

<template>
  <figure class="ui-card ui-appr" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label">{{ label }}</span>
      <span class="ui-pill" :class="`is-${statusTone}`">{{ status }}</span>
    </div>
    <p class="ui-appr-title" aria-hidden="true">{{ title }}</p>
    <ul class="ui-appr-details" aria-hidden="true">
      <li v-for="line in details" :key="line">{{ line }}</li>
    </ul>
    <ol class="ui-appr-trail" aria-hidden="true">
      <li v-for="entry in trail" :key="entry.text" class="ui-appr-entry" :class="`is-${entry.state ?? 'done'}`">
        <span class="ui-appr-dot" />
        <span class="ui-appr-text">{{ entry.text }}</span>
        <span v-if="entry.time" class="ui-appr-time">{{ entry.time }}</span>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.ui-appr { gap: 8px; }
.ui-appr-title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}
.ui-appr-details {
  margin: 0;
  padding: 0 0 0 14px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink-2);
}
.ui-appr-details li::marker { color: var(--muted); }
.ui-appr-trail {
  list-style: none;
  margin: 2px 0 0;
  padding: 8px 0 0;
  border-top: 1px solid var(--line-soft);
  display: grid;
  gap: 6px;
}
.ui-appr-entry {
  position: relative;
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--ink-2);
}
.ui-appr-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  justify-self: center;
}
.ui-appr-entry.is-pending .ui-appr-dot { background: transparent; border: 1.5px solid var(--line-strong); }
.ui-appr-entry.is-pending { color: var(--muted); }
.ui-appr-entry.is-human {
  margin: 0 -6px;
  padding: 4px 6px;
  border-radius: 6px;
  background: var(--status-review-bg);
  color: var(--status-warn-ink);
  font-weight: 600;
}
.ui-appr-entry.is-human .ui-appr-dot { background: var(--status-warn-ink); }
.ui-appr-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ui-appr-time {
  font-variant-numeric: tabular-nums;
  color: var(--muted);
  font-weight: 500;
}
</style>
