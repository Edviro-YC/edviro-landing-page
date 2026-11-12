<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, type Directive } from 'vue'
import CtaSection from '@/components/CtaSection.vue'
import DemoButton from '@/components/DemoButton.vue'
import SiteLink from '@/components/SiteLink.vue'
import icon from '@/assets/img/edviro-icon.svg'
import campusesDay from '@/assets/img/buildings/campuses-day.jpg'
import campusesNight from '@/assets/img/buildings/campuses-night.jpg'
import dataCentersDay from '@/assets/img/buildings/data-centers-day.jpg'
import dataCentersNight from '@/assets/img/buildings/data-centers-night.jpg'
import hospitalsDay from '@/assets/img/buildings/hospitals-day.jpg'
import hospitalsNight from '@/assets/img/buildings/hospitals-night.jpg'
import jobSitesDay from '@/assets/img/buildings/job-sites-day.jpg'
import jobSitesNight from '@/assets/img/buildings/job-sites-night.jpg'
import officeTowersDay from '@/assets/img/buildings/office-towers-day.jpg'
import officeTowersNight from '@/assets/img/buildings/office-towers-night.jpg'
import publicBuildingsDay from '@/assets/img/buildings/public-buildings-day.jpg'
import publicBuildingsNight from '@/assets/img/buildings/public-buildings-night.jpg'
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
import { EDU_LIVE_SITES, EDU_VERIFIED_SAVINGS, SQFT_UNDER_MANAGEMENT } from '@/seo/site'

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
  [SQFT_UNDER_MANAGEMENT, 'Sq ft under management'],
]

const capitalPlan = [
  ['Chiller CH-1', '26%', '2027'],
  ['Boiler B-2', '52%', '2029'],
  ['Rooftop R-4', '78%', '2031'],
]

// The four platform pillars. On wide screens the section pins and scrolling
// moves through them; everywhere else they stack.
const pillars = [
  {
    key: 'waste',
    tab: 'Find waste',
    label: 'Building intelligence',
    title: 'See where energy is lost, and why.',
    text: 'Edviro learns a baseline for every building and watches utility data, BMS points and asset logs around the clock.',
    points: [
      'Anomalies flagged against each building’s own baseline',
      'A likely cause attached to every finding, with the evidence',
      'Ranked by the dollars at stake',
    ],
  },
  {
    key: 'orders',
    tab: 'Review work orders',
    label: 'Work orders',
    title: 'Turn signals into orders a person approves.',
    text: 'Alarms, texts and custodian requests become drafted work orders. A named person reviews each one before a technician is sent.',
    points: [
      'Drafted with the site, room and asset attached',
      'Nothing is dispatched until a person approves it',
      'Technicians get the history and the steps',
    ],
  },
  {
    key: 'verify',
    tab: 'Verify every fix',
    label: 'Measurement and verification',
    title: 'Prove each fix in your building data.',
    text: 'Every closed order is checked against measured data before it counts as a saving.',
    points: [
      'Before and after on the affected equipment',
      'Savings tied to the order that produced them',
      'A fix that doesn’t hold reopens on its own',
    ],
  },
  {
    key: 'capital',
    tab: 'Plan capital',
    label: 'Capital planning',
    title: 'Turn asset health into a capital plan.',
    text: 'Edviro tracks the condition and cost history of every asset, so replacement decisions rest on data.',
    points: [
      'Asset health across every site',
      'Repair or replace, with the numbers behind it',
      'A multi-year plan you can defend in budget meetings',
    ],
  },
]

// Building photos from the 2026-11 design mockup. Each card has two labelled
// points on the photo: `flip` puts the label to the left of its dot.
const buildings = [
  {
    name: 'Campuses',
    text: 'School districts and universities with dozens of buildings on one plan.',
    href: '/solutions/schools',
    day: campusesDay,
    night: campusesNight,
    spots: [
      { label: `${EDU_LIVE_SITES} sites`, style: { left: '42%', top: '34%' } },
      { label: `${EDU_VERIFIED_SAVINGS} saved`, style: { right: '14%', top: '70%' }, flip: true },
    ],
  },
  {
    name: 'Data centers',
    text: 'Existing facilities that need more capacity from the same cooling and power.',
    href: '/solutions/data-centers',
    day: dataCentersDay,
    night: dataCentersNight,
    spots: [
      { label: 'Capacity headroom', style: { right: '40%', top: '46%' }, flip: true },
      { label: 'Cooling 24/7', style: { right: '14%', top: '74%' }, flip: true },
    ],
  },
  {
    name: 'Hospitals',
    text: 'Critical HVAC and plant rooms that can’t afford downtime.',
    href: '/solutions/healthcare',
    day: hospitalsDay,
    night: hospitalsNight,
    spots: [
      { label: 'Critical HVAC', style: { right: '42%', top: '44%' }, flip: true },
      { label: 'Pressure and temperature', style: { right: '16%', top: '74%' }, flip: true },
    ],
  },
  {
    name: 'Office towers',
    text: 'Multi-tenant towers where schedules and setpoints drift.',
    href: '/solutions/real-estate',
    day: officeTowersDay,
    night: officeTowersNight,
    spots: [
      { label: 'Schedule drift', style: { left: '48%', top: '38%' } },
      { label: 'Occupancy-aware HVAC', style: { right: '14%', top: '68%' }, flip: true },
    ],
  },
  {
    // No page for public buildings yet, so this one goes to the demo section.
    name: 'Public buildings',
    text: 'Libraries, civic centers and courts on tight public budgets.',
    href: '#demo',
    day: publicBuildingsDay,
    night: publicBuildingsNight,
    spots: [
      { label: 'Civic sites', style: { left: '40%', top: '46%' } },
      { label: 'Utility bills tracked', style: { right: '14%', top: '72%' }, flip: true },
    ],
  },
  {
    name: 'Job sites',
    text: 'Temporary power and plant on live construction sites.',
    href: '/solutions/construction',
    day: jobSitesDay,
    night: jobSitesNight,
    spots: [
      { label: 'Temporary power', style: { right: '40%', top: '26%' }, flip: true },
      { label: 'Baseline at handover', style: { right: '16%', top: '66%' }, flip: true },
    ],
  },
]

// The three things the problem statement says signals and requests turn into.
const outcomes = [
  ['Reviewed work orders', 'Every alarm, text and request becomes an order a person approves.'],
  ['Verified fixes', 'Building data confirms each fix held.'],
  ['Capital plans', 'Repair history shows what to replace, and when.'],
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
 * vendors' trademarks, shown in their own colours on white tiles. Owner: confirm each integration and
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
  { name: 'Delta Controls', src: deltaControls, width: 600, height: 225, className: 'tall' },
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

/*
 * Scroll animation. Everything below runs in the browser only and is skipped
 * when the visitor prefers reduced motion, so the prerendered page (and a
 * page without JavaScript) shows every section in full.
 */
const canAnimate = () =>
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

let revealObserver: IntersectionObserver | undefined
const onEnter = new WeakMap<Element, () => void>()

/**
 * `v-reveal` fades an element up when it scrolls into view; `v-reveal="120"`
 * delays it by 120ms. `v-reveal="fn"` leaves the element alone and calls `fn`
 * once when it enters view.
 */
const vReveal: Directive<HTMLElement, number | (() => void) | undefined> = {
  mounted(el, { value }) {
    if (!canAnimate()) return
    revealObserver ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const target = entry.target as HTMLElement
          revealObserver?.unobserve(target)
          target.classList.add('in')
          onEnter.get(target)?.()
          // Hand the element back to its own hover transitions once it has settled.
          window.setTimeout(() => {
            target.classList.remove('rv', 'in')
            target.style.transitionDelay = ''
          }, 2400)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    // Anything already on screen stays as it is, so it never flashes out.
    if (el.getBoundingClientRect().top < window.innerHeight) return
    if (typeof value === 'function') {
      onEnter.set(el, value)
    } else {
      el.classList.add('rv')
      if (value) el.style.transitionDelay = `${value}ms`
    }
    revealObserver.observe(el)
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
  },
}

// Stats count up from zero the first time the row is seen.
const statValues = stats.map((stat) => stat[0] ?? '')
const shownStats = ref(statValues)

function countUpStats() {
  const targets = statValues.map((value) => /^(\D*)(\d+)(\D*)$/.exec(value))
  const started = performance.now()
  const tick = (now: number) => {
    const t = Math.min(1, (now - started) / 1100)
    const eased = 1 - (1 - t) ** 3
    shownStats.value = statValues.map((value, index) => {
      const match = targets[index]
      return match ? `${match[1]}${Math.round(Number(match[2]) * eased)}${match[3]}` : value
    })
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// Platform section: pinned on wide, tall screens, where scrolling moves
// through the four pillars.
const platformTrack = ref<HTMLElement | null>(null)
const pinned = ref(false)
const activePillar = ref(0)
const pillarProgress = ref(0)
let pinQuery: MediaQueryList | undefined

function measurePlatform() {
  const track = platformTrack.value
  if (!track || !pinned.value) return
  const rect = track.getBoundingClientRect()
  const span = rect.height - window.innerHeight
  const position = Math.min(0.999, Math.max(0, -rect.top / span)) * pillars.length
  activePillar.value = Math.floor(position)
  pillarProgress.value = position % 1
}

function setPinned() {
  pinned.value = Boolean(pinQuery?.matches)
  if (!pinned.value) activePillar.value = 0
  void nextTick(measurePlatform)
}

function goToPillar(index: number) {
  const track = platformTrack.value
  if (!track || !pinned.value) return
  const span = track.offsetHeight - window.innerHeight
  const top = track.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top: top + ((index + 0.5) / pillars.length) * span, behavior: 'smooth' })
}

function tabFill(index: number) {
  if (index < activePillar.value) return 1
  return index === activePillar.value ? pillarProgress.value : 0
}

onMounted(() => {
  // The opening animation plays once per tab: see the script in index.html.
  try {
    window.sessionStorage.setItem('edviro-intro', '1')
  } catch {
    // Storage can be blocked; the animation then plays on each load.
  }

  pinQuery = window.matchMedia(
    '(min-width: 1041px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)',
  )
  pinQuery.addEventListener('change', setPinned)
  window.addEventListener('scroll', measurePlatform, { passive: true })
  window.addEventListener('resize', measurePlatform)
  setPinned()
})

onBeforeUnmount(() => {
  // Coming back to the homepage from another page does not replay it.
  document.documentElement.classList.add('intro-seen')
  pinQuery?.removeEventListener('change', setPinned)
  window.removeEventListener('scroll', measurePlatform)
  window.removeEventListener('resize', measurePlatform)
})
</script>

<template>
  <main class="nd">
    <div class="hero intro">
      <div class="wrap">
        <h1>
          <span class="hl">Infrastructure that runs itself.</span
          ><span class="hl accent">Put your facility on autopilot.</span>
        </h1>
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
                  :style="{ '--i': index }"
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
                    pathLength="1"
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
        <div v-reveal="countUpStats" class="stat-row">
          <div v-for="([, label], index) in stats" :key="label" class="stat">
            <b>{{ shownStats[index] }}</b
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

    <section id="platform" :class="['dark', 'platform', { pinned }]">
      <div ref="platformTrack" class="plat-track">
        <div class="plat-pin">
          <div class="wrap">
            <div class="label">The platform</div>
            <h2>Every building operation <span>needs a co-worker.</span></h2>
            <div class="plat-tabs">
              <button
                v-for="(pillar, index) in pillars"
                :key="pillar.key"
                type="button"
                :class="{ on: index === activePillar }"
                :aria-pressed="index === activePillar"
                @click="goToPillar(index)"
              >
                {{ pillar.tab }}<i :style="{ transform: `scaleX(${tabFill(index)})` }" />
              </button>
            </div>
            <div class="plat-stage">
              <div
                v-for="(pillar, index) in pillars"
                :key="pillar.key"
                :class="['pillar', { on: index === activePillar }]"
              >
                <div class="pillar-copy">
                  <div class="pillar-label">{{ pillar.label }}</div>
                  <h3>{{ pillar.title }}</h3>
                  <p>{{ pillar.text }}</p>
                  <ul>
                    <li v-for="point in pillar.points" :key="point">{{ point }}</li>
                  </ul>
                </div>

                <!-- Illustrative product panels -->
                <div v-if="pillar.key === 'waste'" class="pv" aria-hidden="true">
                  <div class="pv-card pv-main">
                    <div class="pv-tags"><span>Gas usage</span><span>Site A</span></div>
                    <div class="pv-big">76.4 <small>therms in one day</small></div>
                    <p class="pv-note">The learned baseline expected 16.7 therms.</p>
                    <svg viewBox="0 0 320 96">
                      <polygon
                        class="chart-waste"
                        points="186,70 204,48 222,16 240,22 258,50 270,68 240,70 210,71"
                      />
                      <polyline
                        class="chart-base"
                        points="0,72 40,70 80,73 120,71 160,72 200,70 240,71 280,72 320,70"
                      />
                      <polyline
                        class="chart-line"
                        points="0,74 40,69 80,73 120,70 160,73 186,70 204,48 222,16 240,22 258,50 270,68 300,71 320,69"
                      />
                      <circle class="chart-point" cx="222" cy="16" r="4" />
                    </svg>
                  </div>
                  <div class="pv-card pv-float">
                    <small>Likely cause</small>
                    <b>Hot-water valve stuck open</b>
                    <span class="pv-delta">+357% against baseline</span>
                  </div>
                </div>

                <div v-else-if="pillar.key === 'orders'" class="pv" aria-hidden="true">
                  <div class="pv-card pv-main">
                    <div class="pv-head"><b>Work orders</b><span>Drafted by Edviro</span></div>
                    <div class="pv-row">
                      <div><b>AHU-2 · Schedule fix</b><small>Site A · Air handler</small></div>
                      <span class="pill">Draft</span>
                    </div>
                    <div class="pv-row">
                      <div><b>CH-1 · Short-cycling</b><small>Site C · Chiller</small></div>
                      <span class="pill">Draft</span>
                    </div>
                  </div>
                  <div class="pv-card pv-float">
                    <small>Needs review · Facilities lead</small>
                    <b>Fix drafted for VAV 3-12</b>
                    <div class="app-buttons">
                      <span class="app-button">Approve fix</span>
                      <span class="app-button ghost">Edit</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="pillar.key === 'verify'" class="pv" aria-hidden="true">
                  <div class="pv-card pv-main">
                    <div class="pv-tags"><span class="ok">Verified</span><span>Site A · Zone 3</span></div>
                    <div class="pv-big">70°F <small>back at setpoint</small></div>
                    <p class="pv-note">Watched 14 days. Fix confirmed.</p>
                    <div class="pv-bars">
                      <div><span>Before</span><i style="width: 88%" /></div>
                      <div class="after"><span>After</span><i style="width: 58%" /></div>
                    </div>
                  </div>
                  <div class="pv-card pv-float">
                    <small>Tied to the work order</small>
                    <b>VAV 3-12 · Reheat valve</b>
                    <span>Reopens if the fix doesn’t hold</span>
                  </div>
                </div>

                <div v-else class="pv" aria-hidden="true">
                  <div class="pv-card pv-main">
                    <div class="pv-head"><b>Asset health</b><span>Life used</span></div>
                    <div class="cap-plan">
                      <div v-for="[asset, used, year] in capitalPlan" :key="asset">
                        <span>{{ asset }}</span
                        ><i :style="{ '--w': used }" /><em>{{ year }}</em>
                      </div>
                    </div>
                  </div>
                  <div class="pv-card pv-float">
                    <small>Replace</small>
                    <b>Chiller CH-1 · Site C</b>
                    <span>Planned for 2027</span>
                  </div>
                </div>
              </div>
            </div>
            <SiteLink class="more" href="/facilities-operations">Explore the platform →</SiteLink>
          </div>
        </div>
      </div>
    </section>

    <section id="buildings">
      <div class="wrap">
        <div class="label">Built for every building</div>
        <h2>One loop, <span>for any building.</span></h2>
        <div class="bcards">
          <div v-for="(building, index) in buildings" :key="building.name" v-reveal="index * 70">
            <SiteLink class="bcard" :href="building.href">
              <div class="bphoto">
                <img :src="building.day" alt="" width="900" height="836" loading="lazy" />
                <img
                  class="night"
                  :src="building.night"
                  alt=""
                  width="900"
                  height="836"
                  loading="lazy"
                />
                <span
                  v-for="spot in building.spots"
                  :key="spot.label"
                  :class="['spot', { flip: spot.flip }]"
                  :style="spot.style"
                >
                  <i /><em>{{ spot.label }}</em>
                </span>
              </div>
              <div class="bcard-text">
                <div>
                  <b>{{ building.name }}</b>
                  <p>{{ building.text }}</p>
                </div>
                <i>→</i>
              </div>
            </SiteLink>
          </div>
        </div>
      </div>
    </section>

    <section id="problem" class="alt">
      <div class="wrap">
        <div class="label">The problem</div>
        <p v-reveal class="statement">
          Facilities teams do not need more dashboards or alarms.
          <span>
            They need systems that keep improving and <b>take action</b>, turning signals and
            requests into reviewed work orders, verified fixes and capital plans.
          </span>
        </p>
        <div v-reveal class="trio">
          <div v-for="[title, detail] in outcomes" :key="title">
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
          <h2>No alarms, <span>just fixes.</span></h2>
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
          <div v-reveal class="step" style="left: 20%; top: 0">
            <div class="step-no">01</div>
            <h3>Works 24/7</h3>
            <div class="step-ui">
              <small>Edviro crew · 2:14 AM</small>
              <span class="bubble">I checked 250 thermostats. One valve is stuck.</span>
            </div>
          </div>
          <div v-reveal="140" class="step" style="left: 50%; top: 0">
            <div class="step-no">02</div>
            <h3>Diagnose issues</h3>
            <div class="step-ui">
              <b>Reheat valve stuck closed</b>
              <span>Discharge air at 55°F for six days, valve commanded open.</span>
            </div>
          </div>
          <div v-reveal="280" class="step human" style="left: 80%; top: 0">
            <div class="step-no">03 <em>Human</em></div>
            <h3>You approve the fixes</h3>
            <div class="step-ui">
              <small>Facilities lead · 8:10 AM</small>
              <b>Fix drafted for VAV 3-12</b>
              <span class="approve">Approve fix</span>
            </div>
          </div>
          <div v-reveal="420" class="step" style="left: 65%; bottom: 0">
            <div class="step-no">04</div>
            <h3>Push to your work orders</h3>
            <div class="step-ui">
              <b>Work order created · 8:12 AM</b>
              <span>Pushed to your work order system, with history and steps.</span>
            </div>
          </div>
          <div v-reveal="560" class="step" style="left: 35%; bottom: 0">
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
        <h2>Featured customers <span>and verified outcomes.</span></h2>
        <div class="tabs">
          <span class="on">Education</span>
          <span>Data centers</span>
          <span>Commercial</span>
          <span>More</span>
        </div>
        <div v-reveal class="customers">
          <SiteLink v-for="[short, name, type] in customers" :key="short" href="/results">
            <b>{{ short }}</b>
            <span>{{ name }}</span>
            <em>{{ type }} <u>See the results →</u></em>
          </SiteLink>
        </div>
      </div>
    </section>

    <section id="integrations" class="integrations">
      <div class="integ-wrap">
        <div class="integ-box">
          <div class="label">Integrations</div>
          <h2>Works with <span>what you already have.</span></h2>
          <p class="sub">
            Edviro connects to your building controls, meters, utility bills and work-order
            systems.
          </p>
          <div v-reveal class="logo-tiles">
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
          <SiteLink class="nd-btn lead-arrow" href="/integrations">
            <i aria-hidden="true">→</i>See what Edviro connects to
          </SiteLink>
          <p class="integ-note">
            Don’t see your system? Edviro works with all major BMS, meters and CMMS platforms.
          </p>
          <div id="modules" v-reveal class="modules">
            <div>
              <span class="free">Free with your AI Crew subscription</span>
              <h3>Keep what works. Consolidate what doesn’t.</h3>
              <p>
                The AI Crew is the core of Edviro, and it works alongside whatever you already run.
                If you are missing a piece, add any of these modules at no extra cost.
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
      </div>
    </section>

    <section id="faq">
      <div class="wrap faq">
        <div>
          <div class="label">FAQ</div>
          <h2>Questions from <span>operations teams.</span></h2>
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
