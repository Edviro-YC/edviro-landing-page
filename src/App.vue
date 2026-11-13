<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import geistLatin from '@/assets/fonts/geist-latin.woff2'
import heroField from '@/assets/img/brand/bg-light.jpg'
import grain from '@/assets/img/brand/grain.png'

// Preload the primary latin font subset (hashed URL resolved by Vite) so the
// above-the-fold type renders without a flash. Applied on every route.
// The hero background and grain are preloaded too: the stylesheet only asks
// for them once it has loaded, which is after the first paint.
// Tokens for the older pages live in assets/main.css; the redesign's in assets/site.css.
useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'preload', as: 'font', type: 'font/woff2', href: geistLatin, crossorigin: 'anonymous' },
    { rel: 'preload', as: 'image', type: 'image/jpeg', href: heroField, fetchpriority: 'high' },
    { rel: 'preload', as: 'image', type: 'image/png', href: grain },
  ],
})

// The homepage opening animation waits for this (see index.html).
onMounted(() => window.edviroIntroReady?.())

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
  <!-- `clip` rather than `hidden`: hidden would turn this into a scroll
       container and stop position: sticky from working inside it. -->
  <div style="min-height: 100vh; overflow-x: clip;">
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
