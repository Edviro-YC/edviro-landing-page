<script setup lang="ts">
/**
 * Signal → action → result flow used by the industry pages. Three numbered
 * panels, each holding one product-UI illustration passed through the
 * `step-1..3` slots, joined by arrow connectors on wide screens and stacked
 * on narrow ones. The optional `tag` renders as a pill in the frame header.
 */
defineProps<{
  steps: { label: string; caption: string }[]
  title: string
  tag?: string
  /** Screen-reader summary for the whole flow (panels are aria-hidden art). */
  summary: string
}>()
</script>

<template>
  <div class="iflow" role="group" :aria-label="summary">
    <div class="iflow-head" aria-hidden="true">
      <span class="ui-label">{{ title }}</span>
      <span v-if="tag" class="ui-pill is-info">{{ tag }}</span>
    </div>
    <ol class="iflow-steps">
      <li v-for="(step, i) in steps" :key="step.label" class="iflow-step">
        <div class="iflow-step-head" aria-hidden="true">
          <span class="iflow-num">{{ i + 1 }}</span>
          <span class="iflow-label">{{ step.label }}</span>
        </div>
        <div class="iflow-panel">
          <slot :name="`step-${i + 1}`" />
        </div>
        <p class="iflow-caption">{{ step.caption }}</p>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.iflow {
  display: grid;
  gap: 16px;
  padding: 18px 20px 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
}
.iflow-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.iflow-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 36px;
}
.iflow-step {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  min-width: 0;
}
/* Arrow connector drawn in the gap after each panel except the last. */
.iflow-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: calc(50% - 5px);
  right: -25px;
  width: 10px;
  height: 10px;
  border-top: 1.5px solid var(--line-strong);
  border-right: 1.5px solid var(--line-strong);
  transform: rotate(45deg);
}
.iflow-step:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -30px;
  width: 22px;
  border-top: 1.5px solid var(--line-strong);
}
.iflow-step-head {
  display: flex;
  align-items: center;
  gap: 8px;
}
.iflow-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  background: var(--ink);
  color: var(--on-dark);
}
.iflow-label {
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.iflow-panel {
  display: grid;
  min-width: 0;
}
.iflow-panel > :deep(.ui-card) { height: 100%; align-content: start; }
.iflow-caption {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--ink-2);
  text-wrap: pretty;
}
@media (max-width: 900px) {
  .iflow-steps { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .iflow-step:not(:last-child)::before { display: none; }
  .iflow-step:not(:last-child)::after {
    top: auto;
    bottom: -21px;
    right: auto;
    left: calc(50% - 5px);
    transform: rotate(135deg);
  }
}
@media (max-width: 480px) {
  .iflow { padding: 14px; }
}
</style>
