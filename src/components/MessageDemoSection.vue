<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MessageWorkOrderDemo from '@/components/MessageWorkOrderDemo.vue'
import { PLATFORM_WORK_ORDERS_PATH } from '@/seo/site'

/**
 * The signature message → reviewed work order → verified fix demo, placed
 * right after the operating loop so the loop is shown once in the abstract
 * and then once for real. The demo starts when it scrolls into view and
 * loops on its own (no playback controls). The school scenario is the only one.
 */
</script>

<template>
  <section id="in-action" class="section">
    <div class="shell">
      <div class="demo-head">
        <div>
          <p class="eyebrow">In action</p>
          <h2 class="h2">One text. One reviewed work order. One verified fix.</h2>
        </div>
        <p class="lede">A staff request followed all the way through: diagnosis, a drafted order, a named approval, the technician, and the check that the problem actually stopped.</p>
      </div>

      <div class="demo-wrap">
        <MessageWorkOrderDemo :scenarios="['campus']" />
      </div>

      <RouterLink :to="PLATFORM_WORK_ORDERS_PATH" class="text-link demo-link">How work orders run in Edviro →</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.demo-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px 48px;
  align-items: end;
  margin-bottom: 36px;
}
.demo-head .lede { margin: 0; }
.demo-wrap {
  max-width: 880px;
  margin: 0 auto;
}
.demo-link {
  display: block;
  width: max-content;
  max-width: 100%;
  margin: 26px auto 0;
  font-size: 15px;
}
@media (max-width: 768px) {
  .demo-head { grid-template-columns: minmax(0, 1fr); margin-bottom: 26px; }
  .demo-link { margin-left: 0; }
}
</style>
