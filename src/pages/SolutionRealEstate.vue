<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import IndustryFlow from '@/components/industry/IndustryFlow.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import UiApprovalCard from '@/components/ui/UiApprovalCard.vue'
import UiLoadCompare from '@/components/ui/UiLoadCompare.vue'
import UiOccupancyTrend from '@/components/ui/UiOccupancyTrend.vue'
import UiWorkQueue, { type Row } from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import {
  CAPITAL_PLANNING_PATH,
  MV_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  PLATFORM_WORK_ORDERS_PATH,
  SOLUTION_REAL_ESTATE_PATH,
} from '@/seo/site'

/**
 * Commercial real estate. The signature visual is the occupancy → approved
 * HVAC action → verified load flow. No dollar outcomes anywhere on the page
 * (claim guardrail): results are stated as measured load, and every setpoint
 * or schedule change is shown passing a named approver. Copy is one short
 * sentence per point; the visuals carry the detail.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: SOLUTION_REAL_ESTATE_PATH },
  { name: 'Commercial real estate', path: SOLUTION_REAL_ESTATE_PATH },
]

const flowSteps = [
  { label: 'Occupancy signal', caption: 'WiFi device counts fall to near zero at 6 pm. The zone stays in occupied mode.' },
  { label: 'Approved action', caption: 'Edviro proposes the setback and restore rule. Facilities approves it. The BMS applies it.' },
  { label: 'Verified result', caption: 'After-hours load is compared with the same-weekday baseline over five nights.' },
]

const queueRows: Row[] = [
  { title: 'Floor 4 East after-hours setback', priority: 'Medium', trade: 'HVAC', status: 'Awaiting review' },
  { title: 'Chiller 2 short cycling on weekends', priority: 'High', trade: 'Mechanical', status: 'In progress' },
  { title: 'Lobby lighting override past 11 pm', priority: 'Low', trade: 'Electrical', status: 'Verified' },
]

const points = [
  { lead: 'Connects what is there:', text: 'BMS, main meters, submeters, and the WiFi controllers on each floor.' },
  { lead: 'Occupancy-aware proposals:', text: 'setbacks, restore rules, and pre-cooling, each with the evidence attached.' },
  { lead: 'Approval before action:', text: 'a named person approves each schedule or setpoint change.' },
  { lead: 'Verified on the meter:', text: 'each change is checked against the baseline and reported as measured load.' },
]

const faqs: FaqItem[] = [
  {
    question: 'How does occupancy-based control work without new sensors?',
    answer:
      'Edviro reads occupancy from the WiFi controllers on each floor. It compares that with the HVAC and lighting mode of each zone. When the two disagree, it proposes a schedule change with the evidence attached. No new sensors are installed.',
  },
  {
    question: 'Does Edviro change setpoints or schedules on its own?',
    answer:
      'No. Edviro proposes. A named person on your team approves, edits, or rejects. Approved changes go through your BMS schedule. Each one is logged with who approved it and when.',
  },
  {
    question: 'Will setbacks affect tenant comfort?',
    answer:
      'Setbacks apply only to empty space. Your team sets the restore rule: first badge-in, first WiFi device, or a fixed time. If a zone fills early, the restore fires and the event is recorded.',
  },
  {
    question: 'What systems does Edviro connect to in a commercial building?',
    answer:
      'The BMS, main meters and submeters, and WiFi occupancy data. Work orders are native in Edviro or routed to your CMMS. Integration scope is confirmed system by system before a pilot.',
  },
  {
    question: 'How does Edviro reduce peak demand charges?',
    answer:
      'Edviro forecasts the daily peak from weather, occupancy, and load history. It proposes pre-cooling or load shifting ahead of the peak. Your team approves. The avoided demand is verified in the interval meter data.',
  },
  {
    question: 'How does Edviro help prioritize capital projects across a portfolio?',
    answer:
      'Verified changes and asset history build a model of each building. Retrofits, replacements, and controls upgrades are simulated against it and ranked by payback from your measured use.',
  },
]

usePageSeo({
  title: 'Energy management for commercial real estate',
  description:
    'Occupancy-aware HVAC and lighting from the WiFi, BMS, and meters you have. Your team approves each change. Edviro verifies it on the meter.',
  path: SOLUTION_REAL_ESTATE_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro energy management for commercial real estate',
      description:
        'Occupancy-aware HVAC and lighting proposals for offices and commercial buildings, approved by the facilities team and verified in meter data, using existing WiFi, BMS, and meters.',
      path: SOLUTION_REAL_ESTATE_PATH,
      areaServed: 'United States',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <PlatformHero
      eyebrow="For commercial real estate"
      lede="Edviro reads occupancy from the WiFi, BMS, and meters you have. It proposes HVAC and lighting schedule changes. Your team approves each one. Edviro verifies the load change on the meter."
      note="No change is made until a named person approves it."
      :secondary="{ label: 'How we verify savings', to: MV_PATH }"
    >
      Condition the floors people use. <span class="accent">Not the empty ones.</span>
    </PlatformHero>

    <!-- IN PRACTICE -->
    <section id="in-practice" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">In practice</p>
            <h2 class="h2">An empty wing should not cost a full floor.</h2>
          </div>
          <p class="lede">Occupancy signal, approved action, verified result.</p>
        </div>
        <IndustryFlow
          title="Floor 4 East · Occupancy → HVAC → verification"
          :steps="flowSteps"
          summary="Three-step flow for Floor 4 East: WiFi device counts drop to near zero at 6 pm while HVAC stays in occupied mode; Edviro proposes a setback that facilities approves and the BMS applies; after-hours load is verified 41 percent lower than the same-weekday baseline over five nights."
        >
          <template #step-1><UiOccupancyTrend /></template>
          <template #step-2><UiApprovalCard /></template>
          <template #step-3><UiLoadCompare /></template>
        </IndustryFlow>
      </div>
    </section>

    <!-- WHAT CHANGES -->
    <section id="approach" class="section">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">The approach</p>
          <h2 class="h2">Built for the buildings people work in.</h2>
          <ul class="points">
            <li v-for="p in points" :key="p.lead"><strong>{{ p.lead }}</strong> {{ p.text }}</li>
          </ul>
        </div>
        <div class="visuals">
          <UiWorkQueue
            title="Riverside Tower · Open work"
            :rows="queueRows"
            summary="Open work for Riverside Tower: a Floor 4 East after-hours setback awaiting review, chiller 2 short cycling in progress, and a lobby lighting override verified fixed."
          />
        </div>
      </div>
    </section>

    <!-- PORTFOLIO -->
    <section class="section is-dark">
      <div class="shell">
        <h2 class="h2 dark-h2">One playbook for the whole portfolio.</h2>
        <p class="lede">Each verified change feeds the capital plan: which buildings, systems, and retrofits pay back first, modeled from measured use.</p>
        <div class="links">
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link">Capital planning →</RouterLink>
          <RouterLink :to="PLATFORM_WORK_ORDERS_PATH" class="text-link">Work orders with human review →</RouterLink>
          <RouterLink :to="PLATFORM_FACILITIES_OPS_PATH" class="text-link">See the full platform →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from operators" heading="Commercial real estate FAQ" :items="faqs" />

    <CtaSection />
  </main>
</template>

<style scoped>
.two-up {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px 56px;
  align-items: center;
}
.head { align-items: end; margin-bottom: 32px; }
.head .lede { margin: 0; }
.points {
  margin: 20px 0 0;
  padding: 0 0 0 18px;
  display: grid;
  gap: 10px;
  font-size: 15.5px;
  line-height: 1.5;
  color: var(--ink-2);
}
.points li::marker { color: var(--accent); }
.points strong { color: var(--ink); font-weight: 600; }
.visuals {
  display: grid;
  gap: 14px;
  min-width: 0;
}
.dark-h2 { color: #F2F5F1; max-width: 720px; }
.is-dark .lede { max-width: 720px; }
.links {
  margin-top: 26px;
  display: flex;
  gap: 8px 24px;
  flex-wrap: wrap;
  font-size: 15px;
}
@media (max-width: 900px) {
  .two-up { grid-template-columns: minmax(0, 1fr); gap: 28px; }
}
</style>
