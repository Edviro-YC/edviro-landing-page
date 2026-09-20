<script setup lang="ts">
import UiApprovalCard from '@/components/ui/UiApprovalCard.vue'
import UiModelInputs from '@/components/ui/UiModelInputs.vue'

/**
 * The technical loop. Lives on /about/ (linked from the homepage workflow's
 * "Read the technical version"), so buyers meet the solution sections before
 * this. Each stage is introduced with the buyer-facing phrase first and the
 * technical term second, and carries the concrete inputs or outputs as chips
 * instead of a paragraph. The two callouts underneath show the model the loop
 * accumulates into and the approval gate every side effect passes through.
 */
const stages = [
  {
    tech: 'Ingest',
    plain: 'Connect your systems',
    detail: 'One operational record per building. Keep what works; nothing has to be replaced to start.',
    chips: ['Bills', 'Interval meters', 'BMS exports', 'Staff requests', 'Work-order systems'],
    icon: 'M4 7h16 M4 12h16 M4 17h10',
  },
  {
    tech: 'Detect and diagnose',
    plain: 'Spot the problem, find the likely cause',
    detail: 'Learned normal load, schedules, and equipment behavior; drift and faults explained with context.',
    chips: ['Learned baseline', 'Drift', 'Faults', 'Calendar · weather · asset history'],
    icon: 'M3 12h4l3-7 4 14 3-7h4',
  },
  {
    tech: 'Act',
    plain: 'Assign or make the fix',
    detail: 'The work order, the technician\'s steps, or a schedule change, staged for approval before anything runs.',
    chips: ['Work order', 'Technician steps', 'Schedule or setpoint change'],
    icon: 'M14 6l4 4-9 9H5v-4z M13 7l4 4',
    human: true,
  },
  {
    tech: 'Verify',
    plain: 'Confirm that it worked',
    detail: 'Every change checked against the learned baseline in the meter and building data. If it did not hold, the record says why.',
    chips: ['Baseline comparison', 'Held', 'Did not hold → reopened'],
    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8 12l3 3 5-6',
  },
]
</script>

<template>
  <!-- THE TECHNICAL LOOP -->
  <section id="loop" class="section is-tint">
    <div class="shell">
      <div class="loop-head">
        <div>
          <p class="eyebrow">Under the hood: the closed loop</p>
          <h2 class="h2">Monitoring tools stop at the chart. Edviro is the layer that acts on it.</h2>
        </div>
        <p class="lede">One loop across energy, diagnostics, work orders, assets, and planning: connect the data, find the problem, coordinate the fix, then check the result in the building data.</p>
      </div>

      <ol class="tloop" aria-label="The technical loop">
        <li v-for="(s, i) in stages" :key="s.tech" class="tloop-node" :class="{ 'is-human': s.human }">
          <div class="tloop-top">
            <span class="tloop-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path :d="s.icon" /></svg>
            </span>
            <span class="tloop-tech">{{ String(i + 1).padStart(2, '0') }} / {{ s.tech }}</span>
          </div>
          <h3 class="tloop-title">{{ s.plain }}</h3>
          <p class="tloop-detail">{{ s.detail }}</p>
          <ul class="tloop-chips" aria-label="Inputs and outputs">
            <li v-for="c in s.chips" :key="c" class="chip">{{ c }}</li>
          </ul>
          <span v-if="s.human" class="ui-pill is-verified tloop-tag">Human approval before anything runs</span>
        </li>
      </ol>
      <p class="tloop-return"><span>Verified outcomes retrain the model; recurrence feeds preventive maintenance and the capital plan</span></p>

      <div class="tloop-callouts">
        <div class="tloop-callout">
          <div>
            <h3>A living operational model of each building</h3>
            <p>Every reading, work order, inspection, and verified fix accumulates into one model per building, what engineers call a digital twin. It is how a repair-or-replace decision or a new schedule is tested against real behavior before anyone commits money.</p>
          </div>
          <UiModelInputs
            model-title="Living model · one per building"
            model-meta="Recalibrated as every fix is verified"
            flag="Digital twin"
            summary="Seven data sources, from utility bills to work orders and fixes, flow into one living model per building that is recalibrated as every fix is verified."
          />
        </div>
        <div class="tloop-callout">
          <div>
            <h3>Edviro watches and follows up; people stay in charge</h3>
            <p>AI agents read the data around the clock, draft the work order, and check whether the fix held. Every side effect is reviewed and approved by your team, and Edviro does not replace your staff, engineers, contractors, or building controls.</p>
          </div>
          <UiApprovalCard />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#loop { scroll-margin-top: 80px; }
.loop-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px 48px;
  align-items: end;
  margin-bottom: 40px;
}
.loop-head .lede { margin: 0; }
.tloop {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 26px;
}
.tloop-node {
  position: relative;
  display: grid;
  gap: 8px;
  align-content: start;
  padding: 18px 16px 16px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  min-width: 0;
}
.tloop-node:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -22px;
  width: 18px;
  height: 1.5px;
  background: var(--line-strong);
  transform: translateY(-50%);
}
.tloop-node:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -8px;
  width: 7px;
  height: 7px;
  border-top: 1.5px solid var(--line-strong);
  border-right: 1.5px solid var(--line-strong);
  transform: translateY(-50%) rotate(45deg);
}
.tloop-node.is-human {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(22, 73, 61, 0.08);
}
.tloop-top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.tloop-icon {
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  color: var(--accent);
}
.is-human .tloop-icon {
  background: var(--accent);
  color: var(--on-dark);
}
.tloop-tech {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
}
.tloop-title {
  margin: 4px 0 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.tloop-detail {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-2);
  text-wrap: pretty;
}
.tloop-chips {
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tloop-chips .chip {
  white-space: normal;
  font-size: 12px;
  padding: 4px 9px;
  background: var(--surface);
}
.tloop-tag {
  justify-self: start;
  margin-top: 2px;
  white-space: normal;
}
.tloop-return {
  position: relative;
  margin: 22px 0 0;
  text-align: center;
  font-size: 13px;
  color: var(--muted-2);
}
.tloop-return::before {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  top: 50%;
  border-top: 1.5px dashed var(--line-strong);
}
.tloop-return span {
  position: relative;
  background: var(--surface-2);
  padding: 0 12px;
}
.tloop-callouts {
  margin-top: 44px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.tloop-callout {
  display: grid;
  gap: 18px;
  align-content: start;
  padding: 22px 24px 24px;
  border-radius: 18px;
  background: var(--card);
  border: 1px solid var(--line);
  min-width: 0;
}
.tloop-callout h3 {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.tloop-callout p {
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  color: var(--ink-2);
  text-wrap: pretty;
}
@media (max-width: 1024px) {
  .tloop { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .tloop-node:nth-child(2)::after,
  .tloop-node:nth-child(2)::before { display: none; }
}
@media (max-width: 768px) {
  .loop-head { grid-template-columns: minmax(0, 1fr); margin-bottom: 28px; }
  .tloop { grid-template-columns: minmax(0, 1fr); gap: 18px; }
  .tloop-node:nth-child(2)::after,
  .tloop-node:nth-child(2)::before { display: block; }
  .tloop-node:not(:last-child)::after {
    top: auto;
    right: auto;
    bottom: -18px;
    left: 32px;
    width: 1.5px;
    height: 14px;
    transform: none;
  }
  .tloop-node:not(:last-child)::before {
    top: auto;
    right: auto;
    bottom: -14px;
    left: 29px;
    transform: rotate(135deg);
  }
  .tloop-return::before { left: 0; right: 0; }
  .tloop-callouts { grid-template-columns: minmax(0, 1fr); }
}
</style>
