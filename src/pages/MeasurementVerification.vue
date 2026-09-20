<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import IndustryFlow from '@/components/industry/IndustryFlow.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import UiBaselineFit from '@/components/ui/UiBaselineFit.vue'
import UiBeforeAfter from '@/components/ui/UiBeforeAfter.vue'
import UiMeterTrend from '@/components/ui/UiMeterTrend.vue'
import UiSavingsReport from '@/components/ui/UiSavingsReport.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  CAPITAL_PLANNING_PATH,
  MV_HEADLINE_RESULT,
  MV_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Measurement and verification', path: MV_PATH },
]

const flow = [
  { label: 'Baseline · learn the building', caption: 'A model fit to meter data, weather, schedules, and tariffs predicts what normal would have used.' },
  { label: 'Measure · compare to actual', caption: 'Real consumption tracked against the baseline continuously, per site, from the moment a fix lands.' },
  { label: 'Report · prove the savings', caption: 'The difference, the method, and whether it held, generated as a report a board can read.' },
]

const audiences = [
  { title: 'School energy management', to: SCHOOL_ENERGY_PATH, line: 'Show the board verified savings across every site, not quarterly estimates.' },
  { title: 'Data centers', to: '/solutions/data-centers/', line: 'Model predictions verified against measured pod telemetry, so headroom numbers are proven.' },
  { title: 'Construction', to: '/solutions/construction/', line: 'Lender-ready verification against an independent baseline from day one.' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is measurement and verification (M&V)?',
    answer:
      'Measurement and verification (M&V) is the process of using metered data to quantify how much energy a building actually saved compared to what it would have used otherwise. It establishes a baseline, measures real consumption after a change, and reports the difference so savings can be trusted rather than estimated.',
  },
  {
    question: 'How is an energy baseline created?',
    answer:
      'Edviro learns a baseline by fitting a model to your historical and live meter data, accounting for drivers like weather, schedules, occupancy, and tariffs. Every action is then measured against this learned baseline, so you can see exactly what changed and what it saved.',
  },
  {
    question: 'What makes M&V "audit-grade" or board-ready?',
    answer:
      'Audit-grade M&V ties every reported saving back to measured data against a documented baseline, with methodology that holds up to outside scrutiny. Edviro generates these reports automatically so facilities leaders can show boards, owners, and lenders proof rather than promises.',
  },
  {
    question: 'How does Edviro know its fixes actually saved energy?',
    answer:
      'After a change is made, Edviro checks the meter data and the bill against the baseline. If the change did not produce the expected savings, Edviro flags it, so you only count savings that are real.',
  },
  {
    question: 'Does verification apply to work orders, or only to energy projects?',
    answer:
      'Both. When a work order that came from a detected problem is closed—a boiler that was short-cycling, a schedule that was running all weekend—Edviro checks the subsequent building and energy data to confirm the problem actually stopped. If it did not, the work is reopened with the evidence attached rather than counted as done. The same discipline covers retrofits and capital projects after they are funded.',
  },
]

usePageSeo({
  title: 'Measurement and Verification (M&V) for Buildings',
  description:
    'Measurement and verification (M&V) explained: how Edviro learns a building energy baseline, measures every fix and project against it, confirms that completed work resolved the problem, and generates board-ready proof of savings automatically.',
  path: MV_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro measurement and verification (M&V)',
      description:
        'Automated, audit-grade measurement and verification of building energy savings and completed maintenance work against a learned baseline.',
      path: MV_PATH,
      serviceType: 'Measurement and verification',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <PlatformHero
      eyebrow="Measurement and verification"
      lede="Every fix and every project is measured against a learned baseline of how the building behaved before: what changed, what it cost, whether performance improved, and whether the savings persisted. Board-ready, audit-grade, generated automatically."
      :secondary="{ label: 'How it feeds capital planning', to: CAPITAL_PLANNING_PATH }"
    >
      Measurement and verification <span class="accent">your board can read.</span>
      <template #visual>
        <UiBeforeAfter />
      </template>
    </PlatformHero>

    <!-- DEFINITION -->
    <section class="section">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">Definition</p>
          <h2 class="h2">What is measurement and verification?</h2>
          <p class="lede">Measurement and verification (M&amp;V) is how you prove energy savings with data instead of estimates: establish a baseline of how a building would have used energy, measure what it actually uses after a change, and report the difference. Done well, it turns "we think we saved" into "here is exactly what we saved, and here is the proof."</p>
          <ul class="points">
            <li><strong>Continuous, not once per project.</strong> Traditional M&amp;V is a consultant's one-time study; Edviro verifies every fix against a live baseline as it lands.</li>
            <li><strong>Work orders too.</strong> When a <RouterLink :to="WORK_ORDERS_PATH" class="text-link">work order</RouterLink> from a detected problem closes, the data has to confirm the problem stopped: the last step of the <RouterLink :to="PLATFORM_FACILITIES_OPS_PATH" class="text-link">facilities operations loop</RouterLink>.</li>
            <li><strong>Evidence for the budget.</strong> Verified results are what make <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link">capital planning</RouterLink> defensible.</li>
          </ul>
        </div>
        <UiSavingsReport />
      </div>
    </section>

    <!-- HOW EDVIRO VERIFIES -->
    <section class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">How Edviro verifies</p>
            <h2 class="h2">A baseline that learns, and proof that updates itself.</h2>
          </div>
          <p class="lede">Three steps, run continuously for every site instead of once per project.</p>
        </div>
        <IndustryFlow
          title="Measurement and verification · Baseline, measure, report"
          tag="Illustrative"
          :steps="flow"
          summary="Three-step flow: a baseline fitted to metered data and weather, a week of meter readings dropping back inside the baseline band after a fix, and a bar comparison showing gas use 12% below baseline verified over 60 days."
        >
          <template #step-1>
            <UiBaselineFit
              title="Building B · Learned baseline"
              flag="Weather-adjusted"
              note="Fit to metered data, weather, schedules, and tariffs; the reference every claim is measured against."
              summary="Scatter chart of daily kWh against outdoor temperature with a fitted, weather-adjusted baseline curve for Building B."
            />
          </template>
          <template #step-2>
            <UiMeterTrend
              variant="verified"
              title="Main meter · after the fix"
              flag="Back inside the band"
              summary="Week of meter readings that start above the learned baseline band and drop back inside it after the fix is applied."
            />
          </template>
          <template #step-3>
            <UiBeforeAfter
              title="Verification · Boiler-2 schedule"
              before-label="Baseline"
              after-label="After fix"
              :ratio="0.88"
              delta="−12% therms"
              note="Verified over 60 days; savings held through the heating season"
              summary="Bar comparison: gas use after the Boiler-2 schedule fix is 12% below the learned baseline, verified over 60 days and held through the heating season."
            />
          </template>
        </IndustryFlow>
        <!-- Public figure; owner + source are noted beside MV_HEADLINE_RESULT in src/seo/site.ts. -->
        <p class="headline"><span class="headline-figure">{{ MV_HEADLINE_RESULT }}</span> verified vs baseline at a live high-school site</p>
      </div>
    </section>

    <!-- WHO USES IT -->
    <section class="section">
      <div class="shell">
        <h2 class="h2 mid-h2">Where M&amp;V matters most</h2>
        <div class="audiences">
          <RouterLink v-for="a in audiences" :key="a.title" :to="a.to" class="audience">
            <span class="audience-title">{{ a.title }} →</span>
            <span class="audience-line">{{ a.line }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="M&V questions" heading="Frequently asked" :items="faqs" />

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
.headline {
  margin: 26px 0 0;
  display: inline-flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
  font-weight: 500;
  font-size: 13px;
  color: var(--muted-2);
}
.headline-figure {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--accent);
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
