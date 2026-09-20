<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import FaqList from '@/components/FaqList.vue'
import MessageWorkOrderDemo from '@/components/MessageWorkOrderDemo.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import ReportExcerpts from '@/components/ReportExcerpts.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import ReplaceOrConnect from '@/components/platform/ReplaceOrConnect.vue'
import UiAssetRecord from '@/components/ui/UiAssetRecord.vue'
import UiBeforeAfter from '@/components/ui/UiBeforeAfter.vue'
import UiCapitalRank from '@/components/ui/UiCapitalRank.vue'
import UiCauseCard from '@/components/ui/UiCauseCard.vue'
import UiFieldPhone from '@/components/ui/UiFieldPhone.vue'
import UiMeterTrend from '@/components/ui/UiMeterTrend.vue'
import UiWorkQueue, { type Row } from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  BLOG_URL,
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  EDU_LIVE_SITES,
  EDU_VERIFIED_SAVINGS,
  MV_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

/*
 * The one school page: energy management (the ranking intent for this URL;
 * path, canonical, and title stay put) plus the facilities-operations story
 * that used to live at /solutions/school-facilities-operations/, which now
 * 301s here. Copy is deliberately short: one sentence per point, the visuals
 * carry the detail.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Schools', path: SCHOOL_ENERGY_PATH },
]

/** What the detectors catch, and what Edviro does with each catch. */
const catches = [
  { title: 'Boiler short-cycling', line: '14 starts an hour. A work order with the reset steps.', action: 'Work order', icon: 'M12 3c-3 4-6 6-6 10a6 6 0 0 0 12 0c0-4-3-6-6-10z' },
  { title: 'After-hours runtime', line: 'HVAC and lights running all weekend in an empty building.', action: 'Staged for approval', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8v4l3 2' },
  { title: 'Ventilation and comfort', line: 'CO\u2082 rising in a gym or classroom.', action: 'Schedule proposed', icon: 'M3 8c3-2 6-2 9 0s6 2 9 0 M3 14c3-2 6-2 9 0s6 2 9 0' },
  { title: 'Demand spikes', line: 'Peak-risk days forecast each week. Pre-cooling proposed.', action: 'Forecast', icon: 'M3 17l6-6 4 4 8-8 M15 7h6v6' },
  { title: 'Unexpected gas or water use', line: 'A gas meter running through a warm week. Water that never drops overnight.', action: 'Investigation opened', icon: 'M12 3l4 6a5 5 0 1 1-8 0z' },
  { title: 'Solar underperformance', line: 'Production tracked against expected output.', action: 'Raised with installer', icon: 'M12 4v2 M12 18v2 M4 12h2 M18 12h2 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
]

const districtQueue: Row[] = [
  { title: 'Room 214 too hot \u00B7 Lincoln HS', priority: 'High', trade: 'HVAC', status: 'Awaiting review' },
  { title: 'Gas meter running \u00B7 Roosevelt MS', priority: 'Medium', trade: 'Plumbing', status: 'In progress' },
  { title: 'RTU-7 belt \u00B7 Jefferson ES', priority: 'Low', trade: 'HVAC', status: 'Verified' },
]

const inspections: Row[] = [
  { title: 'Fall boiler inspection \u00B7 Lincoln HS', priority: 'Medium', trade: 'Mechanical', status: 'Due Oct 15' },
  { title: 'Belt check \u00B7 RTU-7 \u00B7 3rd failure', priority: 'High', trade: 'HVAC', status: 'Awaiting review' },
  { title: 'Quarterly filters \u00B7 Roosevelt MS', priority: 'Low', trade: 'HVAC', status: 'In progress' },
]

const roles = [
  { role: 'Director of maintenance and operations', gets: 'Every open issue, with its cause, priority, owner, and age.', icon: 'M3 3v18h18 M7 15v-4M12 15V8M17 15v-6' },
  { role: 'Technicians and custodial leads', gets: 'Assignments on a phone, with the asset history and the steps.', icon: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M12 18h.01' },
  { role: 'Business officials', gets: 'Verified savings and cost on the same record as the work.', icon: 'M3 7h18v10H3z M14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0' },
  { role: 'Superintendents and boards', gets: 'A capital plan that traces back to inspections and failures.', icon: 'M4 21V5l7-2v18M11 21h9V9h-9 M7 7h.01M7 11h.01M15 12h.01M15 16h.01' },
]

const faqs: FaqItem[] = [
  {
    question: 'Do we need new hardware or a new BMS?',
    answer:
      'No. Edviro reads the meters, building management system, and utility bills you already have. Where a site has no interval meter, metering can be added later.',
  },
  {
    question: 'Does Edviro change setpoints or schedules on its own?',
    answer:
      'No. Edviro proposes the change and tests it against how the building behaved before. Your team approves it before anything is sent to the BMS.',
  },
  {
    question: 'Can Edviro replace our CMMS?',
    answer:
      'Yes. Edviro has native work orders, asset records, inspections, and mobile field workflows. You can also keep your CMMS and connect it. Integration scope is confirmed system by system.',
  },
  {
    question: 'How is this different from an energy audit?',
    answer:
      'An audit is a snapshot. Edviro checks every site every day, catches drift when it starts, and verifies each fix against the learned baseline.',
  },
  {
    question: 'How fast does a district see results?',
    // Proof figures come from src/seo/site.ts (owner + source noted there).
    answer: `Edviro connects a few sites and shows what it catches in the first week. To date Edviro has saved education customers over ${EDU_VERIFIED_SAVINGS}, with ${EDU_LIVE_SITES} school sites live.`,
  },
]

usePageSeo({
  title: 'Energy Management Software for Schools',
  description:
    'Edviro finds energy waste in every school, drafts the work order, and verifies the fix on the meter. Work orders, assets, inspections, and capital planning for K-12 districts.',
  path: SCHOOL_ENERGY_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro energy management and facilities operations software for schools',
      description:
        'AI energy management and facilities operations for K-12 districts: continuous monitoring, diagnostics, reviewed work orders, asset records, inspections, verified savings, and capital planning.',
      path: SCHOOL_ENERGY_PATH,
      serviceType: 'Energy management software for schools',
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
      eyebrow="For school districts"
      lede="Edviro reads your meters, BMS, and bills. It finds waste as it starts, drafts the work order, and checks the meter after the fix. Your team approves every change."
      note="No new hardware. Works with the controls you have."
      :secondary="{ label: 'How we verify savings', to: MV_PATH }"
    >
      Energy management software for schools that <span class="accent">fixes what it finds.</span>
      <template #visual>
        <div class="visuals">
          <UiMeterTrend
            title="Lincoln Middle · Main meter · 7 days"
            flag="Weekend load +38%"
            summary="Chart of a week of meter readings at Lincoln Middle against the learned baseline band, with weekend load flagged 38% above normal."
          />
          <UiCauseCard
            title="Gym HVAC left in occupied mode over the weekend"
            :evidence="['Runtime Fri 6 pm \u2013 Mon 5 am', 'Setpoint held at 68\u00B0F', 'No event on the facilities calendar']"
            footer="WO-2418 · Awaiting review · J. Alvarez"
            summary="Diagnosis card: the gym HVAC was left in occupied mode over the weekend, with three evidence points and a work order awaiting review by J. Alvarez."
          />
        </div>
      </template>
    </PlatformHero>

    <!-- WHAT IT CATCHES -->
    <section id="what-it-catches" class="section is-dark">
      <div class="shell">
        <p class="eyebrow">What Edviro catches</p>
        <h2 class="h2 dark-h2">Waste hides in every school. Edviro finds it in the data.</h2>
        <ul class="catches" aria-label="What Edviro catches and what it does about each">
          <li v-for="c in catches" :key="c.title" class="catch">
            <span class="catch-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="c.icon" /></svg>
            </span>
            <span class="catch-title">{{ c.title }}</span>
            <span class="catch-line">{{ c.line }}</span>
            <span class="ui-pill is-review catch-action">{{ c.action }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">How it works</p>
            <h2 class="h2">From a text to a verified fix.</h2>
          </div>
          <p class="lede">One classroom request, start to finish: the likely cause, a drafted work order, the director's approval, the technician, and the data check that the room recovered.</p>
        </div>
        <div class="demo-wrap">
          <MessageWorkOrderDemo :scenarios="['campus']" />
        </div>
        <RouterLink :to="WORK_ORDERS_PATH" class="text-link">School work-order software →</RouterLink>
      </div>
    </section>

    <!-- OPERATIONS -->
    <section id="work-orders" class="section">
      <!-- Legacy anchors from the old facilities-operations page. -->
      <span id="assets" aria-hidden="true" class="anchor-alias"></span>
      <span id="preventive-maintenance" aria-hidden="true" class="anchor-alias"></span>
      <span id="mobile" aria-hidden="true" class="anchor-alias"></span>
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">Operations</p>
            <h2 class="h2">One record for every school, asset, and fix.</h2>
          </div>
          <p class="lede">Use Edviro as your CMMS, or connect the one you have.</p>
        </div>
        <ul class="ops">
          <li class="op">
            <div class="op-crop">
              <UiWorkQueue title="Open · All schools" :rows="districtQueue" summary="District-wide work queue: Room 214 too hot at Lincoln HS awaiting review, a gas meter running at Roosevelt MS in progress, and a verified RTU-7 belt repair at Jefferson ES." />
            </div>
            <h3 class="op-title">Work orders</h3>
            <p class="op-body">Requests from the app, email, or a BMS alarm. Each gets a cause, a priority, and a named reviewer before dispatch.</p>
            <RouterLink :to="WORK_ORDERS_PATH" class="text-link op-link">Work orders →</RouterLink>
          </li>
          <li class="op">
            <div class="op-crop">
              <UiAssetRecord
                name="Boiler-2 · Hot-water boiler"
                meta="Lochinvar CREST · 2009 · Lincoln HS gym wing"
                :history="[
                  { date: 'Sep 14', event: 'Short-cycling \u2014 flame sensor replaced' },
                  { date: 'Feb 03', event: 'Short-cycling \u2014 control board reset' },
                  { date: 'Sep 02', event: 'Fall inspection \u2014 combustion tuned' },
                ]"
                next="Next inspection Oct 15 · 3 failures in 12 months"
                summary="Asset record for the Lincoln High School gym boiler: make, model, install year, three service-history entries, and the next inspection, with three failures in twelve months."
              />
            </div>
            <h3 class="op-title">Assets and inspections</h3>
            <p class="op-body">Every boiler, RTU, and panel has a record: nameplate, documents, service history, and the next inspection.</p>
            <RouterLink :to="ASSETS_PATH" class="text-link op-link">Asset management →</RouterLink>
          </li>
          <li class="op">
            <div class="op-crop">
              <UiWorkQueue title="Inspections · Scheduled" :rows="inspections" summary="Inspection queue: a fall boiler inspection at Lincoln HS due October 15, a belt check on RTU-7 raised to high priority after a third failure, and quarterly filter changes at Roosevelt MS in progress." />
            </div>
            <h3 class="op-title">Preventive maintenance</h3>
            <p class="op-body">Recurring work runs against the asset. Repeat failures and rising cost move it up the list.</p>
          </li>
          <li class="op">
            <div class="op-crop is-phone">
              <UiFieldPhone compact summary="Phone screen of an assigned work order for the Lincoln High School gym boiler with the last service entry and a step checklist." />
            </div>
            <h3 class="op-title">In the field</h3>
            <p class="op-body">The technician gets the assignment, the history, and the steps on a phone. Photos and notes go on the record.</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- REPLACE OR CONNECT -->
    <section id="cmms" class="section is-dark">
      <div class="shell">
        <p class="eyebrow">Your CMMS</p>
        <h2 class="h2 dark-h2">Replace your CMMS, or connect the one you use.</h2>
        <p class="lede">Monitoring, diagnostics, and verification work the same either way.</p>
        <div class="roc-wrap">
          <ReplaceOrConnect />
        </div>
        <div class="links">
          <RouterLink :to="CMMS_PATH" class="text-link">Compare Edviro with a traditional CMMS →</RouterLink>
        </div>
      </div>
    </section>

    <!-- MEASUREMENT AND VERIFICATION + CAPITAL PLANNING -->
    <section id="mv" class="section">
      <span id="planning" aria-hidden="true" class="anchor-alias"></span>
      <div class="shell two-col">
        <div class="col">
          <p class="eyebrow">Measurement and verification</p>
          <h2 class="h2 col-h2">Savings the business office can take to the board.</h2>
          <p class="lede">Every fix is measured against how the school behaved before. One report per site, in plain language.</p>
          <UiBeforeAfter
            title="Verification · Boiler-2 schedule · Lincoln Middle"
            :ratio="0.88"
            delta="−12% therms"
            note="Verified over 60 days against the learned baseline"
            summary="Bar comparison: gas use after the Boiler-2 schedule fix at Lincoln Middle is 12% below the learned baseline, verified over 60 days."
          />
          <ReportExcerpts />
          <RouterLink :to="MV_PATH" class="text-link col-link">How verification works →</RouterLink>
        </div>
        <div class="col">
          <p class="eyebrow">Capital planning</p>
          <h2 class="h2 col-h2">From this year's waste to next year's projects.</h2>
          <p class="lede">Repeat failures and repair cost build the case. Test replace against repair with your own data, then rank the list.</p>
          <UiCapitalRank
            title="Capital plan · Northgate USD"
            :rows="[
              { title: 'Boiler-2 \u00B7 Lincoln HS gym wing', evidence: '3 failures in 12 months \u00B7 repair cost rising 3 years', decision: 'Replace', when: 'FY27' },
              { title: 'RTU-3 to RTU-6 \u00B7 Roosevelt MS', evidence: '2011 units \u00B7 igniter faults on three of four', decision: 'Replace', when: 'FY28' },
              { title: 'Chiller-1 compressor \u00B7 Jefferson ES', evidence: 'Single fault \u00B7 6 years of remaining life', decision: 'Repair', when: 'This quarter' },
              { title: 'Gym lighting controls \u00B7 Lincoln HS', evidence: 'After-hours runtime verified', decision: 'Project', when: 'FY27' },
            ]"
            note="Each line traces back to inspections and work orders."
            summary="Ranked capital priorities for Northgate USD: replace the Lincoln HS gym boiler in FY27 after three failures in twelve months; replace four 2011 rooftop units at Roosevelt MS in FY28; repair the Jefferson ES chiller compressor this quarter; a Lincoln HS gym lighting-controls project in FY27 justified by verified after-hours runtime."
          />
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link col-link">Capital planning →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ROLES -->
    <section id="roles" class="section is-tint">
      <div class="shell">
        <p class="eyebrow">Who uses it</p>
        <h2 class="h2">One record, read by everyone who runs the district.</h2>
        <ul class="roles">
          <li v-for="r in roles" :key="r.role" class="role">
            <span class="role-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="r.icon" /></svg>
            </span>
            <h3>{{ r.role }}</h3>
            <p>{{ r.gets }}</p>
          </li>
        </ul>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="School FAQ" :items="faqs" />

    <section class="related">
      <div class="related-shell">
        <p class="eyebrow">Related reading</p>
        <ul class="related-list">
          <li><a :href="`${BLOG_URL}/blog/best-energy-management-software-for-schools/`" class="text-link">Best energy management software for schools: what districts should evaluate</a></li>
          <li><a :href="`${BLOG_URL}/blog/give-school-facilities-teams-their-weekends-back/`" class="text-link">Give school facilities teams their weekends back</a></li>
          <li><a :href="`${BLOG_URL}/blog/cmms-vs-ai-native-om-platform-for-school-districts/`" class="text-link">CMMS vs. AI-native O&amp;M platform: what school districts actually need</a></li>
        </ul>
      </div>
    </section>

    <CtaSection />
  </main>
</template>

<style scoped>
.anchor-alias {
  position: absolute;
  top: 0;
  left: 0;
}
#work-orders, #mv { position: relative; }
.visuals {
  display: grid;
  gap: 14px;
  min-width: 0;
}
.two-up {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px 56px;
  align-items: center;
}
.head { align-items: end; margin-bottom: 32px; }
.head .lede { margin: 0; }
.demo-wrap {
  max-width: 860px;
  margin: 0 auto 24px;
}
#how-it-works .shell > .text-link { font-size: 15px; }
.dark-h2 { color: #F2F5F1; max-width: 720px; }
.is-dark .lede { max-width: 720px; }

/* Detection tiles */
.catches {
  list-style: none;
  margin: 36px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.catch {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  grid-template-areas: 'icon title' 'icon line' 'icon action';
  column-gap: 12px;
  row-gap: 4px;
  padding: 16px;
  background: var(--dark-2);
  border: 1px solid var(--dark-line);
  border-radius: 14px;
  min-width: 0;
}
.catch-icon {
  grid-area: icon;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--dark);
  color: var(--success-bright);
}
.catch-title {
  grid-area: title;
  font-size: 15.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--on-dark);
}
.catch-line {
  grid-area: line;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--on-dark-muted);
  text-wrap: pretty;
}
.catch-action {
  grid-area: action;
  justify-self: start;
  margin-top: 4px;
}

/* Operations tiles */
.ops {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}
.op {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  align-content: start;
  gap: 8px;
  min-width: 0;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 14px 18px 20px;
}
/* Fixed-height crop with a soft bottom fade so the four titles sit on one line. */
.op-crop {
  display: grid;
  align-items: start;
  align-content: start;
  height: 212px;
  overflow: hidden;
  margin: 0 -4px 10px;
  padding: 10px 6px 0;
  font-size: 12px;
  mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
}
.op-crop.is-phone { justify-items: center; }
.op-title {
  margin: 0;
  padding-top: 14px;
  border-top: 1px solid var(--line-soft);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.op-body {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--ink-2);
  text-wrap: pretty;
}
.op-link { font-size: 14px; justify-self: start; }

.roc-wrap { margin-top: 32px; }
.links {
  margin-top: 26px;
  display: flex;
  gap: 8px 24px;
  flex-wrap: wrap;
  font-size: 15px;
}

/* M&V + capital planning columns */
.two-col {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 40px 56px;
  align-items: start;
}
.col {
  display: grid;
  gap: 18px;
  align-content: start;
  min-width: 0;
}
.col .eyebrow { margin-bottom: 0; }
.col-h2 { font-size: clamp(26px, 3.2vw, 38px); }
.col .lede { margin: 0; }
.col-link { font-size: 15px; justify-self: start; }

/* Roles */
.roles {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}
.role {
  display: grid;
  gap: 8px;
  align-content: start;
  min-width: 0;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 18px;
}
.role-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--status-ok-bg);
  color: var(--accent);
  margin-bottom: 4px;
}
.role h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.role p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--ink-2);
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
@media (max-width: 1080px) {
  .ops, .roles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 1024px) {
  .catches { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 900px) {
  .two-up, .two-col { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .head .lede { margin-top: 0; }
}
@media (max-width: 600px) {
  .catches { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 560px) {
  .ops, .roles { grid-template-columns: minmax(0, 1fr); }
}
</style>
