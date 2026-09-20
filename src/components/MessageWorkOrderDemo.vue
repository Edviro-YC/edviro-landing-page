<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

/**
 * Message → reviewed work order → verified fix.
 *
 * The signature homepage visual. A staff text message becomes a drafted work
 * order, a named person approves it, a technician is dispatched, the teacher
 * asks for a status update and gets one straight from the work-order record,
 * and the building data confirms the fix. Every element is rendered from the
 * first paint and revealed by opacity/transform only, so the stage never
 * shifts. Playback loops on its own; prefers-reduced-motion shows the finished
 * state instead.
 *
 * Fields mirror the real work_orders schema (title, asset, trade, priority,
 * assignee, status) so the illustration stays honest about the product.
 */

type ScenarioId = 'campus'

interface Scenario {
  id: ScenarioId
  tab: string
  thread: { number: string; contact: string }
  /** One entry per bubble in the thread, keyed by the STEP that reveals it. */
  messages: {
    inbound: string
    ack: string
    draft: string
    dispatched: string
    statusAsk: string
    statusReply: string
    verified: string
  }
  order: {
    ref: string
    title: string
    site: string
    asset: string
    priority: 'High' | 'Urgent'
    trade: string
    evidence: string[]
    reviewer: string
    reviewerRole: string
    approvedAt: string
    technician: string
    eta: string
    /** Replaces the ETA on the Assigned row once the technician reports in. */
    fieldUpdate: string
    verifyCheck: string
    verifyResult: string
  }
}

const SCENARIOS: Scenario[] = [
  {
    id: 'campus',
    tab: 'Campus',
    thread: { number: '(650) ••• ••31', contact: 'Ms. Alvarez · Room 214' },
    messages: {
      inbound: 'Room 214 is freezing again. Kids are in coats. Can someone look at it?',
      ack: 'On it. Room 214 is served by RTU-3 in Building B. Checking its history and this morning\u2019s schedule.',
      draft: 'Drafted a work order: the heating stage on RTU-3 isn\u2019t firing, third time in 30 days. It\u2019s with D. Park for review.',
      dispatched: 'Approved. Luis M. (HVAC) is on the way, ETA about 45 min. I\u2019ll text you when the room is back to setpoint.',
      statusAsk: 'Any update? Still pretty cold in here.',
      statusReply: 'Luis is at RTU-3 now replacing the igniter. You should feel heat in about 15 minutes; I\u2019ll confirm once the room holds 70\u00B0F.',
      verified: 'Room 214 is back at 70\u00B0F and holding. Closing this out. Thanks for flagging it.',
    },
    order: {
      ref: 'WO-2418',
      title: 'RTU-3 heating stage not firing \u2014 Room 214',
      site: 'Lincoln Middle \u00B7 Building B',
      asset: 'RTU-3 \u00B7 Carrier 48TC (2011)',
      priority: 'High',
      trade: 'HVAC',
      evidence: ['Supply air 58\u00B0F vs 92\u00B0F expected', 'Third occurrence in 30 days', 'Zone scheduled occupied since 7:00'],
      reviewer: 'D. Park',
      reviewerRole: 'Facilities Director',
      approvedAt: '9:47 AM',
      technician: 'Luis M. (HVAC)',
      eta: 'ETA 45 min',
      fieldUpdate: 'On site, replacing igniter',
      verifyCheck: 'Verify: supply air \u2265 88\u00B0F within 2 h',
      verifyResult: 'Verified 11:20 \u00B7 supply air 91\u00B0F, room 70\u00B0F',
    },
  },
]

/**
 * Step timeline (ms from start). The scenario completes at 13.8 s; the loop
 * then holds the finished state before starting over.
 */
const STEP = {
  inbound: 0,
  reading: 1,
  ack: 2,
  draftCard: 3,
  draftDetail: 4,
  draftMsg: 5,
  review: 6,
  approved: 7,
  dispatched: 8,
  statusAsk: 9,
  statusTyping: 10,
  statusReply: 11,
  verified: 12,
} as const
const STEP_AT = [0, 1400, 2400, 3400, 4400, 5400, 6400, 7800, 8800, 10200, 11000, 12000, 13800]
const LAST = STEP_AT.length - 1
const START_DELAY_MS = 400
const HOLD_MS = 3400
/** The prerendered finished state is shown briefly after hydration, then playback begins. */
const FIRST_HOLD_MS = 1200

const props = withDefaults(
  defineProps<{
    /** Render the finished state with no timers or controls. */
    static?: boolean
    /** Which scenarios to offer. One entry hides the tab strip. */
    scenarios?: ScenarioId[]
    initialScenario?: ScenarioId
  }>(),
  { static: false, scenarios: () => ['campus'], initialScenario: 'campus' },
)

const available = computed(() => SCENARIOS.filter((s) => props.scenarios.includes(s.id)))
const scenarioId = ref<ScenarioId>(props.initialScenario)
const scenario = computed(() => available.value.find((s) => s.id === scenarioId.value) ?? available.value[0]!)

// Server render and first paint show the finished state, so the prerendered
// page is complete without JavaScript. Playback starts after hydration.
const step = ref(LAST)
const inView = ref(true)
const pageVisible = ref(true)
const reducedMotion = ref(false)
const staticMode = computed(() => props.static || reducedMotion.value)
// No user playback controls: the loop runs whenever it is on screen and the
// tab is visible, and stops entirely under prefers-reduced-motion.
const running = computed(() => !staticMode.value && inView.value && pageVisible.value)

const root = ref<HTMLElement | null>(null)
let timer: number | undefined
let observer: IntersectionObserver | undefined
let motionQuery: MediaQueryList | undefined
let firstHold = true

const clearTimer = () => {
  if (timer !== undefined) {
    window.clearTimeout(timer)
    timer = undefined
  }
}

/** Single scheduler: exactly one pending timeout at any time. */
const scheduleNext = () => {
  clearTimer()
  if (!running.value) return
  const next = step.value + 1
  if (next <= LAST) {
    const delay = step.value < 0 ? START_DELAY_MS : STEP_AT[next]! - STEP_AT[step.value]!
    timer = window.setTimeout(() => {
      step.value = next
      scheduleNext()
    }, delay)
  } else {
    const hold = firstHold ? FIRST_HOLD_MS : HOLD_MS
    firstHold = false
    timer = window.setTimeout(() => {
      step.value = -1
      scheduleNext()
    }, hold)
  }
}

const restart = () => {
  step.value = -1
  scheduleNext()
}
const selectScenario = (id: ScenarioId) => {
  if (scenarioId.value === id) return
  scenarioId.value = id
  if (staticMode.value) return
  restart()
}
const onTabKeydown = (e: KeyboardEvent) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  e.preventDefault()
  const list = available.value
  const i = list.findIndex((s) => s.id === scenarioId.value)
  const nextIndex = e.key === 'ArrowRight' ? (i + 1) % list.length : (i - 1 + list.length) % list.length
  selectScenario(list[nextIndex]!.id)
  document.getElementById(tabId(list[nextIndex]!.id))?.focus()
}

const onMotionChange = () => {
  reducedMotion.value = Boolean(motionQuery?.matches)
  if (reducedMotion.value) step.value = LAST
}
const onVisibility = () => {
  pageVisible.value = document.visibilityState === 'visible'
}

watch(running, (on) => (on ? scheduleNext() : clearTimer()))

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', onMotionChange)
  onMotionChange()
  if (staticMode.value) return

  document.addEventListener('visibilitychange', onVisibility)
  onVisibility()
  if (root.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        inView.value = entries.some((e) => e.isIntersecting)
      },
      { threshold: 0.25 },
    )
    observer.observe(root.value)
  }
  scheduleNext()
})

onBeforeUnmount(() => {
  clearTimer()
  observer?.disconnect()
  motionQuery?.removeEventListener('change', onMotionChange)
  document.removeEventListener('visibilitychange', onVisibility)
})

// useId is SSR-stable, so prerendered ids match the hydrated ones.
const uid = useId()
const tabId = (id: ScenarioId) => `${uid}-tab-${id}`
const panelId = `${uid}-panel`
const on = (s: number) => step.value >= s
</script>

<template>
  <div ref="root" class="mwo">
    <!-- Scenario tabs (manual switch only; nothing auto-rotates). -->
    <div v-if="available.length > 1" class="mwo-tabs" role="tablist" aria-label="Scenario" @keydown="onTabKeydown">
      <button
        v-for="s in available"
        :id="tabId(s.id)"
        :key="s.id"
        type="button"
        role="tab"
        class="mwo-tab"
        :aria-selected="s.id === scenario.id"
        :aria-controls="panelId"
        :tabindex="s.id === scenario.id ? 0 : -1"
        @click="selectScenario(s.id)"
      >
        {{ s.tab }}
      </button>
    </div>

    <!-- Visual stage. Hidden from assistive tech; the transcript below carries the meaning. -->
    <div :id="panelId" class="mwo-stage" role="tabpanel" :aria-labelledby="available.length > 1 ? tabId(scenario.id) : undefined">
      <div class="mwo-panes" aria-hidden="true">
        <!-- Text thread -->
        <div class="mwo-phone">
          <div class="mwo-phone-head">
            <span class="mwo-avatar">{{ scenario.thread.contact.charAt(0) }}</span>
            <span class="mwo-phone-meta">
              <span class="mwo-phone-contact">{{ scenario.thread.contact }}</span>
              <span class="mwo-phone-number">Text message · {{ scenario.thread.number }}</span>
            </span>
          </div>
          <div class="mwo-thread">
            <p class="mwo-msg is-staff" :class="{ 'is-on': on(STEP.inbound) }">{{ scenario.messages.inbound }}</p>
            <div class="mwo-slot">
              <p class="mwo-msg is-edviro mwo-typing" :class="{ 'is-on': step === STEP.reading }"><i /><i /><i /></p>
              <p class="mwo-msg is-edviro" :class="{ 'is-on': on(STEP.ack) }">{{ scenario.messages.ack }}</p>
            </div>
            <p class="mwo-msg is-edviro" :class="{ 'is-on': on(STEP.draftMsg) }">{{ scenario.messages.draft }}</p>
            <p class="mwo-msg is-edviro" :class="{ 'is-on': on(STEP.dispatched) }">{{ scenario.messages.dispatched }}</p>
            <p class="mwo-msg is-staff" :class="{ 'is-on': on(STEP.statusAsk) }">{{ scenario.messages.statusAsk }}</p>
            <div class="mwo-slot">
              <p class="mwo-msg is-edviro mwo-typing" :class="{ 'is-on': step === STEP.statusTyping }"><i /><i /><i /></p>
              <p class="mwo-msg is-edviro" :class="{ 'is-on': on(STEP.statusReply) }">{{ scenario.messages.statusReply }}</p>
            </div>
            <p class="mwo-msg is-edviro" :class="{ 'is-on': on(STEP.verified) }">{{ scenario.messages.verified }}</p>
          </div>
        </div>

        <!-- Work order. The ghost frame holds the space before the draft exists. -->
        <div class="mwo-card-slot">
          <span class="mwo-card-ghost" :class="{ 'is-on': !on(STEP.draftCard) }">Work order</span>
          <div class="mwo-card" :class="{ 'is-on': on(STEP.draftCard) }">
          <div class="mwo-card-head">
            <span class="mwo-ref">{{ scenario.order.ref }}</span>
            <span class="mwo-status">
              <span class="mwo-badge is-draft" :class="{ 'is-on': !on(STEP.approved) }">Draft</span>
              <span class="mwo-badge is-approved" :class="{ 'is-on': on(STEP.approved) && !on(STEP.verified) }">In progress</span>
              <span class="mwo-badge is-verified" :class="{ 'is-on': on(STEP.verified) }">Verified</span>
            </span>
          </div>
          <p class="mwo-title">{{ scenario.order.title }}</p>
          <dl class="mwo-fields">
            <div><dt class="ui-label">Site</dt><dd>{{ scenario.order.site }}</dd></div>
            <div><dt class="ui-label">Asset</dt><dd>{{ scenario.order.asset }}</dd></div>
            <div class="mwo-fade" :class="{ 'is-on': on(STEP.draftDetail) }"><dt class="ui-label">Priority</dt><dd><span class="mwo-pill" :class="scenario.order.priority === 'Urgent' ? 'is-urgent' : 'is-high'">{{ scenario.order.priority }}</span></dd></div>
            <div class="mwo-fade" :class="{ 'is-on': on(STEP.draftDetail) }"><dt class="ui-label">Trade</dt><dd>{{ scenario.order.trade }}</dd></div>
          </dl>
          <div class="mwo-evidence mwo-fade" :class="{ 'is-on': on(STEP.draftDetail) }">
            <span class="ui-label">Evidence</span>
            <ul>
              <li v-for="line in scenario.order.evidence" :key="line">{{ line }}</li>
            </ul>
          </div>

          <!-- Human review. Both states share one grid cell so the row never resizes. -->
          <div class="mwo-review" :class="{ 'is-waiting': on(STEP.review) && !on(STEP.approved), 'is-approved': on(STEP.approved) }">
            <div class="mwo-review-state" :class="{ 'is-on': !on(STEP.approved) }">
              <span class="mwo-review-text">
                <span class="ui-label">Review</span>
                <span>{{ on(STEP.review) ? `Awaiting ${scenario.order.reviewer}, ${scenario.order.reviewerRole}` : 'Not yet submitted' }}</span>
              </span>
              <span class="mwo-approve" :class="{ 'is-armed': on(STEP.review) }">Approve</span>
            </div>
            <div class="mwo-review-state" :class="{ 'is-on': on(STEP.approved) }">
              <span class="mwo-review-text">
                <span class="ui-label">Review</span>
                <span><b>Approved</b> by {{ scenario.order.reviewer }} · {{ scenario.order.approvedAt }}</span>
              </span>
              <span class="mwo-check" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
              </span>
            </div>
          </div>

          <!-- The status reply is read off this row: ETA until the technician checks in, then his field note. -->
          <div class="mwo-row mwo-fade" :class="{ 'is-on': on(STEP.dispatched) }">
            <span class="ui-label">Assigned</span>
            <span class="mwo-slot">
              <span class="mwo-fade" :class="{ 'is-on': !on(STEP.statusReply) }">{{ scenario.order.technician }} · {{ scenario.order.eta }}</span>
              <span class="mwo-fade" :class="{ 'is-on': on(STEP.statusReply) }">{{ scenario.order.technician }} · {{ scenario.order.fieldUpdate }}</span>
            </span>
          </div>
          <div class="mwo-row mwo-verify mwo-fade" :class="{ 'is-on': on(STEP.draftDetail), 'is-done': on(STEP.verified) }">
            <span class="ui-label">Verification</span>
            <span class="mwo-slot">
              <span class="mwo-fade" :class="{ 'is-on': !on(STEP.verified) }">{{ scenario.order.verifyCheck }}</span>
              <span class="mwo-fade mwo-verified" :class="{ 'is-on': on(STEP.verified) }">{{ scenario.order.verifyResult }}</span>
            </span>
          </div>
          </div>
        </div>
      </div>

      <!-- Transcript: the same story for screen readers and no-JS. -->
      <ol class="sr-only">
        <li>Staff text: {{ scenario.messages.inbound }}</li>
        <li>Edviro: {{ scenario.messages.ack }}</li>
        <li>Edviro drafts work order {{ scenario.order.ref }}, "{{ scenario.order.title }}", priority {{ scenario.order.priority }}, trade {{ scenario.order.trade }}. Evidence: {{ scenario.order.evidence.join('; ') }}.</li>
        <li>{{ scenario.order.reviewer }}, {{ scenario.order.reviewerRole }}, reviews and approves the work order at {{ scenario.order.approvedAt }}.</li>
        <li>Edviro: {{ scenario.messages.dispatched }} Assigned to {{ scenario.order.technician }}.</li>
        <li>Staff text: {{ scenario.messages.statusAsk }}</li>
        <li>Edviro: {{ scenario.messages.statusReply }} Work order updated: {{ scenario.order.fieldUpdate }}.</li>
        <li>{{ scenario.order.verifyResult }}. Edviro: {{ scenario.messages.verified }}</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.mwo {
  display: grid;
  gap: 12px;
  width: 100%;
  min-width: 0;
  container-type: inline-size;
}

/* Tabs */
.mwo-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 999px;
  justify-self: start;
}
.mwo-tab {
  appearance: none;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-2);
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
}
.mwo-tab[aria-selected='true'] {
  background: var(--ink);
  color: var(--on-dark);
}

/* Stage: fixed proportions so nothing shifts while steps reveal. */
.mwo-stage {
  position: relative;
  background: var(--dark);
  border: 1px solid var(--dark-line);
  border-radius: 20px;
  padding: 16px;
  overflow: hidden;
}
.mwo-panes {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 14px;
  align-items: stretch;
}
@container (max-width: 640px) {
  .mwo-panes { grid-template-columns: minmax(0, 1fr); }
}

/* Reveal primitives: compositor-only properties. */
.mwo-msg,
.mwo-fade,
.mwo-card,
.mwo-badge,
.mwo-review-state {
  transition: opacity 320ms ease, transform 320ms ease;
}
.mwo-msg,
.mwo-fade {
  opacity: 0;
  transform: translateY(6px);
}
.mwo-msg.is-on,
.mwo-fade.is-on {
  opacity: 1;
  transform: none;
}
/* Two states stacked in one grid cell: swapping never changes the box size. */
.mwo-slot {
  display: grid;
}
.mwo-slot > * {
  grid-area: 1 / 1;
}

/* Phone thread */
.mwo-phone {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #F6F8F6;
  border-radius: 16px;
  overflow: hidden;
  color: var(--ink);
}
.mwo-phone-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 13px;
  background: var(--card);
  border-bottom: 1px solid var(--line-soft);
}
.mwo-avatar {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: var(--on-dark);
  font-size: 12.5px;
  font-weight: 600;
}
.mwo-phone-meta {
  display: grid;
  min-width: 0;
}
.mwo-phone-contact {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mwo-phone-number {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mwo-thread {
  display: grid;
  gap: 7px;
  padding: 12px 12px 14px;
  align-content: start;
}
.mwo-msg {
  margin: 0;
  max-width: 92%;
  font-size: 13px;
  line-height: 1.4;
  padding: 8px 11px;
  border-radius: 14px;
  text-wrap: pretty;
}
.mwo-msg.is-staff {
  justify-self: end;
  background: var(--accent);
  color: var(--on-dark);
  border-bottom-right-radius: 4px;
}
.mwo-msg.is-edviro {
  justify-self: start;
  background: var(--card);
  border: 1px solid var(--line-soft);
  border-bottom-left-radius: 4px;
}
.mwo-typing {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  height: 34px;
  align-self: start;
}
.mwo-typing i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--muted);
  animation: blink 1s infinite;
}
.mwo-typing i:nth-child(2) { animation-delay: 0.15s; }
.mwo-typing i:nth-child(3) { animation-delay: 0.3s; }

/* Work-order card */
.mwo-card-slot {
  position: relative;
  display: grid;
  min-width: 0;
}
.mwo-card-ghost {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(255, 255, 255, 0.22);
  border-radius: 16px;
  color: var(--on-dark-muted);
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 320ms ease;
}
.mwo-card-ghost.is-on { opacity: 1; }
.mwo-card {
  position: relative; /* paints above the ghost frame */
  display: grid;
  gap: 10px;
  align-content: start;
  min-width: 0;
  background: var(--card);
  color: var(--ink);
  border-radius: 16px;
  padding: 14px;
  opacity: 0;
  transform: translateY(8px) scale(0.985);
}
.mwo-card.is-on {
  opacity: 1;
  transform: none;
}
.mwo-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.mwo-ref {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 0.04em;
}
.mwo-status {
  display: grid;
  justify-items: end;
}
.mwo-status > * { grid-area: 1 / 1; }
.mwo-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  opacity: 0;
  white-space: nowrap;
}
.mwo-badge.is-on { opacity: 1; }
.mwo-badge.is-draft { background: var(--surface); color: var(--muted-2); }
.mwo-badge.is-approved { background: var(--status-ok-bg); color: var(--accent); }
.mwo-badge.is-verified { background: var(--accent); color: var(--on-dark); }
.mwo-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}
.mwo-fields {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
}
.mwo-fields > div {
  display: grid;
  gap: 2px;
  min-width: 0;
}
.mwo-fields dd {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.35;
}
.mwo-pill {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
}
.mwo-pill.is-high { background: var(--status-warn-bg); color: var(--status-warn-ink); }
.mwo-pill.is-urgent { background: var(--status-danger-bg); color: var(--status-danger-ink); }
.mwo-evidence {
  display: grid;
  gap: 4px;
}
.mwo-evidence ul {
  margin: 0;
  padding: 0 0 0 14px;
  font-size: 12.5px;
  line-height: 1.4;
  color: var(--ink-2);
}
.mwo-evidence li::marker { color: var(--muted); }

/* Review row */
.mwo-review {
  display: grid;
  border: 1px dashed var(--line-strong);
  border-radius: 10px;
  padding: 9px 11px;
  transition: border-color 320ms ease, background-color 320ms ease;
}
.mwo-review.is-waiting {
  border-style: solid;
  border-color: var(--warn);
  background: var(--status-review-bg);
}
.mwo-review.is-approved {
  border-style: solid;
  border-color: var(--line-strong);
  background: var(--status-ok-bg);
}
.mwo-review-state {
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 30px;
  opacity: 0;
}
.mwo-review-state.is-on { opacity: 1; }
.mwo-review-text {
  display: grid;
  gap: 1px;
  font-size: 12.5px;
  line-height: 1.35;
  min-width: 0;
}
.mwo-approve {
  flex: none;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  color: var(--muted);
  transition: background-color 240ms ease, color 240ms ease, border-color 240ms ease;
}
.mwo-approve.is-armed {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-dark);
}
.mwo-check {
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: var(--on-dark);
}
.mwo-row {
  display: grid;
  gap: 2px;
  font-size: 12.5px;
  line-height: 1.35;
}
.mwo-verify { color: var(--ink-2); }
.mwo-verify.is-done { color: var(--accent); font-weight: 600; }

/* Dark parents (the hero is light; industry pages may embed on dark). */
.is-dark .mwo-tabs { background: var(--dark-2); border-color: var(--dark-line); }
.is-dark .mwo-tab { color: var(--on-dark-muted); }
.is-dark .mwo-tab[aria-selected='true'] { background: var(--on-dark); color: var(--ink); }
</style>
