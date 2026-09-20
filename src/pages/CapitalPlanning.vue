<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import IndustryFlow from '@/components/industry/IndustryFlow.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import UiBaselineFit from '@/components/ui/UiBaselineFit.vue'
import UiCapitalRank from '@/components/ui/UiCapitalRank.vue'
import UiModelInputs from '@/components/ui/UiModelInputs.vue'
import UiScenarioCompare from '@/components/ui/UiScenarioCompare.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  CAPITAL_PLANNING_PATH,
  MV_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  SCHOOL_ENERGY_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Capital planning', path: CAPITAL_PLANNING_PATH },
]

const flow = [
  { label: 'Model', caption: 'Every source Edviro already reads, and every fix it verifies, keeps the model of each building current.' },
  { label: 'Simulate', caption: 'Replacements, retrofits, schedule changes, and rate scenarios run against the model, with payback from your real usage.' },
  { label: 'Decide', caption: 'A ranked plan for the board with the evidence behind each line, then verified results once the work is done.' },
]

const audiences = [
  { title: 'Schools', to: SCHOOL_ENERGY_PATH, line: 'Walk into budget and bond season with a ranked project list and the data behind it.' },
  { title: 'Data centers', to: '/solutions/data-centers/', line: 'How many racks a site can take before cooling is the constraint, simulated before you commit.' },
  { title: 'Construction', to: '/solutions/construction/', line: 'Compare the as-built model to the design model and catch variance before handover.' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is a digital twin of a building?',
    answer:
      'A digital twin is a living operational model of how your building actually behaves, built from the data Edviro already collects: bills, meters, BMS points, weather, tariffs, occupancy, asset records, and every work order and fix. It is not a 3D drawing. It is a model accurate enough to answer "what happens if we change this?" before you change it.',
  },
  {
    question: 'Where does the maintenance history in the capital plan come from?',
    answer:
      'From the work itself. Every work order, inspection, repair, and cost is logged against the asset as the team completes it, so repeated failures and rising repair cost show up on the equipment record automatically. Edviro flags those patterns for repair-or-replace review and carries the evidence into projects and multi-year priorities—no separate data-gathering exercise before budget season.',
  },
  {
    question: 'What kinds of interventions can Edviro simulate?',
    answer:
      'Equipment replacements versus repairs (replace Boiler #2 or keep tuning it), retrofits like controls upgrades or LED conversions, schedule and setpoint changes, rate and tariff changes, and additions like a new wing or electrified fleet. Each simulation returns projected savings, cost avoided, and payback against your real usage, not industry averages.',
  },
  {
    question: 'How do I know the projections are trustworthy?',
    answer:
      'Every projection uses the same learned baseline Edviro uses for measurement and verification, calibrated continuously against your actual meter data. And after you act on a recommendation, Edviro verifies the outcome against that baseline, so projections are checked against reality, and the model gets more accurate with every project.',
  },
  {
    question: 'How does this help with budget and bond planning?',
    answer:
      'Instead of ranking capital projects by age of equipment or gut feel, you rank them by modeled payback from your own data. When budget or bond season comes, you bring the board a prioritized list with projected savings, costs, and evidence, and later, verified results on what you already funded.',
  },
]

usePageSeo({
  title: 'Capital Planning for School Facilities',
  description:
    'Edviro turns asset history, work orders, bills, meters, and BMS data into a living model of each building, then simulates replacements, retrofits, and schedule changes so districts can rank capital projects by real payback before spending a dollar.',
  path: CAPITAL_PLANNING_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro capital planning and intervention simulation',
      description:
        'Simulation of building interventions and capital projects against a living operational model of each building, ranked by projected payback, connected to maintenance history, and verified after the fact.',
      path: CAPITAL_PLANNING_PATH,
      serviceType: 'Capital planning',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <PlatformHero
      eyebrow="Capital planning"
      lede="Every bill, meter reading, BMS point, asset record, and work order builds a living model of your building. Simulate replacements, retrofits, and schedule changes against it, and rank capital projects by real payback before committing a dollar."
      :secondary="{ label: 'How verification works', to: MV_PATH }"
    >
      Test the project <span class="accent">before you spend the budget.</span>
      <template #visual>
        <UiScenarioCompare />
      </template>
    </PlatformHero>

    <!-- DEFINITION -->
    <section class="section">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">Evidence, not gut feel</p>
          <h2 class="h2">Capital decisions, made with evidence.</h2>
          <p class="lede">Most capital plans run on equipment age, vendor quotes, and instinct, while the data that could answer replace-or-repair sits in bills, spreadsheets, BMS exports, and work-order systems. Edviro already pulls it into one place to run the buildings; the capital plan is what it compounds into.</p>
          <ul class="points">
            <li><RouterLink :to="ASSETS_PATH" class="text-link">Asset records and equipment history</RouterLink> accumulate as work is completed; repeat failures flag repair-or-replace review.</li>
            <li>Projects carry an owner, a funding source, and a budget, so the multi-year list traces back to what happened in the buildings.</li>
            <li>That is the link between today's work order and tomorrow's <RouterLink :to="PLATFORM_FACILITIES_OPS_PATH" class="text-link">facilities operations</RouterLink> plan.</li>
          </ul>
        </div>
        <UiModelInputs />
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">How it works</p>
            <h2 class="h2">A model that learns, simulations you can defend.</h2>
          </div>
          <p class="lede">Replace versus repair, answered from your own meter data before the purchase order.</p>
        </div>
        <IndustryFlow
          title="Capital planning · Model, simulate, decide"
          tag="Illustrative"
          :steps="flow"
          summary="Three-step flow: a baseline model fitted to metered data, a simulation comparing a gym lighting-controls retrofit against doing nothing, and a ranked capital plan with the evidence behind each line."
        >
          <template #step-1>
            <UiBaselineFit
              title="Building B · Model fit"
              flag="Calibrated nightly"
              note="Fitted to metered data and weather; every simulation starts from this curve."
              summary="Scatter chart of daily kWh against outdoor temperature for Building B with a fitted baseline curve, calibrated nightly against metered data."
            />
          </template>
          <template #step-2>
            <UiScenarioCompare
              title="Simulation · Gym lighting"
              question="Controls retrofit, or leave as is?"
              :scenarios="[
                { label: 'Leave as is', detail: 'After-hours runtime continues', ratio: 1, cost: '$186k' },
                { label: 'Occupancy controls', detail: 'Verified after-hours use removed', ratio: 0.64, cost: '$119k', winner: true },
              ]"
              result="Retrofit wins · payback 3.1 years"
              note="10-year cost from measured after-hours use and your tariff."
              summary="Simulation comparing leaving gym lighting as is at a projected $186k over ten years against an occupancy-controls retrofit at $119k. The retrofit wins with a 3.1-year payback."
            />
          </template>
          <template #step-3>
            <UiCapitalRank />
          </template>
        </IndustryFlow>
        <RouterLink :to="MV_PATH" class="text-link flow-link">How results are verified after the work →</RouterLink>
      </div>
    </section>

    <!-- WHO USES IT -->
    <section class="section">
      <div class="shell">
        <h2 class="h2 mid-h2">Where simulation matters most</h2>
        <div class="audiences">
          <RouterLink v-for="a in audiences" :key="a.title" :to="a.to" class="audience">
            <span class="audience-title">{{ a.title }} →</span>
            <span class="audience-line">{{ a.line }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Capital planning questions" heading="Frequently asked" :items="faqs" />

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
.flow-link {
  display: inline-block;
  margin-top: 22px;
  font-size: 15px;
}
.mid-h2 {
  font-size: clamp(26px, 3.4vw, 38px);
  margin-bottom: 28px;
}
.audiences {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.audience {
  display: grid;
  gap: 6px;
  align-content: start;
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  color: inherit;
  text-decoration: none;
  transition: border-color 160ms ease;
}
.audience:hover { border-color: var(--ink); }
.audience-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.audience-line {
  font-size: 15px;
  line-height: 1.5;
  color: var(--ink-2);
}
@media (max-width: 900px) {
  .two-up { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .audiences { grid-template-columns: minmax(0, 1fr); }
}
</style>
