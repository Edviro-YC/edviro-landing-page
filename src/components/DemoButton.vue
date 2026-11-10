<script setup lang="ts">
import { DEMO_CLICK_OPENAI_EVENT, DEMO_REDIRECT_PATH } from '@/seo/site'

// Goes straight to the scheduler (via the /demo redirect) and reports the same
// click the Demo & pricing page reports before it hands off.
const reportDemoIntent = () => {
  window.oaiq?.('measure', DEMO_CLICK_OPENAI_EVENT, { type: 'customer_action' })
}
</script>

<template>
  <a
    :href="DEMO_REDIRECT_PATH"
    target="_blank"
    rel="noopener"
    class="nd-btn"
    @click="reportDemoIntent"
    ><slot>Book a demo</slot></a
  >
</template>
