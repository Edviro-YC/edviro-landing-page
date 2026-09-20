<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import MessageWorkOrderDemo from '@/components/MessageWorkOrderDemo.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import ReplaceOrConnect from '@/components/platform/ReplaceOrConnect.vue'
import StepStrip, { type Step } from '@/components/platform/StepStrip.vue'
import UiBeforeAfter from '@/components/ui/UiBeforeAfter.vue'
import UiCauseCard from '@/components/ui/UiCauseCard.vue'
import UiWorkQueue, { type Row } from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  BLOG_URL,
  CMMS_PATH,
  MV_PATH,
  PLATFORM_WORK_ORDERS_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'School work-order software', path: WORK_ORDERS_PATH },
]

/** Intent boundary for this page: intake → triage → priority → assignment → technician updates → closure → verification. */
const lifecycle: Step[] = [
  { title: 'Intake', detail: 'Staff requests, plus work Edviro opens from a detected problem.', icon: 'inbox' },
  { title: 'Triage', detail: 'Matched to the building, likely asset, related alarms, and open work.', icon: 'search' },
  { title: 'Priority and review', detail: 'Priority proposed from comfort, safety, cost, and recurrence; the director reviews.', human: true, tag: 'Director approval', icon: 'review' },
  { title: 'Assignment', detail: 'Routed by school, asset, or trade to staff or a contractor, record attached.', icon: 'send' },
  { title: 'Technician updates', detail: 'Photos, readings, parts, and notes; status visible to the requester.', icon: 'phone' },
  { title: 'Closure', detail: 'Completion recorded against the asset with labor, parts, and cost.', icon: 'check' },
  { title: 'Verification', detail: 'Building data checked afterwards; if the problem returns, the order reopens.', icon: 'verify' },
]

/** Backlog by impact: what the director reviews on Monday. Illustrative rows. */
const backlog: Row[] = [
  { title: 'Boiler #2 short-cycling · Lincoln HS · 3rd occurrence', priority: 'High', trade: 'Mechanical', status: 'Awaiting review' },
  { title: 'Room 214 too hot · matched to stuck damper', priority: 'High', trade: 'HVAC', status: 'In progress' },
  { title: 'Gym lights on after 9 pm · Roosevelt MS', priority: 'Medium', trade: 'Electrical', status: 'Awaiting review' },
  { title: 'RTU-7 belt · Jefferson ES · closed Tue', priority: 'Low', trade: 'HVAC', status: 'Verifying' },
]

const faqs: FaqItem[] = [
  {
    question: 'Does Edviro support work orders and asset management?',
    answer:
      'Yes. Edviro includes a native work-order system—request intake, AI-assisted categorization and priority, assignment, mobile technician notifications and updates, closure with cost, and verification against building data—and a native asset registry with service history, inspections, and documents. Districts can use these instead of a separate CMMS or connect the CMMS they already have.',
  },
  {
    question: 'Can Edviro connect BAS or energy anomalies to work orders?',
    answer:
      'Yes. When Edviro detects a problem in building automation system (BAS) data, utility bills, or interval meter data, it can open a work order with the likely cause, the affected asset, and the supporting data attached—or route that work into your existing CMMS. Requests submitted by staff and alerts detected in the data land in the same queue with the same prioritization.',
  },
  {
    question: 'How does Edviro verify that completed work fixed the problem?',
    answer:
      'Every work order is tied to the signal that created it or the asset it concerns. After the work is closed, Edviro watches the relevant building and energy data—runtime, cycling, consumption against the learned baseline—to confirm the condition actually stopped. If it comes back, the work order is reopened with the evidence, so a closed ticket means a resolved problem, not just a completed visit.',
  },
  {
    question: 'Can technicians use Edviro in the field?',
    answer:
      'Yes. Technicians receive assignments and priority changes on a phone or tablet, open the asset record and last service notes, follow step-by-step guidance or an inspection checklist, attach photos and readings, and mark the work complete from the site.',
  },
  {
    question: 'Can Edviro work with the CMMS we already use?',
    answer:
      'Yes. Edviro can find and diagnose problems and route the resulting work into a district\'s existing CMMS, then read the outcome back for verification. Integration scope is confirmed system by system. Districts that would rather consolidate can run work orders and assets in Edviro directly.',
  },
]

usePageSeo({
  title: 'School Work Order Software',
  description:
    'Edviro\'s school work order software handles request intake, AI-assisted triage and priority, assignment, mobile technician updates, closure, and verification that the fix worked—natively or with your existing CMMS.',
  path: WORK_ORDERS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro school work-order software',
      description:
        'Work-order management for school districts: intake, AI-assisted triage and priority, assignment, mobile technician workflows, closure, and verification against building data.',
      path: WORK_ORDERS_PATH,
      serviceType: 'School work-order management software',
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
      eyebrow="Work orders and maintenance"
      lede="Edviro's school work order software takes a request or a detected problem from intake through triage, priority, assignment, and field completion—then verifies in the building data that the problem is actually gone."
      note="Use it as your work-order system, or connect the one you already have."
      :secondary="{ label: 'Replace or integrate your CMMS', to: CMMS_PATH }"
    >
      Work order software built for <span class="accent">school maintenance teams</span>
      <template #visual>
        <MessageWorkOrderDemo :scenarios="['campus']" />
      </template>
    </PlatformHero>

    <!-- WHY A SCHOOL-SPECIFIC WORK ORDER SYSTEM -->
    <section id="why" class="section">
      <div class="shell two-up">
        <div>
          <h2 class="h2">A work order should end when the problem does—not when someone shows up.</h2>
          <p class="lede">Most maintenance work order software for schools is a ticket queue: requests come in, get assigned, get closed. Nobody checks whether the gym is still cold on Monday. Edviro reads the same building and energy data that revealed the problem, so it can confirm the fix—and reopen the work with evidence when it did not hold.</p>
          <ul class="points">
            <li><strong>Requests and detections in one queue.</strong> A teacher's "too hot" request and a detected stuck damper are usually the same problem.</li>
            <li><strong>Triage that drafts the paperwork.</strong> Category, likely asset, related history, and proposed priority are ready for the director to review—not typed from scratch at 6 a.m.</li>
            <li><strong>Closure with proof.</strong> Completion is recorded with cost against the asset, and verification runs in the data afterwards.</li>
          </ul>
        </div>
        <div class="visuals">
          <UiCauseCard
            title="Stuck outside-air damper on RTU-3 — Room 214 overheating"
            :evidence="['Supply air 92°F vs 78°F expected', 'Damper position 100% since Tue 6:10 am', 'Same fault closed Aug 21']"
            footer="WO-2418 · Awaiting review · D. Park"
            summary="Diagnosis card: likely cause is a stuck outside-air damper on RTU-3 overheating Room 214, with three evidence points and a work order awaiting the facilities director's review."
          />
          <UiBeforeAfter
            title="Verification · RTU-3 damper fix"
            delta="−18% kWh"
            note="Checked over 30 days against the learned baseline after closure"
            summary="Bar comparison: RTU-3 energy after the damper fix is 18% below the learned baseline, verified over 30 days."
          />
          <p class="ui-note">Illustrative product views with fictional data.</p>
        </div>
      </div>
    </section>

    <!-- LIFECYCLE -->
    <section id="lifecycle" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">The work-order lifecycle</p>
            <h2 class="h2">Seven steps, one record.</h2>
          </div>
          <p class="lede">Review is a step, not a setting: nothing is dispatched until the director, or someone they name, says so.</p>
        </div>
        <StepStrip :steps="lifecycle" label="School work-order lifecycle" />
      </div>
    </section>

    <!-- BACKLOG AND REVIEW -->
    <section id="backlog" class="section">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">Backlog and review</p>
          <h2 class="h2">See what is open, what is late, and what should move first.</h2>
          <p class="lede">The director's view is the backlog by impact: overdue work, requests waiting on parts or a contractor, and issues that keep recurring on the same asset. Each item carries its reasoning, so weekly review is a decision, not a reconstruction.</p>
          <p class="lede">Repeated work on the same equipment is flagged automatically and can be handed to <RouterLink :to="ASSETS_PATH" class="text-link">asset management</RouterLink> for a repair-or-replace review.</p>
        </div>
        <div class="visuals">
          <UiWorkQueue
            title="Backlog · By impact"
            :rows="backlog"
            summary="Backlog of four work orders ordered by impact: a short-cycling boiler at Lincoln HS on its third occurrence awaiting review, a Room 214 overheating request matched to a stuck damper in progress, a proposed schedule change for gym lights at Roosevelt MS awaiting review, and a closed RTU-7 belt repair at Jefferson ES still verifying."
          />
          <p class="ui-note">Illustrative product view with fictional data.</p>
        </div>
      </div>
    </section>

    <!-- REPLACE OR INTEGRATE -->
    <section class="section is-dark">
      <div class="shell">
        <h2 class="h2 dark-h2">Replace your current work-order system or connect Edviro to it.</h2>
        <p class="lede">Everything on this page is native to Edviro. A district that keeps its CMMS gets the same diagnosis, routing, and verification.</p>
        <div class="roc-wrap">
          <ReplaceOrConnect system="work-order system" />
        </div>
        <div class="links">
          <RouterLink :to="CMMS_PATH" class="text-link">Compare with a traditional CMMS →</RouterLink>
          <RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link">Edviro for schools →</RouterLink>
          <RouterLink :to="MV_PATH" class="text-link">How verification works →</RouterLink>
          <RouterLink :to="PLATFORM_WORK_ORDERS_PATH" class="text-link">Work orders for other facility types →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="Work-order software FAQ" :items="faqs" />

    <section class="related">
      <div class="related-shell">
        <p class="eyebrow">Related reading</p>
        <ul class="related-list">
          <li><a :href="`${BLOG_URL}/blog/from-bas-alert-to-completed-work-order/`" class="text-link">From BAS alert to completed work order: closing the facilities operations loop</a></li>
          <li><a :href="`${BLOG_URL}/blog/give-school-facilities-teams-their-weekends-back/`" class="text-link">Give school facilities teams their weekends back</a></li>
        </ul>
      </div>
    </section>

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
.roc-wrap { margin-top: 32px; }
.is-dark .lede { max-width: 720px; }
.links {
  margin-top: 26px;
  display: flex;
  gap: 8px 24px;
  flex-wrap: wrap;
  font-size: 15px;
}
.related { padding: 0 32px 72px; }
.related-shell { max-width: 820px; margin: 0 auto; width: 100%; }
.related .eyebrow { margin-bottom: 14px; }
.related-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  font-size: 15.5px;
}
@media (max-width: 900px) {
  .two-up { grid-template-columns: minmax(0, 1fr); gap: 28px; }
}
</style>
