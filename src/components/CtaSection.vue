<script setup lang="ts">
import DemoButton from './DemoButton.vue'
import { CONTACT_EMAIL } from '@/seo/site'
</script>

<template>
  <!-- Closing call to action, shown at the bottom of every page. -->
  <div class="nd">
    <section id="demo" class="alt demo">
      <div class="wrap">
        <div class="label">Book a demo</div>
        <h2>See what Edviro finds in your buildings.</h2>
        <p class="sub">Pick a 30-minute slot and we’ll walk through your sites with you.</p>
        <DemoButton>Book a demo <span aria-hidden="true">→</span></DemoButton>
        <p class="demo-note">
          Or email <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
        </p>
      </div>
    </section>
  </div>
</template>
