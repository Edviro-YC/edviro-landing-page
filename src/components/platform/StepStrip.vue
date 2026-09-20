<script lang="ts">
/**
 * Numbered lifecycle strip: title + one line per step, horizontal on wide
 * screens and stacked on narrow ones. Steps flagged `human` are drawn as the
 * review gate so approval stays visible wherever the strip is used. An
 * optional glyph per step gives the strip a visual rhythm; the number stays
 * so the order still reads at a glance.
 */
export const STEP_ICONS = {
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2 M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3',
  review: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M16 11l2 2 4-4',
  send: 'm22 2-7 20-4-9-9-4z M22 2 11 13',
  phone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M12 18h.01',
  check: 'M20 6 9 17l-5-5',
  verify: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  repeat: 'M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3',
  model: 'M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z M3.3 7l8.7 5 8.7-5 M12 22V12',
  calibrate: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  connect: 'M12 22v-5 M9 8V2M15 8V2 M18 8v5a6 6 0 0 1-12 0V8z',
  simulate: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M10 8l6 4-6 4z',
  flag: 'M4 22V4a2 2 0 0 1 2-2h9l1 2h4v10h-5l-1-2H6',
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  handoff: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5 M9 15l2 2 4-4',
  chart: 'M3 3v18h18 M7 15v-4M12 15V8M17 15v-6',
  map: 'M12 22s7-7.6 7-12a7 7 0 0 0-14 0c0 4.4 7 12 7 12z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  export: 'M12 3v12 M7 8l5-5 5 5 M4 21h16',
  cutover: 'M16 6H8a6 6 0 0 0 0 12h8a6 6 0 0 0 0-12z M16 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  retire: 'M21 8v13H3V8 M1 3h22v5H1z M10 12h4',
  calendar: 'M16 2v4M8 2v4M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  quote: 'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z M7 7h.01',
  report: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5M9 13h6M9 17h6',
  monitor: 'M22 12h-4l-3 9L9 3l-3 9H2',
  school: 'M3 9l9-5 9 5-9 5z M7 11v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5',
  buildings: 'M4 21V5l7-2v18M11 21h9V9h-9 M7 7h.01M7 11h.01M15 12h.01M15 16h.01',
  team: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
} as const

export type StepIcon = keyof typeof STEP_ICONS

export type Step = {
  title: string
  detail: string
  human?: boolean
  /** Pill text for a `human` step; defaults to "Human approval". */
  tag?: string
  icon?: StepIcon
}
</script>

<script setup lang="ts">
defineProps<{ steps: Step[]; label?: string }>()

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <ol class="strip" :aria-label="label">
    <li v-for="(step, i) in steps" :key="step.title" class="strip-step" :class="{ 'is-human': step.human, 'has-icon': step.icon }">
      <span class="strip-top" aria-hidden="true">
        <span v-if="step.icon" class="strip-glyph">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="STEP_ICONS[step.icon]" /></svg>
        </span>
        <span class="strip-num">{{ step.icon ? pad(i + 1) : i + 1 }}</span>
      </span>
      <span class="strip-title">{{ step.title }}</span>
      <span class="strip-detail">{{ step.detail }}</span>
      <span v-if="step.human" class="ui-pill is-review strip-tag">{{ step.tag ?? 'Human approval' }}</span>
    </li>
  </ol>
</template>

<style scoped>
.strip {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}
.strip-step {
  position: relative;
  display: grid;
  gap: 6px;
  align-content: start;
  padding: 16px 16px 18px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  min-width: 0;
}
.strip-step.is-human {
  border-style: dashed;
  border-color: var(--warn);
  background: var(--status-review-bg);
}
.strip-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.strip-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11.5px;
  font-weight: 600;
  background: var(--ink);
  color: var(--on-dark);
}
.strip-step.is-human .strip-num { background: var(--status-warn-ink); }
/* With a glyph, the number steps back to a quiet label on the right. */
.strip-step.has-icon .strip-num {
  width: auto;
  height: auto;
  background: none;
  color: var(--muted-2);
  font-size: 11px;
  letter-spacing: 0.08em;
}
.strip-step.is-human.has-icon .strip-num { color: var(--status-warn-ink); }
.strip-glyph {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--status-ok-bg);
  color: var(--accent);
}
.is-human .strip-glyph { background: var(--status-warn-bg); color: var(--status-warn-ink); }
.strip-title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.strip-detail {
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-2);
  text-wrap: pretty;
}
.strip-tag { justify-self: start; margin-top: 2px; }
</style>
