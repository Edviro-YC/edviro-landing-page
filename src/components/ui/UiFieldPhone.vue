<script setup lang="ts">
/**
 * A technician's phone: one assigned work order with the asset's last
 * service, the step checklist, photos, a note, and the complete button that
 * hands off to verification. `compact` keeps the header, history, and the
 * first steps for use as a small crop (persona strips, cards).
 */
export type PhoneStep = { text: string; done?: boolean }

withDefaults(
  defineProps<{
    label?: string
    priority?: 'Urgent' | 'High' | 'Medium' | 'Low'
    title?: string
    meta?: string
    lastService?: string
    steps?: PhoneStep[]
    note?: string
    compact?: boolean
    summary?: string
  }>(),
  {
    label: 'WO-2431 · Assigned to you',
    priority: 'High',
    title: 'Boiler-2 short-cycling · Lincoln HS gym',
    meta: 'Gym wing · Mechanical room B · Lochinvar CREST, 2009',
    lastService: 'Feb 03 · control board reset · D. Park',
    steps: () => [
      { text: 'Check flame sensor', done: true },
      { text: 'Inspect aquastat and wiring', done: true },
      { text: 'Run 20-minute cycle test' },
    ],
    note: 'Flame sensor fouled, replaced. Cycle now 18 min.',
    compact: false,
    summary:
      'Phone screen of an assigned high-priority work order for the Lincoln High School gym boiler: location and model, the last service entry, a three-step checklist with two steps done, two photos, a technician note, and a Mark complete button noting that verification starts automatically.',
  },
)

const PRIORITY_TONE: Record<string, string> = { Urgent: 'is-danger', High: 'is-warn', Medium: 'is-info', Low: '' }
</script>

<template>
  <figure class="ui-phone" :class="{ 'is-compact': compact }" role="img" :aria-label="summary">
    <div class="ui-phone-frame" aria-hidden="true">
      <div class="ui-phone-bar">
        <span>9:41</span>
        <span class="ui-phone-signal"><i /><i /><i /><i /></span>
      </div>
      <div class="ui-phone-screen">
        <div class="ui-head">
          <span class="ui-label">{{ label }}</span>
          <span class="ui-pill is-sm" :class="PRIORITY_TONE[priority]">{{ priority }}</span>
        </div>
        <p class="ui-phone-title">{{ title }}</p>
        <p class="ui-phone-meta">{{ meta }}</p>
        <div class="ui-phone-block">
          <span class="ui-label">Last service</span>
          <span>{{ lastService }}</span>
        </div>
        <ul class="ui-phone-steps">
          <li v-for="s in steps" :key="s.text" :class="{ 'is-done': s.done }">
            <span class="ui-phone-box">
              <svg v-if="s.done" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
            </span>
            <span>{{ s.text }}</span>
          </li>
        </ul>
        <template v-if="!compact">
          <div class="ui-phone-photos">
            <span class="ui-phone-photo" />
            <span class="ui-phone-photo is-alt" />
            <span class="ui-phone-add">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
              Photo
            </span>
          </div>
          <p class="ui-phone-note">“{{ note }}”</p>
          <span class="ui-phone-btn">Mark complete</span>
          <span class="ui-phone-foot">Verification starts automatically</span>
        </template>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.ui-phone {
  margin: 0;
  display: grid;
  justify-items: center;
  min-width: 0;
}
.ui-phone-frame {
  width: min(100%, 300px);
  background: var(--ink);
  border-radius: 30px;
  padding: 8px;
  box-shadow: 0 18px 40px -22px rgba(23, 29, 26, 0.55);
}
.is-compact .ui-phone-frame { width: min(100%, 250px); border-radius: 24px; padding: 6px; }
.ui-phone-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px 4px;
  color: var(--on-dark);
  font-size: 11px;
  font-weight: 600;
}
.ui-phone-signal { display: inline-flex; gap: 2px; align-items: flex-end; height: 9px; }
.ui-phone-signal i { display: block; width: 3px; background: var(--on-dark); border-radius: 1px; }
.ui-phone-signal i:nth-child(1) { height: 3px; }
.ui-phone-signal i:nth-child(2) { height: 5px; }
.ui-phone-signal i:nth-child(3) { height: 7px; }
.ui-phone-signal i:nth-child(4) { height: 9px; }
.ui-phone-screen {
  display: grid;
  gap: 8px;
  background: var(--card);
  border-radius: 22px;
  padding: 14px 14px 16px;
  font-size: 12.5px;
  line-height: 1.35;
  color: var(--ink-2);
}
.is-compact .ui-phone-screen { border-radius: 18px; padding: 12px 12px 14px; gap: 7px; }
.ui-phone-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-wrap: pretty;
}
.ui-phone-meta { margin: -4px 0 0; font-size: 11.5px; color: var(--muted); }
.ui-phone-block {
  display: grid;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--surface-2);
  border: 1px solid var(--line-soft);
}
.ui-phone-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.ui-phone-steps li { display: flex; gap: 9px; align-items: center; color: var(--ink); }
.ui-phone-steps li.is-done { color: var(--muted); text-decoration: line-through; text-decoration-color: var(--line-strong); }
.ui-phone-box {
  flex: none;
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 1.5px solid var(--line-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--card);
}
.is-done .ui-phone-box { background: var(--accent); border-color: var(--accent); color: var(--on-dark); }
.ui-phone-photos { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.ui-phone-photo {
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  background:
    linear-gradient(160deg, rgba(23, 29, 26, 0.06), rgba(23, 29, 26, 0.18)),
    radial-gradient(circle at 30% 35%, #C7D2CB, #8F9B94 70%);
}
.ui-phone-photo.is-alt { background: linear-gradient(200deg, rgba(23, 29, 26, 0.04), rgba(23, 29, 26, 0.22)), radial-gradient(circle at 65% 60%, #D9C7A6, #8A7A5A 70%); }
.ui-phone-add {
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  border: 1.5px dashed var(--line-strong);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--muted);
}
.ui-phone-note {
  margin: 0;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--line);
  font-style: italic;
  color: var(--ink-2);
}
.ui-phone-btn {
  display: inline-flex;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--on-dark);
  font-size: 13px;
  font-weight: 600;
}
.ui-phone-foot { text-align: center; font-size: 11px; color: var(--muted); margin-top: -2px; }
</style>
