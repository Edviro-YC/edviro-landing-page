<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import IndustryFlow from '@/components/industry/IndustryFlow.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import ReplaceOrConnect from '@/components/platform/ReplaceOrConnect.vue'
import UiApprovalCard, { type TrailEntry } from '@/components/ui/UiApprovalCard.vue'
import UiAssetRecord from '@/components/ui/UiAssetRecord.vue'
import UiBeforeAfter from '@/components/ui/UiBeforeAfter.vue'
import UiFieldPhone from '@/components/ui/UiFieldPhone.vue'
import UiMeterTrend from '@/components/ui/UiMeterTrend.vue'
import UiTelemetryList from '@/components/ui/UiTelemetryList.vue'
import UiWorkQueue, { type Row } from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import {
  CAPITAL_PLANNING_PATH,
  MV_PATH,
  PLATFORM_ASSETS_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  PLATFORM_WORK_ORDERS_PATH,
  SOLUTION_HEALTHCARE_PATH,
} from '@/seo/site'

/*
 * Healthcare. Two stories on one page: critical spaces stay in range and on
 * the record (pressure, temperature, humidity, tests), and support spaces
 * stop wasting energy. Claim guardrails: Edviro reads the BMS, meters, and
 * loggers a site already has and never replaces a pressure monitor, a
 * vaccine-storage data logger, or the life-safety systems; it does not
 * certify compliance with any standard; no healthcare customer results are
 * published (the site's published results are education results). Every
 * setpoint or schedule change is shown passing a named approver. All figures
 * in the visuals are fictional.
 *
 * Industry figures cited on the page and their sources:
 * - Inpatient health-care buildings used 193.3 kBtu/sq ft in 2018 vs 70.4
 *   for all commercial buildings: EIA, 2018 CBECS (health-care building
 *   profile and Consumption & Expenditures highlights).
 * - OR: 20 total ACH, positive pressure, 20–60% RH, 68–75 °F; AII room:
 *   12 total ACH, negative pressure, ≥0.01 in. w.c.: ANSI/ASHRAE/ASHE
 *   Standard 170-2021, Table 7.1 and Section 7.
 * - Vaccine refrigerators 2–8 °C (36–46 °F), digital data logger reading
 *   at least every 30 minutes, min/max recorded each workday: CDC Vaccine
 *   Storage and Handling Toolkit (2023) / Pink Book ch. 5.
 * - Emergency generators: monthly cold-start load test, ≥30 continuous
 *   minutes, 12 tests a year 20–40 days apart, results documented: The Joint
 *   Commission EC.02.05.07 and NFPA 99 6.4.4.1 / NFPA 110 ch. 8.
 * Copy is one short sentence per point; the visuals carry the detail.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: SOLUTION_HEALTHCARE_PATH },
  { name: 'Healthcare', path: SOLUTION_HEALTHCARE_PATH },
]

const flowSteps = [
  { label: 'Out of range', caption: 'AII room 2 loses negative pressure over six hours. The BMS point crosses −0.01 in. w.c. at 06:40.' },
  { label: 'Reviewed work order', caption: 'Edviro names the likely cause and drafts the work order. Facilities reviews and dispatches HVAC.' },
  { label: 'Fixed and on the record', caption: 'The belt is replaced. Pressure is back in range by 08:10. The event, the fix, and the name are on the asset.' },
]

const criticalPoints = [
  { name: 'OR-3 · pressure to corridor', value: '+0.014 in. w.c.', fill: 0.7 },
  { name: 'AII-2 · pressure to corridor', value: '\u22120.003 in. w.c.', fill: 0.12 },
  { name: 'OR-3 · relative humidity', value: '41%', fill: 0.52 },
  { name: 'Pharmacy cooler · temperature', value: '5.1 \u00B0C', fill: 0.5 },
  { name: 'AHU-2 · filter \u0394P', value: '0.9 in. w.c.', fill: 0.6 },
]

const reviewTrail: TrailEntry[] = [
  { text: 'Flagged by Edviro', time: '06:40', state: 'done' },
  { text: 'Reviewed by facilities \u00B7 M. Chen', time: '06:52', state: 'human' },
  { text: 'Dispatched \u00B7 HVAC \u00B7 R. Ortiz', time: '06:55', state: 'done' },
  { text: 'Pressure back in range', time: '08:10', state: 'done' },
]

/** What the detectors catch in a healthcare facility, and what Edviro does with each catch. */
const catches = [
  { title: 'Pressure drift', line: 'An AII room or OR trending toward neutral pressure.', action: 'Work order', icon: 'M3 8c3-2 6-2 9 0s6 2 9 0 M3 14c3-2 6-2 9 0s6 2 9 0' },
  { title: 'Temperature and humidity', line: 'An OR outside 68\u201375 \u00B0F or 20\u201360% RH. A vaccine cooler outside 2\u20138 \u00B0C.', action: 'Alert and work order', icon: 'M14 14.8V4a2 2 0 1 0-4 0v10.8a4 4 0 1 0 4 0z' },
  { title: 'After-hours runtime', line: 'Clinics and offices conditioned all night. Empty support spaces at occupied setpoints.', action: 'Staged for approval', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8v4l3 2' },
  { title: 'Heating against cooling', line: 'Reheat fighting the chiller on the same air handler.', action: 'Investigation opened', icon: 'M12 3c-3 4-6 6-6 10a6 6 0 0 0 12 0c0-4-3-6-6-10z' },
  { title: 'Tests and inspections due', line: 'A generator load test due in its 20\u201340 day window. A filter change past its interval.', action: 'Scheduled', icon: 'M16 2v4M8 2v4M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { title: 'Repeat failures', line: 'The same fan, pump, or damper failing three times in a year.', action: 'Capital plan', icon: 'M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3' },
]

const openWork: Row[] = [
  { title: 'AII-2 negative pressure \u00B7 Wing C', priority: 'High', trade: 'HVAC', status: 'Verified' },
  { title: 'Pharmacy cooler alarm \u00B7 L1', priority: 'High', trade: 'Refrig.', status: 'In progress' },
  { title: 'AHU-2 filter \u0394P \u00B7 Wing C', priority: 'Medium', trade: 'HVAC', status: 'Awaiting review' },
]

const roles = [
  { role: 'Director of facilities or plant operations', gets: 'Every open issue, with its cause, priority, owner, and age.', icon: 'M3 3v18h18 M7 15v-4M12 15V8M17 15v-6' },
  { role: 'HVAC and BMS technicians', gets: 'Assignments on a phone, with the asset history and the steps.', icon: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M12 18h.01' },
  { role: 'Safety officer and EOC committee', gets: 'Readings, tests, and fixes on one record, with dates and names.', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4' },
  { role: 'Finance', gets: 'Verified savings and cost on the same record as the work.', icon: 'M3 7h18v10H3z M14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0' },
]

const guardrails = [
  { title: 'Edviro reads your monitors. It does not replace them.', line: 'Pressure monitors, temperature loggers, and the BMS stay as they are. Edviro reads their data.' },
  { title: 'Edviro proposes. A named person approves.', line: 'No setpoint, schedule, or damper changes on its own. Critical spaces can be excluded from proposals entirely.' },
  { title: 'Edviro keeps the record. It does not certify compliance.', line: 'Readings, work orders, and tests are on one record with dates and names. Your team and your surveyor decide what they mean.' },
]

const faqs: FaqItem[] = [
  {
    question: 'Do we need new sensors?',
    answer:
      'No. Edviro reads the BMS points, meters, and temperature loggers you have. Where a space has no sensor, Edviro flags the gap instead of guessing.',
  },
  {
    question: 'Does Edviro control HVAC in critical spaces?',
    answer:
      'No. Edviro proposes. A named person on your team approves, edits, or rejects. Approved changes go through your BMS. You can exclude critical spaces from proposals entirely.',
  },
  {
    question: 'Does Edviro make us compliant with The Joint Commission?',
    answer:
      'No software does. Edviro keeps the readings, work orders, inspections, and tests on one record with dates and names, so the evidence is there when a surveyor asks. Your team and your standards decide what compliant means.',
  },
  {
    question: 'Can Edviro replace our CMMS?',
    answer:
      'Yes. Edviro has native work orders, asset records, inspections, and mobile field workflows. You can also keep your CMMS and connect it. Integration scope is confirmed system by system.',
  },
  {
    question: 'Where do the energy savings come from in a hospital?',
    answer:
      'Mostly support spaces: offices, clinics, kitchens, and parking, and the air handlers that serve them. Schedules, setbacks, reheat conflicts, and peak-demand timing. Each fix is verified against the baseline before it is called savings.',
  },
]

usePageSeo({
  title: 'Facilities operations software for healthcare',
  description:
    'Edviro reads the BMS, meters, and loggers you have. It flags a room out of range, drafts the work order, and keeps the record surveyors ask for. Your team approves each change.',
  path: SOLUTION_HEALTHCARE_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro facilities operations for healthcare',
      description:
        'AI facilities operations for hospitals and clinics: pressure, temperature, and humidity drift detection from existing BMS points, reviewed work orders, asset records and inspections, and verified energy savings in support spaces.',
      path: SOLUTION_HEALTHCARE_PATH,
      serviceType: 'Facilities operations software for healthcare',
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
      eyebrow="For healthcare facilities"
      lede="Edviro reads the BMS, meters, and loggers you have. It flags a room out of range or a unit running past hours, drafts the work order, and keeps the record surveyors ask for. Your team approves each change."
      note="No change reaches a building system until a named person approves it."
      :secondary="{ label: 'How we verify savings', to: MV_PATH }"
    >
      Keep critical spaces in range. <span class="accent">Keep the record.</span>
    </PlatformHero>

    <!-- IN PRACTICE -->
    <section id="in-practice" class="section is-tint">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">In practice</p>
            <h2 class="h2">One isolation room, start to finish.</h2>
          </div>
          <p class="lede">Out of range, reviewed work order, fixed and on the record. The same loop as every other Edviro workflow.</p>
        </div>
        <IndustryFlow
          title="Wing C · Pressure → work order → record"
          :steps="flowSteps"
          summary="Three-step flow for an airborne infection isolation room: a list of critical BMS points with AII room 2 at minus 0.003 inches of water column, below the minus 0.01 minimum; a reviewed work order naming a slipping exhaust-fan belt as the likely cause, reviewed by facilities at 06:52 and dispatched to HVAC; the exhaust fan's asset record showing the belt replaced and pressure back in range by 08:10."
        >
          <template #step-1>
            <UiTelemetryList
              title="Critical points"
              flag="1 of 5 out of range"
              :feeds="criticalPoints"
              note="Read from the BMS and the temperature loggers already in place."
              summary="Five critical points read from the BMS: OR-3 pressure to corridor plus 0.014 inches of water column, AII-2 pressure minus 0.003 and out of range, OR-3 relative humidity 41 percent, pharmacy cooler 5.1 degrees Celsius, AHU-2 filter pressure drop 0.9 inches of water column."
            />
          </template>
          <template #step-2>
            <UiApprovalCard
              label="Work order review"
              title="AII-2 losing negative pressure · exhaust fan EF-4"
              :details="['Evidence: differential fell from \u22120.02 to \u22120.003 in. w.c. over 6 hours', 'Likely cause: EF-4 belt slip. Filter \u0394P normal.', 'Proposed: dispatch HVAC. Re-verify pressure after the fix.']"
              :trail="reviewTrail"
              status="Approved"
              status-tone="ok"
              summary="Work order review card: AII room 2 losing negative pressure, traced to exhaust fan EF-4. Flagged by Edviro at 06:40, reviewed by facilities (M. Chen) at 06:52, dispatched to HVAC (R. Ortiz) at 06:55, pressure back in range at 08:10."
            />
          </template>
          <template #step-3>
            <UiAssetRecord
              name="EF-4 · AII exhaust fan"
              meta="Greenheck · 2016 · Wing C roof"
              :history="[
                { date: 'Today', event: 'Belt replaced \u2014 pressure back to \u22120.02 in. w.c. by 08:10' },
                { date: 'Mar 12', event: 'Belt tension adjusted' },
                { date: 'Jan 08', event: 'Quarterly inspection \u2014 passed' },
              ]"
              next="Next inspection Oct 08 · 2 belt events in 12 months"
              summary="Asset record for the Wing C isolation-room exhaust fan: make, install year, location, three service-history entries ending with today's belt replacement, and the next inspection with two belt events in twelve months."
            />
          </template>
        </IndustryFlow>
      </div>
    </section>

    <!-- WHAT IT CATCHES -->
    <section id="what-it-catches" class="section is-dark">
      <div class="shell">
        <p class="eyebrow">What Edviro catches</p>
        <h2 class="h2 dark-h2">Drift shows up in the data before it shows up on rounds.</h2>
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

    <!-- OPERATIONS -->
    <section id="operations" class="section">
      <div class="shell">
        <div class="two-up head">
          <div>
            <p class="eyebrow">Operations</p>
            <h2 class="h2">One record for every space, asset, and fix.</h2>
          </div>
          <p class="lede">Use Edviro as your CMMS, or connect the one you have.</p>
        </div>
        <ul class="ops">
          <li class="op">
            <div class="op-crop">
              <UiWorkQueue title="Open · Wing C" :rows="openWork" summary="Open work for Wing C: the AII-2 negative-pressure fix verified, a pharmacy cooler alarm on Level 1 in progress, and an AHU-2 filter pressure-drop issue awaiting review." />
            </div>
            <h3 class="op-title">Work orders</h3>
            <p class="op-body">Requests from nursing, EVS, or a BMS alarm. Each gets a cause, a priority, and a named reviewer before dispatch.</p>
            <RouterLink :to="PLATFORM_WORK_ORDERS_PATH" class="text-link op-link">Work orders →</RouterLink>
          </li>
          <li class="op">
            <div class="op-crop">
              <UiAssetRecord
                name="AHU-2 · Air handler"
                meta="Trane · 2014 · Wing C mechanical"
                :history="[
                  { date: 'Sep 14', event: 'Filter \u0394P high \u2014 filters changed' },
                  { date: 'Jun 20', event: 'Quarterly inspection \u2014 dampers, belts' },
                  { date: 'Mar 11', event: 'Reheat valve leaking \u2014 replaced' },
                ]"
                next="Next inspection Sep 20 · filters every 90 days"
                summary="Asset record for the Wing C air handler: make, install year, location, three service-history entries, and the next inspection with a 90-day filter interval."
              />
            </div>
            <h3 class="op-title">Assets and inspections</h3>
            <p class="op-body">Every air handler, exhaust fan, and cooler has a record: nameplate, documents, service history, and the next test. One search when the surveyor asks.</p>
            <RouterLink :to="PLATFORM_ASSETS_PATH" class="text-link op-link">Asset management →</RouterLink>
          </li>
          <li class="op">
            <div class="op-crop is-phone">
              <UiFieldPhone
                compact
                label="WO-3172 · Assigned to you"
                priority="High"
                title="AII-2 negative pressure · EF-4"
                meta="Wing C roof · Greenheck, 2016"
                last-service="Mar 12 · belt tension adjusted · R. Ortiz"
                :steps="[
                  { text: 'Check belt and sheave', done: true },
                  { text: 'Replace belt', done: true },
                  { text: 'Confirm \u22120.01 in. w.c. at the room monitor' },
                ]"
                summary="Phone screen of an assigned high-priority work order for the Wing C exhaust fan with the last service entry and a three-step checklist, two steps done."
              />
            </div>
            <h3 class="op-title">In the field</h3>
            <p class="op-body">The technician gets the assignment, the history, and the steps on a phone. Photos and notes go on the record.</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ENERGY -->
    <section id="energy" class="section is-tint">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">Continuous optimization</p>
          <h2 class="h2">Critical spaces run to the standard. Support spaces do not have to.</h2>
          <p class="lede">Edviro finds the drift in the meter data, proposes the fix, and verifies the savings against the baseline.</p>
          <dl class="stat">
            <div class="stat-row">
              <dt>Inpatient buildings, energy per square foot</dt>
              <dd>193 kBtu</dd>
            </div>
            <div class="stat-row">
              <dt>All commercial buildings</dt>
              <dd>70 kBtu</dd>
            </div>
          </dl>
          <p class="stat-src">Annual figures. Source: EIA, 2018 Commercial Buildings Energy Consumption Survey.</p>
          <RouterLink :to="MV_PATH" class="text-link">How verification works →</RouterLink>
        </div>
        <div class="visuals">
          <UiMeterTrend
            title="Medical office building · Main meter · 7 days"
            flag="Night load +31%"
            summary="Chart of a week of meter readings for a medical office building against the learned baseline band, with night load 31 percent above it flagged."
          />
          <UiBeforeAfter
            title="Verification · MOB AHU schedule"
            :ratio="0.84"
            delta="−16% kWh"
            note="Verified over 60 days against the learned baseline"
            summary="Bar comparison: electricity after the medical office building air-handler schedule fix is 16 percent below the learned baseline, verified over 60 days."
          />
        </div>
      </div>
    </section>

    <!-- GUARDRAILS -->
    <section id="guardrails" class="section">
      <div class="shell">
        <p class="eyebrow">What Edviro does not do</p>
        <h2 class="h2">Three lines Edviro does not cross.</h2>
        <ul class="rails">
          <li v-for="g in guardrails" :key="g.title" class="rail">
            <h3>{{ g.title }}</h3>
            <p>{{ g.line }}</p>
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
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link">Capital planning →</RouterLink>
          <RouterLink :to="PLATFORM_FACILITIES_OPS_PATH" class="text-link">See the full platform →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ROLES -->
    <section id="roles" class="section is-tint">
      <div class="shell">
        <p class="eyebrow">Who uses it</p>
        <h2 class="h2">One record, read by everyone who runs the building.</h2>
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

    <FaqList eyebrow="Questions from facilities teams" heading="Healthcare FAQ" :items="faqs" />

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
.visuals {
  display: grid;
  gap: 14px;
  min-width: 0;
}
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
/* Fixed-height crop with a soft bottom fade so the titles sit on one line. */
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

/* Energy stat */
.stat {
  margin: 26px 0 0;
  display: grid;
  gap: 10px;
  max-width: 460px;
}
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding-top: 10px;
  border-top: 1.5px solid var(--ink);
}
.stat-row dt {
  font-size: 13.5px;
  line-height: 1.4;
  color: var(--muted-2);
}
.stat-row dd {
  margin: 0;
  font-size: clamp(26px, 2.6vw, 34px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: var(--track-display);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.stat-src {
  margin: 10px 0 20px;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--muted-2);
}
#energy .text-link { font-size: 15px; }

/* Guardrails */
.rails {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.rail {
  display: grid;
  gap: 8px;
  align-content: start;
  min-width: 0;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 18px;
}
.rail h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.rail p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--ink-2);
}

.roc-wrap { margin-top: 32px; }
.links {
  margin-top: 26px;
  display: flex;
  gap: 8px 24px;
  flex-wrap: wrap;
  font-size: 15px;
}

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

@media (max-width: 1080px) {
  .roles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 1024px) {
  .catches { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 900px) {
  .two-up { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .head .lede { margin-top: 0; }
  .ops, .rails { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 600px) {
  .catches { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 560px) {
  .roles { grid-template-columns: minmax(0, 1fr); }
}
</style>
