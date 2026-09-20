<script setup lang="ts">
import { RouterLink } from 'vue-router'

/**
 * Reciprocal segment links. On a generic platform page it points at the
 * school-specific equivalents (labeled as such); on a school page it points
 * back at the generic route. Keeps both sets of pages internally linked
 * without changing either side's titles or canonicals.
 */
defineProps<{
  eyebrow: string
  heading: string
  body: string
  links: { label: string; to: string }[]
}>()
</script>

<template>
  <section class="segment">
    <div class="shell">
      <div class="segment-card">
        <div class="segment-copy">
          <p class="eyebrow">{{ eyebrow }}</p>
          <h2 class="segment-h2">{{ heading }}</h2>
          <p class="segment-body">{{ body }}</p>
        </div>
        <ul class="segment-links">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="text-link">{{ link.label }} →</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.segment { padding: 56px 32px 24px; }
.segment-card {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 24px 48px;
  align-items: center;
  padding: 28px 32px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
}
.segment-copy .eyebrow { margin-bottom: 10px; }
.segment-h2 {
  margin: 0;
  font-weight: 500;
  font-size: 22px;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.segment-body {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.55;
  color: var(--ink-2);
  text-wrap: pretty;
}
.segment-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
  font-size: 15px;
}
@media (max-width: 860px) {
  .segment-card { grid-template-columns: minmax(0, 1fr); padding: 22px; }
}
@media (max-width: 768px) {
  .segment { padding-left: 20px; padding-right: 20px; }
}
</style>
