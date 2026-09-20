<script setup lang="ts">
/**
 * Product-UI illustration: a short work-order queue. Status vocabulary matches
 * work_orders.status plus the review gate every drafted order passes through.
 */
export type Row = { title: string; priority: 'Urgent' | 'High' | 'Medium' | 'Low'; trade: string; status: string }

const PRIORITY_TONE: Record<Row['priority'], string> = {
  Urgent: 'is-danger',
  High: 'is-warn',
  Medium: 'is-info',
  Low: '',
}

function statusTone(status: string): string {
  if (status === 'Awaiting review') return 'is-review'
  if (status === 'Verified') return 'is-verified'
  return ''
}

withDefaults(
  defineProps<{
    title?: string
    rows?: Row[]
    summary?: string
  }>(),
  {
    title: 'Work orders · Open',
    rows: () => [
      { title: 'RTU-3 heating stage not firing', priority: 'High', trade: 'HVAC', status: 'Awaiting review' },
      { title: 'Boiler-2 short cycling overnight', priority: 'Medium', trade: 'Plumbing', status: 'In progress' },
      { title: 'Lighting bank C flicker, hallway 2', priority: 'Low', trade: 'Electrical', status: 'Verified' },
    ],
    summary: 'Work-order queue with three rows showing title, priority, trade, and status: awaiting review, in progress, and verified.',
  },
)
</script>

<template>
  <figure class="ui-card ui-queue" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label">{{ title }}</span>
      <span class="ui-label">Status</span>
    </div>
    <ul class="ui-queue-rows" aria-hidden="true">
      <li v-for="row in rows" :key="row.title">
        <span class="ui-queue-main">
          <span class="ui-queue-title">{{ row.title }}</span>
          <span class="ui-queue-chips">
            <span class="ui-pill is-sm" :class="PRIORITY_TONE[row.priority]">{{ row.priority }}</span>
            <span class="ui-queue-trade">{{ row.trade }}</span>
          </span>
        </span>
        <span class="ui-pill" :class="statusTone(row.status)">{{ row.status }}</span>
      </li>
    </ul>
  </figure>
</template>

<style scoped>
.ui-queue {
  gap: 6px;
}
.ui-queue-rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
}
.ui-queue-rows li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 0;
  border-top: 1px solid var(--line-soft);
}
.ui-queue-rows li > .ui-pill { flex: none; }
.ui-queue-main {
  display: grid;
  gap: 4px;
  min-width: 0;
}
.ui-queue-title {
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-queue-chips {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 11px;
}
.ui-queue-trade { color: var(--muted); }
</style>
