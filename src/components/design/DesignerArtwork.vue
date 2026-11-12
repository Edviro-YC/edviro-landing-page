<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

/** Adapted from Anton's Awesomic illustrations. All readouts are product examples. */
export type ArtworkKind =
  | 'diagnostic'
  | 'work-orders'
  | 'verification'
  | 'capital'
  | 'signal'
  | 'diagnose'
  | 'review'
  | 'dispatch'
  | 'verify'
defineProps<{ kind: ArtworkKind }>()
const root = ref<HTMLElement | null>(null)
useScrollReveal(root)
</script>

<template>
  <div ref="root" class="designer-art" aria-hidden="true">
    <figure
      class="media"
      style="background-image: url(/design/images/brand/backgrounds/edviro-bg-2.jpg)"
      v-if="kind === 'diagnostic'"
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
          <div class="ill-tags"><span class="t-b">Daily</span><span class="t-r">High</span></div>
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
    <figure
      class="media"
      style="background-image: url(/design/images/brand/backgrounds/edviro-bg-2.jpg)"
      v-else-if="kind === 'work-orders'"
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
              <b>Chiller 2 · Setpoint reset</b><span>North Campus</span><em class="t-y">Draft</em>
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
    <figure
      class="media"
      style="
        background-image: url(/design/images/brand/backgrounds/edviro-bg-4.jpg);
        background-position: right bottom;
      "
      v-else-if="kind === 'verification'"
    >
      <div class="ill lo">
        <div class="ill-card">
          <div class="ill-tags">
            <span class="t-b">Goal progress</span><span class="t-g">Verified</span>
          </div>
          <div class="ill-big">Verified <small>verified savings</small></div>
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
    <figure
      class="media"
      style="background-image: url(/design/images/brand/backgrounds/edviro-bg-4.jpg)"
      v-else-if="kind === 'capital'"
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
          <i>Capital plan</i><b>3-year plan</b><span>Repair-or-replace, with the numbers</span>
        </div>
      </div>
    </figure>
    <div
      class="sm"
      style="background-image: url(/design/images/how/how-signal.jpg)"
      v-else-if="kind === 'signal'"
    >
      <div class="c">
        <span class="pill r">Alarm</span>
        <div class="t">“Zone 3 is too cold again”</div>
        <div class="u">Text · 6:02 AM</div>
        <div class="row">BMS point<span>62°F</span></div>
        <div class="pop r"><b></b>Meter spike</div>
      </div>
    </div>
    <div
      class="sm"
      style="background-image: url(/design/images/how/how-diagnose.jpg)"
      v-else-if="kind === 'diagnose'"
    >
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
    <div
      class="sm"
      style="background-image: url(/design/images/brand/backgrounds/edviro-bg-1.jpg)"
      v-else-if="kind === 'review'"
    >
      <div class="c">
        <span class="pill y">Pending signoff</span>
        <div class="t">HVAC schedule fix</div>
        <div class="u">AHU-3 · Site A</div>
        <div class="btns"><span class="ok">Approve</span><span>Edit</span></div>
      </div>
    </div>
    <div
      class="sm"
      style="background-image: url(/design/images/how/how-dispatch.jpg)"
      v-else-if="kind === 'dispatch'"
    >
      <div class="c">
        <span class="pill">Dispatched</span>
        <div class="t">Reset damper</div>
        <div class="row">J. Alvarez<span>Assigned</span></div>
        <div class="row">History attached<span>3 past visits</span></div>
      </div>
    </div>
    <div
      class="sm"
      style="background-image: url(/design/images/how/how-verify.jpg)"
      v-else-if="kind === 'verify'"
    >
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
  </div>
</template>

<style scoped>
.designer-art {
  --forest: #0e3a2f;
  --cream: #fbf8f2;
  --leaf: #5ebf65;
  --mint: #e6f1e7;
  --inter: Inter, system-ui, sans-serif;
  --pop: Poppins, system-ui, sans-serif;
  min-width: 0;
  color: var(--forest);
}
.designer-art *,
.designer-art *::before,
.designer-art *::after {
  box-sizing: border-box;
  margin: 0;
}
.media {
  width: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  grid-column: auto;
}

.media {
  grid-column: 3;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
}
@media (max-width: 1100px) {
  .media {
    grid-column: 1;
  }
}
@media (min-width: 1101px) {
  .media {
    max-height: calc(100vh - var(--nav-h) - 173px);
    justify-self: end;
    width: 100%;
    max-width: calc(100vh - var(--nav-h) - 173px);
  }
}

.media::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url(/design/images/brand/grain.png) 0 0/160px 160px;
  mix-blend-mode: soft-light;
  opacity: 0.9;
  pointer-events: none;
}
.media .ill {
  z-index: 1;
}
.media {
  container-type: inline-size;
}
.ill {
  position: absolute;
  inset: 0;
  font-family: var(--inter);
}
.ill-card {
  position: absolute;
  left: 22cqw;
  top: 20cqw;
  right: -12cqw;
  bottom: -12cqw;
  background: #fcfdfc;
  border-radius: 5cqw;
  box-shadow:
    0 0 0 1.4cqw rgba(255, 255, 255, 0.35),
    0 3cqw 8cqw rgba(14, 58, 47, 0.12);
  padding: 5cqw 5.5cqw;
}
.ill-tags {
  display: flex;
  gap: 1.2cqw;
}
.ill-tags span {
  font-size: 2.3cqw;
  line-height: 1;
  padding: 0.9cqw 1.9cqw;
  border-radius: 99px;
}
.t-b {
  background: #e3ecfb;
  color: #3d62b5;
}
.t-g {
  background: #eef1ee;
  color: #5b6b63;
}
.t-r {
  background: #fbe3e1;
  color: #c0443d;
}
.ill-big {
  font-weight: 500;
  font-size: 6.4cqw;
  letter-spacing: -0.02em;
  margin-top: 3cqw;
  color: var(--forest);
}
.ill-big small {
  font-size: 3.2cqw;
  color: #6b7a73;
  font-weight: 400;
}
.ill-sub {
  font-size: 2.5cqw;
  color: #7a8780;
  margin-top: 1cqw;
}
.ill-chart {
  width: 100%;
  margin-top: 3cqw;
  display: block;
}
.ill-axis {
  display: flex;
  justify-content: space-between;
  font:
    500 2cqw ui-monospace,
    Menlo,
    monospace;
  color: #8a968f;
  margin-top: 1cqw;
  letter-spacing: 0.04em;
}
.ill-alert {
  position: absolute;
  right: 8cqw;
  bottom: 9cqw;
  width: 50cqw;
  background: #fff;
  border: 1px solid #e6ebe7;
  border-radius: 3.6cqw;
  padding: 3.6cqw;
  box-shadow: 0 2cqw 7cqw rgba(14, 58, 47, 0.18);
}
.ill-name {
  font-weight: 500;
  font-size: 3cqw;
  margin-top: 2.4cqw;
  color: var(--forest);
}
.ill-date {
  font-size: 2.4cqw;
  color: #7a8780;
  margin-top: 1cqw;
}
.ill-alert dl {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.2cqw 2cqw;
  margin-top: 2.6cqw;
  font-size: 2.6cqw;
  color: #5b6b63;
}
.ill-alert dd {
  margin: 0;
  text-align: right;
  color: var(--forest);
  font-weight: 500;
}
.ill-alert dd.bad {
  color: #d4524a;
}
.ill-pop {
  position: absolute;
  left: 7cqw;
  bottom: 8cqw;
  background: #fff;
  border: 1px solid #e6ebe7;
  border-radius: 2.4cqw;
  padding: 2.2cqw 2.8cqw;
  box-shadow: 0 1.6cqw 5cqw rgba(14, 58, 47, 0.14);
  display: flex;
  flex-direction: column;
  gap: 0.9cqw;
  max-width: 35cqw;
}
.ill-pop i {
  font:
    500 1.8cqw ui-monospace,
    Menlo,
    monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8a968f;
  font-style: normal;
}
.ill-pop b {
  font-weight: 500;
  font-size: 2.7cqw;
  color: var(--forest);
}
.ill-pop span {
  font-size: 2.1cqw;
  color: #7a8780;
}
.t-y {
  background: #fbf0d6;
  color: #9a6a12;
}
.ill-rows {
  display: flex;
  flex-direction: column;
  gap: 1.4cqw;
  margin-top: 3.4cqw;
}
.ill-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 2cqw;
  border: 1px solid #e6ebe7;
  border-radius: 2.4cqw;
  padding: 2cqw 2.4cqw;
  font-size: 2.5cqw;
  background: #fff;
}
.ill-row b {
  font-weight: 500;
  color: var(--forest);
}
.ill-row span {
  color: #7a8780;
  font-size: 2.2cqw;
}
.ill-row em {
  font-style: normal;
  font-size: 2cqw;
  padding: 0.7cqw 1.6cqw;
  border-radius: 99px;
}
.ill-btns {
  display: flex;
  gap: 1.4cqw;
  margin-top: 3cqw;
}
.ill-btns span {
  font-size: 2.4cqw;
  padding: 1.2cqw 2.6cqw;
  border-radius: 99px;
  border: 1px solid #d5ddd8;
  color: var(--forest);
}
.ill-btns .ok {
  background: var(--forest);
  color: #fff;
  border-color: var(--forest);
}
.ill-alert dd.good {
  color: #2f8a5b;
}
.ill-bars {
  display: flex;
  align-items: flex-end;
  gap: 3cqw;
  height: 24cqw;
  margin-top: 4cqw;
}
.ill-bars div {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1cqw;
}
.ill-bars i {
  display: block;
  border-radius: 1.4cqw;
  background: #dfe5e1;
}
.ill-bars i.g {
  background: #5fa37e;
}
.ill-bars small {
  font:
    500 1.8cqw ui-monospace,
    Menlo,
    monospace;
  color: #8a968f;
  text-align: center;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.ill-meter {
  width: 20cqw;
  height: 1.6cqw;
  background: #eef1ee;
  border-radius: 9px;
  overflow: hidden;
}
.ill-meter i {
  display: block;
  height: 100%;
  background: #5fa37e;
  border-radius: 9px;
}
.ill-meter i.y {
  background: #e3a93b;
}
.ill-meter i.r {
  background: #d4524a;
}

.lo .ill-card {
  padding-right: 16cqw;
  top: 14cqw;
}
.lo .ill-alert {
  bottom: 2cqw;
  width: 46cqw;
}
.lo .ill-bars {
  height: 17cqw;
  margin-top: 3cqw;
}
.lo .ill-pop {
  bottom: 9cqw;
}
.lo .ill-big {
  font-size: 5.6cqw;
}
.lo .ill-row {
  grid-template-columns: 1fr auto;
}
.lo .ill-row > span:nth-child(2) {
  display: none;
}
.lo .ill-meter ~ span {
  display: inline;
}
.lo .ill-row:has(.ill-meter) {
  grid-template-columns: 1fr auto auto;
}
.lo .ill-row em {
  display: inline-block;
}
@keyframes ilIn {
  from {
    opacity: 0;
    transform: translateY(2.4cqw);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes ilFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -0.9cqw;
  }
}
@keyframes ilDraw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes ilGrowY {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
@keyframes ilGrowX {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes ilPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(95, 163, 126, 0);
  }
  50% {
    box-shadow: 0 0 0 1cqw rgba(95, 163, 126, 0.22);
  }
}
.media.anim .ill-card,
.media.anim .ill-alert,
.media.anim .ill-pop,
.media.anim .ill-row,
.media.anim .ill-btns {
  opacity: 0;
}
.media.anim.in .ill-card {
  animation: ilIn 0.8s cubic-bezier(0.22, 0.8, 0.3, 1) 0.05s forwards;
}
.media.anim.in .ill-row {
  animation: ilIn 0.6s ease forwards;
}
.media.anim.in .ill-row:nth-child(1) {
  animation-delay: 0.55s;
}
.media.anim.in .ill-row:nth-child(2) {
  animation-delay: 0.75s;
}
.media.anim.in .ill-btns {
  animation: ilIn 0.6s ease 0.9s forwards;
}
.media.anim.in .ill-alert {
  animation:
    ilIn 0.8s cubic-bezier(0.22, 0.8, 0.3, 1) 0.45s forwards,
    ilFloat 7s ease-in-out 1.4s infinite;
}
.media.anim.in .ill-pop {
  animation:
    ilIn 0.8s cubic-bezier(0.22, 0.8, 0.3, 1) 0.85s forwards,
    ilFloat 8.5s ease-in-out 1.8s infinite reverse;
}
.media.anim .ill-chart path[stroke] {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.media.anim.in .ill-chart path[stroke] {
  animation: ilDraw 1.6s ease-in-out 0.5s forwards;
}
.media.anim .ill-bars i {
  transform: scaleY(0);
  transform-origin: bottom;
}
.media.anim.in .ill-bars i {
  animation: ilGrowY 0.9s cubic-bezier(0.22, 0.8, 0.3, 1) 0.6s forwards;
}
.media.anim.in .ill-bars div:nth-child(2) i {
  animation-delay: 0.8s;
}
.media.anim.in .ill-bars div:nth-child(3) i {
  animation-delay: 1s;
}
.media.anim.in .ill-bars div:nth-child(4) i {
  animation-delay: 1.2s;
}
.media.anim .ill-meter i {
  transform: scaleX(0);
  transform-origin: left;
}
.media.anim.in .ill-meter i {
  animation: ilGrowX 1.1s cubic-bezier(0.22, 0.8, 0.3, 1) 0.9s forwards;
}
.media.anim.in .ill-row:nth-child(2) .ill-meter i {
  animation-delay: 1.15s;
}
.media.anim.in .t-r {
  animation: ilPulse 3.2s ease-in-out 1.6s infinite;
}
@media (prefers-reduced-motion: reduce) {
  .media.anim .ill-card,
  .media.anim .ill-alert,
  .media.anim .ill-pop,
  .media.anim .ill-row,
  .media.anim .ill-btns {
    opacity: 1;
    animation: none !important;
  }
  .media.anim .ill-chart path[stroke] {
    stroke-dashoffset: 0;
  }
  .media.anim .ill-bars i,
  .media.anim .ill-meter i {
    transform: none;
  }
}
.sm {
  position: relative;
  container-type: inline-size;
  aspect-ratio: 1/0.95;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  font-family: var(--inter);
  color: var(--forest);
}
.sm::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url(/design/images/brand/grain.png) 0 0/160px 160px;
  mix-blend-mode: soft-light;
  opacity: 0.9;
  pointer-events: none;
}
.sm .c {
  position: absolute;
  left: 14cqw;
  top: 19cqw;
  right: -6cqw;
  bottom: -6cqw;
  background: #fcfdfc;
  border-radius: 6cqw;
  box-shadow:
    0 0 0 1.6cqw rgba(255, 255, 255, 0.3),
    0 4cqw 9cqw rgba(0, 0, 0, 0.25);
  padding: 6cqw;
}
.sm .pill {
  display: inline-block;
  font-size: 4.4cqw;
  line-height: 1;
  padding: 1.6cqw 3.2cqw;
  border-radius: 99px;
  background: #e1ecf9;
  color: #3a5fa8;
}
.sm .pill.r {
  background: #fbe3e1;
  color: #c0443c;
}
.sm .pill.y {
  background: #fbebc8;
  color: #8a5a12;
}
.sm .pill.g {
  background: var(--mint);
  color: #2f8a5b;
}
.sm .t {
  font-weight: 500;
  font-size: 6.6cqw;
  line-height: 1.15;
  margin-top: 4cqw;
  letter-spacing: -0.01em;
}
.sm .u {
  font-size: 4.4cqw;
  color: #7a8780;
  margin-top: 1.8cqw;
}
.sm .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2cqw;
  border: 1px solid #e6ebe7;
  border-radius: 3cqw;
  padding: 2.6cqw 3.2cqw;
  font-size: 4.4cqw;
  margin-top: 2cqw;
  background: #fff;
}
.sm .row span {
  color: #7a8780;
  font-size: 3.8cqw;
}
.sm .btns {
  display: flex;
  gap: 2.4cqw;
  margin-top: 4cqw;
}
.sm .btns span {
  font-size: 4.4cqw;
  padding: 2cqw 4.4cqw;
  border-radius: 99px;
  border: 1px solid #d5ddd8;
}
.sm .btns .ok {
  background: var(--forest);
  color: #fff;
  border-color: var(--forest);
}
.sm .big {
  font-weight: 500;
  font-size: 12cqw;
  letter-spacing: -0.03em;
  margin-top: 3cqw;
}
.sm .big small {
  font-size: 5cqw;
  color: #7a8780;
  font-weight: 400;
}
.sm svg {
  display: block;
  width: 100%;
  margin-top: 3cqw;
}
.sm .pop {
  position: absolute;
  left: 5cqw;
  bottom: 6cqw;
  background: #fff;
  border-radius: 3.4cqw;
  padding: 3cqw 3.6cqw;
  box-shadow: 0 2cqw 6cqw rgba(0, 0, 0, 0.25);
  font-size: 4.2cqw;
  font-weight: 500;
  display: flex;
  gap: 2cqw;
  align-items: center;
}
.sm .pop b {
  width: 2.6cqw;
  height: 2.6cqw;
  border-radius: 50%;
  background: var(--leaf);
}
.sm .pop.r b {
  background: #d9534f;
}

.sm {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 18px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  position: relative;
  container-type: inline-size;
}
.sm.in .c {
  animation: ilIn 0.8s cubic-bezier(0.22, 0.8, 0.3, 1) both;
}
.sm.in .pop {
  animation:
    ilIn 0.8s ease 0.3s both,
    ilFloat 7s ease-in-out 1.2s infinite;
}
.sm.in svg path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ilDraw 1.8s ease 0.5s forwards;
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
  .ill-card,
  .ill-alert,
  .ill-pop,
  .ill-row,
  .ill-btns {
    opacity: 1 !important;
  }
  .ill-chart path[stroke] {
    stroke-dashoffset: 0 !important;
  }
  .ill-bars i,
  .ill-meter i {
    transform: none !important;
  }
}
</style>
