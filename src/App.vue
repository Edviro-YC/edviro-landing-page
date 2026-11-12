<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import poppinsRegular from '@/assets/fonts/poppins-400-latin.woff2'
import interLatin from '@/assets/fonts/inter-latin.woff2'

// Preload the designer’s body and heading faces (hashed by Vite) so the
// above-the-fold type renders without a flash. Applied on every route.
// Base styles live in main.css/site.css; the designer adaptation is in awesomic.css.
useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href: poppinsRegular,
      crossorigin: 'anonymous',
    },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: interLatin, crossorigin: 'anonymous' },
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
  <div style="min-height: 100vh; overflow-x: clip">
    <a href="#main-content" class="skip-link" @click.prevent="skipToMain">Skip to content</a>
    <SiteNav />
    <div id="main-content">
      <!--
        Keyed by path: the redesigned pages all render through ContentPage.vue,
        and without a key Vue reuses that one instance between routes, so the
        page content and its head tags would not change. Hash-only navigation
        keeps the same key and does not remount.
      -->
      <RouterView v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </RouterView>
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
