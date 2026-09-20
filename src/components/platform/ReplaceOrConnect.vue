<script setup lang="ts">
/**
 * "Replace or connect" as one diagram instead of two paragraphs: Edviro finds
 * and diagnoses on the left, the work runs through whichever system the team
 * chooses in the middle (Edviro as the CMMS, or the CMMS they already have),
 * and both paths end in the same verified fix and the same record on the
 * right. Used on the CMMS, work-order, and facilities pages so the claim is
 * worded identically everywhere. Content is real text, not aria-hidden art.
 * Reads correctly inside `.section.is-dark` as well as on light sections.
 */
withDefaults(
  defineProps<{
    /** Word used for the work-management system: "CMMS" or "work-order system". */
    system?: string
    /** Optional pill in the frame header (e.g. "Your choice"). */
    tag?: string
  }>(),
  { system: 'CMMS', tag: 'Your choice, changeable later' },
)
</script>

<template>
  <div class="roc" role="group" aria-label="Two ways to run work with Edviro: replace your system or connect it. Both end in the same verified fix and the same record.">
    <div class="roc-head">
      <span class="ui-label">Replace or connect</span>
      <span v-if="tag" class="ui-pill is-info">{{ tag }}</span>
    </div>

    <div class="roc-flow">
      <div class="roc-node roc-end">
        <span class="roc-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-7 4 14 3-7h4" /></svg>
        </span>
        <span class="roc-title">Edviro finds and diagnoses</span>
        <span class="roc-detail">Meter data, alarms, and staff requests become a likely cause, a priority, and a drafted work order.</span>
      </div>

      <div class="roc-choice">
        <div class="roc-node roc-path">
          <span class="ui-pill is-sm roc-kind">Replace</span>
          <span class="roc-title">Edviro is your {{ system }}</span>
          <span class="roc-detail">Native work orders, assets, inspections, and mobile field workflows. Your lists and open work are imported first.</span>
        </div>
        <span class="roc-or" aria-hidden="true">or</span>
        <div class="roc-node roc-path">
          <span class="ui-pill is-sm roc-kind">Connect</span>
          <span class="roc-title">Keep your {{ system }}</span>
          <span class="roc-detail">Edviro routes the work into it and reads the outcome back. Integration scope is confirmed system by system.</span>
        </div>
      </div>

      <div class="roc-node roc-end">
        <span class="roc-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8 12l3 3 5-6" /></svg>
        </span>
        <span class="roc-title">Same verified fix, same record</span>
        <span class="roc-detail">Building data confirms the fix either way; the history feeds preventive maintenance and the capital plan.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.roc {
  display: grid;
  gap: 16px;
  padding: 18px 20px 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
}
.is-dark .roc {
  background: var(--dark-2);
  border-color: var(--dark-line);
}
.roc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.is-dark .roc-head .ui-label { color: var(--on-dark-faint); }
.roc-flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.9fr) minmax(0, 1fr);
  gap: 34px;
  align-items: stretch;
}
.roc-node {
  position: relative;
  display: grid;
  gap: 6px;
  align-content: start;
  padding: 16px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  min-width: 0;
}
.is-dark .roc-node {
  background: var(--dark);
  border-color: var(--dark-line);
}
/* Arrow after the first node and after the choice group. */
.roc-end:first-child::after,
.roc-choice::after {
  content: '';
  position: absolute;
  top: calc(50% - 5px);
  right: -24px;
  width: 10px;
  height: 10px;
  border-top: 1.5px solid var(--line-strong);
  border-right: 1.5px solid var(--line-strong);
  transform: rotate(45deg);
}
.roc-end:first-child::before,
.roc-choice::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -29px;
  width: 22px;
  border-top: 1.5px solid var(--line-strong);
}
.is-dark .roc-end:first-child::after,
.is-dark .roc-choice::after { border-color: var(--on-dark-faint); }
.is-dark .roc-end:first-child::before,
.is-dark .roc-choice::before { border-color: var(--on-dark-faint); }

.roc-choice {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  padding: 10px;
  border: 1.5px dashed var(--line-strong);
  border-radius: 18px;
}
.is-dark .roc-choice { border-color: var(--on-dark-faint); }
.roc-path { height: 100%; }
.roc-or {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}
.is-dark .roc-or { color: var(--on-dark-faint); }
.roc-kind { justify-self: start; }
.roc-icon {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  color: var(--accent);
  margin-bottom: 2px;
}
.is-dark .roc-icon { background: var(--dark-2); color: var(--success-bright); }
.roc-title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.is-dark .roc-title { color: var(--on-dark); }
.roc-detail {
  font-size: 13px;
  line-height: 1.45;
  color: var(--ink-2);
  text-wrap: pretty;
}
.is-dark .roc-detail { color: var(--on-dark-muted); }

@media (max-width: 900px) {
  .roc-flow { grid-template-columns: minmax(0, 1fr); gap: 30px; }
  .roc-end:first-child::before,
  .roc-choice::before { display: none; }
  .roc-end:first-child::after,
  .roc-choice::after {
    top: auto;
    bottom: -22px;
    right: auto;
    left: calc(50% - 5px);
    transform: rotate(135deg);
  }
}
@media (max-width: 560px) {
  .roc { padding: 14px; }
  .roc-choice { grid-template-columns: minmax(0, 1fr); justify-items: stretch; }
  .roc-or { justify-self: center; }
}
</style>
