<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FaqItem } from '@/seo/jsonld'

/**
 * Native disclosure list: answers are collapsed by default and stay in the
 * DOM, so the FAQPage JSON-LD, find-in-page, and no-JS readers all see them.
 * A hash matching an item's id (#faq-<slug>) opens that item on load.
 */
defineProps<{ items: FaqItem[]; heading?: string; eyebrow?: string }>()

const slug = (q: string) =>
  'faq-' +
  q
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

const root = ref<HTMLElement | null>(null)
onMounted(() => {
  const hash = window.location.hash
  if (!hash || !root.value) return
  const el = root.value.querySelector<HTMLDetailsElement>(`details${hash}`)
  if (el) el.open = true
})
</script>

<template>
  <section id="faq" ref="root" class="faq">
    <div class="faq-shell">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h2 v-if="heading" class="h2 faq-heading">{{ heading }}</h2>
      <div class="faq-list">
        <details v-for="item in items" :id="slug(item.question)" :key="item.question" class="faq-item">
          <summary class="faq-q">
            <span>{{ item.question }}</span>
            <svg class="faq-icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14" class="faq-icon-v" />
              <path d="M5 12h14" />
            </svg>
          </summary>
          <div class="faq-a">
            <p>{{ item.answer }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  padding: 30px 32px 100px;
  scroll-margin-top: 80px;
}
.faq-shell {
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
}
.faq-heading {
  margin-bottom: 32px;
}
.faq-list {
  border-top: 1px solid var(--line);
}
.faq-item {
  border-bottom: 1px solid var(--line);
}
.faq-q {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 0;
  margin: 0;
  list-style: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.35;
  color: var(--ink);
  text-wrap: pretty;
}
.faq-q::-webkit-details-marker {
  display: none;
}
.faq-q:hover {
  color: var(--accent);
}
.faq-q:focus-visible {
  outline-offset: 4px;
  border-radius: 6px;
}
.faq-icon {
  flex: none;
  margin-top: 3px;
  color: var(--muted);
  transition: transform 200ms ease;
}
.faq-icon-v {
  transition: opacity 160ms ease;
}
.faq-item[open] .faq-icon {
  transform: rotate(90deg);
  color: var(--accent);
}
.faq-item[open] .faq-icon-v {
  opacity: 0;
}
.faq-a {
  padding: 0 44px 24px 0;
}
.faq-a p {
  margin: 0;
  font-size: 16px;
  line-height: 1.62;
  color: var(--ink-2);
  text-wrap: pretty;
}
@media (max-width: 640px) {
  .faq {
    padding: 24px 20px 72px;
  }
  .faq-q {
    font-size: 17px;
    padding: 18px 0;
  }
  .faq-a {
    padding-right: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .faq-icon,
  .faq-icon-v {
    transition: none;
  }
}
</style>
