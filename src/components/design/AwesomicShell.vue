<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteLink from '@/components/SiteLink.vue'
import DemoButton from '@/components/DemoButton.vue'
import logo from '@/assets/img/edviro-logo.svg'
import { NAV, FOOTER } from '@/content/nav'
import { BRAND_STATEMENT, DASHBOARD_URL } from '@/seo/site'

const root = ref<HTMLElement | null>(null)
const header = ref<HTMLElement | null>(null)
const mobileOpen = ref(false)
const openGroup = ref<string | null>(null)
const route = useRoute()
const close = () => {
  openGroup.value = null
  mobileOpen.value = false
}
watch(() => route.path, close)
let last = 0
let lifetime: AbortController | undefined
const update = () => {
  const el = root.value,
    nav = header.value
  if (!el || !nav) return
  const y = window.scrollY,
    delta = y - last
  nav.classList.toggle('stuck', y > 4)
  if (Math.abs(delta) > 6 || y <= 120) {
    const away = delta > 0 && y > 120 && !nav.contains(document.activeElement) && !mobileOpen.value
    nav.classList.toggle('hide', away)
    el.querySelector('.aw-page')?.classList.toggle('nav-away', away)
    last = y
  }
  const middle = nav.offsetHeight / 2
  const dark = [...el.querySelectorAll('section.dark')].some((section) => {
    const rect = section.getBoundingClientRect()
    return rect.top <= middle && rect.bottom > middle
  })
  el.style.setProperty('--bg-rgb', dark ? '11,46,37' : '251,248,242')
  el.style.setProperty('--fg-rgb', dark ? '243,241,234' : '14,58,47')
  el.style.setProperty('--t', dark ? '1' : '0')
}
const show = () => {
  header.value?.classList.remove('hide')
  root.value?.querySelector('.aw-page')?.classList.remove('nav-away')
}
const keydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return
  const id = openGroup.value
  close()
  if (id) root.value?.querySelector<HTMLButtonElement>(`[data-menu="${id}"]`)?.focus()
}
onMounted(() => {
  lifetime = new AbortController()
  window.addEventListener('scroll', update, { passive: true, signal: lifetime.signal })
  window.addEventListener('resize', update, { signal: lifetime.signal })
  document.addEventListener('keydown', keydown, { signal: lifetime.signal })
  document.addEventListener(
    'click',
    (event) => {
      if (!header.value?.contains(event.target as Node)) close()
    },
    { signal: lifetime.signal },
  )
  update()
})
onBeforeUnmount(() => lifetime?.abort())
</script>

<template>
  <div ref="root" class="aw-site">
    <header ref="header" class="nav" @focusin="show">
      <div class="wrap">
        <SiteLink href="/" aria-label="Edviro home" class="logo" @click="close"
          ><img :src="logo" alt="Edviro" width="115" height="28" /><img
            class="on-dark"
            src="/design/images/brand/edviro-logo-for-dark-bg.svg"
            alt=""
            aria-hidden="true"
            width="115"
            height="28"
        /></SiteLink>
        <nav class="links" aria-label="Main">
          <template v-for="item in NAV" :key="item.label">
            <SiteLink
              v-if="item.label === 'Results'"
              class="dd-l"
              :href="item.href"
              @click="close"
              >{{ item.label }}</SiteLink
            >
            <div
              v-else
              class="dd"
              :class="[item.groups.length > 2 ? 'w4' : 'w3', { open: openGroup === item.label }]"
              @mouseenter="openGroup = item.label"
              @mouseleave="openGroup = null"
              @focusout="
                (event: FocusEvent) => {
                  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node))
                    openGroup = null
                }
              "
            >
              <button
                type="button"
                class="dd-t"
                :data-menu="item.label"
                :aria-expanded="openGroup === item.label"
                :aria-controls="'menu-' + item.label"
                @click="openGroup = item.label"
              >
                <span>{{ item.label }}</span
                ><i aria-hidden="true"></i>
              </button>
              <div class="dd-p" :id="'menu-' + item.label" :inert="openGroup !== item.label">
                <div class="dd-s">
                  <section v-for="group in item.groups" :key="group.title">
                    <h2>{{ group.title }}</h2>
                    <ul>
                      <li v-for="[label, href] in group.links" :key="label">
                        <SiteLink :href="href" @click="close"
                          ><span class="dd-tx"
                            ><b>{{ label }}</b></span
                          ></SiteLink
                        >
                      </li>
                    </ul>
                  </section>
                  <div class="dd-feat">
                    <SiteLink class="dd-card" :href="item.href" @click="close"
                      ><span
                        class="dd-art"
                        style="background-image: url(/design/images/how/how-diagnose.jpg)"
                      ></span
                      ><span class="dd-tx"
                        ><b>{{ item.label }} <span aria-hidden="true">↗</span></b
                        ><small
                          >Find the problem. Coordinate the fix. Verify the result.</small
                        ></span
                      ></SiteLink
                    >
                  </div>
                </div>
              </div>
            </div>
          </template>
        </nav>
        <div class="actions">
          <a class="signin" :href="DASHBOARD_URL">Sign in</a
          ><DemoButton class="btn btn-primary" /><button
            type="button"
            class="mobile-toggle"
            aria-label="Menu"
            :aria-expanded="mobileOpen"
            aria-controls="aw-mobile-menu"
            @click="mobileOpen = !mobileOpen"
          >
            {{ mobileOpen ? '×' : '☰' }}
          </button>
        </div>
      </div>
      <nav v-if="mobileOpen" id="aw-mobile-menu" class="mobile-menu" aria-label="Mobile">
        <div v-for="item in NAV" :key="item.label">
          <h2>{{ item.label }}</h2>
          <template v-for="group in item.groups" :key="group.title"
            ><SiteLink
              v-for="[label, href] in group.links"
              :key="label"
              :href="href"
              @click="close"
              >{{ label }}</SiteLink
            ></template
          >
        </div>
      </nav>
    </header>
    <slot />
    <footer class="site-ft">
      <div class="wrap">
        <div class="ft-grid">
          <div class="ft-brand">
            <SiteLink href="/" aria-label="Edviro home"
              ><img :src="logo" alt="Edviro" width="115" height="28"
            /></SiteLink>
            <p>{{ BRAND_STATEMENT }}</p>
            <div class="yc"><b>Y</b>Backed by Y Combinator</div>
          </div>
          <nav
            v-for="column in FOOTER"
            :key="column.title"
            class="ft-col"
            :aria-label="column.title"
          >
            <h4>{{ column.title }}</h4>
            <ul>
              <li v-for="[label, href] in column.links" :key="label">
                <SiteLink :href="href">{{ label }}</SiteLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="ft-bar">
          <span>© {{ new Date().getFullYear() }} Edviro. All rights reserved.</span
          ><SiteLink href="/privacy">Privacy</SiteLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped src="./styles/shell.css"></style>
<style scoped>
.aw-site {
  font:
    400 16px/1.4 Poppins,
    system-ui,
    sans-serif;
  color: #0e3a2f;
  background: #fbf8f2;
  --st: var(--nav-h);
}
.aw-site *,
.aw-site *::before,
.aw-site *::after {
  box-sizing: border-box;
}
:where(a) {
  color: inherit;
  text-decoration: none;
}
.nav ul,
.site-ft ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav h2,
.site-ft h4 {
  margin: 0;
}
.nav button {
  font: inherit;
  cursor: pointer;
}
.logo img {
  max-width: none;
}
.nav {
  z-index: 60;
}
.links .dd-t span {
  font-size: 15px;
}
.site-ft {
  position: relative;
}
.mobile-toggle {
  display: none;
}
.dd-p[inert] {
  pointer-events: none;
}
.mobile-menu {
  max-height: calc(100dvh - 68px);
  overflow-y: auto;
  background: #fbf8f2;
  color: #0e3a2f;
  padding: 24px 20px;
  display: grid;
  gap: 24px;
  border-top: 1px solid #d9ddd4;
}
.mobile-menu h2 {
  font-size: 14px;
  margin-bottom: 12px;
}
.mobile-menu a {
  display: block;
  padding: 10px 0;
  font-size: 15px;
}
@media (max-width: 1100px) {
  .mobile-toggle {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid currentColor;
    border-radius: 50%;
    background: none;
    color: inherit;
  }
  .actions {
    gap: 12px;
  }
  .ft-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ft-brand {
    grid-column: 1/-1;
  }
}
@media (max-width: 480px) {
  .signin {
    display: none;
  }
  .btn {
    padding-inline: 14px;
    font-size: 13px;
  }
  .logo img {
    height: 25px;
    width: auto;
  }
  .ft-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (prefers-reduced-motion: reduce) {
  .nav {
    transition: none;
  }
  .logo img {
    transition: none;
  }
}
</style>
