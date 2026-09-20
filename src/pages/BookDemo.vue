<script setup lang="ts">
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import StepStrip, { type Step } from '@/components/platform/StepStrip.vue'
import UiApprovalCard from '@/components/ui/UiApprovalCard.vue'
import UiCauseCard from '@/components/ui/UiCauseCard.vue'
import UiDemandPeaks from '@/components/ui/UiDemandPeaks.vue'
import UiMeterTrend from '@/components/ui/UiMeterTrend.vue'
import UiQuoteBuilder from '@/components/ui/UiQuoteBuilder.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import { BOOK_DEMO_PATH, DEMO_CLICK_OPENAI_EVENT, DEMO_REDIRECT_PATH, EDU_LIVE_SITES, EDU_VERIFIED_SAVINGS } from '@/seo/site'

/*
 * Shared conversion path: industry-neutral by design. Segment-specific
 * language belongs on the industry pages that link here.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Demo & pricing', path: BOOK_DEMO_PATH },
]

const steps: Step[] = [
  { title: 'A 30-minute demo', detail: 'Edviro end to end—what it reads, what it flags, what it hands your team to fix. With the founders, not an SDR.', icon: 'calendar' },
  { title: 'A quote for your sites', detail: 'Which sites, which systems, where you suspect money is going; quoted on exactly what you turn on.', icon: 'quote' },
  { title: 'Connect, then your first report', detail: 'Bills and meter data connected, Edviro reading your sites, and an initial report on what it found.', icon: 'report' },
]

const covers = [
  { line: 'Usage that stops matching how a building is used: after hours, weekends, shutdowns.', kind: 'trend' },
  { line: 'What demand charges cost, and how much of it is one shiftable spike.', kind: 'peaks' },
  { line: 'Billing and tariff problems: misapplied line items, load on the wrong rate schedule.', kind: 'billing' },
  { line: 'How a finding becomes a reviewed work order, verified in the data afterward.', kind: 'approval' },
] as const

const pricingPoints = [
  { title: 'Priced per connected site', body: 'Sites, not headcount; adding a technician costs nothing.' },
  { title: 'Scoped to what you turn on', body: 'Nothing bundled; no module exists only to unlock another.' },
  { title: 'No install project first', body: 'No hardware and no rip-and-replace before the first finding.' },
  { title: 'No unverifiable savings', body: 'Results report against a learned baseline, in the meter data and on the bill.' },
]

const faqs: FaqItem[] = [
  {
    question: 'What actually happens on the demo call?',
    answer:
      'Thirty minutes with the founders. We walk you through Edviro—how it reads bills, interval data, and building signals, what it flags, and what it hands your team to fix—then talk through your portfolio so we can scope a quote.',
  },
  {
    question: 'Who should be on the call?',
    answer:
      'Usually a director of facilities, maintenance, operations, sustainability, or finance. Anyone is welcome, and it helps to have someone who knows the buildings alongside someone who knows the budget.',
  },
  {
    question: 'How much does Edviro cost?',
    answer:
      'Pricing depends on your portfolio, how many sites you connect, and how much of Edviro you turn on. We scope it on the call and quote on exactly what you need; nothing is bundled.',
  },
  {
    question: 'Do we need new hardware or a new building management system?',
    answer:
      'No. Edviro is software that sits on top of what you already have. It connects to your meters, building management system, sensors, work-order system, and utility data without ripping anything out. Integration scope is confirmed system by system.',
  },
  {
    question: 'Can we start with a single site?',
    // Proof figures come from src/seo/site.ts (owner + source noted there).
    answer: `Yes. Most teams connect a few sites, see what Edviro finds in the first week, then expand. Our education customers have verified more than ${EDU_VERIFIED_SAVINGS} in savings across ${EDU_LIVE_SITES} live school sites.`,
  },
]

usePageSeo({
  title: 'Demo & pricing',
  description:
    'Book a 30-minute Edviro demo with the founders, see how it finds and fixes problems across your sites, and get a quote scoped to exactly what your team needs.',
  path: BOOK_DEMO_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro demo and pricing',
      description:
        'A 30-minute product demo with the founders, a scoping conversation about your portfolio, and a quote priced per connected site.',
      path: BOOK_DEMO_PATH,
      areaServed: 'United States',
    }),
    faqLd(faqs),
  ],
})

/**
 * Reports opening the scheduler as demand for contact, not as a booking — the
 * confirmed booking is reported from /demo-booked when Calendly redirects back.
 * Only OpenAI Ads gets this softer signal, because its taxonomy has a separate
 * standard event for it; the Google and LinkedIn conversions would need second
 * conversion actions created in their dashboards to be told apart from a booking.
 * The pixel loads from index.html.
 */
function reportDemoIntent(): void {
  window.oaiq?.('measure', DEMO_CLICK_OPENAI_EVENT, { type: 'customer_action' })
}
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 56px;">
      <div class="shell">
        <div style="max-width: 780px;">
          <p class="eyebrow">Demo &amp; pricing</p>
          <h1 style="margin: 0; font-weight: 500; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: var(--track-display); text-wrap: balance;">See Edviro run, then get a quote for <span style="color: var(--accent);">your sites</span>.</h1>
          <p class="lede" style="max-width: 620px;">Thirty minutes with the founders: a walkthrough of the product, a conversation about your portfolio, and a quote scoped to exactly what you need.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <a :href="DEMO_REDIRECT_PATH" target="_blank" rel="noopener" class="btn btn-primary" @click="reportDemoIntent">Book a 30-minute demo</a>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT GOES -->
    <section id="how-it-goes" class="how">
      <div class="shell">
        <h2 class="h2 how-h2">How it goes, from the call to your first report.</h2>
        <StepStrip :steps="steps" label="From the call to your first report" />
      </div>
    </section>

    <!-- ON THE CALL -->
    <section id="on-the-call" class="section is-dark">
      <div class="shell">
        <div class="split">
          <div>
            <p class="eyebrow">On the call</p>
            <h2 class="h2 dark-h2">Nothing to prepare.</h2>
            <p class="lede">No data pull, no install, no access to your control system. Bring the buildings you are worried about and your team's questions.</p>
            <a :href="DEMO_REDIRECT_PATH" target="_blank" rel="noopener" class="btn btn-primary is-inverse" @click="reportDemoIntent">Book a 30-minute demo</a>
          </div>
          <div>
            <h3 class="covers-h3">What you will see Edviro catching</h3>
            <ul class="covers">
              <li v-for="c in covers" :key="c.kind" class="cover">
                <div class="cover-crop">
                  <UiMeterTrend v-if="c.kind === 'trend'" title="Main meter · 7 days" flag="Weekend load +38%" summary="Chart of a week of meter readings against the learned baseline band, with weekend load 38 percent above it flagged." />
                  <UiDemandPeaks v-else-if="c.kind === 'peaks'" />
                  <UiCauseCard
                    v-else-if="c.kind === 'billing'"
                    label="Billing review"
                    title="Demand charge on a rate schedule this load no longer fits"
                    :evidence="['Peak 412 kW vs 380 kW schedule threshold', 'Same line item on the last 3 bills', 'Alternative schedule quoted from your tariff']"
                    footer="Flagged for the business office"
                    footerTone="info"
                    summary="Billing review card: a demand charge on a rate schedule the load no longer fits, with three evidence lines and a flag for the business office."
                  />
                  <UiApprovalCard
                    v-else
                    label="Work order · WO-2418"
                    title="Reset gym HVAC to the occupied schedule; remove the weekend override"
                    :details="['Found by Edviro from weekend load', 'Approved before dispatch', 'Verified against the learned baseline']"
                    :trail="[
                      { text: 'Proposed by Edviro', time: 'Mon', state: 'done' },
                      { text: 'Approved by facilities · J. Alvarez', time: 'Mon', state: 'human' },
                      { text: 'Completed on site', time: 'Tue', state: 'done' },
                      { text: 'Verified · weekend load back to baseline', time: 'Sun', state: 'done' },
                    ]"
                    status="Verified"
                    statusTone="verified"
                    summary="Work order card: reset the gym HVAC to the occupied schedule and remove the weekend override. Trail: proposed by Edviro Monday, approved by facilities the same day, completed on site Tuesday, verified the following Sunday when weekend load returned to baseline."
                  />
                </div>
                <p class="cover-line">{{ c.line }}</p>
              </li>
            </ul>
            <p class="covers-foot">Illustrative product views with fictional data. Then we scope your sites and quote from there.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="pricing">
      <div class="shell">
        <div class="split">
          <div>
            <p class="eyebrow">Pricing</p>
            <h2 class="h2">Pay for the part you are actually using.</h2>
            <p class="lede">Quoted per connected site and scoped to what you turn on. Start where the pain is; expand when the last step has paid for itself.</p>
            <ul class="pricing-points">
              <li v-for="p in pricingPoints" :key="p.title">
                <span class="pricing-check" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                </span>
                <span><strong>{{ p.title }}.</strong> {{ p.body }}</span>
              </li>
            </ul>
          </div>
          <div class="pricing-visual">
            <UiQuoteBuilder />
            <p class="ui-note">Illustrative. Pricing depends on your portfolio and what you turn on.</p>
          </div>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Before you book" heading="Demo and pricing FAQ" :items="faqs" />

    <!-- CTA -->
    <section style="padding: 100px 32px; background: var(--accent); color: var(--on-dark); --focus-ring: var(--on-dark);">
      <div style="max-width: 820px; margin: 0 auto; width: 100%; text-align: center;">
        <h2 style="margin: 0; font-weight: 500; font-size: clamp(34px, 5vw, 56px); line-height: 1.05; letter-spacing: var(--track-display); color: #F2F5F1; text-wrap: balance;">Book the thirty minutes.</h2>
        <p style="margin: 24px auto 0; max-width: 560px; font-size: 18px; line-height: 1.6; color: rgba(237,240,238,0.78);">We will walk you through Edviro, talk through your sites, and tell you what it would cost. Bring whoever should hear it.</p>
        <div style="margin-top: 34px; display: flex; justify-content: center;">
          <a :href="DEMO_REDIRECT_PATH" target="_blank" rel="noopener" class="cta-btn" style="font-size: 16px; font-weight: 600; text-decoration: none; color: var(--accent); background: #EDF0EE; padding: 15px 34px; border-radius: 999px;" @click="reportDemoIntent">Pick a time</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.how { padding: 12px 32px 64px; }
.how-h2 { margin-bottom: 28px; max-width: 640px; }
.split {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 40px 56px;
  align-items: start;
}
.dark-h2 { color: #F2F5F1; }
.is-dark .lede { margin-bottom: 24px; }
.covers-h3 {
  margin: 0 0 14px;
  font-size: 16px;
  font-weight: 600;
  color: var(--on-dark);
}
.covers {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.cover {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 10px;
  min-width: 0;
}
/* Cards sit at the top of a stretched cell so the captions line up per row. */
.cover-crop {
  display: grid;
  align-items: start;
  align-content: start;
  font-size: 12px;
}
.cover-line {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--on-dark-muted);
  text-wrap: pretty;
}
.covers-foot {
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--on-dark-faint);
}
.pricing { padding: 70px 32px 30px; }
.pricing .lede { margin-bottom: 22px; }
.pricing-points {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  font-size: 15px;
  line-height: 1.5;
  color: var(--ink-2);
}
.pricing-points li { display: flex; gap: 10px; align-items: baseline; }
.pricing-points strong { color: var(--ink); font-weight: 600; }
.pricing-check {
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--status-ok-bg);
  color: var(--accent);
  transform: translateY(3px);
}
.pricing-visual { display: grid; gap: 10px; max-width: 440px; justify-self: end; width: 100%; }
.btn-primary.is-inverse {
  background: var(--on-dark);
  color: var(--dark);
}
.btn-primary.is-inverse:hover {
  filter: brightness(1.06);
}
.cta-btn:hover {
  filter: brightness(1.06);
}
@media (max-width: 900px) {
  .split { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .pricing-visual { justify-self: start; }
}
@media (max-width: 560px) {
  .covers { grid-template-columns: minmax(0, 1fr); }
}
</style>
