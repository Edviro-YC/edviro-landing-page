<script setup lang="ts">
import CtaSection from '@/components/CtaSection.vue'
import EnergySection from '@/components/EnergySection.vue'
import FaqList from '@/components/FaqList.vue'
import OperatingLoop from '@/components/OperatingLoop.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import PlatformRail from '@/components/PlatformRail.vue'
import SystemsMap from '@/components/SystemsMap.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import SegmentCallout from '@/components/platform/SegmentCallout.vue'
import UiMeterTrend from '@/components/ui/UiMeterTrend.vue'
import UiWorkQueue from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import {
  PLATFORM_FACILITIES_OPS_PATH,
  PLATFORM_WORK_ORDERS_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

/**
 * Industry-neutral platform overview. Composed from the same modules as the
 * homepage minus industries and education proof; the school page
 * (/solutions/schools/) keeps its own title, canonical, and schema and is
 * linked through SegmentCallout.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Facilities operations', path: PLATFORM_FACILITIES_OPS_PATH },
]

const faqs: FaqItem[] = [
  {
    question: 'What is an AI-powered facilities operations platform?',
    answer:
      'A system that connects building signals, work orders, assets, schedules, field teams, projects, and budgets so a facilities team can detect problems, coordinate the response, and verify that the work succeeded. Edviro monitors and follows up automatically; every side effect waits for a person to approve it.',
  },
  {
    question: 'Which industries does Edviro serve?',
    answer:
      'Teams that run buildings: education (K-12 districts and higher education, where Edviro has its deepest deployment history and published proof), data centers, commercial real estate, healthcare, and construction. Published customer results are education results and are labeled as such.',
  },
  {
    question: 'Do we need to replace our CMMS?',
    answer:
      'No. Edviro can be your work-order and asset system, or it can detect and diagnose problems, route the work into the CMMS you keep, and read the outcome back to verify it. Integration scope is confirmed system by system.',
  },
  {
    question: 'What data does Edviro need to start?',
    answer:
      'Utility bills and interval meter data are enough for the first findings. Building-system data, an asset list, and an existing work-order export deepen the picture as they are connected. There is no hardware install project before the first report.',
  },
  {
    question: 'Does Edviro operate building systems on its own?',
    answer:
      'No. Schedule and setpoint changes, emails, and work orders are staged for a named person to review and approve. Edviro does not replace facilities staff, engineers, contractors, or building controls.',
  },
]

usePageSeo({
  title: 'AI-Powered Facilities Operations Platform',
  description:
    'Building signals, work orders, assets, field teams, and budgets in one system. Detect the problem, approve the fix, and verify the result in building data.',
  path: PLATFORM_FACILITIES_OPS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro facilities operations platform',
      description:
        'AI-powered operations and maintenance for facilities teams: diagnostics, reviewed work orders, assets and inspections, mobile field workflows, measurement and verification, and capital planning.',
      path: PLATFORM_FACILITIES_OPS_PATH,
      serviceType: 'Facilities operations and maintenance software',
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
      eyebrow="Facilities operations"
      lede="Signals, requests, assets, and budgets in one system. Edviro finds the problem, drafts the response for a person to approve, and confirms the result in the building data."
      note="Start with the sites and systems you have. Expand when the last step has paid for itself."
      :secondary="{ label: 'See work orders', to: PLATFORM_WORK_ORDERS_PATH }"
    >
      Run every facility <span class="accent">from the same playbook.</span>
      <template #visual>
        <UiMeterTrend />
        <UiWorkQueue />
        <p class="ui-note">Illustrative product views with fictional data.</p>
      </template>
    </PlatformHero>

    <OperatingLoop />

    <PlatformRail eyebrow="Capabilities" heading="Four records, one loop." lede="Each capability stands alone and gets better when the others are connected." />

    <!-- The Platform-menu #diagnostics anchor is the rail's Diagnostics tile above. -->
    <EnergySection />

    <SystemsMap />

    <SegmentCallout
      eyebrow="For K‑12 and higher education"
      heading="Running a school district?"
      body="Edviro developed its strongest proof in school districts. The education pages cover campus operations, energy, and the published results."
      :links="[
        { label: 'Energy management software for schools', to: SCHOOL_ENERGY_PATH },
        { label: 'School work-order software', to: WORK_ORDERS_PATH },
      ]"
    />

    <FaqList eyebrow="Questions" heading="Platform FAQ" :items="faqs" />

    <CtaSection />
  </main>
</template>
