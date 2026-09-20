<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BOOK_DEMO_PATH } from '@/seo/site'
</script>

<template>
  <!-- CTA -->
  <section class="cta">
    <div class="cta-inner">
      <h2 class="cta-h2">See what Edviro finds in your buildings.</h2>
      <p class="cta-p">Connect your sites. Find the problems. Close the loop.</p>
      <div class="cta-actions">
        <RouterLink :to="BOOK_DEMO_PATH" class="cta-btn">Book a demo</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  --focus-ring: var(--on-dark);
  padding: 80px 32px;
  background: var(--accent);
  color: var(--on-dark);
}
.cta-inner {
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
.cta-h2 {
  margin: 0;
  font-weight: 500;
  font-size: clamp(34px, 4.6vw, 52px);
  line-height: 1.07;
  letter-spacing: var(--track-display);
  color: #F2F5F1;
  text-wrap: balance;
}
.cta-p {
  margin: 20px auto 0;
  max-width: 540px;
  font-size: 18px;
  line-height: 1.55;
  color: rgba(237, 240, 238, 0.78);
}
.cta-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.cta-btn {
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: var(--accent);
  background: var(--on-dark);
  padding: 15px 34px;
  border-radius: 999px;
}
.cta-btn:hover {
  filter: brightness(1.06);
}
@media (max-width: 768px) {
  .cta { padding: 64px 20px; }
}
</style>
