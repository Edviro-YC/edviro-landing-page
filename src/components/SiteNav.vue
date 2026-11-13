<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/img/edviro-logo.svg'
import logoLight from '@/assets/img/edviro-logo-light.svg'
import DemoButton from './DemoButton.vue'
import SiteLink from './SiteLink.vue'
import { NAV } from '@/content/nav'
import { DASHBOARD_URL } from '@/seo/site'

const route = useRoute()
const menuOpen = ref(false)
// Hides the hovered dropdown after one of its links is clicked, or when the
// page starts scrolling down. Hovering a nav item again brings it back.
const dismissed = ref(false)
const navEl = ref<HTMLElement | null>(null)

/*
 * The bar sticks to the top of the window. It slides away while the page
 * scrolls down and comes back as soon as it scrolls up. `stuck` gives it a
 * background once the page has moved, and `dark` matches it to a dark section
 * underneath. --nav-offset tells other sticky pieces how much room it takes.
 */
const BAR_HEIGHT = 76
const away = ref(false)
const stuck = ref(false)
const dark = ref(false)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  stuck.value = y > 8
  const goingDown = y > lastY + 6
  if (menuOpen.value || y < 160) away.value = false
  else if (goingDown) away.value = true
  else if (y < lastY - 6) away.value = false
  if (goingDown) {
    // Close an open dropdown as the page moves on, including one held open
    // by keyboard focus.
    dismissed.value = true
    const focused = document.activeElement
    if (focused instanceof HTMLElement && navEl.value?.contains(focused)) focused.blur()
  }
  if (Math.abs(y - lastY) > 6) lastY = y

  const line = BAR_HEIGHT / 2
  dark.value =
    stuck.value &&
    Array.from(
      document.querySelectorAll('.nd section.dark, .nd section.demo, .section.is-dark'),
    ).some((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top <= line && rect.bottom > line
    })

  document.documentElement.style.setProperty(
    '--nav-offset',
    away.value ? '0px' : `${BAR_HEIGHT}px`,
  )
}

onMounted(() => {
  lastY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(
  () => route.path,
  () => {
    menuOpen.value = false
    void nextTick(onScroll)
  },
)

watch(menuOpen, onScroll)
</script>

<template>
  <div :class="['nd', 'site-bar', { away, stuck, 'on-dark': dark }]">
    <header>
      <div class="wrap">
        <RouterLink class="logo" to="/"
          ><img :src="dark ? logoLight : logo" alt="Edviro" width="103" height="25"
        /></RouterLink>
        <nav ref="navEl" :class="['nav', { dismissed }]" aria-label="Main">
          <div
            v-for="item in NAV"
            :key="item.label"
            class="nav-item"
            @mouseenter="dismissed = false"
            @mouseleave="dismissed = false"
          >
            <SiteLink class="caret" :href="item.href" @click="dismissed = true">{{
              item.label
            }}</SiteLink>
            <div class="menu">
              <div class="menu-panel">
                <div v-for="group in item.groups" :key="group.title">
                  <h4>{{ group.title }}</h4>
                  <SiteLink
                    v-for="[label, href] in group.links"
                    :key="label"
                    :href="href"
                    @click="dismissed = true"
                    >{{ label }}</SiteLink
                  >
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="header-actions">
          <a class="signin" :href="DASHBOARD_URL" target="_blank" rel="noopener">Sign in</a>
          <DemoButton class="sm" />
          <button
            class="menu-toggle"
            type="button"
            aria-label="Menu"
            :aria-expanded="menuOpen"
            @click="menuOpen = !menuOpen"
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav v-if="menuOpen" class="mobile-menu" aria-label="Main">
        <div class="wrap">
          <div v-for="item in NAV" :key="item.label">
            <h4>{{ item.label }}</h4>
            <template v-for="group in item.groups" :key="group.title">
              <SiteLink
                v-for="[label, href] in group.links"
                :key="label"
                :href="href"
                @click="menuOpen = false"
                >{{ label }}</SiteLink
              >
            </template>
          </div>
          <div>
            <h4>Account</h4>
            <a :href="DASHBOARD_URL" target="_blank" rel="noopener">Sign in</a>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
