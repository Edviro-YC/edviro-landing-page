<script setup lang="ts">
/**
 * Product-UI illustration: the one difference between a conventional CMMS and
 * Edviro that matters most — what "closed" means. Left: a ticket marked
 * complete while the building data shows the fault continuing. Right: the same
 * fault closed only after the data confirmed the fix. Illustrative values.
 */
withDefaults(
  defineProps<{
    summary?: string
  }>(),
  {
    summary:
      'Two work-order tickets for the same rooftop unit fault. In a traditional CMMS the ticket is marked closed while supply air stays at 58 degrees and the problem persists. In Edviro the ticket is verified only after supply air recovers above 88 degrees within two hours.',
  },
)
</script>

<template>
  <figure class="ui-card ui-cvv" role="img" :aria-label="summary">
    <div class="ui-cvv-panes" aria-hidden="true">
      <div class="ui-cvv-pane">
        <span class="ui-label">Traditional CMMS</span>
        <div class="ui-cvv-ticket">
          <span class="ui-cvv-id">WO-1187</span>
          <span class="ui-cvv-name">RTU-3 no heat · Room 214</span>
          <span class="ui-pill">Closed</span>
        </div>
        <svg class="ui-cvv-svg" viewBox="0 0 240 72" preserveAspectRatio="none">
          <path d="M0 40 C30 36 50 46 80 40 S110 34 128 38" fill="none" stroke="var(--warn)" stroke-width="2" />
          <path d="M128 38 C150 34 170 44 195 38 S225 34 240 38" fill="none" stroke="var(--warn)" stroke-width="2" />
          <line x1="128" y1="4" x2="128" y2="68" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="2 3" />
          <circle cx="128" cy="38" r="3.2" fill="var(--warn)" />
        </svg>
        <div class="ui-cvv-foot">
          <span class="ui-cvv-meta">Marked complete · supply air still 58 °F</span>
          <span class="ui-pill is-warn">Problem persists</span>
        </div>
      </div>

      <div class="ui-cvv-pane is-edviro">
        <span class="ui-label">Edviro</span>
        <div class="ui-cvv-ticket">
          <span class="ui-cvv-id">WO-2418</span>
          <span class="ui-cvv-name">RTU-3 heating stage · Room 214</span>
          <span class="ui-pill is-verified">Verified</span>
        </div>
        <svg class="ui-cvv-svg" viewBox="0 0 240 72" preserveAspectRatio="none">
          <path d="M0 22 C30 18 50 26 80 22 S110 16 128 20" fill="none" stroke="var(--warn)" stroke-width="2" />
          <path d="M128 20 C138 38 150 50 170 52 S215 50 240 51" fill="none" stroke="var(--ink)" stroke-width="1.8" />
          <path d="M150 44 C180 42 210 46 240 44 L240 60 C210 62 180 58 150 60 Z" fill="var(--accent)" fill-opacity="0.12" />
          <line x1="128" y1="4" x2="128" y2="68" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="2 3" />
          <circle cx="128" cy="20" r="3.2" fill="var(--accent)" />
        </svg>
        <div class="ui-cvv-foot">
          <span class="ui-cvv-meta">Approved by D. Park · supply air ≥ 88 °F within 2 h</span>
          <span class="ui-pill is-ok">Confirmed from data</span>
        </div>
      </div>
    </div>
    <p class="ui-note" aria-hidden="true">Same fault, same rooftop unit. Dashed line marks when each ticket was closed.</p>
  </figure>
</template>

<style scoped>
.ui-cvv { gap: 10px; }
.ui-cvv-panes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.ui-cvv-pane {
  display: grid;
  gap: 8px;
  padding: 10px;
  border-radius: 10px;
  background: var(--surface);
  min-width: 0;
}
.ui-cvv-pane.is-edviro {
  background: var(--card);
  border: 1px solid var(--accent);
  box-shadow: 0 0 0 3px rgba(22, 73, 61, 0.08);
}
.ui-cvv-ticket {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
}
.ui-cvv-id {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.ui-cvv-name {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-cvv-svg {
  width: 100%;
  height: 72px;
  display: block;
}
.ui-cvv-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.ui-cvv-meta {
  font-size: 11.5px;
  color: var(--ink-2);
  min-width: 0;
}
@media (max-width: 560px) {
  .ui-cvv-panes { grid-template-columns: minmax(0, 1fr); }
}
</style>
