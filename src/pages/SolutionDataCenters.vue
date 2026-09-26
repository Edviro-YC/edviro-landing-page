<script setup lang="ts">
import CtaSection from '@/components/CtaSection.vue'
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import IndustryFlow from '@/components/industry/IndustryFlow.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import StepStrip, { type Step } from '@/components/platform/StepStrip.vue'
import UiCauseCard from '@/components/ui/UiCauseCard.vue'
import UiRackHeatmap from '@/components/ui/UiRackHeatmap.vue'
import UiTelemetryList from '@/components/ui/UiTelemetryList.vue'
import UiWorkQueue, { type Row } from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import { SOLUTION_DATA_CENTERS_PATH } from '@/seo/site'

/**
 * Data centers. Lead story: noisy controls telemetry in, a short reviewed work
 * list out. Second story: calibrated physics models the team can ask
 * questions of (headroom is one example, not the pitch). The page implies no
 * existing data-center customers, no uptime guarantee, and no control of the
 * cooling plant (Edviro reads, diagnoses, and simulates; the team decides).
 * All UI values are illustrative.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: SOLUTION_DATA_CENTERS_PATH },
  { name: 'Data centers', path: SOLUTION_DATA_CENTERS_PATH },
]

const feeds = [
  { name: 'BMS alarms (24h)', value: '312', fill: 0.86 },
  { name: 'CRAH-2 supply temp', value: '21.9 °C', fill: 0.62 },
  { name: 'CRAH-2 fan speed', value: '100%', fill: 1 },
  { name: 'Rack inlet, row C', value: '27.4 °C', fill: 0.74 },
  { name: 'Chilled water ΔT', value: '3.1 K', fill: 0.26 },
]

const queue: Row[] = [
  { title: 'CRAH-2 chilled water valve stuck at 40%', priority: 'High', trade: 'Mechanical', status: 'Awaiting review' },
  { title: 'Row C blanking panels missing, racks 12–15', priority: 'Medium', trade: 'Facilities', status: 'In progress' },
  { title: 'Humidity sensor H-7 drifting, recalibrate', priority: 'Low', trade: 'Controls', status: 'Verified' },
]

const flowSteps = [
  { label: 'Telemetry', caption: 'BMS, EPMS, PDU and sensor feeds you already have. Hundreds of alarms a day, most of them noise.' },
  { label: 'Diagnosis', caption: 'We tie related alarms together and point to the likely cause, with the evidence attached.' },
  { label: 'Work list', caption: 'Your operators get a short list of what to fix. Nothing goes out until someone approves it.' },
]

const questions = [
  'How many more racks can Pod 3 take before cooling runs out?',
  'If CRAH-2 goes down, which rows go over the inlet limit, and how fast?',
  'Can we raise supply air a degree without creating hot spots?',
  'Why does row C run hot every afternoon?',
]

const loop: Step[] = [
  { title: 'Watch', detail: 'Read your BMS, EPMS and sensor feeds around the clock.', icon: 'monitor' },
  { title: 'Diagnose', detail: 'Group the alarms and find what\u2019s actually wrong.', icon: 'search' },
  { title: 'Fix', detail: 'Your team approves the fix and does the work.', human: true, tag: 'Your team decides', icon: 'wrench' },
  { title: 'Verify', detail: 'Check the telemetry to confirm the fix held.', icon: 'verify' },
  { title: 'Learn', detail: 'The model updates, so the next issue gets caught sooner.', icon: 'repeat' },
]

const faqs: FaqItem[] = [
  {
    question: 'What data does Edviro need?',
    answer:
      'Whatever your controls already export: BMS points and alarms, EPMS and PDU power, cooling plant data, and environmental sensors. Nothing new gets installed and access is read-only.',
  },
  {
    question: 'We already have a DCIM and a BMS. Why add this?',
    answer:
      'Those systems collect the data and fire the alarms. Edviro sits on top, figures out which alarms actually matter, and turns them into work your team can act on.',
  },
  {
    question: 'What are the physics models for?',
    answer:
      'Asking "what if" before you try it on the live floor. Cooling headroom, a unit failing, a setpoint change, a new row of high-density racks. The model is calibrated to your site and we show you how accurate it is.',
  },
  {
    question: 'Does Edviro control the cooling plant?',
    answer:
      'No. Edviro reads, diagnoses, and simulates. Any change to the floor or the plant stays with your team and your vendors.',
  },
]

usePageSeo({
  title: '24/7 Monitoring and Optimization for Data Centers',
  description:
    'Edviro reads the telemetry your controls already produce, cuts through alarm noise, and gives operators a short list of what to fix. Calibrated physics models answer what-if questions like cooling headroom.',
  path: SOLUTION_DATA_CENTERS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro 24/7 Monitoring and Optimization for Data Centers',
      description:
        'Alarm triage and fault diagnosis from existing BMS, EPMS, and sensor telemetry, plus calibrated physics models for what-if simulation such as cooling headroom and equipment failure.',
      path: SOLUTION_DATA_CENTERS_PATH,
      serviceType: 'Facility monitoring and fault diagnostics',
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
      lede="Edviro connects to your telemetry feeds and watches for issues 24/7. We turn noisy alarms, alerts, and charts into a short list your operators can actually act on."
    >
      Noise to <span class="accent">signal.</span>
    </PlatformHero>

    <!-- IN PRACTICE -->
    <section id="in-practice" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">In practice</p>
            <h2 class="h2">312 alarms. One real problem.</h2>
          </div>
          <p class="lede">Your controls already tell you a lot. The hard part is knowing which alarm matters. We do that sorting so your team spends time fixing, not scrolling.</p>
        </div>
        <IndustryFlow
          title="Pod 3 · Telemetry → diagnosis → work list"
          :steps="flowSteps"
          summary="Three-step flow for a data center pod: existing telemetry with 312 BMS alarms in 24 hours, a CRAH at full fan speed, a hot row, and low chilled-water delta-T; a diagnosis card tracing them to a stuck chilled-water valve on CRAH-2; and an operator work list with that fix awaiting review."
        >
          <template #step-1>
            <UiTelemetryList
              title="Pod 3 · Controls telemetry"
              flag="Existing feeds"
              :feeds="feeds"
              note="Read-only. Nothing new installed."
              summary="Telemetry for Pod 3: 312 BMS alarms in 24 hours, CRAH-2 supply temperature 21.9 °C, CRAH-2 fan at 100%, row C rack inlet 27.4 °C, chilled-water delta-T 3.1 K."
            />
          </template>
          <template #step-2>
            <UiCauseCard
              title="CRAH-2 chilled water valve stuck at 40%"
              :evidence="['Fan pinned at 100% for 3 days', 'Low ΔT on CRAH-2 only', 'Row C inlets climbing each afternoon']"
              footer="Ties together 41 alarms"
              footer-tone="info"
              summary="Diagnosis card: likely cause is the CRAH-2 chilled water valve stuck at 40%, supported by the fan pinned at full speed, low delta-T on that unit, and rising row C inlet temperatures. It ties together 41 alarms."
            />
          </template>
          <template #step-3>
            <UiWorkQueue
              title="Operator work list"
              :rows="queue"
              summary="Operator work list with three items: CRAH-2 valve fix awaiting review, missing blanking panels in row C in progress, and a drifting humidity sensor verified."
            />
          </template>
        </IndustryFlow>
      </div>
    </section>

    <!-- PHYSICS MODELS -->
    <section id="models" class="section">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">Physics models</p>
            <h2 class="h2">Models that learn how your site runs.</h2>
          </div>
          <p class="lede">We fit a physics model to your own telemetry and keep it calibrated as load and layout change. Then you can ask it questions before you touch the floor.</p>
        </div>
        <div class="two-up models">
          <ul class="questions">
            <li v-for="q in questions" :key="q">{{ q }}</li>
          </ul>
          <UiRackHeatmap />
        </div>
      </div>
    </section>

    <!-- LOOP -->
    <section id="loop" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">How it runs</p>
            <h2 class="h2">One continuous loop.</h2>
          </div>
          <p class="lede">Every fix makes the model a little sharper. Over time the site runs tighter and wastes less.</p>
        </div>
        <StepStrip :steps="loop" label="Continuous improvement loop" />
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
.questions {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.questions li {
  padding: 14px 16px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  text-wrap: pretty;
}
@media (max-width: 900px) {
  .two-up { grid-template-columns: minmax(0, 1fr); gap: 28px; }
}
</style>
