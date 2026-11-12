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
import { contentPage } from '@/content'
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
  <main ref="root" class="aw-page aw-how-edviro-works">
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
              >How Edviro works</span
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
            <SiteLink class="btn btn-ghost btn-lg" href="#how">See the loop</SiteLink>
          </div>
          <div class="yc"><b>Y</b>Backed by Y Combinator</div>
        </div>
      </div>
    </section>
    <section class="stats" aria-label="Edviro by the numbers">
      <div class="wrap">
        <p class="eyebrow">Trusted by operators · Backed by Y Combinator</p>
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
    <span id="loop" class="anchor-alias" aria-hidden="true"></span>
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
            <h2 id="how-title">One loop,<br /><span>from signal to verified fix.</span></h2>
          </div>
          <div class="how-r">
            <p>
              Edviro watches your building 24/7 across utility data, BMS/BAS, and asset and
              maintenance logs, and stays vendor-agnostic.
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
              <h3>{{ steps[0]?.title }}</h3>
              <p>{{ steps[0]?.text }}</p>
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
              <h3>{{ steps[1]?.title }}</h3>
              <p>{{ steps[1]?.text }}</p>
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
              <h3>{{ steps[2]?.title }}</h3>
              <p>{{ steps[2]?.text }}</p>
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
              <h3>{{ steps[3]?.title }}</h3>
              <p>{{ steps[3]?.text }}</p>
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
              <h3>{{ steps[4]?.title }}</h3>
              <p>{{ steps[4]?.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="week dark" id="example" aria-labelledby="week-title">
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
              >The loop in one week</span
            >
            <h2 id="week-title">{{ example?.title }}</h2>
          </div>
          <p>
            A real pattern from a school site: one after-hours spike, traced, approved and proven in
            the meter data.
          </p>
        </div>
        <div class="wku" data-wku>
          <div class="wku-l" role="tablist" aria-label="The loop in one week">
            <button type="button" role="tab" class="on" aria-selected="true">
              <span class="wk-d">Day 1</span><b>Detect</b>
              <p>{{ example?.rows[0]?.[1] }}</p>
            </button>
            <button type="button" role="tab" aria-selected="false">
              <span class="wk-d">Day 1</span><b>Diagnose</b>
              <p>{{ example?.rows[1]?.[1] }}</p>
            </button>
            <button type="button" role="tab" aria-selected="false">
              <span class="wk-d">Day 2</span><b>Review</b>
              <p>{{ example?.rows[2]?.[1] }}</p>
            </button>
            <button type="button" role="tab" aria-selected="false">
              <span class="wk-d">Day 30</span><b>Verify</b>
              <p>{{ example?.rows[3]?.[1] }}</p>
            </button>
          </div>
          <div
            class="wku-r"
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-2.jpg)"
          >
            <div class="wku-s on">
              <div class="wku-card">
                <div class="wku-h">
                  <span>Main meter · After hours</span><em class="wh">Spike</em>
                </div>
                <div class="wku-big">+38%</div>
                <small>vs learned baseline · Site A</small>
                <div class="wku-bars" aria-hidden="true">
                  <i style="height: 28%"></i><i style="height: 30%"></i><i style="height: 26%"></i
                  ><i style="height: 32%"></i><i class="wh" style="height: 74%"></i
                  ><i class="wh" style="height: 82%"></i><i class="wh" style="height: 78%"></i>
                </div>
              </div>
            </div>
            <div class="wku-s">
              <div class="wku-card">
                <div class="wku-h"><span>Likely cause</span><em>Found</em></div>
                <div class="wku-big">RTU-3</div>
                <small>Schedule override · running overnight</small>
                <div class="wku-nights" aria-hidden="true">
                  <i class="wh">Mon</i><i class="wh">Tue</i><i class="wh">Wed</i
                  ><i class="wh">Thu</i><i>Fri</i>
                </div>
              </div>
            </div>
            <div class="wku-s">
              <div class="wku-card">
                <div class="wku-h"><span>Work order</span><em class="mid">Awaiting review</em></div>
                <div class="wku-big">WO-2418</div>
                <small>Remove the RTU-3 schedule override</small>
                <div class="wku-row">
                  <span>Reviewer <b>D. Park</b> · approves before dispatch</span>
                </div>
                <div class="wku-btns" aria-hidden="true"><i class="pri">Approve</i><i>Edit</i></div>
              </div>
            </div>
            <div class="wku-s">
              <div class="wku-card">
                <div class="wku-h">
                  <span>Measurement &amp; verification</span><em class="ok">Verified</em>
                </div>
                <div class="wku-big">−18%</div>
                <small>kWh vs learned baseline · 30 days</small
                ><svg
                  class="wku-line"
                  viewBox="0 0 200 50"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 14 C40 12 80 16 120 14 S180 13 200 14"
                    fill="none"
                    stroke="#b9c2bd"
                    stroke-width="2"
                    stroke-dasharray="4 4"
                  />
                  <path
                    d="M0 14 C40 13 70 20 110 30 S170 38 200 38"
                    fill="none"
                    stroke="#3f9d5a"
                    stroke-width="3"
                  />
                </svg>
              </div>
            </div>
            <div class="wku-c">
              <button type="button" class="wku-pp" aria-label="Pause">❚❚</button
              ><span class="wku-a"
                ><button type="button" class="wku-pv" aria-label="Previous">←</button
                ><button type="button" class="wku-nx" aria-label="Next">→</button></span
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="platform" id="platform" aria-labelledby="platform-title">
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
          <h2 id="platform-title">Every building operation <span>needs a verified loop.</span></h2>
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
        <span class="panel-anchor" data-panel-anchor="p-find" aria-hidden="true"></span>
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
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-1.jpg)"
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
        <span class="panel-anchor" data-panel-anchor="p-orders" aria-hidden="true"></span>
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
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-1.jpg)"
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
        <span class="panel-anchor" data-panel-anchor="p-verify" aria-hidden="true"></span>
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
              background-image: url(/design/images/brand/backgrounds/edviro-bg-3.jpg);
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
        <span class="panel-anchor" data-panel-anchor="p-plan" aria-hidden="true"></span>
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
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-3.jpg)"
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
            <h2 id="sectors-title">
              Built for every building <span>you’re responsible for.</span>
            </h2>
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
    <section class="trust dark" id="trust" aria-labelledby="trust-title">
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
              >Human in the loop</span
            >
            <h2 id="trust-title">Edviro proposes.<br /><span>Your team decides.</span></h2>
          </div>
          <p>
            Automation handles the watching and the follow-up. People keep every decision that
            touches the building.
          </p>
        </div>
        <div class="hl" data-s="0">
          <div class="hl-list" role="list">
            <div class="tr" role="listitem" tabindex="0" data-k="1">
              <span class="n">01</span>
              <h3>Every change approved</h3>
              <p>Schedules, setpoints, emails and work orders wait for a named reviewer.</p>
            </div>
            <div class="tr" role="listitem" tabindex="0" data-k="2">
              <span class="n">02</span>
              <h3>Doesn’t replace people</h3>
              <p>Not your staff, engineers, contractors or building controls.</p>
            </div>
            <div class="tr" role="listitem" tabindex="0" data-k="3">
              <span class="n">03</span>
              <h3>Every claim measured</h3>
              <p>Savings count only when the meter confirms them against the learned baseline.</p>
            </div>
          </div>
          <div class="hl-art" aria-hidden="true">
            <svg class="iso" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="hnP" cx=".4" cy=".3" r=".8">
                  <stop offset="0" stop-color="#1E5443" />
                  <stop offset="1" stop-color="#0D3329" />
                </radialGradient>
                <linearGradient id="hnRim" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="rgba(255,255,255,.35)" />
                  <stop offset=".5" stop-color="rgba(255,255,255,0)" />
                  <stop offset="1" stop-color="rgba(143,209,154,.25)" />
                </linearGradient>
                <linearGradient id="hnC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="#1A4C3D" />
                  <stop offset="1" stop-color="#0E3A2F" />
                </linearGradient>
                <linearGradient id="hnCs" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="rgba(255,255,255,.5)" />
                  <stop offset=".45" stop-color="rgba(255,255,255,.06)" />
                  <stop offset="1" stop-color="#8FD19A" />
                </linearGradient>
                <filter id="hnGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="22" />
                </filter>
                <g id="hnPer">
                  <circle r="54" fill="url(#hnP)" />
                  <circle cy="-12" r="11" fill="#8FD19A" />
                  <path
                    d="M-21 22v-4a13 13 0 0 1 13-13h16a13 13 0 0 1 13 13v4a4 4 0 0 1-4 4h-34a4 4 0 0 1-4-4z"
                    fill="#8FD19A"
                  />
                </g>
              </defs>
              <circle
                class="hn-bg"
                cx="300"
                cy="300"
                r="120"
                fill="#5EBF65"
                opacity=".18"
                filter="url(#hnGlow)"
              />
              <g
                fill="none"
                stroke="rgba(143,209,154,.55)"
                stroke-width="1.6"
                stroke-linecap="round"
              >
                <path d="M141 190H188Q206 190 206 208V242Q206 258 236 258H244" />
                <path d="M161 410H188Q206 410 206 392V358Q206 342 236 342H244" />
                <path d="M459 190H412Q394 190 394 208V242Q394 258 364 258H356" />
                <path d="M459 410H412Q394 410 394 392V358Q394 342 364 342H356" />
              </g>
              <g
                class="hn-pl"
                fill="none"
                stroke="#C9F2CF"
                stroke-width="2.6"
                stroke-linecap="round"
              >
                <path
                  class="pl1"
                  pathLength="100"
                  d="M141 190H188Q206 190 206 208V242Q206 258 236 258H244"
                />
                <path
                  class="pl2"
                  pathLength="100"
                  d="M161 410H188Q206 410 206 392V358Q206 342 236 342H244"
                />
                <path
                  class="pl3"
                  pathLength="100"
                  d="M459 190H412Q394 190 394 208V242Q394 258 364 258H356"
                />
                <path
                  class="pl4"
                  pathLength="100"
                  d="M459 410H412Q394 410 394 392V358Q394 342 364 342H356"
                />
              </g>
              <g fill="none" stroke="#8FD19A" stroke-width="10">
                <circle class="hg rg1" cx="100" cy="190" r="46" />
                <circle class="hg rg2" cx="120" cy="410" r="46" />
                <circle class="hg rg3" cx="500" cy="190" r="46" />
                <circle class="hg rg4" cx="500" cy="410" r="46" />
              </g>
              <use href="#hnPer" transform="translate(100 190) scale(.76)" />
              <use href="#hnPer" transform="translate(120 410) scale(.76)" />
              <use href="#hnPer" transform="translate(500 190) scale(.76)" />
              <use href="#hnPer" transform="translate(500 410) scale(.76)" />
              <g class="hn-bd">
                <g class="bd bd1" transform="translate(132 160)">
                  <circle r="13" fill="#8FD19A" />
                  <path
                    d="M-5 5l7-7m-1-3a3.5 3.5 0 1 0 4 4"
                    stroke="#0E3A2F"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                  />
                </g>
                <g class="bd bd2" transform="translate(152 380)">
                  <circle r="13" fill="#8FD19A" />
                  <path
                    d="M-6 6V-3h5v9M-1 6V-6h7V6M-7 6h14"
                    stroke="#0E3A2F"
                    stroke-width="1.8"
                    fill="none"
                    stroke-linejoin="round"
                  />
                </g>
                <g class="bd bd3" transform="translate(532 160)">
                  <circle r="13" fill="#8FD19A" />
                  <path
                    d="M-6 3a6 6 0 0 1 12 0zM-7 4h14M0-4v-2"
                    stroke="#0E3A2F"
                    stroke-width="1.8"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <g class="bd bd4" transform="translate(532 380)">
                  <circle r="13" fill="#8FD19A" />
                  <path d="M1-7l-6 8h5l-1 6 6-8H0z" fill="#0E3A2F" />
                </g>
              </g>
              <g class="hn-c1">
                <rect
                  x="234"
                  y="84"
                  width="132"
                  height="70"
                  rx="14"
                  fill="#123F33"
                  stroke="rgba(143,209,154,.25)"
                />
                <rect
                  x="222"
                  y="98"
                  width="156"
                  height="76"
                  rx="14"
                  fill="#1A4C3D"
                  stroke="rgba(143,209,154,.45)"
                />
                <text x="236" y="122" class="t1">Schedule change</text>
                <text x="236" y="139" class="t2">AHU-3 · 6:00 → 5:30</text>
                <rect
                  x="296"
                  y="148"
                  width="70"
                  height="18"
                  rx="9"
                  fill="none"
                  stroke="rgba(143,209,154,.6)"
                />
                <text x="331" y="161" class="t2" text-anchor="middle">Approve</text>
                <g class="ap">
                  <rect x="296" y="148" width="70" height="18" rx="9" fill="#8FD19A" />
                  <text x="331" y="161" class="t3" text-anchor="middle">✓ Approved</text>
                </g>
              </g>
              <g class="hn-c3">
                <path
                  class="lk"
                  pathLength="100"
                  d="M300 356V444"
                  stroke="rgba(143,209,154,.55)"
                  stroke-width="1.6"
                  fill="none"
                />
                <g transform="translate(0 50)">
                  <g class="cd">
                    <rect
                      x="206"
                      y="394"
                      width="188"
                      height="92"
                      rx="16"
                      fill="#1A4C3D"
                      stroke="rgba(143,209,154,.45)"
                    />
                    <text x="222" y="417" class="t2">Meter confirmed</text>
                    <text x="222" y="452" class="t4">−18%</text>
                    <text x="222" y="471" class="t2">vs baseline</text>
                    <path
                      d="M300 428H376"
                      stroke="rgba(255,255,255,.35)"
                      stroke-width="1.5"
                      stroke-dasharray="4 4"
                      fill="none"
                    />
                    <path
                      class="ml"
                      pathLength="100"
                      d="M300 428C322 429 334 446 376 462"
                      stroke="#8FD19A"
                      stroke-width="2.5"
                      fill="none"
                      stroke-linecap="round"
                    />
                  </g>
                </g>
                <g class="ck" transform="translate(392 446)">
                  <circle r="12" fill="#8FD19A" />
                  <path
                    d="M-5 0l3.5 3.5L5-4"
                    stroke="#0E3A2F"
                    stroke-width="2.2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
              <g class="hn-ic" transform="translate(60 60) scale(.8)">
                <rect
                  x="230"
                  y="230"
                  width="140"
                  height="140"
                  rx="28"
                  fill="none"
                  stroke="#8FD19A"
                  stroke-opacity=".2"
                  stroke-width="18"
                />
                <rect x="230" y="230" width="140" height="140" rx="28" fill="url(#hnC)" />
                <svg x="274" y="263" width="52" height="74" viewBox="0 0 70 100">
                  <image
                    href="/design/images/brand/edviro-logo-for-dark-bg.svg"
                    width="410"
                    height="100"
                  />
                </svg>
              </g>
              <g class="hn-cur">
                <g class="cc">
                  <path
                    d="M0 0l31 13.6-13.6 4-4.8 13.6z"
                    fill="#1A4C3D"
                    stroke="rgba(143,209,154,.8)"
                    stroke-width="1.4"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
            </svg>
          </div>
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
            <li class="more" style="--i: 11"><span>+ Other major BMS and BAS</span></li>
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
    <section class="start" id="start" aria-labelledby="start-title">
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
            <h2 id="start-title">First findings<br /><span>without a hardware project.</span></h2>
          </div>
          <p>
            Start with the sites and systems you have. Expand when the last step has paid for
            itself.
          </p>
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
<style scoped src="../styles/how-edviro-works.css"></style>
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
