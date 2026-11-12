<script setup lang="ts">
import CtaSection from '@/components/CtaSection.vue'
import DemoButton from '@/components/DemoButton.vue'
import SiteLink from '@/components/SiteLink.vue'
import icon from '@/assets/img/edviro-icon.svg'
import alerton from '@/assets/img/vendors/alerton.png'
import automatedLogic from '@/assets/img/vendors/automated-logic.png'
import carrier from '@/assets/img/vendors/carrier.svg'
import deltaControls from '@/assets/img/vendors/delta-controls.png'
import honeywell from '@/assets/img/vendors/honeywell.svg'
import johnsonControls from '@/assets/img/vendors/johnson-controls.svg'
import kmcControls from '@/assets/img/vendors/kmc-controls.svg'
import schneiderElectric from '@/assets/img/vendors/schneider-electric.svg'
import siemens from '@/assets/img/vendors/siemens.svg'
import trane from '@/assets/img/vendors/trane.svg'
import tridium from '@/assets/img/vendors/tridium.svg'
import { usePageSeo } from '@/seo/usePageSeo'
import { faqLd, organizationLd, softwareApplicationLd, websiteLd } from '@/seo/jsonld'
import { EDU_LIVE_SITES, EDU_VERIFIED_SAVINGS } from '@/seo/site'

/*
 * The product screen, loop and platform visuals on this page are illustrative:
 * generic site names, no customer data. Published figures come from
 * src/seo/site.ts (owner and source noted there).
 */

const sidebar = ['Overview', 'Fixes', 'Work orders', 'Assets', 'Savings', 'Capital plan']

const sites = [
  { name: 'Site A', warn: true },
  { name: 'Site B', warn: false },
  { name: 'Site C', warn: true },
  { name: 'Site D', warn: false },
]

const status = {
  review: { label: 'Needs review', className: 'pill' },
  dispatched: { label: 'Dispatched', className: 'pill dispatched' },
  verified: { label: 'Verified', className: 'pill verified' },
}

const fixes: { title: string; meta: string; status: keyof typeof status }[] = [
  {
    title: 'Zone 3 low temperature',
    meta: 'Site A · VAV 3-12 · cause found, fix drafted',
    status: 'review',
  },
  {
    title: 'Air handler running outside schedule',
    meta: 'Site A · AHU-2 · cause found, fix drafted',
    status: 'review',
  },
  {
    title: 'Chiller short-cycling',
    meta: 'Site C · CH-1 · cause found, fix drafted',
    status: 'review',
  },
  { title: 'Boiler lockout', meta: 'Site B · B-2 · technician on the way', status: 'dispatched' },
  {
    title: 'Exterior lights on in daylight',
    meta: 'Site D · LP-1 · fix confirmed in meter data',
    status: 'verified',
  },
  {
    title: 'Exhaust fan left running',
    meta: 'Site B · EF-4 · fix confirmed in meter data',
    status: 'verified',
  },
]

const stats = [
  [EDU_VERIFIED_SAVINGS, 'Savings'],
  [String(EDU_LIVE_SITES), 'Sites'],
  ['24/7', 'Monitoring'],
]

const capitalPlan = [
  ['Chiller CH-1', '26%', '2027'],
  ['Boiler B-2', '52%', '2029'],
  ['Rooftop R-4', '78%', '2031'],
]

const buildings = [
  ['Campuses', 'K–12 and higher ed', '/solutions/schools'],
  ['Data centers', 'Capacity, cooling and alarms', '/solutions/data-centers'],
  ['Hospitals', 'Healthcare', '/solutions/healthcare'],
  ['Office towers', 'Commercial real estate', '/solutions/real-estate'],
  // No page for public buildings yet, so this one goes to the demo section.
  ['Public buildings', 'Municipal', '#demo'],
  ['Job sites', 'Construction', '/solutions/construction'],
]

const signals = [
  ['Signals', 'A text, email, alarm or meter change.'],
  ['Requests', 'Staff needs become reviewed work orders.'],
  ['Results', 'Fixes are verified in building data.'],
]

// Arrow positions on the loop track, clockwise from the top left.
const loopArrows = [
  { dir: 'right', style: { left: '35%', top: '102px' } },
  { dir: 'right', style: { left: '65%', top: '102px' } },
  { dir: 'down', style: { left: '100%', top: '50%' } },
  { dir: 'left', style: { left: '50%', top: '402px' } },
  { dir: 'up', style: { left: '0', top: '50%' } },
]

const customers = [
  ['PAUSD', 'Palo Alto Unified School District', 'K–12 district'],
  ['LGSUHSD', 'Los Gatos-Saratoga Union High School District', 'K–12 district'],
]

/*
 * Building-control vendors shown on the integrations wall. Logos are the
 * vendors' trademarks, shown in one tone. Owner: confirm each integration and
 * swap in the vendors' official brand files before this ships. Distech has no
 * logo file yet, so it renders as text.
 */
const vendors: { name: string; src?: string; width?: number; height?: number; className?: string }[] = [
  { name: 'Siemens', src: siemens, width: 210, height: 50 },
  { name: 'Johnson Controls', src: johnsonControls, width: 250, height: 115, className: 'tall' },
  { name: 'Honeywell', src: honeywell, width: 678, height: 120 },
  { name: 'Schneider Electric', src: schneiderElectric, width: 189, height: 57, className: 'tall' },
  { name: 'Trane', src: trane, width: 588, height: 196, className: 'tall' },
  { name: 'Carrier', src: carrier, width: 300, height: 121, className: 'tall gray' },
  { name: 'Automated Logic', src: automatedLogic, width: 600, height: 197, className: 'tall' },
  { name: 'Tridium', src: tridium, width: 352, height: 63 },
  { name: 'Distech Controls' },
  { name: 'Delta Controls', src: deltaControls, width: 600, height: 289, className: 'tall' },
  { name: 'Alerton', src: alerton, width: 800, height: 180, className: 'crop-top' },
  { name: 'KMC Controls', src: kmcControls, width: 618, height: 255, className: 'tall' },
]

// The modules that are free with the AI Crew subscription. Work orders is a
// paid module, so it is not listed here.
const modules = [
  ['Utility tracking', 'Bills, interval meters and Green Button data', '/modules#utility-tracking'],
  ['Project management', 'Capital projects, budgets and schedules', '/modules#project-management'],
  ['Asset logging', 'Equipment, age and condition', '/asset-management'],
  ['Facilities scheduling', 'Bookings for gyms, fields and rooms', '/facilities-scheduling'],
]

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

// Shared metadata is industry-neutral; school-specific titles live on the
// school routes (see src/seo/site.ts). Keep index.html's no-JS title in sync.
usePageSeo({
  title: 'Put your facilities on autopilot | Edviro',
  titleTemplate: null,
  description:
    'Facilities management software that catches problems, drafts work orders for approval, and verifies the fix. Put your facilities on autopilot with Edviro.',
  path: '/',
  jsonLd: [organizationLd(), websiteLd(), softwareApplicationLd(), faqLd(faqs)],
})
</script>

<template>
  <main class="nd">
    <div class="hero">
      <div class="wrap">
        <h1>Infrastructure that runs itself.<span>Put your facility on autopilot.</span></h1>
        <p class="nd-lede">
          Edviro is facilities management software that catches building problems, drafts work
          orders for your team to approve, and verifies the fix, so you can reduce waste
          and keep facilities running.
        </p>
        <div class="actions">
          <DemoButton />
          <a class="nd-btn ghost" href="#how">See how it works</a>
        </div>

        <!-- Illustrative product screen -->
        <div class="stage">
          <div class="app" role="img" aria-label="Edviro fixes screen (example)">
            <div class="app-bar">
              <img :src="icon" alt="" width="15" height="20" />
              <span class="crumb">All sites&ensp;/&ensp;<b>Fixes</b></span>
              <span class="app-tools">
                <span class="search">Search</span>
                <span class="avatar">FM</span>
              </span>
            </div>
            <div class="app-body">
              <div class="side">
                <div
                  v-for="item in sidebar"
                  :key="item"
                  :class="['side-item', { on: item === 'Fixes' }]"
                >
                  {{ item }}
                  <span v-if="item === 'Fixes'">12</span>
                </div>
                <h5>Sites</h5>
                <div v-for="site in sites" :key="site.name" class="side-item">
                  <span><span :class="['dot', { warn: site.warn }]" />{{ site.name }}</span>
                </div>
              </div>
              <div class="list">
                <div class="list-head"><b>Open fixes</b><span>3 of 12 need review</span></div>
                <div
                  v-for="(fix, index) in fixes"
                  :key="fix.title"
                  :class="['fix', { on: index === 0 }]"
                >
                  <b>{{ fix.title }}</b>
                  <small>{{ fix.meta }}</small>
                  <span :class="status[fix.status].className">{{ status[fix.status].label }}</span>
                </div>
              </div>
              <div class="detail">
                <div class="source">Alarm · Site A · 7:40 AM</div>
                <h4>Zone 3 low temperature</h4>
                <div class="quote">
                  <small>Custodian text · 7:42 AM</small>“Zone 3 is too cold again.”
                </div>
                <h6>Likely cause</h6>
                <p class="cause">Reheat valve on VAV 3-12 is stuck closed.</p>
                <svg viewBox="0 0 300 92" aria-hidden="true">
                  <line class="chart-base" x1="0" y1="24" x2="300" y2="24" />
                  <polyline
                    class="chart-line"
                    points="0,26 30,24 60,27 80,40 100,62 130,66 160,64 190,67 220,65 250,66 300,65"
                  />
                  <text class="chart-label" x="300" y="16" text-anchor="end">Setpoint 70°F</text>
                  <text class="chart-label" x="300" y="84" text-anchor="end">
                    Discharge air 55°F
                  </text>
                </svg>
                <h6>Evidence</h6>
                <ul>
                  <li>Discharge air at 55°F for six days</li>
                  <li>Valve commanded fully open the whole time</li>
                </ul>
                <div class="app-buttons">
                  <span class="app-button">Approve fix</span>
                  <span class="app-button ghost">Edit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats">
      <div class="wrap">
        <div class="stat-row">
          <div v-for="[value, label] in stats" :key="label" class="stat">
            <b>{{ value }}</b
            ><span>{{ label }}</span>
          </div>
          <div class="stat">
            <svg class="yc-mark" viewBox="0 0 46 46" role="img" aria-label="Y Combinator">
              <rect width="46" height="46" rx="4" fill="#F26522" />
              <path
                d="M13 11l10 14.5L33 11M23 25.5V36"
                fill="none"
                stroke="#fff"
                stroke-width="3.4"
              />
            </svg>
            <span>Backed by Y Combinator</span>
          </div>
        </div>
      </div>
    </div>

    <section id="platform" class="alt">
      <div class="wrap">
        <div class="label">The platform</div>
        <h2>Every building operation needs a co-worker.</h2>
        <div class="card-grid">
          <div class="nd-card">
            <div class="viz">
              <svg viewBox="0 0 220 100" aria-hidden="true">
                <polygon
                  class="chart-waste"
                  points="60,63 80,44 100,30 120,36 140,50 150,60 120,62 90,61"
                />
                <polyline
                  class="chart-base"
                  points="0,62 30,60 60,63 90,61 120,62 150,60 180,63 220,61"
                />
                <polyline
                  class="chart-line"
                  points="0,64 30,59 60,63 80,44 100,30 120,36 140,50 150,60 180,62 220,60"
                />
                <circle class="chart-point" cx="100" cy="30" r="4" />
              </svg>
            </div>
            <h3>Find waste</h3>
            <p>Baselines, anomalies and likely causes, with evidence.</p>
          </div>
          <div class="nd-card">
            <div class="viz">
              <div class="nd-chip">
                <div><b>AHU-2 running overnight</b><small>Drafted by Edviro</small></div>
                <span class="chip-action">Approve</span>
              </div>
            </div>
            <h3>Review work orders</h3>
            <p>Signals and requests become orders a human approves.</p>
          </div>
          <div class="nd-card">
            <div class="viz">
              <div class="bars">
                <div class="bar"><i style="height: 84px" />Before</div>
                <div class="bar after"><i style="height: 54px" />After</div>
              </div>
            </div>
            <h3>Verify every fix</h3>
            <p>M&amp;V against measured building data.</p>
          </div>
          <div class="nd-card">
            <div class="viz">
              <div class="cap-plan">
                <div v-for="[asset, used, year] in capitalPlan" :key="asset">
                  <span>{{ asset }}</span
                  ><i :style="{ '--w': used }" /><em>{{ year }}</em>
                </div>
              </div>
            </div>
            <h3>Plan capital</h3>
            <p>Asset health turned into a defensible capital plan.</p>
          </div>
        </div>
        <SiteLink class="more" href="/facilities-operations">Explore the platform →</SiteLink>
      </div>
    </section>

    <section id="buildings">
      <div class="wrap">
        <div class="label">Built for every building</div>
        <h2>One loop, for any building.</h2>
        <div class="cells">
          <SiteLink v-for="[name, detail, href] in buildings" :key="name" :href="href ?? '#demo'">
            <div>
              <b>{{ name }}</b
              ><span>{{ detail }}</span>
            </div>
            <i>→</i>
          </SiteLink>
        </div>
      </div>
    </section>

    <section id="problem" class="alt">
      <div class="wrap">
        <div class="label">The problem</div>
        <p class="statement">
          Facilities teams do not need more dashboards or alarms.
          <span>
            They need systems that keep improving and <b>take action</b>, turning signals and
            requests into reviewed work orders, verified fixes and capital plans.
          </span>
        </p>
        <div class="trio">
          <div v-for="[title, detail] in signals" :key="title">
            <h3>{{ title }}</h3>
            <p>{{ detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="how">
      <div class="wrap">
        <div class="center">
          <div class="label">How Edviro works</div>
          <h2>No alarms, just fixes.</h2>
          <p class="sub">
            There is no alarms tab in Edviro. Your AI crew triages every alarm, text and meter
            change around the clock, even while you’re sleeping, so what reaches your team is a
            diagnosed fix that’s ready to approve.
          </p>
        </div>
        <div class="loop">
          <div class="track" />
          <i
            v-for="(arrow, index) in loopArrows"
            :key="index"
            :class="['arrow', arrow.dir]"
            :style="arrow.style"
          />
          <div class="step" style="left: 20%; top: 0">
            <div class="step-no">01</div>
            <h3>Works 24/7</h3>
            <div class="step-ui">
              <small>Edviro crew · 2:14 AM</small>
              <span class="bubble">I checked 250 thermostats. One valve is stuck.</span>
            </div>
          </div>
          <div class="step" style="left: 50%; top: 0">
            <div class="step-no">02</div>
            <h3>Diagnose issues</h3>
            <div class="step-ui">
              <b>Reheat valve stuck closed</b>
              <span>Discharge air at 55°F for six days, valve commanded open.</span>
            </div>
          </div>
          <div class="step human" style="left: 80%; top: 0">
            <div class="step-no">03 <em>Human</em></div>
            <h3>You approve the fixes</h3>
            <div class="step-ui">
              <small>Facilities lead · 8:10 AM</small>
              <b>Fix drafted for VAV 3-12</b>
              <span class="approve">Approve fix</span>
            </div>
          </div>
          <div class="step" style="left: 65%; bottom: 0">
            <div class="step-no">04</div>
            <h3>Push to your work orders</h3>
            <div class="step-ui">
              <b>Work order created · 8:12 AM</b>
              <span>Pushed to your work order system, with history and steps.</span>
            </div>
          </div>
          <div class="step" style="left: 35%; bottom: 0">
            <div class="step-no">05</div>
            <h3>Verify</h3>
            <div class="step-ui">
              <b>Zone 3 back at 70°F</b>
              <span class="held">Watched 14 days. Fix confirmed.</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="results">
      <div class="wrap">
        <div class="label">Results</div>
        <h2>Featured customers and verified outcomes.</h2>
        <div class="tabs">
          <span class="on">Education</span>
          <span>Data centers</span>
          <span>Commercial</span>
          <span>More</span>
        </div>
        <div class="customers">
          <SiteLink v-for="[short, name, type] in customers" :key="short" href="/results">
            <b>{{ short }}</b>
            <span>{{ name }}</span>
            <em>{{ type }} <u>See the results →</u></em>
          </SiteLink>
        </div>
      </div>
    </section>

    <section id="integrations" class="alt">
      <div class="wrap">
        <div class="label">Integrations</div>
        <h2>Works with what you already have.</h2>
        <div class="logos">
          <span v-for="vendor in vendors" :key="vendor.name">
            <img
              v-if="vendor.src"
              :class="vendor.className"
              :src="vendor.src"
              :alt="vendor.name"
              :width="vendor.width"
              :height="vendor.height"
              loading="lazy"
              decoding="async"
            />
            <template v-else>{{ vendor.name }}</template>
          </span>
        </div>
        <div id="modules" class="modules">
          <div>
            <span class="free">Free with your AI Crew subscription</span>
            <h3>Keep what works. Consolidate what doesn’t.</h3>
            <p>
              The AI Crew is the core of Edviro, and it works alongside whatever you already run. If
              you are missing a piece, add any of these modules at no extra cost.
            </p>
            <SiteLink class="more" href="/modules">See all modules →</SiteLink>
          </div>
          <div class="module-grid">
            <SiteLink
              v-for="[name, detail, href] in modules"
              :key="name"
              :href="href ?? '/modules'"
            >
              <b>{{ name }}</b
              ><span>{{ detail }}</span
              ><i>→</i>
            </SiteLink>
          </div>
        </div>
      </div>
    </section>

    <section id="faq">
      <div class="wrap faq">
        <div>
          <div class="label">FAQ</div>
          <h2>Questions from operations teams.</h2>
          <SiteLink class="more" href="/faq">View all FAQs →</SiteLink>
        </div>
        <div>
          <details v-for="(faq, index) in faqs" :key="faq.question" :open="index === 0">
            <summary>{{ faq.question }}</summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <CtaSection />
  </main>
</template>
