<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { MV_PATH } from '@/seo/site'
import UiMeterTrend from '@/components/ui/UiMeterTrend.vue'
import UiCauseCard from '@/components/ui/UiCauseCard.vue'
import UiBeforeAfter from '@/components/ui/UiBeforeAfter.vue'

/**
 * Energy and M&V as a three-panel diagram: anomaly → likely cause and work
 * order → verified result. The `evidence` slot is where report-backed proof
 * renders once it is signed off (HomePage gates it behind showEvidence).
 */
</script>

<template>
  <section id="energy" class="section is-tint">
    <div class="shell">
      <div class="energy-head">
        <div>
          <p class="eyebrow">Continuous optimization</p>
          <h2 class="h2">Meter data in. Verified savings out.</h2>
        </div>
        <p class="lede">Edviro learns each site’s baseline, flags anomalies, finds the likely cause, and measures the results.</p>
      </div>

      <div class="flow">
        <div class="flow-step">
          <span class="flow-label"><b>1</b> Detect</span>
          <UiMeterTrend variant="anomaly" title="Main meter · 7 days" flag="After-hours load +38%" />
        </div>
        <div class="flow-step">
          <span class="flow-label"><b>2</b> Diagnose and route</span>
          <UiCauseCard />
        </div>
        <div class="flow-step">
          <span class="flow-label"><b>3</b> Verify</span>
          <UiBeforeAfter title="Verification · 30 days" delta="−18% kWh" note="Measured against the learned baseline after the schedule fix" />
        </div>
      </div>

      <slot name="evidence" />

      <p class="energy-foot">
        <RouterLink :to="MV_PATH" class="text-link">How measurement and verification works →</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.energy-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px 48px;
  align-items: end;
  margin-bottom: 36px;
}
.energy-head .lede { margin: 0; }
.flow {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}
.flow-step {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  align-content: start;
  min-width: 0;
}
.flow-step > :deep(.ui-card) { align-content: start; }
.flow-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -22px;
  width: 8px;
  height: 8px;
  border-top: 1.5px solid var(--line-strong);
  border-right: 1.5px solid var(--line-strong);
  transform: translateY(-50%) rotate(45deg);
}
.flow-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-2);
}
.flow-label b {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  background: var(--ink);
  color: var(--on-dark);
}
.energy-foot {
  margin: 24px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-size: 13px;
  color: var(--muted-2);
}
.energy-foot .text-link { font-size: 13px; }
@media (max-width: 900px) {
  .flow { grid-template-columns: minmax(0, 1fr); gap: 22px; }
  .flow-step:not(:last-child)::after {
    top: auto;
    right: auto;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%) rotate(135deg);
  }
}
@media (max-width: 768px) {
  .energy-head { grid-template-columns: minmax(0, 1fr); margin-bottom: 26px; }
}
</style>
