<script setup lang="ts">
/**
 * Before/after matrix for the "fragmented systems and manual triage" problem.
 * Three rows (where signals live, who triages, who confirms the fix), two
 * columns (today, with Edviro). Every cell is a small product-UI crop rather
 * than a paragraph; the row labels carry the argument.
 */
withDefaults(defineProps<{ summary?: string }>(), {
  summary:
    'Comparison of today versus with Edviro across three rows. Where signals live: today they are split across a BMS alarm list, an inbox, a utility portal, a spreadsheet, a binder, and one veteran\'s memory; with Edviro they land on one record for the same issue, tagged by source. Who triages: today the director reads everything and follows up by phone; with Edviro the likely cause and priority are proposed and the director approves. Who confirms the fix: today a closed work order means someone showed up; with Edviro verified means the building data agrees, or the work reopens.',
})

const sources = [
  { name: 'BMS alarm list', detail: '212 open', icon: 'bell' },
  { name: 'Inbox', detail: '40 requests', icon: 'mail' },
  { name: 'Utility portal', detail: 'PDF bills', icon: 'file' },
  { name: 'Spreadsheet', detail: 'Edited Mar 2023', icon: 'grid' },
  { name: 'Binder', detail: 'Asset records', icon: 'book' },
  { name: '“Ask Dave”', detail: '22 years, unwritten', icon: 'user' },
] as const

const evidence = [
  { tag: 'BMS', text: 'Damper stuck open · no alarm raised' },
  { tag: 'Request', text: 'Ms. Alvarez · Room 214 · 8:12 am' },
  { tag: 'Asset', text: 'RTU-3 · belt replaced Feb 3' },
  { tag: 'Meter', text: '+12% vs baseline since Monday' },
]
</script>

<template>
  <div class="pmap" role="group" :aria-label="summary">
    <div class="pmap-grid" aria-hidden="true">
      <span class="pmap-corner" />
      <span class="pmap-colhead is-today">Today</span>
      <span class="pmap-colhead is-edviro">With Edviro</span>

      <!-- Row 1: where the signals live -->
      <span class="pmap-rowhead">Where the signals live</span>
      <div class="pmap-cell is-today">
        <span class="pmap-celltag">Today</span>
        <ul class="pmap-scatter">
          <li v-for="s in sources" :key="s.name" class="pmap-tile">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <template v-if="s.icon === 'bell'"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></template>
              <template v-else-if="s.icon === 'mail'"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></template>
              <template v-else-if="s.icon === 'file'"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></template>
              <template v-else-if="s.icon === 'grid'"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></template>
              <template v-else-if="s.icon === 'book'"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></template>
              <template v-else><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></template>
            </svg>
            <span class="pmap-tile-name">{{ s.name }}</span>
            <span class="pmap-tile-detail">{{ s.detail }}</span>
          </li>
        </ul>
      </div>
      <div class="pmap-cell is-edviro">
        <span class="pmap-celltag">With Edviro</span>
        <div class="pmap-record">
          <div class="ui-head">
            <span class="pmap-record-title">Room 214 too hot · RTU-3 · Lincoln HS</span>
            <span class="ui-pill is-warn">High</span>
          </div>
          <ul class="pmap-evidence">
            <li v-for="e in evidence" :key="e.tag">
              <span class="pmap-tag">{{ e.tag }}</span>
              <span>{{ e.text }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Row 2: who triages -->
      <span class="pmap-rowhead">Who triages</span>
      <div class="pmap-cell is-today">
        <span class="pmap-celltag">Today</span>
        <div class="pmap-person">
          <span class="pmap-avatar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
          </span>
          <span class="pmap-person-text">
            <span class="pmap-person-name">The director</span>
            <span class="pmap-person-detail">Reads all of it, decides what is real, follows up by phone.</span>
          </span>
          <span class="pmap-phone">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
          </span>
        </div>
      </div>
      <div class="pmap-cell is-edviro">
        <span class="pmap-celltag">With Edviro</span>
        <div class="pmap-review">
          <span class="pmap-review-text">
            <span class="ui-label">Proposed</span>
            <span>Likely cause: stuck damper · Priority: High · Trade: HVAC</span>
          </span>
          <span class="ui-pill is-review">Director approves</span>
        </div>
      </div>

      <!-- Row 3: who confirms the fix -->
      <span class="pmap-rowhead">Who confirms the fix</span>
      <div class="pmap-cell is-today">
        <span class="pmap-celltag">Today</span>
        <div class="pmap-outcome">
          <span class="ui-pill">Closed</span>
          <span>Someone showed up.</span>
        </div>
      </div>
      <div class="pmap-cell is-edviro">
        <span class="pmap-celltag">With Edviro</span>
        <div class="pmap-outcome">
          <span class="ui-pill is-verified">Verified</span>
          <span>Room at 72 °F within 2 h, read from the data—or the work reopens.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pmap {
  container-type: inline-size;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px 20px 20px;
}
.pmap-grid {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px 16px;
  align-items: stretch;
}
.pmap-colhead {
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0 0 4px;
  border-bottom: 1.5px solid var(--line);
}
.pmap-colhead.is-today { color: var(--status-warn-ink); border-color: var(--warn); }
.pmap-colhead.is-edviro { color: var(--accent); border-color: var(--accent); }
.pmap-rowhead {
  align-self: center;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: var(--ink);
  text-wrap: balance;
}
.pmap-cell {
  position: relative;
  display: grid;
  align-content: center;
  min-width: 0;
  border-radius: 14px;
  padding: 12px;
}
.pmap-cell.is-today { background: var(--surface-2); border: 1px dashed var(--line-strong); }
.pmap-cell.is-edviro { background: var(--status-ok-bg); border: 1px solid transparent; }
.pmap-celltag { display: none; }

/* Row 1 — scattered sources */
.pmap-scatter {
  list-style: none;
  margin: 0;
  padding: 4px 2px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px 8px;
}
.pmap-tile {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 7px;
  align-items: center;
  padding: 8px 9px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 9px;
  color: var(--muted-2);
  font-size: 12px;
  line-height: 1.25;
  min-width: 0;
}
.pmap-tile svg { grid-row: 1 / 3; }
.pmap-tile-name { font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pmap-tile-detail { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
/* Slight rotations read as six different tools nobody lined up. */
.pmap-tile:nth-child(1) { transform: rotate(-1.6deg) translateY(1px); }
.pmap-tile:nth-child(2) { transform: rotate(1.2deg) translateY(-2px); }
.pmap-tile:nth-child(3) { transform: rotate(-0.8deg) translateY(2px); }
.pmap-tile:nth-child(4) { transform: rotate(1.8deg); }
.pmap-tile:nth-child(5) { transform: rotate(-1.3deg) translateY(-1px); }
.pmap-tile:nth-child(6) { transform: rotate(0.9deg) translateY(1px); }

/* Row 1 — one record */
.pmap-record {
  display: grid;
  gap: 8px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 11px 12px;
}
.pmap-record-title {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pmap-evidence {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 5px;
  font-size: 12.5px;
  line-height: 1.3;
  color: var(--ink-2);
}
.pmap-evidence li { display: flex; gap: 8px; align-items: baseline; min-width: 0; }
.pmap-tag {
  flex: none;
  width: 54px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

/* Row 2 */
.pmap-person {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
}
.pmap-avatar,
.pmap-phone {
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.pmap-avatar { background: var(--ink); color: var(--on-dark); }
.pmap-phone { background: var(--status-warn-bg); color: var(--status-warn-ink); }
.pmap-person-text { display: grid; gap: 2px; min-width: 0; }
.pmap-person-name { font-size: 13px; font-weight: 600; }
.pmap-person-detail { font-size: 12.5px; line-height: 1.35; color: var(--ink-2); }
.pmap-review {
  display: flex;
  gap: 10px 14px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: var(--status-review-bg);
  border: 1px dashed var(--warn);
  border-radius: 12px;
  padding: 10px 12px;
}
.pmap-review-text { display: grid; gap: 2px; font-size: 12.5px; line-height: 1.35; min-width: 0; }

/* Row 3 */
.pmap-outcome {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 13px;
  line-height: 1.35;
  color: var(--ink-2);
}
.pmap-outcome .ui-pill { flex: none; }

@container (max-width: 720px) {
  .pmap-grid { grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .pmap-corner, .pmap-colhead { display: none; }
  .pmap-rowhead {
    margin-top: 8px;
    padding-bottom: 4px;
    border-bottom: 1.5px solid var(--line);
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .pmap-celltag {
    display: block;
    margin-bottom: 8px;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .is-today .pmap-celltag { color: var(--status-warn-ink); }
  .is-edviro .pmap-celltag { color: var(--accent); }
  .pmap-scatter { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 380px) {
  .pmap { padding: 14px; }
  .pmap-scatter { grid-template-columns: minmax(0, 1fr); }
  .pmap-tile:nth-child(n) { transform: none; }
}
</style>
