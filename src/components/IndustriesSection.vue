<script setup lang="ts">
import { RouterLink } from 'vue-router'
import UiMeterTrend from '@/components/ui/UiMeterTrend.vue'
import UiOccupancyTrend from '@/components/ui/UiOccupancyTrend.vue'
import UiRackHeatmap from '@/components/ui/UiRackHeatmap.vue'
import UiVarianceChart from '@/components/ui/UiVarianceChart.vue'
import UiWorkQueue from '@/components/ui/UiWorkQueue.vue'
import {
  SCHOOL_ENERGY_PATH,
  SOLUTION_CONSTRUCTION_PATH,
  SOLUTION_DATA_CENTERS_PATH,
  SOLUTION_HEALTHCARE_PATH,
  SOLUTION_REAL_ESTATE_PATH,
} from '@/seo/site'

/**
 * Industries: one config, one module template, so every industry gets the
 * same dimensions, copy length (one sentence), and fidelity — including the
 * product crop, which sits in a fixed-height slot for every module.
 * Education is explicit here; it is not the category definition above.
 */
interface Industry {
  id: 'data-centers' | 'education' | 'real-estate' | 'healthcare' | 'construction'
  title: string
  body: string
  to: string
  linkText: string
  icon: string
}

const industries: Industry[] = [
  {
    id: 'data-centers',
    title: 'Data centers',
    body: 'Verify cooling changes against measured telemetry before adding load.',
    to: SOLUTION_DATA_CENTERS_PATH,
    linkText: 'Data centers',
    icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  },
  {
    id: 'education',
    title: 'Education',
    body: 'Energy, work orders, assets, and capital planning for K‑12 and higher ed.',
    to: SCHOOL_ENERGY_PATH,
    linkText: 'Education',
    icon: 'M3 9l9-5 9 5-9 5zM7 11v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5',
  },
  {
    id: 'real-estate',
    title: 'Commercial real estate',
    body: 'Occupancy-aware HVAC across a portfolio, with every change reviewed first.',
    to: SOLUTION_REAL_ESTATE_PATH,
    linkText: 'Commercial real estate',
    icon: 'M4 21V5l7-2v18M11 21h9V9h-9M7 7h.01M7 11h.01M7 15h.01M15 12h.01M15 16h.01',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    body: 'Documented, reviewed work across critical environments and support spaces.',
    to: SOLUTION_HEALTHCARE_PATH,
    linkText: 'Healthcare',
    icon: 'M4 21V7l8-4 8 4v14M12 9v6M9 12h6',
  },
  {
    id: 'construction',
    title: 'Construction',
    body: 'Independent baselining and M&V from construction through handoff.',
    to: SOLUTION_CONSTRUCTION_PATH,
    linkText: 'Construction',
    icon: 'M3 21h18M6 21V9l6-3 6 3v12M10 21v-5h4v5',
  },
]
</script>

<template>
  <section id="industries" class="section">
    <!-- #who is the legacy anchor for this section. -->
    <span id="who" aria-hidden="true" class="anchor-alias"></span>
    <div class="shell">
      <div class="ind-head">
        <p class="eyebrow">Industries</p>
        <h2 class="h2">Built for the teams that run buildings.</h2>
      </div>
      <ul class="ind-grid">
        <li v-for="ind in industries" :key="ind.id" class="ind">
          <div class="ind-crop">
            <UiRackHeatmap
              v-if="ind.id === 'data-centers'"
              title="Pod 3 · Modeled inlet"
              flag="±0.4 °C"
              note="Warm end of aisle B closest to the design limit."
              summary="Heatmap of modeled rack inlet temperatures for one pod, within 0.4 degrees Celsius of measured; the warm end of aisle B sits closest to the design inlet limit."
            />
            <UiMeterTrend
              v-else-if="ind.id === 'education'"
              title="Main meter · 7 days"
              flag="Weekend load +38%"
              summary="Chart of a week of school meter readings against the learned baseline band, with weekend load 38 percent above it flagged."
            />
            <UiOccupancyTrend
              v-else-if="ind.id === 'real-estate'"
              title="Floor 4 East · Devices"
              flag="Still occupied mode"
              note="Devices near zero after 6 pm; zone still conditioned."
              summary="Bar chart of WiFi devices on Floor 4 East through the evening: counts fall to near zero after 6 pm while the zone is still conditioned as occupied."
            />
            <UiWorkQueue
              v-else-if="ind.id === 'healthcare'"
              title="Open · Support spaces"
              :rows="[
                { title: 'AHU-2 filter ΔP · Wing C', priority: 'High', trade: 'HVAC', status: 'Reviewed' },
                { title: 'Pharmacy cooler alarm', priority: 'Medium', trade: 'Refrig.', status: 'In progress' },
              ]"
              summary="Work queue for hospital support spaces: a high-priority AHU-2 filter pressure issue in Wing C, reviewed; a pharmacy cooler alarm in progress."
            />
            <UiVarianceChart
              v-else
              title="Tower A · Model vs measured"
              flag="+8% flagged"
              note="Weeks 3–4 ran over the design model; back to model after commissioning."
              summary="Grouped bar chart of weekly energy for Tower A, design model beside measured: weeks 3 and 4 ran 8 to 9 percent over and were flagged; measured returned to model after the commissioning fix."
            />
          </div>
          <div class="ind-title-row">
            <span class="ind-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="ind.icon" /></svg>
            </span>
            <h3 class="ind-title">{{ ind.title }}</h3>
          </div>
          <p class="ind-body">{{ ind.body }}</p>
          <RouterLink :to="ind.to" class="text-link ind-link">{{ ind.linkText }} →</RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.anchor-alias {
  position: absolute;
  top: 0;
  left: 0;
}
#industries { position: relative; }
.ind-head {
  max-width: 680px;
  margin-bottom: 34px;
}
.ind-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}
.ind {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 10px;
  padding: 12px 16px 18px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 18px;
  min-width: 0;
}
/* Same slot for every industry: fixed height, top-aligned, soft crop at the foot. */
.ind-crop {
  height: 168px;
  overflow: hidden;
  border-radius: 14px;
  mask-image: linear-gradient(to bottom, #000 72%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, #000 72%, transparent 100%);
  margin: 0 -4px 4px;
  padding: 4px 4px 0;
}
/* Crops are narrow: let the card head wrap so the label isn't cut to three letters. */
.ind-crop :deep(.ui-head) { flex-wrap: wrap; row-gap: 6px; }
.ind-crop :deep(.ui-head > :first-child) { flex: 1 1 100%; }
.ind-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.ind-icon {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--card);
  border: 1px solid var(--line);
  color: var(--accent);
}
.ind-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.2;
}
.ind-body {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-2);
  text-wrap: pretty;
}
.ind-link {
  font-size: 14px;
  justify-self: start;
}
@media (max-width: 1100px) {
  .ind-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 768px) {
  .ind-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ind-head { margin-bottom: 24px; }
}
@media (max-width: 520px) {
  .ind-grid { grid-template-columns: minmax(0, 1fr); }
  .ind-crop { height: auto; mask-image: none; -webkit-mask-image: none; overflow: visible; }
}
</style>
