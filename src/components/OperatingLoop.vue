<script setup lang="ts">
/**
 * The operating loop as a CSS-only diagram: five nodes, one return path.
 * Review is the human gate and is drawn differently on purpose.
 */
const nodes = [
  { id: 'signal', title: 'Signal', detail: 'Text, email, alarm, or meter change', icon: 'M4 5h16v10H9l-5 4z' },
  { id: 'diagnose', title: 'Diagnose', detail: 'Likely cause, with the evidence', icon: 'M3 12h4l3-7 4 14 3-7h4' },
  { id: 'review', title: 'Review', detail: "A human approves Edviro's planned fixes", icon: 'M5 13l4 4L19 7', human: true },
  { id: 'dispatch', title: 'Dispatch', detail: 'Technician gets history and steps', icon: 'M14 6l4 4-9 9H5v-4z M13 7l4 4' },
  { id: 'verify', title: 'Verify', detail: 'Building data confirms the fix', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8 12l3 3 5-6' },
]
</script>

<template>
  <section id="how-it-works" class="section is-tint">
    <div class="shell">
      <div class="loop-head">
        <div>
          <p class="eyebrow">How it works</p>
          <h2 class="h2">One loop, from signal to verified fix.</h2>
        </div>
        <p class="lede">Edviro watches your building 24/7 across utility data, BMS/BAS, and asset and maintenance logs — entirely vendor-agnostic.</p>
      </div>

      <ol class="loop" aria-label="Operating loop">
        <li v-for="node in nodes" :key="node.id" class="loop-node" :class="{ 'is-human': node.human }">
          <span class="loop-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path :d="node.icon" /></svg>
          </span>
          <span class="loop-title">{{ node.title }}</span>
          <span class="loop-detail">{{ node.detail }}</span>
          <span v-if="node.human" class="loop-tag">Human approval</span>
        </li>
      </ol>

    </div>
  </section>
</template>

<style scoped>
.loop-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px 48px;
  align-items: end;
  margin-bottom: 40px;
}
.loop-head .lede { margin: 0; }
.loop {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 26px;
  counter-reset: node;
}
.loop-node {
  position: relative;
  display: grid;
  gap: 6px;
  align-content: start;
  padding: 18px 16px 16px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  min-width: 0;
}
/* Connector arrow between nodes */
.loop-node:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -22px;
  width: 18px;
  height: 1.5px;
  background: var(--line-strong);
  transform: translateY(-50%);
}
.loop-node:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -8px;
  width: 7px;
  height: 7px;
  border-top: 1.5px solid var(--line-strong);
  border-right: 1.5px solid var(--line-strong);
  transform: translateY(-50%) rotate(45deg);
}
.loop-node.is-human {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(22, 73, 61, 0.08);
}
.loop-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  color: var(--accent);
  margin-bottom: 4px;
}
.is-human .loop-icon {
  background: var(--accent);
  color: var(--on-dark);
}
.loop-title {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.loop-detail {
  font-size: 13.5px;
  line-height: 1.4;
  color: var(--ink-2);
  text-wrap: pretty;
}
.loop-tag {
  justify-self: start;
  margin-top: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--on-dark);
}
/* Return path: dashed line back to the start, label in the middle */
.loop-return {
  position: relative;
  margin: 22px 0 0;
  text-align: center;
  font-size: 13px;
  color: var(--muted-2);
}
.loop-return::before {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  top: 50%;
  border-top: 1.5px dashed var(--line-strong);
}
.loop-return span {
  position: relative;
  background: var(--surface-2);
  padding: 0 12px;
}
.loop-link {
  display: inline-block;
  margin-top: 26px;
  font-size: 15px;
}
@media (max-width: 1024px) {
  .loop { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .loop-node:nth-child(3)::after,
  .loop-node:nth-child(3)::before { display: none; }
}
@media (max-width: 768px) {
  .loop-head { grid-template-columns: minmax(0, 1fr); margin-bottom: 28px; }
  .loop { grid-template-columns: minmax(0, 1fr); gap: 18px; }
  .loop-node { grid-template-columns: 34px 1fr; grid-template-areas: 'icon title' 'icon detail' 'icon tag'; column-gap: 12px; row-gap: 3px; }
  .loop-icon { grid-area: icon; margin: 0; }
  .loop-title { grid-area: title; }
  .loop-detail { grid-area: detail; }
  .loop-tag { grid-area: tag; }
  /* Vertical connectors */
  .loop-node:not(:last-child)::after {
    top: auto;
    right: auto;
    bottom: -18px;
    left: 32px;
    width: 1.5px;
    height: 14px;
    transform: none;
  }
  .loop-node:not(:last-child)::before {
    top: auto;
    right: auto;
    bottom: -14px;
    left: 29px;
    transform: rotate(135deg);
  }
  .loop-node:nth-child(3)::after,
  .loop-node:nth-child(3)::before { display: block; }
  .loop-return::before { left: 0; right: 0; }
}
</style>
