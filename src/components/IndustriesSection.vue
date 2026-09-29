<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  SCHOOL_ENERGY_PATH,
  SOLUTION_CONSTRUCTION_PATH,
  SOLUTION_DATA_CENTERS_PATH,
  SOLUTION_HEALTHCARE_PATH,
  SOLUTION_REAL_ESTATE_PATH,
} from '@/seo/site'

/**
 * Industries: one config, one module template, so every industry gets the
 * same dimensions, copy length (one sentence), and fidelity.
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
        <h2 class="h2">Install Edviro in:</h2>
      </div>
      <ul class="ind-grid">
        <li v-for="ind in industries" :key="ind.id" class="ind">
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
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  padding: 18px 18px 20px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 18px;
  min-width: 0;
}
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
  .ind-grid { grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .ind { padding: 16px 16px 18px; gap: 8px; }
}
</style>
