<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import ReplaceOrConnect from '@/components/platform/ReplaceOrConnect.vue'
import StepStrip, { type Step } from '@/components/platform/StepStrip.vue'
import UiClosedVsVerified from '@/components/ui/UiClosedVsVerified.vue'
import UiWorkQueue, { type Row } from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  BLOG_URL,
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'CMMS for schools', path: CMMS_PATH },
]

/** School-labeled queue for the hero: the record a CMMS keeps, with Edviro's verification on it. */
const queue: Row[] = [
  { title: 'RTU-3 heating stage not firing · Room 214', priority: 'High', trade: 'HVAC', status: 'Awaiting review' },
  { title: 'Boiler-2 short cycling overnight · Building B', priority: 'Medium', trade: 'Mechanical', status: 'In progress' },
  { title: 'Gym lighting on after hours', priority: 'Low', trade: 'Electrical', status: 'Verified' },
]

/**
 * Intent boundary for this page: native functionality, replacement vs.
 * integration, migration, comparison with a conventional CMMS. The comparison
 * is by capability category, not against a named vendor.
 */
const comparison = [
  { area: 'Work orders', cmms: 'Tickets people create and close', edviro: 'Also opened from detected problems, verified after closure' },
  { area: 'Priority', cmms: 'Set by the requester', edviro: 'Proposed from impact, reviewed by the director' },
  { area: 'Assets', cmms: 'Registry kept by hand', edviro: 'Registry with inspections, photos, and signals attached' },
  { area: 'Building systems', cmms: 'Alarms and bills live elsewhere', edviro: 'BMS, meters, bills, and schedules read with the work' },
  { area: 'Preventive maintenance', cmms: 'Calendar tasks', edviro: 'Calendar tasks plus history-based priority' },
  { area: 'Did the fix work?', cmms: 'Closed means done', edviro: 'Closed means verified, or reopened with evidence' },
  { area: 'Capital planning', cmms: 'Rebuilt in a spreadsheet', edviro: 'Failure and cost history carried into repair-or-replace' },
  { area: 'Energy outcomes', cmms: 'Out of scope', edviro: 'Measured and verified against a learned baseline' },
]

const migration: Step[] = [
  { title: 'Export', detail: 'Assets, open work, and history from the current system.', icon: 'export' },
  { title: 'Map', detail: 'Locations, equipment, and trades, with your team.', icon: 'map' },
  { title: 'Review', detail: 'Your team checks the imported record before anything cuts over.', human: true, tag: 'Your team signs off', icon: 'review' },
  { title: 'Cut over', detail: 'By site or by trade; technicians land on mobile with their assignments.', icon: 'cutover' },
  { title: 'Retire', detail: 'The old system goes once the record is confirmed.', icon: 'retire' },
]

const faqs: FaqItem[] = [
  {
    question: 'Can Edviro replace our existing CMMS?',
    answer:
      'Yes. Edviro includes native request intake, work orders, asset records, service history, inspections, preventive maintenance tasks, and mobile field workflows. A district that is dissatisfied with its current CMMS can run those functions in Edviro and retire the old system. Migration of existing asset lists and open work orders is scoped with your team before cutover.',
  },
  {
    question: 'Can Edviro work with the CMMS we already use?',
    answer:
      'Yes. Districts that want to keep their current system can connect it: Edviro detects and diagnoses problems, routes the resulting work into the existing CMMS, and reads the outcome back to verify the fix. Monitoring, diagnostics, verification, and capital planning work the same either way. Integration scope is confirmed system by system—Edviro does not claim compatibility with every product.',
  },
  {
    question: 'How is Edviro different from a traditional CMMS?',
    answer:
      'A traditional CMMS is a system of record that waits for people to enter, prioritize, assign, and close work. Edviro keeps the same records but connects them to what the buildings are actually doing: it can open work from a detected problem, attach the likely cause and asset history, propose priority, and confirm from building and energy data that a closed work order resolved the issue. It also carries maintenance history into capital planning and measures cost and energy outcomes—functions a conventional CMMS leaves to spreadsheets.',
  },
  {
    question: 'What happens to our existing work orders and asset data if we switch?',
    answer:
      'Asset lists, open work orders, and useful history are imported so the record does not start from zero. What to bring over, how to map locations and equipment, and when to cut over are agreed with your facilities team during onboarding rather than assumed.',
  },
  {
    question: 'Do we have to decide between replacing and integrating up front?',
    answer:
      'No. Many districts start with energy monitoring and diagnostics connected to their current CMMS, then move work orders and assets into Edviro later once the team is comfortable. The choice is not permanent in either direction.',
  },
]

usePageSeo({
  title: 'CMMS for Schools: Replace or Integrate',
  description:
    'Compare Edviro\'s native CMMS for schools with a traditional CMMS. Use Edviro for work orders and assets, or integrate your existing system, and connect maintenance to energy and capital planning.',
  path: CMMS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro CMMS for schools',
      description:
        'Native computerized maintenance management for school districts—work orders, assets, inspections, preventive maintenance, mobile field workflows—with the option to integrate an existing CMMS instead.',
      path: CMMS_PATH,
      serviceType: 'CMMS software for schools',
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
      eyebrow="CMMS software for schools"
      lede="A computerized maintenance management system keeps the record of work orders and assets. Edviro keeps that record too, and connects it to the buildings: problems found in the data, work prioritized by impact, every closed order verified."
      note="Use Edviro as your work-order and asset system, or connect the one you already have."
      :secondary="{ label: 'See the comparison', to: `${CMMS_PATH}#comparison` }"
    >
      A CMMS for schools you can adopt—<span class="accent">or connect to the one you have</span>
      <template #visual>
        <UiWorkQueue
          title="Work orders · Lincoln Middle"
          :rows="queue"
          summary="School work-order queue with three rows: a high-priority RTU-3 heating fault awaiting review, a boiler short-cycling order in progress, and an after-hours gym lighting order marked verified."
        />
      </template>
    </PlatformHero>

    <!-- TWO PATHS -->
    <section id="paths" class="section">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">Replace or connect</p>
            <h2 class="h2">Two ways to run it. Same outcome.</h2>
          </div>
          <p class="lede">Replace a system your team has stopped updating, or keep one they like. Neither decision is required to get value from monitoring, diagnostics, and verification.</p>
        </div>
        <ReplaceOrConnect />
        <p class="aside">Many districts start with energy and diagnostics connected to their current CMMS and move work orders and assets into Edviro later.</p>
      </div>
    </section>

    <!-- COMPARISON -->
    <section id="comparison" class="section is-tint">
      <div class="shell">
        <div class="two-up">
          <div>
            <p class="eyebrow">Comparison</p>
            <h2 class="h2">A traditional CMMS versus Edviro.</h2>
            <p class="lede">Both keep the record. Only one checks the building after the ticket closes.</p>
            <p class="aside">Categories of capability, not a specific vendor; conventional products vary.</p>
          </div>
          <UiClosedVsVerified />
        </div>

        <div class="matrix" role="table" aria-label="Capability comparison: traditional CMMS versus Edviro">
          <div class="matrix-row matrix-head" role="row">
            <span role="columnheader">Area</span>
            <span role="columnheader">Traditional CMMS</span>
            <span role="columnheader" class="is-edviro">Edviro</span>
          </div>
          <div v-for="row in comparison" :key="row.area" class="matrix-row" role="row">
            <span role="rowheader" class="matrix-area">{{ row.area }}</span>
            <span role="cell" class="matrix-cmms"><span class="matrix-glyph is-dash" aria-hidden="true"></span>{{ row.cmms }}</span>
            <span role="cell" class="matrix-edviro"><span class="matrix-glyph is-check" aria-hidden="true"></span>{{ row.edviro }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- MIGRATION -->
    <section id="migration" class="section">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">Migration</p>
            <h2 class="h2">Switching without losing the record.</h2>
          </div>
          <p class="lede">If you replace, the history comes with you: which assets exist, what has been done to them, and what is still open.</p>
        </div>
        <StepStrip :steps="migration" label="Migration steps" />
      </div>
    </section>

    <!-- BEYOND THE CMMS -->
    <section class="section is-dark">
      <div class="shell">
        <h2 class="h2 dark-h2">A CMMS is where Edviro keeps the record. It is not where Edviro stops.</h2>
        <p class="lede">The same record feeds energy diagnostics, asset lifecycle decisions, and the capital plan, so daily work becomes evidence for the budget conversation.</p>
        <div class="links">
          <RouterLink :to="WORK_ORDERS_PATH" class="text-link">School work-order software →</RouterLink>
          <RouterLink :to="ASSETS_PATH" class="text-link">School asset management →</RouterLink>
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link">Capital planning →</RouterLink>
          <RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link">Edviro for schools →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="CMMS for schools FAQ" :items="faqs" />

    <section class="related">
      <div class="related-shell">
        <p class="eyebrow">Related reading</p>
        <ul class="related-list">
          <li><a :href="`${BLOG_URL}/blog/cmms-vs-ai-native-om-platform-for-school-districts/`" class="text-link">CMMS vs. AI-native O&amp;M platform: what school districts actually need</a></li>
          <li><a :href="`${BLOG_URL}/blog/what-ai-powered-operations-and-maintenance-means-for-a-school-district/`" class="text-link">What AI-powered operations and maintenance means for a school district</a></li>
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
.aside {
  margin: 18px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted-2);
  max-width: 620px;
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

/* Comparison matrix: one line per cell, a glyph carrying the verdict. */
.matrix {
  margin-top: 36px;
  display: grid;
  gap: 6px;
}
.matrix-row {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 16px;
  align-items: center;
  padding: 11px 16px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
}
.matrix-head {
  background: transparent;
  border-color: transparent;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.matrix-head .is-edviro { color: var(--accent); }
.matrix-area { font-weight: 600; color: var(--ink); }
.matrix-cmms { color: var(--ink-2); display: flex; align-items: center; gap: 9px; }
.matrix-edviro { color: var(--ink); display: flex; align-items: center; gap: 9px; }
.matrix-glyph {
  flex: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: relative;
}
.matrix-glyph.is-dash { background: var(--surface-2); border: 1px solid var(--line-strong); }
.matrix-glyph.is-dash::after {
  content: '';
  position: absolute;
  left: 4px;
  right: 4px;
  top: 50%;
  border-top: 1.5px solid var(--muted);
}
.matrix-glyph.is-check { background: var(--accent); }
.matrix-glyph.is-check::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 3px;
  width: 4px;
  height: 8px;
  border-right: 1.5px solid var(--on-dark);
  border-bottom: 1.5px solid var(--on-dark);
  transform: rotate(45deg);
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
@media (max-width: 680px) {
  .matrix-head { display: none; }
  .matrix-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 6px;
    align-items: start;
  }
  .matrix-area { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
}
</style>
