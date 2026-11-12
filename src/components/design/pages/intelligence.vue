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
  <main ref="root" class="aw-page aw-intelligence">
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
              >Building intelligence · Diagnostics</span
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
            <SiteLink class="btn btn-ghost btn-lg" href="#how">How it works</SiteLink>
            <SiteLink class="btn btn-ghost btn-lg" href="#market">Schools</SiteLink
            ><SiteLink class="btn btn-ghost btn-lg" href="#market">Data centers</SiteLink>
          </div>
          <div class="yc"><b>Y</b>Backed by Y Combinator</div>
        </div>
      </div>
    </section>
    <section class="stats ib-stats" aria-label="Building intelligence by the numbers">
      <div class="wrap">
        <p class="eyebrow">Building intelligence in numbers</p>
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
            <h2 id="how-title">Five steps,<br /><span>one record.</span></h2>
          </div>
          <div class="how-r">
            <p>
              From a learned baseline to a verified fix, every step is logged against the same
              building data.
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
                  <span class="pill">Baseline</span>
                  <div class="t">Site A · Main meter</div>
                  <div class="row">Weather-adjusted<span>Learned</span></div>
                  <div class="row">Schedules + tariffs<span>Applied</span></div>
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
              <div class="sm" style="background-image: url(/design/images/how/how-signal.jpg)">
                <div class="c">
                  <span class="pill r">Anomaly</span>
                  <div class="t">After-hours load +38%</div>
                  <div class="u">Detected 11:04 PM</div>
                  <div class="pop r"><b></b>Meter spike</div>
                </div>
              </div>
              <span class="n">02</span>
              <h3>{{ steps[1]?.title }}</h3>
              <p>{{ steps[1]?.text }}</p>
            </div>
          </div>
          <div class="step" style="--i: 2">
            <span class="dot"></span>
            <div class="card">
              <div class="sm" style="background-image: url(/design/images/how/how-diagnose.jpg)">
                <div class="c">
                  <span class="pill">Likely cause</span>
                  <div class="t">Schedule override · RTU-3</div>
                  <div class="row">Runtime 11 pm – 6 am<span>4 nights</span></div>
                  <div class="pop"><b></b>3 evidence sources</div>
                </div>
              </div>
              <span class="n">03</span>
              <h3>{{ steps[2]?.title }}</h3>
              <p>{{ steps[2]?.text }}</p>
            </div>
          </div>
          <div class="step human" style="--i: 3">
            <span class="dot"></span>
            <div class="card">
              <span class="tag">Human</span>
              <div class="sm" style="background-image: url(/design/images/how/how-dispatch.jpg)">
                <div class="c">
                  <span class="pill y">Pending signoff</span>
                  <div class="t">WO-2418</div>
                  <div class="u">Reviewer · D. Park</div>
                  <div class="btns"><span class="ok">Approve</span><span>Edit</span></div>
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
                  <div class="big">−18% <small>kWh</small></div>
                  <div class="pop"><b></b>Back at baseline</div>
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
    <section class="start" id="capabilities" aria-labelledby="cap-title">
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
              >What you get</span
            >
            <h2 id="cap-title">What building intelligence<br /><span>does for your team.</span></h2>
          </div>
          <p>Findings ranked by what they cost, each one with its cause and its evidence.</p>
        </div>
        <div class="ib-caps">
          <div class="ib-cap">
            <div class="mini">
              <span>Main meter · 7 days</span><b>+38%</b>
              <div class="ib-b g" style="width: 82%"></div>
              <div class="ib-b" style="width: 34%"></div>
            </div>
            <h3>Anomaly detection</h3>
            <p>After-hours runtime, short-cycling, demand spikes, unexpected gas or water use.</p>
          </div>
          <div class="ib-cap">
            <div class="mini">
              <span>RTU-3</span>
              <div class="ib-b g" style="width: 90%"></div>
              <div class="ib-b" style="width: 70%"></div>
              <div class="ib-b" style="width: 55%"></div>
            </div>
            <h3>Likely cause, with evidence</h3>
            <p>
              “Runtime 11 pm – 6 am, 4 nights · setpoint held at 68°F · no calendar event on site.”
            </p>
          </div>
          <div class="ib-cap">
            <div class="mini">
              <span>BMS alarms</span><b>312 → 1</b>
              <div class="ib-b g" style="width: 18%"></div>
            </div>
            <h3>Alarm grouping</h3>
            <p>Hundreds of alarms traced to the one fault behind them.</p>
          </div>
          <div class="ib-cap">
            <div class="mini">
              <span>Thu · Peak risk</span><b>High</b>
              <div class="ib-b" style="width: 45%"></div>
              <div class="ib-b g" style="width: 78%"></div>
            </div>
            <h3>Forecasts</h3>
            <p>Peak-risk days and comfort risks flagged before they happen.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="start" id="product" aria-labelledby="prod-title" style="padding: 40px 0 200px">
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
              >Product UI</span
            >
            <h2 id="prod-title">Everything your team needs,<br /><span>on one screen.</span></h2>
          </div>
          <p>
            Every detection with its expected value, deviation and cost impact, ranked by size, so a
            reviewer knows where to look first.
          </p>
        </div>
        <div class="ib-wide">
          <div class="app" role="img" aria-label="Edviro app: Anomaly Detection screen">
            <div class="app-sb">
              <div class="app-lg">Edviro<i>DEMO</i></div>
              <SiteLink href="/contact/" tabindex="-1">Tasks</SiteLink>
              <h6>ANALYTICS</h6>
              <SiteLink href="/contact/" class="" tabindex="-1">Dashboard</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Schools</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Analytics</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Billing</SiteLink
              ><SiteLink href="/contact/" class="on" tabindex="-1">Anomalies</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Reports</SiteLink>
              <h6>FACILITIES</h6>
              <SiteLink href="/contact/" class="" tabindex="-1">Knowledge</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Decision Simulator</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Goals</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Projects</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Work Orders<em>3</em></SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Assets</SiteLink
              ><SiteLink href="/contact/" class="" tabindex="-1">Facilities<em>7</em></SiteLink>
            </div>
            <div class="app-m">
              <h4>Anomaly Detection</h4>
              <div class="app-bar">
                <div class="app-in">Site A ⌄</div>
                <div class="app-in">Search school, meter, type, cause, severity, date…</div>
              </div>
              <div class="app-st">
                <div>Daily<b>1</b>anomalies detected</div>
                <div>Monthly<b>1</b>anomalies detected</div>
              </div>
              <div class="app-fl">
                <div>
                  <span>Filter by Scale</span>
                  <div class="app-in">All Scales</div>
                </div>
                <div>
                  <span>Filter by Energy</span>
                  <div class="app-in">All energy types</div>
                </div>
                <div>
                  <span>Filter by Severity</span>
                  <div class="app-in">All Severities</div>
                </div>
                <div>
                  <span>Sort By</span>
                  <div class="app-in">Largest deviation</div>
                </div>
              </div>
              <div class="app-dt">Detections <i>2</i></div>
              <div class="app-cd">
                <div class="app-c app-hl">
                  <div class="tg">
                    <i class="t1">Hot-water valve stuck open</i><i class="t2">Gas</i
                    ><i class="t3">High</i>
                  </div>
                  <div class="sub">Site A (Gas) · Jun 8, 2026</div>
                  <div class="r">Actual<b>76.4 thm</b></div>
                  <div class="r">Expected<b>16.7 thm</b></div>
                  <div class="r">Deviation<b class="d">+357.5%</b></div>
                  <div class="r">Cost impact<b>$101.49</b></div>
                </div>
                <div class="app-c">
                  <div class="tg">
                    <i class="t2">Chronic summer-break overuse</i><i class="t1">Electricity</i
                    ><i class="t4">Medium</i>
                  </div>
                  <div class="sub">Site A (Electric) · June 2026</div>
                  <div class="r">Actual<b>118,700 kWh</b></div>
                  <div class="r">Expected<b>97,300 kWh</b></div>
                  <div class="r">Deviation<b class="d">+22.0%</b></div>
                  <div class="r">Cost impact<b>$5,350.00</b></div>
                </div>
              </div>
            </div>
          </div>
          <p class="ib-note">Demo data from the Edviro app.</p>
        </div>
      </div>
    </section>
    <section class="week dark ib-mk" id="market" aria-labelledby="mk-title">
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
              >By market</span
            >
            <h2 id="mk-title">Same loop,<br /><span>two very different buildings.</span></h2>
          </div>
          <p>The method is the same on a school gas meter and a data hall chiller loop.</p>
        </div>
        <div class="wku" data-wku>
          <div class="wku-l" role="tablist" aria-label="By market">
            <button type="button" role="tab" class="on" aria-selected="true">
              <span class="wk-d">Education</span><b>Schools &amp; campuses</b>
              <p>
                A school’s gas meter read 76 therms against 16.7 expected (+357%) in one day. Likely
                cause: a hot-water valve stuck open. A work order is drafted for review, and the
                meter confirms the fix.
              </p>
              <span class="ib-mkt-l">Edviro for Education →</span>
            </button>
            <button type="button" role="tab" aria-selected="false">
              <span class="wk-d">Data centers</span><b>Data centers</b>
              <p>
                312 BMS alarms traced to 1 root cause: a sticking chilled-water valve on CRAH-2. The
                cooling model predicts supply temperature to ±0.4 °C, so the fix is checked against
                the model.
              </p>
              <span class="ib-mkt-l">Edviro for Data Centers →</span>
            </button>
          </div>
          <div
            class="wku-r"
            style="background-image: url(/design/images/brand/backgrounds/edviro-bg-2.jpg)"
          >
            <div class="wku-s on">
              <div class="wku-card">
                <div class="wku-h"><span>Gas meter · One day</span><em class="wh">+357%</em></div>
                <div class="wku-big">76 <small>therms</small></div>
                <small>vs 16.7 expected · Likely cause: hot-water valve stuck open</small>
                <div class="wku-bars" aria-hidden="true">
                  <i style="height: 20%"></i><i style="height: 22%"></i><i style="height: 18%"></i
                  ><i class="wh" style="height: 90%"></i>
                </div>
              </div>
            </div>
            <div class="wku-s">
              <div class="wku-card">
                <div class="wku-h"><span>BMS alarms · CRAH-2</span><em class="ok">1 cause</em></div>
                <div class="wku-big">312 → 1</div>
                <small>Sticking chilled-water valve · supply temp ±0.4 °C</small
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
    <section class="start" id="modules" aria-labelledby="mod-title">
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
              >Part of one loop</span
            >
            <h2 id="mod-title">Works better with<br /><span>the rest of Edviro.</span></h2>
          </div>
          <p>A diagnosis is where the loop starts, not where it ends.</p>
        </div>
        <div class="ib-mod">
          <SiteLink href="/contact/"
            ><h3>Work orders →</h3>
            <p>The diagnosis becomes a drafted order.</p></SiteLink
          >
          <SiteLink href="/contact/"
            ><h3>Measurement &amp; verification →</h3>
            <p>Every fix checked against the same baseline.</p></SiteLink
          >
          <SiteLink href="/contact/"
            ><h3>Capital planning →</h3>
            <p>Repeat faults feed repair-or-replace.</p></SiteLink
          >
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
                >Questions</span
              >
              <h2 id="faq-title">Building intelligence<br /><span>FAQ.</span></h2>
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
<style scoped src="../styles/intelligence.css"></style>
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
