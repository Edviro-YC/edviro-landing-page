<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import UiAssetRecord from '@/components/ui/UiAssetRecord.vue'
import UiAssetTree from '@/components/ui/UiAssetTree.vue'
import UiCapitalRank from '@/components/ui/UiCapitalRank.vue'
import UiFailureTimeline from '@/components/ui/UiFailureTimeline.vue'
import UiWorkQueue, { type Row } from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  PLATFORM_ASSETS_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'School asset management software', path: ASSETS_PATH },
]

/** Intent boundary for this page: registry, hierarchy, documents, history, inspections, lifecycle planning. */
const record = [
  { title: 'Registry', line: 'Boilers, RTUs, pumps, panels: type, make, age, nameplate read from a photo.', icon: 'M4 6h16 M4 12h16 M4 18h10' },
  { title: 'Hierarchy', line: 'District → school → building → system → asset; signals roll up the same way.', icon: 'M12 3v6 M12 9 5 15 M12 9l7 6 M3 15h4v4H3z M17 15h4v4h-4z' },
  { title: 'Documents', line: 'Manuals, submittals, warranties, and drawings on the asset itself.', icon: 'M6 3h8l4 4v14H6z M14 3v4h4 M9 13h6 M9 17h6' },
  { title: 'History', line: 'Every work order, part, and cost logged as the work is completed.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8v4l3 2' },
  { title: 'Inspections', line: 'Scheduled per asset, completed from a phone with checklist and photos.', icon: 'M8 4h8v3H8z M6 6h12v14H6z M9 13l2 2 4-4' },
  { title: 'Lifecycle', line: 'Repeat failures and rising cost flag repair-or-replace review.', icon: 'M20 12a8 8 0 1 1-2.3-5.7 M20 4v4h-4' },
]

const inspections: Row[] = [
  { title: 'RTU-7 quarterly · filter, coil, drain', priority: 'Medium', trade: 'HVAC', status: 'Due Oct 3' },
  { title: 'Boiler-2 annual · combustion, safeties', priority: 'High', trade: 'Mechanical', status: 'Scheduled' },
  { title: 'Kitchen hood · quarterly', priority: 'Low', trade: 'Mechanical', status: 'Verified' },
]

const faqs: FaqItem[] = [
  {
    question: 'What does an asset record in Edviro include?',
    answer:
      'Type, make and model, age, and nameplate details; its place in the district → school → building → system hierarchy; manuals, warranties, drawings, and photos; every work order, repair, part, and cost logged against it; scheduled inspections and preventive tasks; and related building and energy signals. Work orders and inspections attach automatically as the team works, so history builds itself. Districts can run assets and work orders in Edviro or connect an existing CMMS.',
  },
  {
    question: 'How does Edviro help prioritize preventive maintenance?',
    answer:
      'Preventive tasks are scheduled per asset, and their priority is informed by the record: equipment with repeated failures, high repair cost, or abnormal behavior in building and energy data—short cycling, runtime creeping up—moves up the list. The result is a preventive maintenance schedule ordered by what the history and the data say, rather than by the calendar alone.',
  },
  {
    question: 'How does asset history feed repair-or-replace decisions?',
    answer:
      'Failures, repairs, and costs accumulate on the asset record, so Edviro can show which equipment is consuming the most attention and money. When a pattern emerges—repeated failures, rising repair cost, age—the asset is flagged for review, both options are modeled against the building\'s real operating data, and the evidence carries into projects, budgets, and multi-year capital priorities that trace back to the maintenance record.',
  },
  {
    question: 'How do we get our existing asset list into Edviro?',
    answer:
      'Existing asset inventories—from a CMMS export, a facility condition assessment, or a spreadsheet—are imported and mapped to buildings and systems during onboarding. Gaps can be filled in the field by photographing nameplates, and the registry improves as work is completed against it.',
  },
  {
    question: 'Can technicians update asset records in the field?',
    answer:
      'Yes. Inspections, photos, readings, notes, and completed work are recorded from a phone or tablet and attach to the asset immediately, so the record reflects what the technician actually found.',
  },
]

usePageSeo({
  title: 'School Asset Management Software',
  description:
    'Track school facility assets, equipment history, inspections, documents, and service records in Edviro, and connect repeated failures to preventive maintenance and capital planning.',
  path: ASSETS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro school asset management software',
      description:
        'Asset registry, equipment hierarchy, documents, service history, inspections, and lifecycle planning for school facilities.',
      path: ASSETS_PATH,
      serviceType: 'School facility asset management software',
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
      eyebrow="Assets and inspections"
      lede="Every boiler, rooftop unit, pump, and panel with its documents, inspections, and full service history on one record, built as your team works and connected to the backlog and the capital plan."
      :secondary="{ label: 'See the work-order system', to: WORK_ORDERS_PATH }"
    >
      Asset management software for <span class="accent">school facilities</span>
      <template #visual>
        <UiAssetRecord
          name="Boiler-2 · Hot water boiler"
          meta="Lochinvar · 2009 · Lincoln Middle · Building B"
          :history="[
            { date: 'Sep 12', event: 'Short cycling overnight — aquastat replaced' },
            { date: 'Aug 21', event: 'Short cycling overnight — reset' },
            { date: 'May 03', event: 'Annual inspection — combustion, safeties' },
          ]"
          next="Next inspection Oct 15 · 3 failures in 12 months"
          summary="Asset record for a school hot-water boiler showing make, install year, building, three service-history entries, and the next scheduled inspection with a note of three failures in twelve months."
        />
      </template>
    </PlatformHero>

    <!-- WHY -->
    <section class="section">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">Why the record matters</p>
          <h2 class="h2">The equipment history a district actually has is in someone's head.</h2>
          <p class="lede">A condition assessment from years ago, a spreadsheet nobody trusts, and a lead technician who remembers which unit fails every August. Edviro builds the record as a by-product of doing the work, so the district owns it.</p>
          <ul class="points">
            <li><strong>History builds itself.</strong> Completing work is what writes the service record.</li>
            <li><strong>Signals attach to assets.</strong> Short cycling and runtime creep show up on the equipment, not in a separate alarm list.</li>
            <li><strong>Patterns become decisions.</strong> Repeat failures and rising cost are flagged for repair-or-replace review.</li>
          </ul>
        </div>
        <UiAssetTree
          :levels="[
            { label: 'District', value: 'Westbrook USD', count: '14 schools' },
            { label: 'School', value: 'Lincoln Middle', count: '3 buildings' },
            { label: 'Building', value: 'Building B', count: '5 systems' },
            { label: 'System', value: 'Heating plant', count: '4 assets' },
            { label: 'Asset', value: 'Boiler-2 · Hot water boiler' },
          ]"
          summary="Asset hierarchy for a school district: Westbrook USD with 14 schools, Lincoln Middle with 3 buildings, Building B with 5 systems, the heating plant with 4 assets, and Boiler-2."
        />
      </div>
    </section>

    <!-- REGISTRY -->
    <section id="registry" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">What is on the record</p>
            <h2 class="h2">Registry, hierarchy, documents, history, inspections, lifecycle.</h2>
          </div>
          <p class="lede">One record per asset, readable by the technician in the mechanical room and the planner reviewing replacements.</p>
        </div>
        <div class="registry">
          <ul class="record-list" aria-label="What the asset record holds">
            <li v-for="item in record" :key="item.title" class="record-item">
              <span class="record-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="item.icon" /></svg>
              </span>
              <span class="record-title">{{ item.title }}</span>
              <span class="record-line">{{ item.line }}</span>
            </li>
          </ul>
          <div class="visuals">
            <UiWorkQueue
              title="Inspections · Lincoln Middle"
              :rows="inspections"
              summary="Inspection queue with three rows: RTU-7 quarterly due October 3, Boiler-2 annual scheduled, and a kitchen hood quarterly marked verified."
            />
            <UiCapitalRank
              title="Capital review · From the record"
              flag="Repair or replace"
              :rows="[
                { title: 'Boiler-2 · Lincoln Middle', evidence: '3 failures in 12 months · repair cost rising 3 years', decision: 'Replace', when: 'FY27' },
                { title: 'RTU-7 · Jefferson ES', evidence: '3 belt failures · runtime +18% before the last', decision: 'Replace', when: 'FY27' },
                { title: 'Chiller-1 compressor · High school', evidence: 'Single fault · 6 years of remaining life', decision: 'Repair', when: 'This quarter' },
              ]"
              summary="Capital review ranked from the asset record: replace Boiler-2 at Lincoln Middle in FY27 after three failures in twelve months; replace RTU-7 at Jefferson Elementary in FY27 after three belt failures; repair the high school Chiller-1 compressor this quarter."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FROM ONE ASSET TO THE CAPITAL PLAN -->
    <section class="section">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">From one asset to the capital plan</p>
          <h2 class="h2">The third failure is already evidence.</h2>
          <p class="lede">When the same rooftop unit needs a belt for the third time in a year, Edviro has the dates, the costs, the notes, and the runtime data that preceded each one. It flags the unit for review, models repair against replacement, and carries the winner into a funded project.</p>
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link inline-link">How capital planning uses the record →</RouterLink>
        </div>
        <UiFailureTimeline />
      </div>
    </section>

    <!-- CONNECTIONS -->
    <section class="section is-dark">
      <div class="shell">
        <h2 class="h2 dark-h2">Asset records make the rest of the platform smarter.</h2>
        <p class="lede">Diagnostics read the history to explain a fault, work orders carry it to the technician, preventive maintenance is prioritized by it, and the capital plan is built on it. Use Edviro's registry, or connect the asset data in your existing CMMS.</p>
        <div class="links">
          <RouterLink :to="WORK_ORDERS_PATH" class="text-link">School work-order software →</RouterLink>
          <RouterLink :to="CMMS_PATH" class="text-link">Replace or integrate your CMMS →</RouterLink>
          <RouterLink :to="{ path: SCHOOL_ENERGY_PATH, hash: '#preventive-maintenance' }" class="text-link">Preventive maintenance →</RouterLink>
          <RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link">Edviro for schools →</RouterLink>
          <RouterLink :to="PLATFORM_ASSETS_PATH" class="text-link">Asset management for other facility types →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="Asset management FAQ" :items="faqs" />

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
.inline-link {
  display: inline-block;
  margin-top: 18px;
  font-size: 15px;
}
.registry {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px 56px;
  align-items: start;
}
.record-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.record-item {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  grid-template-areas: 'icon title' 'icon line';
  column-gap: 14px;
  row-gap: 2px;
  padding: 12px 14px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
}
.record-icon {
  grid-area: icon;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  color: var(--accent);
}
.record-title {
  grid-area: title;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.record-line {
  grid-area: line;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-2);
  text-wrap: pretty;
}
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
  .two-up, .registry { grid-template-columns: minmax(0, 1fr); gap: 28px; }
}
</style>
