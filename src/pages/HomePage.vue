<script setup lang="ts">
import { ref } from 'vue'
import CurrentProductScreen from '@/components/design/CurrentProductScreen.vue'
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
import { usePageSeo } from '@/seo/usePageSeo'
import { organizationLd, websiteLd, softwareApplicationLd, faqLd } from '@/seo/jsonld'
import { contentPage } from '@/content'
import type { ArtworkKind } from '@/components/design/DesignerArtwork.vue'
const faqs = [
  {
    question: 'What does Edviro connect to?',
    answer:
      'Building management systems, utility meters and bills, and asset and maintenance logs. It is vendor-agnostic, so nothing needs replacing.',
  },
  {
    question: 'Can Edviro work with our existing CMMS?',
    answer: 'Yes. Add Edviro’s work-order module, or keep your CMMS and let Edviro write to it.',
  },
  {
    question: 'Who reviews planned fixes?',
    answer:
      'A named person on your team. Edviro drafts the work and gathers the evidence, and a human approves it before anyone is dispatched.',
  },
  {
    question: 'How does Edviro verify savings?',
    answer:
      'Each site gets a learned baseline. After a fix, measured data is compared against it using a documented M&V method.',
  },
  {
    question: 'Which industries use Edviro?',
    answer:
      'Education and data centers today, with commercial real estate, healthcare and construction following.',
  },
]
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
const loop: { title: string; text: string; art: ArtworkKind; tag?: string }[] = [
  { title: 'Works 24/7', text: 'I checked 250 thermostats. One valve is stuck.', art: 'signal' },
  {
    title: 'Diagnose issues',
    text: 'Discharge air at 55°F for six days, valve commanded open.',
    art: 'diagnose',
  },
  { title: 'You approve the fixes', text: 'Fix drafted for VAV 3-12', art: 'review', tag: 'Human' },
  {
    title: 'Push to your work orders',
    text: 'Pushed to your work order system, with history and steps.',
    art: 'dispatch',
  },
  { title: 'Verify', text: 'Watched 14 days. Fix confirmed.', art: 'verify' },
]
const modules = [
  ['Utility tracking', 'Bills, interval meters and Green Button data', '/modules#utility-tracking'],
  ['Project management', 'Capital projects, budgets and schedules', '/modules#project-management'],
  ['Asset logging', 'Equipment, age and condition', '/asset-management'],
  ['Facilities scheduling', 'Bookings for gyms, fields and rooms', '/facilities-scheduling'],
]
const results = contentPage('/results')!
const resultCards = results.sections.flatMap((section) =>
  section.type === 'cards' && section.title === 'Case studies' ? section.cards : [],
)
usePageSeo({
  title: 'Put your facilities on autopilot | Edviro',
  titleTemplate: null,
  description:
    'Facilities management software that catches problems, drafts work orders for approval, and verifies the fix. Put your facilities on autopilot with Edviro.',
  path: '/',
  jsonLd: [organizationLd(), websiteLd(), softwareApplicationLd(), faqLd(faqs)],
})
const capabilityPoints = capabilities.map(
  (capability) =>
    contentPage(capability.href)
      ?.sections.flatMap((section) =>
        section.type === 'cards' && section.title === 'What you get'
          ? section.cards.map((card) => card.title)
          : [],
      )
      .slice(0, 3) ?? [],
)
</script>
<template>
  <main ref="root" class="aw-page aw-index">
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
              >AI for building operations</span
            >
            <h1>
              <b class="h-dark">Infrastructure that runs itself.</b
              ><span class="h-type">Put your facility on autopilot.</span>
            </h1>
          </div>
          <p class="lede late">
            Edviro is facilities management software that catches building problems, drafts work
            orders for your team to approve, and verifies the fix, so you can reduce waste and keep
            facilities running.
          </p>
        </div>
        <div class="ctas late">
          <div class="ctas-l">
            <DemoButton class="btn btn-primary btn-lg btn-arrow"><i>→</i>Book a demo</DemoButton>
            <SiteLink class="btn btn-ghost btn-lg" href="#how">See how it works</SiteLink>
          </div>
          <div class="yc"><b>Y</b>Backed by Y Combinator</div>
        </div>
      </div>
    </section>
    <section class="shot">
      <div class="wrap">
        <div class="stage">
          <div class="frame">
            <CurrentProductScreen />
          </div>
        </div>
      </div>
    </section>
    <section class="stats" aria-label="Edviro by the numbers">
      <div class="wrap">
        <p class="eyebrow">Proven across every site we run</p>
        <div class="cells">
          <div class="cell" v-for="([value, label], statIndex) in stats" :key="label">
            <i class="c-ico" aria-hidden="true"
              ><svg v-if="statIndex === 0" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.9 15.2V19h-1.8v-1.8c-1.4-.2-2.5-.9-2.9-2l1.7-.7c.3.7.9 1.1 1.9 1.1 1 0 1.6-.4 1.6-1s-.5-.9-1.8-1.2c-1.7-.4-3-1-3-2.6 0-1.3.9-2.2 2.4-2.5V6.5h1.8v1.8c1.1.2 1.9.8 2.3 1.7l-1.6.8c-.3-.6-.8-.9-1.6-.9-.9 0-1.4.4-1.4.9s.5.8 1.8 1.1c1.8.4 3.1 1 3.1 2.7 0 1.4-1 2.3-2.5 2.6Z"
                /></svg
              ><svg v-else-if="statIndex === 1" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4h5a1 1 0 0 1 1 1v11h-3v-3h-2v3H4Zm3-14v2h2V7H7Zm0 4v2h2v-2H7Zm0 4v2h2v-2H7Zm4-8v2h2V7h-2Zm0 4v2h2v-2h-2Zm0 4v2h2v-2h-2Zm6-3v2h2v-2h-2Z"
                /></svg
              ><svg v-else-if="statIndex === 2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v4.6l3.4 2-1 1.7L11 12.6V7h2Z"
                /></svg
              ><svg v-else viewBox="0 0 24 24">
                <rect width="24" height="24" rx="3" fill="#f26522" />
                <path
                  d="M7 6l5 8 5-8M12 14v5"
                  fill="none"
                  stroke="#fff"
                  stroke-width="1.8"
                /></svg></i
            ><b>{{ value }}</b
            ><span>{{ label }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="platform dark" id="platform" aria-labelledby="platform-title">
      <div class="wrap p-head">
        <div class="h-wrap">
          <span class="badge"
            ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
              /></svg
            >Platform</span
          >
          <h2 id="platform-title">Every building operation <span>needs a co-worker.</span></h2>
        </div>
        <p>
          How Edviro finds waste, gets fixes approved and proves the savings, across every site you
          run.
        </p>
      </div>
      <nav class="tabs" aria-label="Platform">
        <div class="wrap">
          <SiteLink href="#p-find" class="on">Find waste</SiteLink
          ><SiteLink href="#p-orders">Reviewed work orders</SiteLink
          ><SiteLink href="#p-verify">Verify every fix</SiteLink
          ><SiteLink href="#p-plan">Plan capital</SiteLink><span class="bar"></span>
        </div>
      </nav>
      <div class="wrap">
        <span class="panel-anchor" data-panel-anchor="p-find" aria-hidden="true"></span
        ><span id="diagnostics" class="anchor-alias" aria-hidden="true"></span>
        <article class="panel" id="p-find">
          <div>
            <span class="kicker">{{ capabilities[0]?.title }}</span>
            <h3>{{ capabilities[0]?.text }}</h3>
            <p>{{ capabilities[0]?.detail }}</p>
            <ul>
              <li v-for="point in capabilityPoints[0]" :key="point">{{ point }}</li>
            </ul>
            <SiteLink class="panel-link" :href="capabilities[0]?.href ?? '/facilities-operations'"
              >{{ capabilities[0]?.title }} →</SiteLink
            >
          </div>
          <figure
            class="media"
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-2.jpg)"
          >
            <div class="ill">
              <div class="ill-card">
                <div class="ill-tags">
                  <span class="t-b">Energy usage</span><span class="t-g">Last month</span>
                </div>
                <div class="ill-big">552,605 <small>kWh</small></div>
                <div class="ill-sub">Gas 14,873 therms · baseline vs. actual</div>
                <svg viewBox="0 0 400 150" class="ill-chart" aria-hidden="true">
                  <g stroke="#e4e9e5" stroke-width="1">
                    <path d="M0 20H400M0 60H400M0 100H400M0 140H400" />
                  </g>
                  <path
                    d="M0 28C30 18 50 14 70 30S110 50 135 62S175 105 215 112S265 138 300 130S340 95 360 92S385 125 400 142"
                    fill="none"
                    stroke="#e8833a"
                    stroke-width="2.5"
                  />
                  <path
                    d="M0 78C40 82 70 90 100 70S140 56 170 74S230 72 270 70S310 52 340 56S385 70 400 140"
                    fill="none"
                    stroke="#4a7be0"
                    stroke-width="2.5"
                  />
                  <path
                    d="M0 78C40 82 70 90 100 70S140 56 170 74S230 72 270 70S310 52 340 56S385 70 400 140V150H0Z"
                    fill="#4a7be0"
                    opacity=".06"
                  />
                </svg>
                <div class="ill-axis">
                  <span>Dec 25</span><span>Apr 26</span><span>Aug 26</span><span>Oct 26</span>
                </div>
              </div>
              <div class="ill-alert">
                <div class="ill-tags">
                  <span class="t-b">Daily</span><span class="t-r">High</span>
                </div>
                <div class="ill-name">Site A</div>
                <div class="ill-date">Jun 8, 2026</div>
                <dl>
                  <dt>Actual</dt>
                  <dd>76.4 thm</dd>
                  <dt>Expected</dt>
                  <dd>16.7 thm</dd>
                  <dt>Deviation</dt>
                  <dd class="bad">+357.5%</dd>
                </dl>
              </div>
              <div class="ill-pop">
                <i>Cause</i><b>Boiler schedule overrides setback</b
                ><span>Detected vs. baseline · 11 active alerts</span>
              </div>
            </div>
          </figure>
        </article>
        <span class="panel-anchor" data-panel-anchor="p-orders" aria-hidden="true"></span
        ><span id="work-orders" class="anchor-alias" aria-hidden="true"></span>
        <article class="panel" id="p-orders">
          <div>
            <span class="kicker">{{ capabilities[1]?.title }}</span>
            <h3>{{ capabilities[1]?.text }}</h3>
            <p>{{ capabilities[1]?.detail }}</p>
            <ul>
              <li v-for="point in capabilityPoints[1]" :key="point">{{ point }}</li>
            </ul>
            <SiteLink class="panel-link" :href="capabilities[1]?.href ?? '/facilities-operations'"
              >{{ capabilities[1]?.title }} →</SiteLink
            >
          </div>
          <figure
            class="media"
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-2.jpg)"
          >
            <div class="ill lo">
              <div class="ill-card">
                <div class="ill-tags">
                  <span class="t-b">Work orders</span><span class="t-g">3 in review</span>
                </div>
                <div class="ill-big">Drafted <small>by Edviro</small></div>
                <div class="ill-sub">Site, room and asset context attached</div>
                <div class="ill-rows">
                  <div class="ill-row">
                    <b>AHU-3 · Schedule fix</b><span>Site A</span><em class="t-y">Draft</em>
                  </div>
                  <div class="ill-row">
                    <b>Chiller 2 · Setpoint reset</b><span>North Campus</span
                    ><em class="t-y">Draft</em>
                  </div>
                </div>
              </div>
              <div class="ill-alert">
                <div class="ill-tags"><span class="t-y">Pending signoff</span></div>
                <div class="ill-name">HVAC Scheduling Optimization</div>
                <div class="ill-date">Site A · AHU-3</div>
                <div class="ill-btns"><span class="ok">Approve</span><span>Edit</span></div>
              </div>
              <div class="ill-pop">
                <i>Human review</i><b>Reviewed by Facilities Manager</b
                ><span>Nothing is dispatched until approved</span>
              </div>
            </div>
          </figure>
        </article>
        <span class="panel-anchor" data-panel-anchor="p-verify" aria-hidden="true"></span
        ><span id="mv" class="anchor-alias" aria-hidden="true"></span>
        <article class="panel" id="p-verify">
          <div>
            <span class="kicker">{{ capabilities[2]?.title }}</span>
            <h3>{{ capabilities[2]?.text }}</h3>
            <p>{{ capabilities[2]?.detail }}</p>
            <ul>
              <li v-for="point in capabilityPoints[2]" :key="point">{{ point }}</li>
            </ul>
            <SiteLink class="panel-link" :href="capabilities[2]?.href ?? '/facilities-operations'"
              >{{ capabilities[2]?.title }} →</SiteLink
            >
          </div>
          <figure
            class="media"
            style="
              background-image: url(/design/images/brand/backgrounds/edviro-bg-4.jpg);
              background-position: right bottom;
            "
          >
            <div class="ill lo">
              <div class="ill-card">
                <div class="ill-tags">
                  <span class="t-b">Goal progress</span><span class="t-g">Verified</span>
                </div>
                <div class="ill-big">−18% <small>vs. baseline</small></div>
                <div class="ill-sub">Measured against each building’s baseline</div>
                <div class="ill-bars">
                  <div><i style="height: 92%"></i><small>Before</small></div>
                  <div><i class="g" style="height: 58%"></i><small>After</small></div>
                  <div><i style="height: 88%"></i><small>Before</small></div>
                  <div><i class="g" style="height: 50%"></i><small>After</small></div>
                </div>
              </div>
              <div class="ill-alert">
                <div class="ill-tags">
                  <span class="t-g">Chiller 2</span><span class="t-b">Verified</span>
                </div>
                <dl>
                  <dt>Before</dt>
                  <dd>41,200 kWh</dd>
                  <dt>After</dt>
                  <dd>33,800 kWh</dd>
                  <dt>Change</dt>
                  <dd class="good">−18%</dd>
                </dl>
              </div>
              <div class="ill-pop">
                <i>Tied to order</i><b>WO-1042 · Setpoint reset</b
                ><span>Reopens if savings don’t hold</span>
              </div>
            </div>
          </figure>
        </article>
        <span class="panel-anchor" data-panel-anchor="p-plan" aria-hidden="true"></span
        ><span id="planning" class="anchor-alias" aria-hidden="true"></span>
        <article class="panel" id="p-plan">
          <div>
            <span class="kicker">{{ capabilities[3]?.title }}</span>
            <h3>{{ capabilities[3]?.text }}</h3>
            <p>{{ capabilities[3]?.detail }}</p>
            <ul>
              <li v-for="point in capabilityPoints[3]" :key="point">{{ point }}</li>
            </ul>
            <SiteLink class="panel-link" :href="capabilities[3]?.href ?? '/facilities-operations'"
              >{{ capabilities[3]?.title }} →</SiteLink
            >
          </div>
          <figure
            class="media"
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-4.jpg)"
          >
            <div class="ill lo">
              <div class="ill-card">
                <div class="ill-tags">
                  <span class="t-b">Assets</span><span class="t-g">7 need attention</span>
                </div>
                <div class="ill-big">Asset health</div>
                <div class="ill-sub">Condition and cost history across sites</div>
                <div class="ill-rows">
                  <div class="ill-row">
                    <b>Boiler 1</b>
                    <div class="ill-meter"><i style="width: 28%" class="r"></i></div>
                    <span>28</span>
                  </div>
                  <div class="ill-row">
                    <b>Chiller 2</b>
                    <div class="ill-meter"><i style="width: 61%" class="y"></i></div>
                    <span>61</span>
                  </div>
                </div>
              </div>
              <div class="ill-alert">
                <div class="ill-tags"><span class="t-r">Replace</span></div>
                <div class="ill-name">Boiler 1 · Site A</div>
                <div class="ill-date">Repair cost 62% of new unit</div>
                <dl>
                  <dt>2027</dt>
                  <dd>$84K</dd>
                  <dt>2028</dt>
                  <dd>$120K</dd>
                  <dt>Saves</dt>
                  <dd class="good">$31K / yr</dd>
                </dl>
              </div>
              <div class="ill-pop">
                <i>Capital plan</i><b>3-year plan</b
                ><span>Repair-or-replace, with the numbers</span>
              </div>
            </div>
          </figure>
        </article>
      </div>
    </section>
    <span id="buildings" class="anchor-alias" aria-hidden="true"></span>
    <section class="sectors" id="sectors" aria-labelledby="sectors-title">
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
              >Built for every building</span
            >
            <h2 id="sectors-title">One loop, <span>for any building.</span></h2>
          </div>
          <p>
            The same verified loop runs on a single school or a portfolio of hundreds of sites,
            whatever the building type.
          </p>
        </div>
        <div class="sec-view">
          <div class="sec-grid">
            <SiteLink class="sec-card" href="/solutions/schools">
              <div class="sec-top">
                <div>
                  <h3>Campuses</h3>
                  <p>K–12 and higher ed</p>
                </div>
                <span class="sec-ico" aria-hidden="true">↗</span>
              </div>
              <div class="sec-img">
                <img
                  src="/design/images/sectors/campuses-day.jpg"
                  alt="Campuses"
                  loading="lazy"
                /><img
                  class="night"
                  src="/design/images/sectors/campuses-night.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <span class="hot" style="left: 42%; top: 34%"><i></i><em>Campus ops</em></span
                ><span class="hot rev" style="right: 14%; top: 70%"
                  ><i></i><em>K–12 & higher ed</em></span
                >
              </div>
            </SiteLink>
            <SiteLink class="sec-card" href="/solutions/healthcare">
              <div class="sec-top">
                <div>
                  <h3>Hospitals</h3>
                  <p>Healthcare</p>
                </div>
                <span class="sec-ico" aria-hidden="true">↗</span>
              </div>
              <div class="sec-img">
                <img
                  src="/design/images/sectors/hospitals-day.jpg"
                  alt="Hospitals"
                  loading="lazy"
                /><img
                  class="night"
                  src="/design/images/sectors/hospitals-night.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <span class="hot rev" style="right: 42%; top: 44%"><i></i><em>HVAC</em></span
                ><span class="hot rev" style="right: 16%; top: 74%"
                  ><i></i><em>Reviewed fixes</em></span
                >
              </div>
            </SiteLink>
            <SiteLink class="sec-card" href="/solutions/real-estate">
              <div class="sec-top">
                <div>
                  <h3>Office towers</h3>
                  <p>Commercial real estate</p>
                </div>
                <span class="sec-ico" aria-hidden="true">↗</span>
              </div>
              <div class="sec-img">
                <img
                  src="/design/images/sectors/office-towers-day.jpg"
                  alt="Office towers"
                  loading="lazy"
                /><img
                  class="night"
                  src="/design/images/sectors/office-towers-night.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <span class="hot rev" style="right: 52%; top: 38%"><i></i><em>Occupancy</em></span
                ><span class="hot rev" style="right: 14%; top: 68%"
                  ><i></i><em>HVAC schedules</em></span
                >
              </div>
            </SiteLink>
            <SiteLink class="sec-card" href="/contact">
              <div class="sec-top">
                <div>
                  <h3>Public buildings</h3>
                  <p>Municipal</p>
                </div>
                <span class="sec-ico" aria-hidden="true">↗</span>
              </div>
              <div class="sec-img">
                <img
                  src="/design/images/sectors/public-buildings-day.jpg"
                  alt="Public buildings"
                  loading="lazy"
                /><img
                  class="night"
                  src="/design/images/sectors/public-buildings-night.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <span class="hot" style="left: 40%; top: 46%"><i></i><em>Civic sites</em></span
                ><span class="hot rev" style="right: 14%; top: 72%"
                  ><i></i><em>Work orders</em></span
                >
              </div>
            </SiteLink>
            <SiteLink class="sec-card" href="/solutions/data-centers">
              <div class="sec-top">
                <div>
                  <h3>Data centers</h3>
                  <p>Capacity, cooling and alarms</p>
                </div>
                <span class="sec-ico" aria-hidden="true">↗</span>
              </div>
              <div class="sec-img">
                <img
                  src="/design/images/sectors/data-halls-day.jpg"
                  alt="Data halls"
                  loading="lazy"
                /><img
                  class="night"
                  src="/design/images/sectors/data-halls-night.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <span class="hot rev" style="right: 40%; top: 46%"><i></i><em>Cooling</em></span
                ><span class="hot rev" style="right: 14%; top: 74%"><i></i><em>Capacity</em></span>
              </div>
            </SiteLink>
            <SiteLink class="sec-card" href="/solutions/construction">
              <div class="sec-top">
                <div>
                  <h3>Job sites</h3>
                  <p>Construction</p>
                </div>
                <span class="sec-ico" aria-hidden="true">↗</span>
              </div>
              <div class="sec-img">
                <img
                  src="/design/images/sectors/job-sites-day.jpg"
                  alt="Job sites"
                  loading="lazy"
                /><img
                  class="night"
                  src="/design/images/sectors/job-sites-night.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <span class="hot rev" style="right: 40%; top: 26%"><i></i><em>Baseline</em></span
                ><span class="hot rev" style="right: 16%; top: 66%"><i></i><em>Handoff</em></span>
              </div>
            </SiteLink>
          </div>
        </div>
        <div class="sec-ctrl">
          <button type="button" class="sec-prev" aria-label="Previous">←</button
          ><button type="button" class="sec-next" aria-label="Next">→</button>
        </div>
      </div>
    </section>
    <section class="problem dark" id="problem" aria-labelledby="problem-title">
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
              >The problem</span
            >
            <h2 id="problem-title">
              Facilities teams do not need more dashboards or alarms.
              <span>They need systems that keep improving and take action.</span>
            </h2>
          </div>
          <p>
            Facilities teams don’t need more dashboards. They need a system that turns signals and
            requests into reviewed work orders, verified fixes and capital plans.
          </p>
        </div>
        <div class="pb-grid">
          <div class="pb-panel pb-before">
            <div class="pb-label"><span class="pb-dot"></span>Today</div>
            <h3>Signals pile up. Nobody owns them.</h3>
            <p>
              Alarms, emails and staff texts land in different inboxes. Most are never followed up.
            </p>
            <div class="pb-stage nodes" aria-hidden="true">
              <svg class="wires" aria-hidden="true"></svg>
              <div class="node" style="left: 2%; top: 6%; width: 40%">
                <div class="nh">
                  BMS alarms<svg viewBox="0 0 16 16">
                    <path
                      d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3zM6.5 14h3"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.3"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="nb"><span>142 unread</span><em>Output</em></div>
              </div>
              <div class="node" style="left: 56%; top: 0%; width: 40%">
                <div class="nh">
                  Email<svg viewBox="0 0 16 16">
                    <rect
                      x="2"
                      y="3.5"
                      width="12"
                      height="9"
                      rx="1.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.3"
                    />
                    <path
                      d="M2.5 4.5 8 9l5.5-4.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.3"
                    />
                  </svg>
                </div>
                <div class="nb"><span>Re: boiler?</span><em>Output</em></div>
              </div>
              <div class="node" style="left: 6%; top: 62%; width: 40%">
                <div class="nh">
                  Meter data<svg viewBox="0 0 16 16">
                    <path
                      d="M2 12 6 7l3 3 5-6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.3"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="nb"><span>Chiller 2 spike</span><em>Output</em></div>
              </div>
              <div class="node owner" style="left: 54%; top: 46%; width: 42%">
                <div class="nh">
                  Owner<svg viewBox="0 0 16 16">
                    <circle
                      cx="8"
                      cy="5.5"
                      r="2.6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.3"
                    />
                    <path
                      d="M3 14c.6-3 2.6-4.4 5-4.4s4.4 1.4 5 4.4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.3"
                    />
                  </svg>
                </div>
                <div class="nb col">
                  <span>Signals</span><span>Work order</span><span>Follow-up</span><b>Unassigned</b>
                </div>
              </div>
            </div>
          </div>
          <div
            class="pb-panel pb-after"
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-2.jpg)"
          >
            <div class="pb-label"><span class="pb-dot"></span>With Edviro</div>
            <h3>One reviewed order. One verified fix.</h3>
            <p>
              Edviro groups the signals, finds the likely cause and sends one order for a person to
              approve.
            </p>
            <div class="pb-stage" aria-hidden="true">
              <div class="wo">
                <div class="ill-tags">
                  <span class="t-y">Pending signoff</span><span class="t-g">3 signals merged</span>
                </div>
                <div class="wo-title">AHU-3 · Schedule fix</div>
                <div class="wo-sub">Site A · Zone 3</div>
                <div class="wo-steps">
                  <span class="ok">Signal</span><span class="ok">Diagnose</span
                  ><span class="ok">Review</span><span>Dispatch</span><span>Verify</span>
                </div>
                <div class="wo-foot">
                  <span>Likely cause: overnight schedule override</span><em>Est. −18% kWh</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <span id="how-it-works" class="anchor-alias" aria-hidden="true"></span>
    <section class="how" id="how" aria-labelledby="how-title">
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
              >How it works</span
            >
            <h2 id="how-title">No alarms, <span>just fixes.</span></h2>
          </div>
          <div class="how-r">
            <p>
              There is no alarms tab in Edviro. Your AI crew triages every alarm, text and meter
              change around the clock, even while you’re sleeping, so what reaches your team is a
              diagnosed fix that’s ready to approve.
            </p>
          </div>
        </div>
        <div class="loop" role="list">
          <div class="loop-line" aria-hidden="true"><i></i></div>
          <div class="step" style="--i: 0">
            <span class="dot"></span>
            <div class="card">
              <div class="sm" style="background-image: url(/design/images/how/how-signal.jpg)">
                <div class="c">
                  <span class="pill r">Alarm</span>
                  <div class="t">“Zone 3 is too cold again”</div>
                  <div class="u">Text · 6:02 AM</div>
                  <div class="row">BMS point<span>62°F</span></div>
                  <div class="pop r"><b></b>Meter spike</div>
                </div>
              </div>
              <span class="n">01</span>
              <h3>{{ loop[0]?.title }}</h3>
              <p>{{ loop[0]?.text }}</p>
            </div>
          </div>
          <div class="step" style="--i: 1">
            <span class="dot"></span>
            <div class="card">
              <div class="sm" style="background-image: url(/design/images/how/how-diagnose.jpg)">
                <div class="c">
                  <span class="pill">Likely cause</span>
                  <div class="t">Stuck damper · AHU-3</div>
                  <svg viewBox="0 0 100 26" preserveAspectRatio="none" style="height: 14cqw">
                    <path
                      d="M0 20 L20 18 L40 19 L60 8 L80 6 L100 4"
                      pathLength="1"
                      fill="none"
                      stroke="#5fa37e"
                      stroke-width="2"
                      vector-effect="non-scaling-stroke"
                    />
                  </svg>
                  <div class="pop"><b></b>3 evidence sources</div>
                </div>
              </div>
              <span class="n">02</span>
              <h3>{{ loop[1]?.title }}</h3>
              <p>{{ loop[1]?.text }}</p>
            </div>
          </div>
          <div class="step human" style="--i: 2">
            <span class="dot"></span>
            <div class="card">
              <span class="tag">Human</span>
              <div
                class="sm"
                style="background-image: url(/design/images/brand/backgrounds/edviro-bg-1.jpg)"
              >
                <div class="c">
                  <span class="pill y">Pending signoff</span>
                  <div class="t">HVAC schedule fix</div>
                  <div class="u">AHU-3 · Site A</div>
                  <div class="btns"><span class="ok">Approve</span><span>Edit</span></div>
                </div>
              </div>
              <span class="n">03</span>
              <h3>{{ loop[2]?.title }}</h3>
              <p>{{ loop[2]?.text }}</p>
            </div>
          </div>
          <div class="step" style="--i: 3">
            <span class="dot"></span>
            <div class="card">
              <div class="sm" style="background-image: url(/design/images/how/how-dispatch.jpg)">
                <div class="c">
                  <span class="pill">Dispatched</span>
                  <div class="t">Reset damper</div>
                  <div class="row">J. Alvarez<span>Assigned</span></div>
                  <div class="row">History attached<span>3 past visits</span></div>
                </div>
              </div>
              <span class="n">04</span>
              <h3>{{ loop[3]?.title }}</h3>
              <p>{{ loop[3]?.text }}</p>
            </div>
          </div>
          <div class="step" style="--i: 4">
            <span class="dot"></span>
            <div class="card">
              <div class="sm" style="background-image: url(/design/images/how/how-verify.jpg)">
                <div class="c">
                  <span class="pill g">Verified</span>
                  <div class="big">72°F <small>holding</small></div>
                  <svg viewBox="0 0 100 26" preserveAspectRatio="none" style="height: 14cqw">
                    <path
                      d="M0 6 L30 14 L55 21 L75 21 L100 21"
                      pathLength="1"
                      fill="none"
                      stroke="#5fa37e"
                      stroke-width="2"
                      vector-effect="non-scaling-stroke"
                    />
                  </svg>
                  <div class="pop"><b></b>Back at setpoint</div>
                </div>
              </div>
              <span class="n">05</span>
              <h3>{{ loop[4]?.title }}</h3>
              <p>{{ loop[4]?.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="decide" id="decisions" aria-labelledby="decide-title">
      <div class="wrap">
        <div class="decide-grid">
          <figure class="dv" style="background-image: url(/design/images/how/how-verify.jpg)">
            <div class="dv-card">
              <div class="dv-tags">
                <span class="t-b" data-k="tag">Verified</span><span class="t-g">Site A</span>
              </div>
              <div class="dv-big">
                <b data-k="big">−18%</b> <small data-k="small">vs. baseline</small>
              </div>
              <div class="dv-sub" data-k="sub">Measured against each building’s baseline</div>
              <div class="dv-chart">
                <div class="st" data-s="0">
                  <svg viewBox="0 0 400 170" aria-hidden="true">
                    <g stroke="#e4e9e5"><path d="M0 30H400M0 80H400M0 130H400" /></g>
                    <path
                      class="bl"
                      d="M0 112C60 110 120 114 180 111S300 110 400 112"
                      fill="none"
                      stroke="#9fb0a7"
                      stroke-width="2"
                      stroke-dasharray="5 5"
                    />
                    <path
                      class="ac"
                      d="M0 110C50 114 100 106 140 110S180 30 215 24 280 70 320 100 370 112 400 108"
                      fill="none"
                      stroke="#e8833a"
                      stroke-width="2.5"
                    />
                    <circle class="pin" cx="215" cy="24" r="5" fill="#e8833a" /></svg
                  ><span class="chip-d" style="left: 58%; top: -8%"
                    >Boiler schedule overrides setback</span
                  ><span class="key"
                    ><i class="k-d"></i>Learned baseline<i class="k-a"></i>Actual</span
                  >
                </div>
                <div class="st" data-s="1">
                  <svg viewBox="0 0 400 170" aria-hidden="true">
                    <g stroke="#e4e9e5"><path d="M0 30H400M0 80H400M0 130H400" /></g>
                    <path
                      class="area"
                      d="M170 64L400 64L400 112C330 116 270 114 240 114C210 112 190 90 170 64Z"
                      fill="rgba(95,163,126,.25)"
                    />
                    <path
                      class="bl"
                      d="M0 64C80 60 140 66 200 62S320 60 400 64"
                      fill="none"
                      stroke="#9fb0a7"
                      stroke-width="2"
                      stroke-dasharray="5 5"
                    />
                    <path
                      class="ac"
                      d="M0 64C80 60 140 66 170 64C190 90 210 112 240 114S330 116 400 112"
                      fill="none"
                      stroke="#2f8a5b"
                      stroke-width="2.5"
                    />
                    <path d="M170 20V150" stroke="#9fb0a7" stroke-dasharray="3 4" />
                    <circle class="pin" cx="170" cy="64" r="5" fill="#2f8a5b" /></svg
                  ><span class="chip-d" style="left: 30%; top: 2%">Fix · WO-1042</span
                  ><span class="chip-d g" style="left: 62%; top: 62%">−18% vs baseline</span
                  ><span class="key"
                    ><i class="k-d"></i>Learned baseline<i class="k-g"></i>After fix</span
                  >
                </div>
                <div class="st" data-s="2">
                  <svg viewBox="0 0 400 170" aria-hidden="true">
                    <g stroke="#e4e9e5"><path d="M0 30H400M0 80H400M0 130H400" /></g>
                    <rect
                      class="dbar"
                      x="40"
                      y="100"
                      width="70"
                      height="50"
                      rx="6"
                      fill="#cfd9d3"
                    />
                    <rect
                      class="dbar"
                      x="165"
                      y="70"
                      width="70"
                      height="80"
                      rx="6"
                      fill="#cfd9d3"
                    />
                    <rect
                      class="dbar"
                      x="290"
                      y="30"
                      width="70"
                      height="120"
                      rx="6"
                      fill="#cfd9d3"
                    />
                    <path
                      class="ac"
                      d="M20 82H380"
                      stroke="#2f8a5b"
                      stroke-width="2.5"
                      fill="none"
                    />
                    <circle class="pin" cx="75" cy="82" r="5" fill="#2f8a5b" /></svg
                  ><span class="chip-d g" style="left: 6%; top: 6%">Replace once · $84K</span
                  ><span class="key"
                    ><i class="k-b"></i>Keep repairing<i class="k-g"></i>Replace in 2027</span
                  >
                </div>
                <div class="dv-axis" data-ax="0">
                  <span>Dec 25</span><span>Apr 26</span><span>Aug 26</span><span>Oct 26</span>
                </div>
                <div class="dv-axis" data-ax="1" hidden>
                  <span>Dec 25</span><span>Apr 26</span><span>Aug 26</span><span>Oct 26</span>
                </div>
                <div class="dv-axis" data-ax="2" hidden>
                  <span>2027</span><span>2028</span><span>2029</span>
                </div>
              </div>
            </div>
          </figure>
          <div class="decide-r">
            <div class="h-wrap">
              <span class="badge"
                ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                    stroke="currentColor"
                    stroke-width="2.2"
                    stroke-linecap="round"
                  /></svg
                >Better decisions</span
              >
              <h2 id="decide-title">Meter data in.<br /><span>Verified savings out.</span></h2>
            </div>
            <p>
              Edviro learns each site’s baseline, flags anomalies, finds the likely cause, and
              measures the results.
            </p>
            <ul class="drows" role="tablist" aria-label="Decision stages">
              <li>
                <button type="button" role="tab" class="on" aria-selected="true" data-i="0">
                  <i>01</i
                  ><span
                    ><b>Diagnose and route</b
                    ><em>The likely cause, ranked by dollars at stake.</em></span
                  ></button
                ><SiteLink class="go" href="#p-find" aria-label="See Find waste in Platform"
                  >→</SiteLink
                >
              </li>
              <li>
                <button type="button" role="tab" aria-selected="false" data-i="1">
                  <i>02</i
                  ><span
                    ><b>Measurement and verification</b
                    ><em>Every fix proven against the baseline.</em></span
                  ></button
                ><SiteLink class="go" href="#p-verify" aria-label="See Verify every fix in Platform"
                  >→</SiteLink
                >
              </li>
              <li>
                <button type="button" role="tab" aria-selected="false" data-i="2">
                  <i>03</i
                  ><span
                    ><b>Capital planning</b
                    ><em>Repair or replace, with the numbers behind it.</em></span
                  ></button
                ><SiteLink class="go" href="#p-plan" aria-label="See Plan capital in Platform"
                  >→</SiteLink
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="results dark" id="results" aria-labelledby="results-title">
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
              >Results</span
            >
            <h2 id="results-title">Featured customers<br /><span>and verified outcomes.</span></h2>
          </div>
          <div class="how-r">
            <p>School districts that run on Edviro, and the savings they can prove.</p>
          </div>
        </div>
        <div class="rview" aria-roledescription="carousel" aria-label="Customer results">
          <div class="rtrack">
            <article class="rslide" aria-roledescription="slide" aria-label="1 of 2">
              <div class="rq">
                <div class="proof-logos">
                  <img
                    class="rlogo"
                    src="/design/images/customers/pausd.svg"
                    alt="Palo Alto Unified School District"
                  /><img
                    class="rlogo"
                    src="/design/images/customers/lgsuhsd.png"
                    alt="Los Gatos-Saratoga Union High School District"
                  />
                </div>
                <p class="case-story">{{ results.hero.lede }}</p>
                <SiteLink class="case-link" href="/results">See the results →</SiteLink>
              </div>
              <div class="rn" style="background-image: url(/design/images/how/how-diagnose.jpg)">
                <div class="rs">
                  <b
                    :data-n="Number(EDU_VERIFIED_SAVINGS.replace(/[^0-9]/g, ''))"
                    data-p="$"
                    data-x="K"
                    >{{ EDU_VERIFIED_SAVINGS }}</b
                  ><span>saved for customers</span>
                </div>
                <div class="rs">
                  <b :data-n="EDU_LIVE_SITES">{{ EDU_LIVE_SITES }}</b
                  ><span>sites</span>
                </div>
                <div class="rs"><b>24/7</b><span>monitoring</span></div>
                <small>Verified against each building’s baseline</small>
              </div>
            </article>
            <article class="rslide" aria-roledescription="slide" aria-label="2 of 2">
              <div class="rq">
                <span class="kicker">Education</span>
                <p class="case-story">{{ resultCards[0]?.text }}</p>
                <SiteLink class="case-link" href="/results">See the case studies →</SiteLink>
              </div>
              <div class="rn" style="background-image: url(/design/images/how/how-signal.jpg)">
                <div class="rs">
                  <b data-n="400" data-p="$" data-x="K">$400K</b
                  ><span>gas overbilling detected</span>
                </div>
                <div class="rs"><b data-n="1">1</b><span>high school</span></div>
                <small>Measured against the school’s weather-adjusted baseline</small>
              </div>
            </article>
          </div>
        </div>
        <div class="rctrl">
          <button type="button" class="r-prev" aria-label="Previous customer">←</button
          ><button type="button" class="r-next" aria-label="Next customer">→</button
          ><span class="rcount" aria-live="polite"><b>1</b> / 2</span>
        </div>
      </div>
    </section>
    <section class="integ" id="integrations" aria-labelledby="integ-title">
      <div class="wrap">
        <div class="integ-box">
          <div class="h-wrap">
            <span class="badge"
              ><svg class="ast" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                /></svg
              >Integrations</span
            >
            <h2 id="integ-title">Works with<br /><span>what you already have.</span></h2>
          </div>
          <p class="integ-p">
            Edviro connects to your building controls, meters, utility bills and work-order systems.
            Keep what works. Consolidate what doesn’t.
          </p>
          <ul class="logo-wall" aria-label="Supported building systems">
            <li style="--i: 0">
              <img src="/design/images/integrations/honeywell.svg" alt="Honeywell" loading="lazy" />
            </li>
            <li style="--i: 1">
              <img src="/design/images/integrations/tridium.svg" alt="Tridium" loading="lazy" />
            </li>
            <li style="--i: 2">
              <img src="/design/images/integrations/carrier.svg" alt="Carrier" loading="lazy" />
            </li>
            <li style="--i: 3">
              <img src="/design/images/integrations/siemens.svg" alt="Siemens" loading="lazy" />
            </li>
            <li style="--i: 4">
              <img src="/design/images/integrations/alerton.png" alt="Alerton" loading="lazy" />
            </li>
            <li style="--i: 5">
              <img
                src="/design/images/integrations/schneider-electric.svg"
                alt="Schneider Electric"
                loading="lazy"
              />
            </li>
            <li style="--i: 6">
              <img
                src="/design/images/integrations/kmc-controls.svg"
                alt="KMC Controls"
                loading="lazy"
              />
            </li>
            <li style="--i: 7">
              <img src="/design/images/integrations/trane.svg" alt="Trane" loading="lazy" />
            </li>
            <li style="--i: 8">
              <img
                src="/design/images/integrations/johnson-controls.svg"
                alt="Johnson Controls"
                loading="lazy"
              />
            </li>
            <li style="--i: 9">
              <img
                src="/design/images/integrations/delta-controls.png"
                alt="Delta Controls"
                loading="lazy"
              />
            </li>
            <li style="--i: 10">
              <img
                src="/design/images/integrations/automated-logic.png"
                alt="Automated Logic"
                loading="lazy"
              />
            </li>
            <li style="--i: 11">
              <img
                src="/design/images/integrations/pelican-wireless.png"
                alt="Pelican Wireless"
                loading="lazy"
                width="515"
                height="120"
              />
            </li>
          </ul>
          <SiteLink class="btn btn-primary btn-lg btn-arrow" href="/integrations/"
            ><i>→</i>See what Edviro connects to</SiteLink
          >
          <p class="integ-note">
            Don’t see your system? Edviro works with all major BMS, meters and CMMS platforms. Ask
            us.
          </p>
        </div>
      </div>
    </section>
    <section class="start module-section" id="modules">
      <div class="wrap">
        <div class="p-head">
          <div class="h-wrap">
            <span class="badge">Free with your AI Crew subscription</span>
            <h2>Keep what works.<br /><span>Consolidate what doesn’t.</span></h2>
          </div>
          <p>
            The AI Crew is the core of Edviro, and it works alongside whatever you already run. If
            you are missing a piece, add any of these modules at no extra cost.
          </p>
        </div>
        <div class="st-grid">
          <SiteLink
            class="st-c"
            v-for="[title, detail, href] in modules"
            :key="title"
            :href="href ?? '/modules'"
            ><h3>{{ title }}</h3>
            <p>{{ detail }}</p>
            <span>→</span></SiteLink
          >
        </div>
        <p class="module-note">
          <SiteLink href="/modules">See all modules →</SiteLink> · Work orders is a paid module.
        </p>
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
              <h2 id="faq-title">Questions from<br /><span>operations teams.</span></h2>
            </div>
            <SiteLink class="btn btn-ghost btn-lg" href="/faq/">View all FAQs →</SiteLink>
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
        <h2 id="cta-title">See what Edviro finds<br /><span>in your buildings.</span></h2>
        <p>Connect your sites. Find the problems. Close the loop.</p>
        <div class="cta-btns">
          <DemoButton class="btn btn-lg btn-arrow cta-main"><i>→</i>Book a demo</DemoButton
          ><SiteLink class="btn btn-lg cta-alt" href="#how">See how it works</SiteLink>
        </div>
        <p class="cta-note">Pick a 30-minute slot and we’ll walk through your sites with you.</p>
      </div>
    </section>
  </main>
</template>
<style scoped src="../components/design/styles/index.css"></style>
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
