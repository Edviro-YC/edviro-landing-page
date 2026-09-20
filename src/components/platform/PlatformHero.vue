<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BOOK_DEMO_PATH } from '@/seo/site'

/**
 * Two-column page hero shared by the platform and industry pages: eyebrow,
 * H1 (default slot, so pages can accent a phrase), one lede, an optional
 * support line, two CTAs, and a product visual in the `visual` slot.
 */
defineProps<{
  eyebrow: string
  lede: string
  note?: string
  secondary?: { label: string; to: string }
}>()
</script>

<template>
  <section class="phero">
    <div class="shell phero-grid" :class="{ 'is-single': !$slots.visual }">
      <div class="phero-copy">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h1 class="phero-h1"><slot /></h1>
        <p class="phero-lede">{{ lede }}</p>
        <p v-if="note" class="phero-note">{{ note }}</p>
        <div class="phero-ctas">
          <RouterLink :to="BOOK_DEMO_PATH" class="btn btn-primary">Book a demo</RouterLink>
          <RouterLink v-if="secondary" :to="secondary.to" class="btn btn-outline">{{ secondary.label }}</RouterLink>
        </div>
      </div>
      <div v-if="$slots.visual" class="phero-visual">
        <slot name="visual" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.phero {
  padding: 32px 32px 56px;
}
.phero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 48px;
  align-items: center;
}
.phero-copy { min-width: 0; }
/* Copy-only heroes (industry pages put their visual full-width underneath). */
.phero-grid.is-single { grid-template-columns: minmax(0, 1fr); }
.phero-grid.is-single .phero-copy { max-width: 760px; }
.phero-h1 {
  margin: 0;
  font-weight: 500;
  font-size: clamp(34px, 4.2vw, 54px);
  line-height: 1.08;
  letter-spacing: var(--track-display);
  text-wrap: balance;
}
.phero-h1 :deep(.accent) { color: var(--accent); }
.phero-lede {
  margin: 22px 0 0;
  max-width: 560px;
  font-size: 18px;
  line-height: 1.55;
  color: var(--ink-2);
  text-wrap: pretty;
}
.phero-note {
  margin: 12px 0 0;
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
}
.phero-ctas {
  margin-top: 28px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.phero-visual {
  min-width: 0;
  display: grid;
  gap: 14px;
}
@media (max-width: 980px) {
  .phero { padding: 24px 32px 40px; }
  .phero-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}
@media (max-width: 768px) {
  .phero { padding-left: 20px; padding-right: 20px; }
}
</style>
