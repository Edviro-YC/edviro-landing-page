<script setup lang="ts">
import { ref } from 'vue'
import SiteLink from '@/components/SiteLink.vue'
import DemoButton from '@/components/DemoButton.vue'
import { useAwesomicMotion } from '@/composables/useAwesomicMotion'
import { EDU_LIVE_SITES, EDU_VERIFIED_SAVINGS } from '@/seo/site'
const stats = [
  [EDU_VERIFIED_SAVINGS, 'Saved for customers'],
  [String(EDU_LIVE_SITES), 'Sites'],
  ['24/7', 'Monitoring'],
  ['Y', 'Backed by Y Combinator'],
]

const root = ref<HTMLElement | null>(null)
useAwesomicMotion(root)
import type { ContentPage } from '@/content/types'
import type { ArtworkKind } from '@/components/design/DesignerArtwork.vue'
const { page } = defineProps<{ page: ContentPage }>()
const titleWords = page.hero.title.split(' ')
const split = Math.ceil(titleWords.length * 0.45)
const titleParts = [titleWords.slice(0, split).join(' '), titleWords.slice(split).join(' ')]
const answer = page.sections.find((section) => section.type === 'answer')
const steps = page.sections
  .flatMap((section) => (section.type === 'steps' ? section.steps : []))
  .slice(0, 5)
const example = page.sections
  .filter((section) => section.type === 'rows')
  .find((section) => section.label === 'Example')
const faqs = page.sections.flatMap((section) =>
  section.type === 'faq'
    ? (section.items ?? []).map(([question, answer]) => ({ question, answer }))
    : [],
)
const capabilities: {
  id: string
  title: string
  text: string
  detail: string
  href: string
  art: ArtworkKind
}[] = [
  {
    id: 'diagnostics',
    title: 'Find waste',
    text: 'Baselines, anomalies and likely causes, with evidence.',
    detail:
      'Edviro learns each building’s normal load, schedules and equipment behavior from its own data, then flags changes from that pattern as they appear.',
    href: '/building-intelligence',
    art: 'diagnostic',
  },
  {
    id: 'work-orders',
    title: 'Review work orders',
    text: 'Signals and requests become orders a human approves.',
    detail:
      'A named person on your team. Edviro drafts the work and gathers the evidence, and a human approves it before anyone is dispatched.',
    href: '/work-orders',
    art: 'work-orders',
  },
  {
    id: 'mv',
    title: 'Verify every fix',
    text: 'M&V against measured building data.',
    detail:
      'Each site gets a learned baseline. After a fix, measured data is compared against it using a documented M&V method.',
    href: '/measurement-and-verification',
    art: 'verification',
  },
  {
    id: 'planning',
    title: 'Plan capital',
    text: 'Asset health turned into a defensible capital plan.',
    detail:
      'Verified results and repeat failures help repair-or-replace decisions and capital plans.',
    href: '/capital-planning',
    art: 'capital',
  },
]
</script>
<template>
  <main ref="root" class="aw-page aw-integrations">
    <section class="hero">
      <div class="hero-glow" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="wrap">
        <div class="top">
          <div class="h-wrap">
            <span class="badge late"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >Integrations</span
            >
            <h1>
              <b class="h-dark">{{ titleParts[0] }}</b
              ><span class="h-type">{{ titleParts[1] }}</span>
            </h1>
          </div>
          <p class="lede late">{{ page.hero.lede }}</p>
        </div>
        <div class="ctas late">
          <div class="ctas-l">
            <DemoButton class="btn btn-primary btn-lg btn-arrow"><i>→</i>Book a demo</DemoButton>
            <SiteLink class="btn btn-ghost btn-lg" href="#controls">See supported systems</SiteLink>
          </div>
          <div class="yc"><b>Y</b>Backed by Y Combinator</div>
        </div>
        <div class="lg-marquee" aria-label="Supported building systems">
          <div class="lg-track">
            <img src="/design/images/integrations/honeywell.svg" alt="Honeywell" /><img
              src="/design/images/integrations/tridium.svg"
              alt="Tridium"
            /><img src="/design/images/integrations/carrier.svg" alt="Carrier" /><img
              src="/design/images/integrations/siemens.svg"
              alt="Siemens"
            /><img src="/design/images/integrations/alerton.png" alt="Alerton" /><img
              src="/design/images/integrations/schneider-electric.svg"
              alt="Schneider Electric"
            /><img src="/design/images/integrations/kmc-controls.svg" alt="KMC Controls" /><img
              src="/design/images/integrations/trane.svg"
              alt="Trane"
            /><img
              src="/design/images/integrations/johnson-controls.svg"
              alt="Johnson Controls"
            /><img src="/design/images/integrations/delta-controls.png" alt="Delta Controls" /><img
              src="/design/images/integrations/automated-logic.png"
              alt="Automated Logic"
            /><img
              src="/design/images/integrations/pelican-wireless.png"
              alt="Pelican Wireless"
              width="515"
              height="120"
            /><img src="/design/images/integrations/honeywell.svg" alt="Honeywell" /><img
              src="/design/images/integrations/tridium.svg"
              alt="Tridium"
            /><img src="/design/images/integrations/carrier.svg" alt="Carrier" /><img
              src="/design/images/integrations/siemens.svg"
              alt="Siemens"
            /><img src="/design/images/integrations/alerton.png" alt="Alerton" /><img
              src="/design/images/integrations/schneider-electric.svg"
              alt="Schneider Electric"
            /><img src="/design/images/integrations/kmc-controls.svg" alt="KMC Controls" /><img
              src="/design/images/integrations/trane.svg"
              alt="Trane"
            /><img
              src="/design/images/integrations/johnson-controls.svg"
              alt="Johnson Controls"
            /><img src="/design/images/integrations/delta-controls.png" alt="Delta Controls" /><img
              src="/design/images/integrations/automated-logic.png"
              alt="Automated Logic"
            /><img
              src="/design/images/integrations/pelican-wireless.png"
              alt="Pelican Wireless"
              width="515"
              height="120"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="answer" aria-labelledby="answer-title">
      <div class="wrap">
        <div class="ans">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >In short</span
            >
            <h2 id="answer-title">{{ answer?.question }}</h2>
          </div>
          <div class="ans-r">
            <p>{{ answer?.answer }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="start" id="flow" aria-labelledby="flow-t">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >How data moves</span
            >
            <h2 id="flow-t">In, through,<br /><span>out.</span></h2>
          </div>
          <p>Three stages, and a person approves before anything is written back.</p>
        </div>
        <div class="st-grid">
          <div class="st-c">
            <span class="wk-d">In</span>
            <h3>Your systems</h3>
            <p>
              Modern BMS and legacy controls · interval meters, bills, Green Button · app, email and
              staff requests
            </p>
          </div>
          <div class="st-c">
            <span class="wk-d">Through</span>
            <h3>Edviro</h3>
            <p>Learned baseline · detection · diagnosis · a person approves</p>
          </div>
          <div class="st-c">
            <span class="wk-d">Out</span>
            <h3>Your workflow</h3>
            <p>
              Native work orders or your CMMS · mobile field updates · M&amp;V, budgets, capital
              plan
            </p>
          </div>
        </div>
      </div>
    </section>
    <span id="systems" class="anchor-alias" aria-hidden="true"></span>
    <section class="start" id="controls" aria-labelledby="controls-t">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >Building controls</span
            >
            <h2 id="controls-t">Modern BMS and<br /><span>legacy controls.</span></h2>
          </div>
          <p>Niagara, Pelican Wireless, Carrier i-Vu and all other major BMS/BAS vendors.</p>
        </div>
        <ul class="chips">
          <li>Niagara (Tridium)</li>
          <li>Pelican Wireless</li>
          <li>Carrier i-Vu</li>
          <li>+ all major BMS/BAS</li>
        </ul>
      </div>
    </section>
    <section class="start" id="energy" aria-labelledby="energy-t">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >Energy data</span
            >
            <h2 id="energy-t">Meters and bills,<br /><span>from week one.</span></h2>
          </div>
        </div>
        <ul class="chips">
          <li>Interval meters</li>
          <li>Utility bills (line-item tariffs)</li>
          <li>Green Button</li>
          <li>Solar export meters</li>
        </ul>
      </div>
    </section>
    <section class="start" id="work" aria-labelledby="work-t">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >Work orders and CMMS</span
            >
            <h2 id="work-t">Use Edviro as your CMMS,<br /><span>or keep yours.</span></h2>
          </div>
        </div>
        <div class="st-grid two">
          <div class="st-c">
            <span class="wk-d">Replace</span>
            <h3>Edviro is your CMMS</h3>
            <p>
              Native work orders, assets, inspections and mobile field workflows. Your lists and
              open work are imported first.
            </p>
          </div>
          <div class="st-c">
            <span class="wk-d">Connect</span>
            <h3>Keep your CMMS</h3>
            <p>
              Edviro routes the work into it and reads the outcome back. It connects to SchoolDude,
              FMX, AssetWorks and all other major CMMS platforms.
            </p>
          </div>
        </div>
        <ul class="chips">
          <li>SchoolDude</li>
          <li>FMX</li>
          <li>AssetWorks</li>
          <li>+ all major CMMS</li>
        </ul>
      </div>
    </section>
    <section class="start" id="dc" aria-labelledby="dc-t">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >For data center operators</span
            >
            <h2 id="dc-t">Sits on top of your<br /><span>DCIM and BMS.</span></h2>
          </div>
          <p>
            Connects to all major DCIM, EPMS and PDU systems over open protocols or APIs. Read-only
            by default.
          </p>
        </div>
        <ul class="chips">
          <li>DCIM</li>
          <li>BMS</li>
          <li>EPMS</li>
          <li>PDU telemetry</li>
        </ul>
      </div>
    </section>
    <section class="start" id="requests" aria-labelledby="requests-t">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >People in the loop</span
            >
            <h2 id="requests-t">Requests from<br /><span>wherever they start.</span></h2>
          </div>
        </div>
        <ul class="chips">
          <li>Mobile app</li>
          <li>Email</li>
          <li>Staff request form</li>
          <li>SSO</li>
        </ul>
      </div>
    </section>
    <section class="trust dark" id="security" aria-labelledby="security-t">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >Trust</span
            >
            <h2 id="security-t">
              Read-only by default.<br /><span>A person approves every change.</span>
            </h2>
          </div>
        </div>
        <div class="st-grid sec3">
          <div class="st-c">
            <span class="wk-d">01</span>
            <h3>Read-only connections</h3>
            <p>Edviro reads building data. Nothing is written to the BMS without approval.</p>
          </div>
          <div class="st-c">
            <span class="wk-d">02</span>
            <h3>Approval before action</h3>
            <p>Schedules, setpoints, emails and work orders wait for a named reviewer.</p>
          </div>
          <div class="st-c">
            <span class="wk-d">03</span>
            <h3>Data handling</h3>
            <p>
              SOC 2 certification in progress. Zero data retention (ZDR), air-gapped and on-premises
              deployments, and dedicated hosting regions, including the Middle East.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="start" id="start" aria-labelledby="start-t">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >Getting started</span
            >
            <h2 id="start-t">First findings<br /><span>without a hardware project.</span></h2>
          </div>
          <p>Quick and seamless data integration. Expand when the last step has paid for itself.</p>
        </div>
        <div class="st-grid">
          <div class="st-c">
            <span class="wk-d">Week 1</span>
            <h3>Bills and meters</h3>
            <p>Utility bills and interval data are enough for the first findings.</p>
          </div>
          <div class="st-c">
            <span class="wk-d">Next</span>
            <h3>BMS, assets, work orders</h3>
            <p>Building-system data, an asset list and a work-order export deepen the picture.</p>
          </div>
          <div class="st-c">
            <span class="wk-d">Then</span>
            <h3>Expand</h3>
            <p>Add sites and modules once the last step has paid for itself.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="faq-s" id="faq" aria-labelledby="faq-title">
      <div class="wrap">
        <div class="faq-grid">
          <div class="faq-l">
            <div class="h-wrap">
              <span class="badge"
                ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                    stroke="currentColor"
                    stroke-width="2.2"
                    stroke-linecap="round"
                  /></svg
                >FAQ</span
              >
              <h2 id="faq-title">Integrations<br /><span>FAQ.</span></h2>
            </div>
            <SiteLink class="btn btn-ghost btn-lg" href="#demo">Ask about your systems →</SiteLink>
          </div>
          <div class="faq-r">
            <div
              v-for="(item, index) in faqs"
              :key="item.question"
              class="fq"
              :class="{ open: index === 0 }"
            >
              <h3>
                <button
                  type="button"
                  :id="'fq-b' + index"
                  :aria-expanded="index === 0"
                  :aria-controls="'fq-p' + index"
                >
                  <span>{{ item.question }}</span
                  ><i aria-hidden="true"></i>
                </button>
              </h3>
              <div
                class="fq-p"
                :id="'fq-p' + index"
                role="region"
                :aria-labelledby="'fq-b' + index"
              >
                <div>
                  <p>{{ item.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="cta-s dark" id="demo" aria-labelledby="cta-title">
      <div class="wrap">
        <span class="badge"
          ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            /></svg
          >Book a demo</span
        >
        <h2 id="cta-title">See what Edviro finds<br /><span>with your systems.</span></h2>
        <p>Connect your sites. Find the problems. Close the loop.</p>
        <div class="cta-btns">
          <DemoButton class="btn btn-lg btn-arrow cta-main"><i>→</i>Book a demo</DemoButton
          ><SiteLink class="btn btn-lg cta-alt" href="/facilities-operations/"
            >See how it works</SiteLink
          >
        </div>
        <p class="cta-note">Pick a 30-minute slot and we’ll walk through your sites with you.</p>
      </div>
    </section>
  </main>
</template>
<style scoped src="../styles/integrations.css"></style>
<style scoped>
.panel-anchor,
.anchor-alias {
  display: block;
  height: 0;
  scroll-margin-top: calc(var(--st, var(--nav-h)) + 61px);
}
.panel-link,
.case-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
}
.case-story {
  font: 500 clamp(24px, 2.5vw, 34px)/1.25 var(--inter);
  letter-spacing: -0.02em;
  margin: 24px 0;
}
.proof-logos {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}
.proof-logos .rlogo {
  max-width: 190px;
  max-height: 64px;
  object-fit: contain;
}
.aw-index .hero {
  min-height: 0;
  padding-top: calc(var(--nav-h) + 112px);
}
.aw-index .hero .top {
  border-bottom: 1px solid var(--line);
}
.aw-index .module-section {
  padding: 100px 0;
}
.module-section .st-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.module-section .st-c {
  padding: 28px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
}
.module-section .st-c h3 {
  font-size: 26px;
  margin-bottom: 12px;
}
.module-note {
  margin-top: 24px;
}
.aw-page:not(.motion-enabled) .loop .step .card {
  opacity: 1;
  transform: none;
}
@media (max-width: 768px) {
  .aw-index .hero {
    padding-top: calc(var(--nav-h) + 64px);
  }
  .module-section .st-grid {
    grid-template-columns: 1fr;
  }
  .case-story {
    font-size: 24px;
  }
}
</style>
