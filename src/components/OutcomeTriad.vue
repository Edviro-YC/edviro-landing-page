<script setup lang="ts">
import logoIcon from '@/assets/img/logo-icon.png'

/**
 * Hero visual: the three outcomes Edviro is accountable for — energy, money,
 * time — as three rows in one frame, each with a small qualitative evidence
 * sketch (load that drops after a fix, a bill bar that shrinks, a request
 * that becomes a dispatched order). Deliberately no figures: published
 * numbers live in EducationProof behind the evidence gate, and the mechanism
 * line under each outcome is the claim, not a quantity.
 *
 * Semantics: the label and the three items are real text (an ordered list);
 * every sketch is decoration. Rows fill the frame at any width, so the frame
 * can sit centered in the hero column without dead space.
 */
const outcomes = [
  {
    id: 'energy',
    title: 'Energy',
    line: 'Waste found from utility data and fixed at the source.',
    icon: 'M13 2 4 14h7l-1 8 9-12h-7z',
  },
  {
    id: 'money',
    title: 'Money',
    line: 'Savings verified against the real bill.',
    icon: 'M3 7h18v10H3z M14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0',
  },
  {
    id: 'time',
    title: 'Time',
    line: 'Text our hotline to turn your request into a reviewed work order.',
    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8v4l3 2',
  },
] as const

const timeline = [
  { label: 'Request', tone: '' },
  { label: 'Reviewed', tone: 'is-review' },
  { label: 'Dispatched', tone: 'is-done' },
]
</script>

<template>
  <div class="triad">
    <div class="triad-frame">
      <div class="triad-head">
        <p class="triad-label">We save three things</p>
        <span class="triad-loop" aria-hidden="true">
          <img :src="logoIcon" alt="" width="16" height="16" />
          With one platform
        </span>
      </div>

      <ol class="triad-list">
        <li v-for="(o, i) in outcomes" :key="o.id" class="triad-row" :class="`is-${o.id}`" :style="{ '--i': i }">
          <span class="triad-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path :d="o.icon" /></svg>
          </span>
          <span class="triad-text">
            <span class="triad-title">{{ o.title }}</span>
            <span class="triad-line">{{ o.line }}</span>
          </span>

          <!-- Energy: after-hours load sits high, then drops to the baseline after the fix. -->
          <span v-if="o.id === 'energy'" class="triad-viz" aria-hidden="true">
            <span class="triad-viz-label">After-hours load</span>
            <span class="triad-spark-wrap">
              <svg class="triad-spark" viewBox="0 0 220 64" preserveAspectRatio="none" focusable="false">
                <path class="spark-waste" d="M0 21 C 18 17, 30 27, 48 21 S 80 25, 96 19 L 112 20 L 112 42 L 0 42 Z" />
                <path class="spark-base" d="M0 42 H 220" />
                <path class="spark-fix" d="M112 4 V 62" />
                <path class="spark-line is-high" d="M0 21 C 18 17, 30 27, 48 21 S 80 25, 96 19 L 112 20" pathLength="1" />
                <path class="spark-line is-low" d="M112 20 C 116 34, 120 42, 128 43 S 160 40, 176 43 S 206 41, 220 42" pathLength="1" />
              </svg>
              <span class="spark-fixed">Fixed</span>
            </span>
          </span>

          <!-- Money: the bill after the fix is shorter than the baseline, and it is read off the bill. -->
          <span v-else-if="o.id === 'money'" class="triad-viz" aria-hidden="true">
            <span class="triad-viz-label">Bill vs. baseline</span>
            <span class="triad-bars">
              <span class="triad-bar-row"><span class="triad-bar-name">Baseline</span><span class="triad-bar is-base"><i /></span></span>
              <span class="triad-bar-row"><span class="triad-bar-name">After fix</span><span class="triad-bar is-after"><i /></span><span class="ui-pill is-verified is-sm">Verified</span></span>
            </span>
          </span>

          <!-- Time: one request, one review, one dispatch — no phone tag in between. -->
          <span v-else class="triad-viz" aria-hidden="true">
            <span class="triad-viz-label">One request</span>
            <span class="triad-steps">
              <span v-for="(s, j) in timeline" :key="s.label" class="triad-step" :class="s.tone" :style="{ '--j': j }">
                <span class="triad-step-dot" />
                <span class="triad-step-name">{{ s.label }}</span>
              </span>
            </span>
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.triad {
  width: 100%;
  min-width: 0;
  container-type: inline-size;
}
.triad-frame {
  display: grid;
  gap: 14px;
  background: var(--dark);
  border: 1px solid var(--dark-line);
  border-radius: 20px;
  padding: 18px;
}
.triad-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 2px 4px 0;
}
.triad-label {
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
}
.triad-loop {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px 4px 6px;
  border-radius: 999px;
  background: var(--dark-2);
  border: 1px solid var(--dark-line);
  font-size: 11.5px;
  font-weight: 500;
  color: var(--on-dark-muted);
  white-space: nowrap;
}
.triad-loop img { width: 16px; height: 16px; border-radius: 4px; display: block; }

.triad-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.triad-row {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) clamp(150px, 36%, 230px);
  column-gap: 14px;
  align-items: center;
  padding: 18px 18px;
  background: var(--card);
  border-radius: 14px;
  min-width: 0;
  opacity: 0;
  transform: translateY(8px);
  animation: triad-in 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  animation-delay: calc(0.1s + var(--i) * 0.13s);
}
.triad-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--status-ok-bg);
  color: var(--accent);
  align-self: start;
}
.triad-text {
  display: grid;
  gap: 3px;
  min-width: 0;
  align-self: start;
}
.triad-title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
  line-height: 1.25;
}
.triad-line {
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-2);
  text-wrap: pretty;
}

/* Evidence sketches — qualitative shapes only, no numbers. */
.triad-viz {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding-left: 16px;
  border-left: 1px solid var(--line-soft);
}
.triad-viz-label {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Energy sparkline. The SVG stretches to the column (non-scaling strokes), so
   the "Fixed" tag is HTML pinned at the marker's x (112 / 220). */
.triad-spark-wrap { position: relative; display: block; }
.triad-spark { width: 100%; height: 64px; display: block; overflow: visible; }
.spark-fixed {
  position: absolute;
  top: -1px;
  left: calc(50.9% + 5px);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  color: var(--ink-2);
}
.spark-waste { fill: var(--status-warn-bg); }
.spark-base { fill: none; stroke: var(--line-strong); stroke-width: 1; stroke-dasharray: 3 3; vector-effect: non-scaling-stroke; }
.spark-fix { fill: none; stroke: var(--line-strong); stroke-width: 1; vector-effect: non-scaling-stroke; }
.spark-line {
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: triad-draw 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.spark-line.is-high { stroke: var(--status-warn-ink); animation-delay: 0.45s; }
.spark-line.is-low { stroke: var(--accent); animation-delay: 0.95s; }

/* Money bars */
.triad-bars { display: grid; gap: 10px; }
.triad-bar-row {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
}
.triad-bar-name { font-size: 11px; color: var(--ink-2); white-space: nowrap; }
.triad-bar { display: block; height: 10px; border-radius: 999px; background: var(--surface-2); overflow: hidden; min-width: 0; }
.triad-bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  transform-origin: left center;
  transform: scaleX(0);
  animation: triad-grow 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.triad-bar.is-base i { width: 100%; background: var(--line-strong); animation-delay: 0.6s; }
.triad-bar.is-after i { width: 58%; background: var(--accent); animation-delay: 0.85s; }
.triad-bar-row .ui-pill { grid-column: 3; }
.triad-bar-row:first-child { grid-template-columns: 52px minmax(0, 1fr); }

/* Time steps */
.triad-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 4px;
}
.triad-step {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 6px;
  min-width: 0;
}
/* Track segment from this dot to the next one. */
.triad-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: var(--line-soft);
  z-index: 0;
}
.triad-step.is-review::after { background: var(--accent); opacity: 0.35; }
.triad-step-dot {
  position: relative;
  z-index: 1;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--card);
  border: 2px solid var(--line-strong);
  transform: scale(0);
  animation: triad-pop 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.3) forwards;
  animation-delay: calc(0.7s + var(--j) * 0.18s);
}
.triad-step.is-review .triad-step-dot { border-color: var(--warn); background: var(--status-review-bg); }
.triad-step.is-done .triad-step-dot { border-color: var(--accent); background: var(--accent); }
.triad-step-name {
  font-size: 10.5px;
  line-height: 1.2;
  color: var(--ink-2);
  white-space: nowrap;
}
.triad-step.is-done .triad-step-name { color: var(--accent); font-weight: 600; }

@keyframes triad-in { to { opacity: 1; transform: translateY(0); } }
@keyframes triad-draw { to { stroke-dashoffset: 0; } }
@keyframes triad-grow { to { transform: scaleX(1); } }
@keyframes triad-pop { to { transform: scale(1); } }
@media (prefers-reduced-motion: reduce) {
  .triad-row { animation: none; opacity: 1; transform: none; }
  .spark-line { animation: none; stroke-dashoffset: 0; }
  .triad-bar i { animation: none; transform: none; }
  .triad-step-dot { animation: none; transform: none; }
}

/* Narrow: the sketch drops under the text, full width of the row. */
@container (max-width: 560px) {
  .triad-row { grid-template-columns: 34px minmax(0, 1fr); row-gap: 12px; padding: 14px; }
  .triad-viz {
    grid-column: 2;
    padding-left: 0;
    border-left: 0;
    padding-top: 10px;
    border-top: 1px solid var(--line-soft);
  }
  .triad-spark { height: 48px; }
}
@container (max-width: 360px) {
  .triad-frame { padding: 12px; }
  .triad-loop { display: none; }
}
</style>
