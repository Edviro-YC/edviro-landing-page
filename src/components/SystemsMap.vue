<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { CMMS_PATH } from '@/seo/site'

/**
 * Hub-and-spoke of the systems Edviro reads from and writes to. Named by
 * category, not vendor: integration scope is confirmed system by system and
 * no partner marks are shown until verified.
 */
const inputs = [
  { title: 'Building systems', detail: 'Modern BMS and legacy controls' },
  { title: 'Utility data', detail: 'Interval meters, bills, Green Button' },
  { title: 'Requests', detail: 'App, email, and staff messages' },
]
const outputs = [
  { title: 'Work orders', detail: 'Native, or your existing CMMS' },
  { title: 'Field teams', detail: 'Mobile updates, photos, inspections' },
  { title: 'Plans and reports', detail: 'M&V, budgets, capital plan' },
]
</script>

<template>
  <section id="systems" class="section is-dark">
    <div class="shell">
      <div class="sys-head">
        <div>
          <h2 class="h2">Works with what you already have.</h2>
        </div>
        <p class="lede">Connect the systems you run today; integration scope is confirmed system by system.</p>
      </div>

      <div class="sys-map" role="img" aria-label="Diagram: building systems, utility data, and requests flow into Edviro; Edviro produces work orders, field updates, and plans and reports.">
        <ul class="sys-col" aria-hidden="true">
          <li v-for="item in inputs" :key="item.title" class="sys-node">
            <span class="sys-title">{{ item.title }}</span>
            <span class="sys-detail">{{ item.detail }}</span>
          </li>
        </ul>
        <div class="sys-hub" aria-hidden="true">
          <!-- Curves start at each node's vertical center (29 / 100 / 171 of 200) and converge on the hub. -->
          <svg class="sys-lines is-left" viewBox="0 0 100 200" preserveAspectRatio="none">
            <path d="M0 29 C50 29 60 100 100 100" />
            <path d="M0 100 H100" />
            <path d="M0 171 C50 171 60 100 100 100" />
          </svg>
          <span class="sys-core">Edviro</span>
          <svg class="sys-lines is-right" viewBox="0 0 100 200" preserveAspectRatio="none">
            <path d="M0 100 C40 100 50 29 100 29" />
            <path d="M0 100 H100" />
            <path d="M0 100 C40 100 50 171 100 171" />
          </svg>
        </div>
        <ul class="sys-col" aria-hidden="true">
          <li v-for="item in outputs" :key="item.title" class="sys-node">
            <span class="sys-title">{{ item.title }}</span>
            <span class="sys-detail">{{ item.detail }}</span>
          </li>
        </ul>
      </div>

      <p class="sys-foot">
        <span>Keep what works. Consolidate what doesn’t.</span>
        <RouterLink :to="CMMS_PATH" class="text-link">Replace or integrate your CMMS →</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.sys-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px 48px;
  align-items: end;
  margin-bottom: 40px;
}
.sys-head .lede { margin: 0; }
.sys-map {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(200px, 0.7fr) minmax(0, 1fr);
  gap: 0;
  align-items: center;
}
.sys-col {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.sys-node {
  display: grid;
  gap: 2px;
  padding: 14px 16px;
  background: var(--dark-2);
  border: 1px solid var(--dark-line);
  border-radius: 14px;
  min-width: 0;
}
.sys-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--on-dark);
}
.sys-detail {
  font-size: 13px;
  color: var(--on-dark-muted);
}
.sys-hub {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  align-self: stretch;
}
.sys-lines {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.sys-lines path {
  fill: none;
  stroke: var(--success);
  stroke-opacity: 0.55;
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
}
.sys-lines path:nth-child(2) { stroke-opacity: 0.8; }
.sys-core {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--on-dark);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.02em;
  box-shadow: 0 0 0 10px rgba(22, 73, 61, 0.35);
}
.sys-foot {
  margin: 34px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--on-dark);
}
.sys-foot .text-link { font-weight: 500; }
@media (max-width: 900px) {
  .sys-head { grid-template-columns: minmax(0, 1fr); margin-bottom: 28px; }
  .sys-map { grid-template-columns: minmax(0, 1fr); gap: 18px; }
  .sys-hub { grid-template-columns: 1fr; justify-items: center; }
  .sys-lines { display: none; }
  .sys-core { width: 84px; height: 84px; font-size: 15px; }
}
</style>
