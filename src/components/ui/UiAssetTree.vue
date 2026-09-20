<script setup lang="ts">
/**
 * Product-UI illustration: the asset hierarchy one record sits in
 * (organization → site → building → system → asset). Mirrors the registry's
 * nesting; the trailing count shows the branch the asset belongs to.
 */
withDefaults(
  defineProps<{
    levels?: { label: string; value: string; count?: string }[]
    summary?: string
  }>(),
  {
    levels: () => [
      { label: 'Organization', value: 'Northgate Portfolio', count: '12 sites' },
      { label: 'Site', value: 'Riverside Campus', count: '4 buildings' },
      { label: 'Building', value: 'Building B', count: '6 systems' },
      { label: 'System', value: 'HVAC', count: '9 assets' },
      { label: 'Asset', value: 'RTU-3 · Rooftop unit' },
    ],
    summary:
      'Asset hierarchy: organization Northgate Portfolio with 12 sites, site Riverside Campus with 4 buildings, Building B with 6 systems, HVAC system with 9 assets, asset RTU-3 rooftop unit.',
  },
)
</script>

<template>
  <figure class="ui-card ui-tree" role="img" :aria-label="summary">
    <div class="ui-head" aria-hidden="true">
      <span class="ui-label">Registry · Hierarchy</span>
      <span class="ui-pill">5 levels</span>
    </div>
    <ol class="ui-tree-levels" aria-hidden="true">
      <li v-for="(level, i) in levels" :key="level.label" class="ui-tree-level" :style="{ '--depth': i }" :class="{ 'is-leaf': i === levels.length - 1 }">
        <span class="ui-tree-label">{{ level.label }}</span>
        <span class="ui-tree-value">{{ level.value }}</span>
        <span v-if="level.count" class="ui-tree-count">{{ level.count }}</span>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.ui-tree-levels {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
}
.ui-tree-level {
  position: relative;
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px calc(8px + var(--depth) * 12px);
  border-radius: 8px;
  font-size: 12.5px;
}
.ui-tree-level::before {
  content: '';
  position: absolute;
  left: calc(var(--depth) * 12px - 4px);
  top: 50%;
  width: 8px;
  height: 1px;
  background: var(--line-strong);
}
.ui-tree-level:first-child::before { display: none; }
.ui-tree-level.is-leaf {
  background: var(--status-ok-bg);
}
.ui-tree-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-tree-value {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-tree-level.is-leaf .ui-tree-value { color: var(--accent); }
.ui-tree-count {
  font-size: 11.5px;
  color: var(--muted);
  white-space: nowrap;
}
</style>
