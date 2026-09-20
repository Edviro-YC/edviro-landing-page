<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import IndustryFlow from '@/components/industry/IndustryFlow.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import StepStrip, { type Step } from '@/components/platform/StepStrip.vue'
import UiApprovalCard, { type TrailEntry } from '@/components/ui/UiApprovalCard.vue'
import UiBaselineFit from '@/components/ui/UiBaselineFit.vue'
import UiVarianceChart from '@/components/ui/UiVarianceChart.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import {
  CAPITAL_PLANNING_PATH,
  MV_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  SOLUTION_CONSTRUCTION_PATH,
} from '@/seo/site'

/**
 * Construction. The visual is baseline → variance → reviewed fix and report.
 * Wording is deliberately "independent" and "owner-ready", never
 * "audit-grade" or "lender-ready": Edviro produces documentation tied to
 * measured data; whether a lender, program, or auditor accepts it is their
 * call. All figures fictional. Copy is one short sentence per point.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: SOLUTION_CONSTRUCTION_PATH },
  { name: 'Construction', path: SOLUTION_CONSTRUCTION_PATH },
]

const flowSteps = [
  { label: 'Independent baseline', caption: 'Fit to metered data during fit-out. Locked before occupancy.' },
  { label: 'Variance flagged', caption: 'Measured load runs 8% over the design model in weeks 3–4. The GC gets the evidence now, not a surprise at handover.' },
  { label: 'Reviewed and reported', caption: 'The GC reviews. A commissioning fix lands. The owner receives an independent M&V report.' },
]

const reviewTrail: TrailEntry[] = [
  { text: 'Flagged by Edviro', time: 'Wk 3', state: 'done' },
  { text: 'Reviewed by GC · J. Alvarez', time: 'Wk 3', state: 'human' },
  { text: 'Commissioning fix complete', time: 'Wk 5', state: 'done' },
  { text: 'M&V report issued to owner', time: 'Mo 6', state: 'done' },
]

const handoff: Step[] = [
  { title: 'Design model', detail: 'The engineer\u2019s model is the reference the build is measured against.', icon: 'model' },
  { title: 'Baseline locked', detail: 'An independent baseline is fit to metered data during fit-out.', icon: 'calibrate' },
  { title: 'Variance flagged', detail: 'Measured load is compared with the model each week. Deviations reach the GC with evidence.', human: true, tag: 'GC review', icon: 'flag' },
  { title: 'Commissioning fix', detail: 'The fix is tracked as work. The next weeks show whether it held.', icon: 'wrench' },
  { title: 'Handover', detail: 'The owner receives an owner-ready M&V report and the calibrated baseline.', icon: 'handoff' },
  { title: 'Ongoing verification', detail: 'The same baseline keeps checking the building after occupancy.', icon: 'verify' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is an energy baseline and why does it matter for construction?',
    answer:
      'A baseline is a measured model of how a building uses energy, fit to metered data and weather. Edviro sets it during fit-out. Every later performance or savings claim is measured against it, not taken on trust.',
  },
  {
    question: 'How does Edviro provide independent measurement and verification (M&V)?',
    answer:
      'Edviro fits the baseline to metered data and compares measured performance against it each week. Variances go to the general contractor as they appear. The owner gets a report in plain language.',
  },
  {
    question: 'Does Edviro keep working after the building is handed over?',
    answer:
      'Yes. The same baseline and verification continue after occupancy. Faults and waste in a new building surface early, before they become normal.',
  },
  {
    question: 'Can Edviro support performance guarantees and incentives?',
    answer:
      'Edviro produces independent, owner-ready M&V documentation tied to measured data. It can support performance guarantees, utility incentive applications, and financing reviews. Whether a program accepts it is that program\u2019s decision.',
  },
  {
    question: 'How does the as-built model compare to the design model?',
    answer:
      'As metered data comes in, Edviro builds a model of the building as it performs and checks it against the design model. Variance surfaces during the build, when it is cheap to correct. The owner inherits a calibrated baseline.',
  },
]

usePageSeo({
  title: 'Baselining and M&V for construction',
  description:
    'Independent energy baselining and M&V built into the build. Variances reach the contractor early. The owner receives an owner-ready report at handover.',
  path: SOLUTION_CONSTRUCTION_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro baselining and M&V for construction',
      description:
        'Independent energy baselining and measurement and verification for new construction and major retrofits, with variances flagged to the contractor during the build and an owner-ready report at handover.',
      path: SOLUTION_CONSTRUCTION_PATH,
      serviceType: 'Measurement and verification',
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
      eyebrow="For construction teams"
      lede="Edviro sets an independent energy baseline during fit-out and measures the building against it. Variance shows up while the contractor is still on site. The owner receives an owner-ready report at handover."
      :secondary="{ label: 'Learn about M&V', to: MV_PATH }"
    >
      Baselining and M&amp;V, <span class="accent">built into the build.</span>
    </PlatformHero>

    <!-- IN PRACTICE -->
    <section id="in-practice" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">In practice</p>
            <h2 class="h2">Catch the variance before the owner does.</h2>
          </div>
          <p class="lede">Independent baseline, measured variance, reviewed fix. The owner inherits the record the build was checked against.</p>
        </div>
        <IndustryFlow
          title="Tower A · Baseline → variance → report"
          :steps="flowSteps"
          summary="Three-step flow for Tower A: an independent baseline fit to 62 days of metered data and locked during fit-out; weekly measured energy compared with the design model, with weeks 3 and 4 running 8 percent over and flagged to the general contractor; a review card showing the GC review, a commissioning fix in week 5, and an M&V report issued to the owner in month 6."
        >
          <template #step-1><UiBaselineFit /></template>
          <template #step-2><UiVarianceChart /></template>
          <template #step-3>
            <UiApprovalCard
              label="Variance review"
              title="Weeks 3–4 measured 8% over design model · AHU-2 economizer"
              :details="['Evidence: 14 days of interval data vs the design model', 'Proposed: commissioning check of the AHU-2 economizer damper', 'Report: owner-ready M&V summary at handover']"
              :trail="reviewTrail"
              status="Reviewed"
              status-tone="ok"
              summary="Variance review card: weeks 3 to 4 measured 8 percent over the design model, traced to the AHU-2 economizer. Flagged by Edviro in week 3, reviewed by the GC (J. Alvarez) in week 3, commissioning fix complete in week 5, M&V report issued to the owner in month 6."
            />
          </template>
        </IndustryFlow>
      </div>
    </section>

    <!-- HANDOFF TIMELINE -->
    <section id="handoff" class="section">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">From design to handover</p>
            <h2 class="h2">Six steps, one baseline.</h2>
          </div>
          <p class="lede">Review is a step in the build, not a report at the end. Each variance reaches a person while it is still cheap to correct.</p>
        </div>
        <StepStrip :steps="handoff" label="Construction handoff timeline" />
      </div>
    </section>

    <!-- AFTER HANDOVER -->
    <section class="section is-dark">
      <div class="shell">
        <h2 class="h2 dark-h2">The building keeps its baseline after the crews leave.</h2>
        <p class="lede">The owner inherits the calibrated baseline, the asset records, and the verification loop. The platform that checked the build keeps checking the building.</p>
        <div class="links">
          <RouterLink :to="MV_PATH" class="text-link">How measurement and verification works →</RouterLink>
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link">Capital planning →</RouterLink>
          <RouterLink :to="PLATFORM_FACILITIES_OPS_PATH" class="text-link">See the full platform →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from builders" heading="Construction FAQ" :items="faqs" />

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
