<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import FaqList from '@/components/FaqList.vue'
import MessageWorkOrderDemo from '@/components/MessageWorkOrderDemo.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import ReplaceOrConnect from '@/components/platform/ReplaceOrConnect.vue'
import SegmentCallout from '@/components/platform/SegmentCallout.vue'
import StepStrip, { type Step } from '@/components/platform/StepStrip.vue'
import UiCauseCard from '@/components/ui/UiCauseCard.vue'
import UiWorkQueue from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import {
  CMMS_PATH,
  MV_PATH,
  PLATFORM_ASSETS_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  PLATFORM_WORK_ORDERS_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

/**
 * Industry-neutral work-order page. The school equivalent
 * (/school-work-order-software/) keeps its own title, canonical, and schema;
 * the two link to each other through SegmentCallout.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Work orders', path: PLATFORM_WORK_ORDERS_PATH },
]

const lifecycle: Step[] = [
  { title: 'Intake', detail: 'A request, alarm, anomaly, or inspection finding opens the record.', icon: 'inbox' },
  { title: 'Triage', detail: 'Site, likely asset, related history, and proposed priority are drafted.', icon: 'search' },
  { title: 'Review', detail: 'A named person approves, edits, or rejects before anything is dispatched.', human: true, icon: 'review' },
  { title: 'Dispatch', detail: 'The technician gets location, asset history, and steps on their phone.', icon: 'send' },
  { title: 'Field update', detail: 'Photos, readings, parts, and notes come back from the site.', icon: 'phone' },
  { title: 'Closure', detail: 'Labor, parts, and cost land on the asset\u2019s service history.', icon: 'check' },
  { title: 'Verify', detail: 'Building data confirms the condition stopped, or the order reopens.', icon: 'verify' },
]

const faqs: FaqItem[] = [
  {
    question: 'How do requests reach Edviro?',
    answer:
      'Through the app and by email today. Text-message intake is shown on the site as an illustrative scenario and is not yet live. Edviro also opens work itself from a detected problem, so the queue is not only what people remembered to report.',
  },
  {
    question: 'Does anything get dispatched without a person approving it?',
    answer:
      'No. Edviro drafts the work order with a proposed priority, trade, and assignee, and a named reviewer approves, edits, or rejects it. The same applies to emails, schedule changes, and setpoint changes: every side effect waits for approval.',
  },
  {
    question: 'How does Edviro verify that completed work fixed the problem?',
    answer:
      'Every work order is tied to the signal that created it or the asset it concerns. After closure, Edviro watches the relevant building and energy data against the learned baseline. If the condition returns, the order is reopened with the evidence attached.',
  },
  {
    question: 'Can Edviro work with the CMMS we already use?',
    answer:
      'Yes. Edviro can detect and diagnose the problem, route the resulting work into your existing CMMS, and read the outcome back for verification. Integration scope is confirmed system by system. Teams that would rather consolidate run work orders and assets in Edviro directly.',
  },
  {
    question: 'Can technicians use Edviro in the field?',
    answer:
      'Yes. Technicians receive assignments and priority changes on a phone or tablet, open the asset record and last service notes, follow an inspection checklist where one applies, attach photos and readings, and mark the work complete from the site.',
  },
]

usePageSeo({
  title: 'Work Order Software with Review and Verification',
  description:
    'Requests, alarms, and detected problems become reviewed work orders: triage, a named approver, mobile dispatch, closure with cost, and proof the fix held.',
  path: PLATFORM_WORK_ORDERS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro work-order software',
      description:
        'Work-order management for facilities teams: intake, AI-assisted triage and priority, human review before dispatch, mobile technician workflows, closure with cost, and verification against building data.',
      path: PLATFORM_WORK_ORDERS_PATH,
      serviceType: 'Work-order management software',
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
      eyebrow="Work orders"
      lede="Requests, alarms, and detected problems become one queue. Edviro drafts the order; a person approves it; the building data confirms the fix."
      note="Use Edviro as your work-order system, or connect the one you already run."
      :secondary="{ label: 'Replace or integrate your CMMS', to: CMMS_PATH }"
    >
      A work order should end when the <span class="accent">problem does.</span>
      <template #visual>
        <MessageWorkOrderDemo />
      </template>
    </PlatformHero>

    <!-- LIFECYCLE -->
    <section id="lifecycle" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">The lifecycle</p>
            <h2 class="h2">Seven steps, one record.</h2>
          </div>
          <p class="lede">Review is a step, not a setting: nothing is dispatched until a named person says so.</p>
        </div>
        <StepStrip :steps="lifecycle" label="Work-order lifecycle" />
      </div>
    </section>

    <!-- ONE QUEUE -->
    <section id="queue" class="section">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">One queue</p>
          <h2 class="h2">Requests and detections, side by side.</h2>
          <p class="lede">A “too hot” request and a stuck damper detected in the data are usually the same problem. Edviro matches them and proposes the priority.</p>
          <ul class="points">
            <li>Priority proposed from comfort, safety, cost, occupancy, and asset history</li>
            <li>Duplicates of open work are surfaced instead of becoming a second ticket</li>
            <li>Repeat failures on the same asset are flagged for a <RouterLink :to="PLATFORM_ASSETS_PATH" class="text-link">repair-or-replace review</RouterLink></li>
          </ul>
        </div>
        <div class="visuals">
          <UiWorkQueue />
          <UiCauseCard />
          <p class="ui-note">Illustrative product views with fictional data.</p>
        </div>
      </div>
    </section>

    <!-- REPLACE OR INTEGRATE -->
    <section class="section is-dark">
      <div class="shell">
        <h2 class="h2 dark-h2">Replace your work-order system, or connect Edviro to it.</h2>
        <p class="lede">Everything on this page is native to Edviro. Keep your CMMS and you still get the diagnosis, the routing, and the verification.</p>
        <div class="roc-wrap">
          <ReplaceOrConnect system="work-order system" />
        </div>
        <div class="links">
          <RouterLink :to="CMMS_PATH" class="text-link">Compare with a traditional CMMS →</RouterLink>
          <RouterLink :to="PLATFORM_FACILITIES_OPS_PATH" class="text-link">See the full platform →</RouterLink>
          <RouterLink :to="MV_PATH" class="text-link">How verification works →</RouterLink>
        </div>
      </div>
    </section>

    <SegmentCallout
      eyebrow="For K‑12 and higher education"
      heading="Running a school district?"
      body="The same lifecycle, written for maintenance and operations teams: campus intake, district-wide review, and verification across every site."
      :links="[
        { label: 'School work-order software', to: WORK_ORDERS_PATH },
        { label: 'CMMS for schools', to: CMMS_PATH },
      ]"
    />

    <FaqList eyebrow="Questions" heading="Work-order software FAQ" :items="faqs" />

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
  gap: 8px;
  font-size: 15.5px;
  line-height: 1.5;
  color: var(--ink-2);
}
.points li::marker { color: var(--accent); }
.visuals {
  display: grid;
  gap: 14px;
  min-width: 0;
}
.dark-h2 { color: #F2F5F1; max-width: 720px; }
.roc-wrap { margin-top: 32px; }
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
