<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import publicSansLatin from '@/assets/fonts/public-sans-latin.woff2'

// Preload the primary latin font subset (hashed URL resolved by Vite) so the
// above-the-fold type renders without a flash. Applied on every route.
// Typography, colors, and the --accent token live in assets/main.css.
useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'preload', as: 'font', type: 'font/woff2', href: publicSansLatin, crossorigin: 'anonymous' },
  ],
})

// Skip link: move focus into the page's <main> without a router hash round-trip.
const skipToMain = () => {
  const wrapper = document.getElementById('main-content')
  const target = (wrapper?.querySelector('main') ?? wrapper) as HTMLElement | null
  if (!target) return
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  target.scrollIntoView({ block: 'start' })
}
</script>

<template>
  <div style="min-height: 100vh; overflow-x: hidden;">
    <a href="#main-content" class="skip-link" @click.prevent="skipToMain">Skip to content</a>
    <SiteNav />
    <div id="main-content">
      <RouterView />
    </div>
    <SiteFooter />
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--ink);
  color: var(--on-dark);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transform: translateY(-300%);
}
.skip-link:focus-visible {
  transform: none;
  outline-offset: 2px;
}
</style>
