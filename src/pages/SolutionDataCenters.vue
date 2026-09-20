<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import IndustryFlow from '@/components/industry/IndustryFlow.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import StepStrip, { type Step } from '@/components/platform/StepStrip.vue'
import UiCapacityGauge from '@/components/ui/UiCapacityGauge.vue'
import UiRackHeatmap from '@/components/ui/UiRackHeatmap.vue'
import UiTelemetryList from '@/components/ui/UiTelemetryList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import {
  CAPITAL_PLANNING_PATH,
  PLATFORM_ASSETS_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  SOLUTION_DATA_CENTERS_PATH,
} from '@/seo/site'

/**
 * Data centers. Scope is deliberately narrow — thermal headroom modeling,
 * verified on one live pod — and stays that way here. The page implies no
 * existing data-center customers, no uptime guarantee, and no control of
 * the cooling plant (Edviro models and simulates; the team decides). Copy is
 * one short sentence per point; the visuals carry the detail.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: SOLUTION_DATA_CENTERS_PATH },
  { name: 'Data centers', path: SOLUTION_DATA_CENTERS_PATH },
]

const flowSteps = [
  { label: 'Telemetry', caption: 'Power, cooling, and environmental feeds the site already records. Nothing new is installed.' },
  { label: 'Calibrated model', caption: 'A physics-based model fit to measured inlet temperatures. Re-checked as load and layout change.' },
  { label: 'Headroom', caption: 'Cooling headroom at the design inlet limit, plus one simulated density step. Simulated, never applied.' },
]

const pilot: Step[] = [
  { title: 'Connect', detail: 'Read-only access to the PDU, CRAH, and sensor exports the site already produces.', icon: 'connect' },
  { title: 'Calibrate', detail: 'Fit the thermal model to the pod\u2019s measured inlet temperatures.', icon: 'calibrate' },
  { title: 'Simulate', detail: 'Run a density scenario against the model, not the live floor.', icon: 'simulate' },
  { title: 'Verify', detail: 'Compare predicted with measured inlet temperatures. Report how far the model can be trusted.', icon: 'verify' },
  { title: 'Decide', detail: 'Any change to the floor or the cooling plant stays with your team and your vendors.', human: true, tag: 'Your team decides', icon: 'review' },
]

const faqs: FaqItem[] = [
  {
    question: 'What data does Edviro need from a data center?',
    answer:
      'The telemetry the site already exports: power at the rack, pod, and site level, cooling plant data, supply and return temperatures, and environmental sensors. Nothing new is installed. Access is read-only.',
  },
  {
    question: 'How is this different from a one-time CFD study?',
    answer:
      'A study answers one design question, then goes stale as the floor changes. Edviro keeps the model calibrated to measured telemetry, so the headroom answer stays current.',
  },
  {
    question: 'What does the pilot look like?',
    answer:
      'One live pod. Edviro calibrates the thermal model to the pod\u2019s telemetry, simulates a density scenario, and verifies predictions against measured data. You get a stated model accuracy and a headroom figure. A short pilot outline is available on request.',
  },
  {
    question: 'Does Edviro control the cooling plant?',
    answer:
      'No. Edviro models and simulates. Any change to the floor or the cooling plant stays with your team and your vendors.',
  },
  {
    question: 'What question does it answer?',
    answer:
      'How many more racks the site can take before cooling becomes the constraint, on the infrastructure you have, and how confident that answer is.',
  },
]

usePageSeo({
  title: 'Thermal headroom modeling for data centers',
  description:
    'A physics-based thermal model of your data center, calibrated to the telemetry you already export. It quantifies cooling headroom and is verified on one live pod.',
  path: SOLUTION_DATA_CENTERS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro thermal headroom modeling for data centers',
      description:
        'Physics-based thermal modeling, cooling headroom quantification, and density simulation for data centers, verified against measured telemetry on one live pod.',
      path: SOLUTION_DATA_CENTERS_PATH,
      serviceType: 'Thermal capacity modeling',
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
      eyebrow="For data center operators"
      lede="Edviro fits a physics-based thermal model to the telemetry your site already exports. It answers one question: how many more racks a pod can take before cooling becomes the constraint."
      note="Pilot scope: one live pod. Edviro models and simulates. Changes to the floor stay with your team."
      :secondary="{ label: 'See decision simulation', to: CAPITAL_PLANNING_PATH }"
    >
      Thermal headroom, modeled <span class="accent">from the data you already have.</span>
    </PlatformHero>

    <!-- IN PRACTICE -->
    <section id="in-practice" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">In practice</p>
            <h2 class="h2">One pod, measured proof.</h2>
          </div>
          <p class="lede">Telemetry in. Calibrated model. Headroom out. The model is checked against measured inlet temperatures before anyone plans capacity with it.</p>
        </div>
        <IndustryFlow
          title="Pod 3 · Telemetry → model → headroom"
          :steps="flowSteps"
          summary="Three-step flow for a data center pod: existing telemetry feeds (rack power, supply and return temperatures, inlet sensors, chilled-water delta-T); a modeled inlet-temperature heat map calibrated within 0.4 °C of measured sensors; and a cooling-headroom gauge showing today's load, the modeled headroom, and one simulated density scenario inside the design limit."
        >
          <template #step-1><UiTelemetryList /></template>
          <template #step-2><UiRackHeatmap /></template>
          <template #step-3><UiCapacityGauge /></template>
        </IndustryFlow>
      </div>
    </section>

    <!-- PILOT -->
    <section id="pilot" class="section">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">The pilot</p>
            <h2 class="h2">Five steps, one live pod.</h2>
          </div>
          <p class="lede">The pilot ends with a stated model accuracy and a headroom figure. What you do with it is your call.</p>
        </div>
        <StepStrip :steps="pilot" label="Pilot steps" />
      </div>
    </section>

    <!-- BEYOND HEADROOM -->
    <section class="section is-dark">
      <div class="shell">
        <h2 class="h2 dark-h2">Headroom is one answer. The record is the rest.</h2>
        <p class="lede">The same platform keeps the asset registry, reviewed work orders, and capital scenarios for the rest of the site. The headroom answer lands next to the equipment history and the budget it affects.</p>
        <div class="links">
          <RouterLink :to="PLATFORM_ASSETS_PATH" class="text-link">Asset management →</RouterLink>
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link">Capital planning →</RouterLink>
          <RouterLink :to="PLATFORM_FACILITIES_OPS_PATH" class="text-link">See the full platform →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from operators" heading="Data center FAQ" :items="faqs" />

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
