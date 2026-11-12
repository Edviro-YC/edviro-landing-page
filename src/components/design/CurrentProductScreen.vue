<script setup lang="ts">
import icon from '@/assets/img/edviro-icon.svg'

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
</script>

<template>
  <div class="app product-screen" role="img" aria-label="Edviro fixes screen (example)">
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
        <div v-for="item in sidebar" :key="item" :class="['side-item', { on: item === 'Fixes' }]">
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
        <div v-for="(fix, index) in fixes" :key="fix.title" :class="['fix', { on: index === 0 }]">
          <b>{{ fix.title }}</b>
          <small>{{ fix.meta }}</small>
          <span :class="status[fix.status].className">{{ status[fix.status].label }}</span>
        </div>
      </div>
      <div class="detail">
        <div class="source">Alarm · Site A · 7:40 AM</div>
        <h4>Zone 3 low temperature</h4>
        <div class="quote"><small>Custodian text · 7:42 AM</small>“Zone 3 is too cold again.”</div>
        <h6>Likely cause</h6>
        <p class="cause">Reheat valve on VAV 3-12 is stuck closed.</p>
        <svg viewBox="0 0 300 92" aria-hidden="true">
          <line class="chart-base" x1="0" y1="24" x2="300" y2="24" />
          <polyline
            class="chart-line"
            points="0,26 30,24 60,27 80,40 100,62 130,66 160,64 190,67 220,65 250,66 300,65"
          />
          <text class="chart-label" x="300" y="16" text-anchor="end">Setpoint 70°F</text>
          <text class="chart-label" x="300" y="84" text-anchor="end">Discharge air 55°F</text>
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
</template>

<style scoped>
.product-screen {
  --band: #f4f7f4;
  --ink: #0d1512;
  --text: #445049;
  --mute: #5f6b65;
  --line: rgba(13, 21, 18, 0.11);
  --tint: #e7f4ec;
  --ok: #5ebf65;
  --r: 14px;
  --font: 'Geist', system-ui, sans-serif;
  font-family: var(--font);
  color: var(--text);
  text-align: left;
}
.product-screen *,
.product-screen *::before,
.product-screen *::after {
  margin: 0;
  padding: 0;
  border: 0 solid;
  box-sizing: border-box;
}
.product-screen ul {
  list-style: none;
}
/* Product window */
.app {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--r);
  box-shadow: 0 44px 80px -48px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  font-size: 13px;
  line-height: 1.4;
}

.app-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 50px;
  padding: 0 16px;
  border-bottom: 1px solid var(--line);
}

.app-bar img {
  height: 20px;
}

.crumb {
  color: var(--mute);
}

.crumb b {
  font-weight: 500;
  color: var(--ink);
}

.app-tools {
  margin-left: auto;
  display: flex;
  gap: 10px;
  align-items: center;
}

.search {
  width: 190px;
  height: 30px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: var(--mute);
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--tint);
  color: var(--ink);
  display: grid;
  place-items: center;
  font-weight: 500;
  font-size: 11px;
}

.app-body {
  display: grid;
  grid-template-columns: 200px 1fr 350px;
}

.side {
  border-right: 1px solid var(--line);
  padding: 14px 10px 20px;
  background: var(--band);
}

.side-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border-radius: 7px;
}

.side-item.on {
  background: #fff;
  box-shadow: 0 0 0 1px var(--line);
  color: var(--ink);
  font-weight: 500;
}

.side h5 {
  font: 500 11px var(--font);
  color: var(--mute);
  margin: 20px 10px 6px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  background: var(--ok);
}

.dot.warn {
  background: #e0a93b;
}

.list-head {
  display: flex;
  justify-content: space-between;
  padding: 14px 18px 12px;
  color: var(--mute);
}

.list-head b {
  font-weight: 500;
  color: var(--ink);
  font-size: 14px;
}

.fix {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2px 16px;
  padding: 12px 18px;
  border-top: 1px solid var(--line);
}

.fix.on {
  background: var(--band);
  box-shadow: inset 2px 0 0 var(--ink);
}

.fix b {
  font-weight: 500;
  color: var(--ink);
  font-size: 14px;
}

.fix small {
  grid-column: 1;
  color: var(--mute);
  font-size: 12px;
}

.pill {
  grid-row: 1/3;
  grid-column: 2;
  align-self: center;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  background: #f6efdc;
  color: #77590f;
  white-space: nowrap;
}

.pill.dispatched {
  background: var(--band);
  color: var(--text);
  box-shadow: inset 0 0 0 1px var(--line);
}

.pill.verified {
  background: #e6f4e7;
  color: #2c6a37;
}

.detail {
  border-left: 1px solid var(--line);
  padding: 18px 20px 20px;
}

.detail .source {
  font-size: 12px;
  color: var(--mute);
}

.detail h4 {
  font: 600 18px/1.2 var(--font);
  letter-spacing: -0.025em;
  color: var(--ink);
  margin: 6px 0 10px;
}

.detail .quote {
  background: var(--band);
  border-radius: 10px;
  padding: 9px 12px;
  color: var(--ink);
}

.detail .quote small {
  display: block;
  font-size: 11px;
  color: var(--mute);
  margin-bottom: 2px;
}

.detail h6 {
  font: 500 12px var(--font);
  color: var(--mute);
  margin: 16px 0 4px;
}

.detail .cause {
  color: var(--ink);
  font-size: 14px;
}

.detail svg {
  width: 100%;
  height: auto;
  margin: 10px 0 2px;
}

.detail li {
  position: relative;
  padding: 3px 0 3px 14px;
}

.detail li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--ok);
}

.app-buttons {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.app-button {
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  background: var(--ink);
  color: #fff;
}

.app-button.ghost {
  background: none;
  border: 1px solid var(--line);
  color: var(--ink);
}

.chart-base {
  fill: none;
  stroke: var(--mute);
  stroke-width: 1.5;
  stroke-dasharray: 3 4;
}
.chart-line {
  fill: none;
  stroke: var(--ink);
  stroke-width: 2;
}
.chart-label {
  fill: var(--mute);
  font: 400 11px var(--font);
}
@media (max-width: 1040px) {
  .app-body {
    grid-template-columns: 1fr 330px;
  }
  .side {
    display: none;
  }
}
@media (max-width: 780px) {
  .app-body {
    grid-template-columns: 1fr;
  }
  .detail,
  .search {
    display: none;
  }
}
</style>
