<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import DesignerArtwork, { type ArtworkKind } from '@/components/design/DesignerArtwork.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import pausdLogo from '@/assets/img/pausd-logo.svg'
import lgsuhsdLogo from '@/assets/img/lgsuhsd-logo.png'
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
const vendors: {
  name: string
  src?: string
  width?: number
  height?: number
  className?: string
}[] = [
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

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)
const carousel = ref<HTMLElement | null>(null)
const canPrevious = ref(false)
const canNext = ref(true)
const activeCapability = ref('diagnostics')
const updateCapability = () => {
  for (const item of capabilities) {
    const anchor = document.getElementById(item.id)
    if (anchor && anchor.getBoundingClientRect().top < window.innerHeight * 0.5) {
      activeCapability.value = item.id
    }
  }
}
const updateCarousel = () => {
  const el = carousel.value
  if (!el) return
  canPrevious.value = el.scrollLeft > 2
  canNext.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 2
}
const scrollBuildings = (direction: number) => {
  const el = carousel.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.building-card')
  el.scrollBy({
    left: direction * ((card?.offsetWidth ?? el.clientWidth) + 20),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}
let resize: ResizeObserver | undefined
onMounted(() => {
  updateCarousel()
  updateCapability()
  window.addEventListener('scroll', updateCapability, { passive: true })
  resize = new ResizeObserver(updateCarousel)
  if (carousel.value) resize.observe(carousel.value)
})
onBeforeUnmount(() => {
  resize?.disconnect()
  window.removeEventListener('scroll', updateCapability)
})

const sectorImages = [
  'campuses',
  'data-halls',
  'hospitals',
  'office-towers',
  'public-buildings',
  'job-sites',
]
const customerLogos = [pausdLogo, lgsuhsdLogo]
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
</script>

<template>
  <main ref="root" class="nd aw-home">
    <div class="hero">
      <div class="wrap">
        <div class="hero-copy">
          <div>
            <div class="label">AI-powered facilities operations</div>
            <h1>Infrastructure that runs itself.<span>Put your facility on autopilot.</span></h1>
          </div>
          <p class="nd-lede">
            Edviro is facilities management software that catches building problems, drafts work
            orders for your team to approve, and verifies the fix, so you can reduce waste and keep
            facilities running.
          </p>
        </div>
        <div class="hero-bottom">
          <div class="actions">
            <DemoButton /><a class="nd-btn ghost" href="#how">See how it works</a>
          </div>
          <a
            class="yc-badge"
            href="https://www.ycombinator.com/companies/edviro"
            target="_blank"
            rel="noopener"
            ><b aria-hidden="true">Y</b>Backed by Y Combinator</a
          >
        </div>
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

    <div class="stats" aria-label="Education results">
      <div class="wrap">
        <div class="label">Proven in education</div>
        <div class="stat-row">
          <div v-for="[value, label] in stats" :key="label" class="stat">
            <b>{{ value }}</b
            ><span>{{ label }}</span>
          </div>
        </div>
      </div>
    </div>

    <section id="platform" class="aw-dark aw-platform">
      <div class="wrap">
        <div class="section-heading" data-reveal>
          <div>
            <div class="label">The platform</div>
            <h2>Every building operation needs a co-worker.</h2>
          </div>
          <p class="sub">
            Facilities teams do not need more dashboards or alarms. They need systems that keep
            improving and take action.
          </p>
        </div>
        <nav class="capability-nav" aria-label="Platform capabilities">
          <a
            v-for="item in capabilities"
            :key="item.id"
            :href="'#' + item.id"
            :aria-current="activeCapability === item.id ? 'location' : undefined"
            >{{ item.title }}</a
          >
        </nav>
        <template v-for="item in capabilities" :key="item.id">
          <!-- Anchors stay in normal flow, so links can return to an earlier sticky panel. -->
          <div :id="item.id" class="capability-anchor" aria-hidden="true"></div>
          <article :data-capability="item.id" class="capability">
            <div class="capability-copy" data-reveal>
              <div class="label">{{ item.title }}</div>
              <h3>{{ item.text }}</h3>
              <p>{{ item.detail }}</p>
              <SiteLink class="more" :href="item.href"
                >{{ item.title }} <span aria-hidden="true">→</span></SiteLink
              >
            </div>
            <DesignerArtwork :kind="item.art" />
          </article>
        </template>
        <SiteLink class="more" href="/facilities-operations">Explore the platform →</SiteLink>
      </div>
    </section>

    <section id="buildings" class="aw-buildings">
      <div class="wrap">
        <div class="section-heading" data-reveal>
          <div>
            <div class="label">Built for every building</div>
            <h2>One loop, for any building.</h2>
          </div>
        </div>
        <div
          ref="carousel"
          class="building-carousel"
          role="region"
          aria-label="Building types"
          tabindex="0"
          @scroll.passive="updateCarousel"
        >
          <SiteLink
            v-for="([name, detail, href], index) in buildings"
            :key="name"
            class="building-card"
            :href="href ?? '#demo'"
          >
            <div class="building-copy">
              <div>
                <h3>{{ name }}</h3>
                <p>{{ detail }}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </div>
            <div class="building-image">
              <img
                :src="'/design/images/sectors/' + sectorImages[index] + '-day.jpg'"
                :alt="name"
                width="512"
                height="512"
                loading="lazy"
              /><img
                class="night"
                :src="'/design/images/sectors/' + sectorImages[index] + '-night.jpg'"
                alt=""
                width="512"
                height="512"
                loading="lazy"
              />
            </div>
          </SiteLink>
        </div>
        <div class="carousel-actions">
          <button
            type="button"
            aria-label="Previous building types"
            :disabled="!canPrevious"
            @click="scrollBuildings(-1)"
          >
            ←</button
          ><button
            type="button"
            aria-label="Next building types"
            :disabled="!canNext"
            @click="scrollBuildings(1)"
          >
            →
          </button>
        </div>
      </div>
    </section>

    <section id="problem" class="aw-dark">
      <div class="wrap">
        <div class="section-heading" data-reveal>
          <div>
            <div class="label">The problem</div>
            <h2>Facilities teams do not need more dashboards or alarms.</h2>
          </div>
          <p class="sub">
            They need systems that keep improving and take action, turning signals and requests into
            reviewed work orders, verified fixes and capital plans.
          </p>
        </div>
        <div class="problem-grid">
          <div v-for="[title, detail] in signals" :key="title" class="problem-card" data-reveal>
            <span class="signal-dot" aria-hidden="true" />
            <h3>{{ title }}</h3>
            <p>{{ detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="how" class="aw-how">
      <div class="wrap">
        <div class="section-heading" data-reveal>
          <div>
            <div class="label">How Edviro works</div>
            <h2>No alarms, just fixes.</h2>
          </div>
          <p class="sub">
            There is no alarms tab in Edviro. Your AI crew triages every alarm, text and meter
            change around the clock, even while you’re sleeping, so what reaches your team is a
            diagnosed fix that’s ready to approve.
          </p>
        </div>
        <ol class="illustrated-loop" aria-label="How Edviro works">
          <li
            v-for="(step, index) in loop"
            :key="step.title"
            :class="{ human: step.tag }"
            data-reveal
          >
            <DesignerArtwork :kind="step.art" />
            <div class="step-index">
              {{ String(index + 1).padStart(2, '0') }}<span v-if="step.tag">{{ step.tag }}</span>
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section id="results" class="aw-dark aw-results">
      <div class="wrap">
        <div class="section-heading" data-reveal>
          <div>
            <div class="label">Results</div>
            <h2>Featured customers and verified outcomes.</h2>
          </div>
          <SiteLink class="more" href="/results">See the results →</SiteLink>
        </div>
        <div class="customer-grid">
          <SiteLink
            v-for="([short, name, type], index) in customers"
            :key="short"
            href="/results"
            class="customer-card"
            data-reveal
            ><img :src="customerLogos[index]" :alt="name" width="190" height="80" loading="lazy" />
            <h3>{{ name }}</h3>
            <p>{{ type }}</p>
            <span class="more">See the results →</span></SiteLink
          >
        </div>
      </div>
    </section>

    <section id="integrations" class="aw-integrations">
      <div class="wrap">
        <div class="integration-box" data-reveal>
          <div class="label">Integrations</div>
          <h2>Works with what you already have.</h2>
          <div class="logos">
            <span v-for="vendor in vendors" :key="vendor.name"
              ><img
                v-if="vendor.src"
                :class="vendor.className"
                :src="vendor.src"
                :alt="vendor.name"
                :width="vendor.width"
                :height="vendor.height"
                loading="lazy"
                decoding="async"
              /><template v-else>{{ vendor.name }}</template></span
            >
          </div>
          <SiteLink class="nd-btn" href="/integrations"
            >See what Edviro connects to <span aria-hidden="true">→</span></SiteLink
          >
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
            <SiteLink v-for="[name, detail, href] in modules" :key="name" :href="href ?? '/modules'"
              ><b>{{ name }}</b
              ><span>{{ detail }}</span
              ><i>→</i></SiteLink
            >
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
