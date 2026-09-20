<script setup lang="ts">
/**
 * Product-UI illustration: modeled rack-inlet temperature across one pod as a
 * simple grid (two rows of racks per cold aisle). Cell tint runs cool → warm
 * between the scale ends; a calibration pill states how far the model sits
 * from the measured sensors. Illustrative values only.
 */
withDefaults(
  defineProps<{
    title?: string
    flag?: string
    /** Row-major inlet temperatures, °C. Rendered as `cols` per row. */
    temps?: number[]
    cols?: number
    scaleMin?: number
    scaleMax?: number
    note?: string
    summary?: string
  }>(),
  {
    title: 'Pod 3 · Modeled inlet °C',
    flag: '±0.4 °C vs measured',
    temps: () => [
      21.2, 21.6, 22.0, 22.4, 23.1, 24.0, 25.2, 26.3,
      21.0, 21.3, 21.8, 22.1, 22.6, 23.4, 24.6, 25.8,
      20.9, 21.1, 21.5, 21.9, 22.3, 22.9, 23.8, 24.7,
    ],
    cols: 8,
    scaleMin: 20,
    scaleMax: 27,
    note: 'Warm end of aisle B sits closest to the design inlet limit.',
    summary:
      'Heat-map grid of modeled inlet temperatures for 24 racks in Pod 3, ranging from about 21 °C at the cool end to 26.3 °C at the warm end of aisle B. The model tracks measured sensors within 0.4 °C.',
  },
)

/**
 * Cell tint: pale green (cool) → amber (warm) → deep orange (at the limit).
 * Computed in JS so SSR and client agree and no color-mix support is needed.
 */
const COOL: [number, number, number] = [214, 230, 220]
const WARM: [number, number, number] = [224, 177, 92]
const HOT: [number, number, number] = [196, 104, 44]
function tint(t: number, min: number, max: number): string {
  const k = Math.max(0, Math.min(1, (t - min) / (max - min)))
  const [a, b, local]: [typeof COOL, typeof COOL, number] = k < 0.6 ? [COOL, WARM, k / 0.6] : [WARM, HOT, (k - 0.6) / 0.4]
  const mix = (i: 0 | 1 | 2) => Math.round(a[i] + (b[i] - a[i]) * local)
  return `rgb(${mix(0)} ${mix(1)} ${mix(2)})`
}
</script>

<template>
  <figure class="ui-card ui-heat" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label ui-heat-title">{{ title }}</span>
      <span class="ui-pill is-ok">{{ flag }}</span>
    </div>
    <div class="ui-heat-body" aria-hidden="true">
      <div class="ui-heat-grid" :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }">
        <span v-for="(t, i) in temps" :key="i" class="ui-heat-cell" :style="{ background: tint(t, scaleMin, scaleMax) }" />
      </div>
      <div class="ui-heat-aisles">
        <span>Aisle A</span><span>Aisle B</span>
      </div>
    </div>
    <div class="ui-heat-scale" aria-hidden="true">
      <span>{{ scaleMin }} °C</span>
      <span class="ui-heat-ramp" />
      <span>{{ scaleMax }} °C</span>
    </div>
    <p class="ui-note" aria-hidden="true">{{ note }}</p>
  </figure>
</template>

<style scoped>
.ui-heat { gap: 8px; }
.ui-heat-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-heat-body { display: grid; gap: 6px; }
.ui-heat-grid {
  display: grid;
  gap: 3px;
}
.ui-heat-cell {
  display: block;
  aspect-ratio: 1.15 / 1;
  border-radius: 3px;
}
.ui-heat-aisles {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--muted);
}
.ui-heat-scale {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10.5px;
  color: var(--muted);
}
.ui-heat-ramp {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, rgb(214 230 220), rgb(224 177 92) 60%, rgb(196 104 44));
}
</style>
