<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logoWordmark from '@/assets/img/logo-wordmark.png'
import {
  ABOUT_PATH,
  BLOG_URL,
  BOOK_DEMO_PATH,
  CAPITAL_PLANNING_PATH,
  DASHBOARD_URL,
  FAQ_PATH,
  MV_PATH,
  PLATFORM_ASSETS_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  PLATFORM_WORK_ORDERS_PATH,
  SCHOOL_ENERGY_PATH,
  SOLUTION_CONSTRUCTION_PATH,
  SOLUTION_DATA_CENTERS_PATH,
  SOLUTION_HEALTHCARE_PATH,
  SOLUTION_REAL_ESTATE_PATH,
} from '@/seo/site'

/**
 * Platform-first, industry-second navigation. Platform entries point at the
 * industry-neutral platform routes; the Industries menu is where education
 * becomes explicit. School-specific pages stay reachable from the Education
 * entry and the footer.
 */
type NavLink = { label: string; to: string | { path: string; hash: string }; external?: boolean; hint?: string }
type NavGroup = { id: string; label: string; links: NavLink[] }

const groups: NavGroup[] = [
  {
    id: 'platform',
    label: 'Platform',
    links: [
      { label: 'Platform overview', to: PLATFORM_FACILITIES_OPS_PATH, hint: 'One loop from signal to verified fix' },
      { label: 'Work orders', to: PLATFORM_WORK_ORDERS_PATH, hint: 'Intake, review, dispatch, verification' },
      { label: 'Diagnostics', to: { path: PLATFORM_FACILITIES_OPS_PATH, hash: '#diagnostics' }, hint: 'Find the likely cause, not just an alarm' },
      { label: 'Assets and inspections', to: PLATFORM_ASSETS_PATH, hint: 'Equipment records and service history' },
      { label: 'Energy and M&V', to: MV_PATH, hint: 'Meter data in, verified savings out' },
      { label: 'Capital planning', to: CAPITAL_PLANNING_PATH, hint: 'Repair-or-replace and multi-year plans' },
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    links: [
      { label: 'Data centers', to: SOLUTION_DATA_CENTERS_PATH, hint: 'Cooling headroom verified against telemetry' },
      { label: 'Education', to: SCHOOL_ENERGY_PATH, hint: 'K-12 districts and higher education' },
      { label: 'Commercial real estate', to: SOLUTION_REAL_ESTATE_PATH, hint: 'Occupancy-aware HVAC across a portfolio' },
      { label: 'Healthcare', to: SOLUTION_HEALTHCARE_PATH, hint: 'Reviewed work across critical environments' },
      { label: 'Construction', to: SOLUTION_CONSTRUCTION_PATH, hint: 'Independent baselining and M&V' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    links: [
      { label: 'Blog', to: BLOG_URL, external: true, hint: 'Guides for facilities teams' },
      { label: 'FAQ', to: FAQ_PATH, hint: 'Common questions, answered plainly' },
    ],
  },
]

/** Top-level page link rendered after the menus. */
const companyLink: NavLink = { label: 'Company', to: ABOUT_PATH }

const route = useRoute()
const mobileOpen = ref(false)
const openGroup = ref<string | null>(null)
const navEl = ref<HTMLElement | null>(null)
const triggerEls = new Map<string, HTMLButtonElement>()

const setTrigger = (id: string, el: unknown) => {
  if (el instanceof HTMLButtonElement) triggerEls.set(id, el)
}

const closeAll = () => {
  mobileOpen.value = false
  openGroup.value = null
}

// A click on a menu that hover already opened pins it open instead of closing
// it, so mouse users never see the menu vanish under their click.
let hoverOpened = false
const toggleGroup = (id: string) => {
  if (openGroup.value === id && hoverOpened) {
    hoverOpened = false
    return
  }
  openGroup.value = openGroup.value === id ? null : id
  hoverOpened = false
}

// Hover opens for pointer users; click/Enter/Space toggles for keyboard and touch.
const hoverOpen = (id: string) => {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches && openGroup.value !== id) {
    openGroup.value = id
    hoverOpened = true
  }
}
const hoverClose = (id: string) => {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches && openGroup.value === id) {
    openGroup.value = null
    hoverOpened = false
  }
}

// Escape closes the open dropdown and returns focus to its trigger.
const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  if (openGroup.value) {
    const id = openGroup.value
    openGroup.value = null
    triggerEls.get(id)?.focus()
  } else if (mobileOpen.value) {
    mobileOpen.value = false
  }
}

const onDocumentClick = (e: MouseEvent) => {
  if (openGroup.value && navEl.value && !navEl.value.contains(e.target as Node)) openGroup.value = null
}

// Tabbing out of a dropdown closes it so focus never lands in an invisible menu.
const onGroupFocusOut = (id: string, e: FocusEvent) => {
  const next = e.relatedTarget as Node | null
  const wrapper = e.currentTarget as HTMLElement
  if (openGroup.value === id && (!next || !wrapper.contains(next))) openGroup.value = null
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onDocumentClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onDocumentClick)
})
watch(() => route.fullPath, closeAll)
</script>

<template>
  <header style="position: sticky; top: 0; z-index: 50; backdrop-filter: blur(14px); background: rgba(237,240,238,0.78); border-bottom: 1px solid #D8DED9;">
    <nav ref="navEl" aria-label="Primary" style="max-width: 1180px; margin: 0 auto; width: 100%; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px;" class="r-pad-x">
      <RouterLink to="/" aria-label="Edviro home" style="display: flex; align-items: center; text-decoration: none; color: inherit;" @click="closeAll">
        <img :src="logoWordmark" alt="Edviro" width="128" height="28" fetchpriority="high" style="height: 28px; width: auto; display: block;" />
      </RouterLink>

      <!-- Desktop -->
      <div class="r-nav-desktop" style="display: flex; align-items: center; gap: 26px;">
        <ul style="display: flex; align-items: center; gap: 6px; font-size: 14.5px; color: #4B5550; list-style: none; margin: 0; padding: 0;">
          <template v-for="group in groups" :key="group.id">
            <li
              style="position: relative;"
              @mouseenter="hoverOpen(group.id)"
              @mouseleave="hoverClose(group.id)"
              @focusout="onGroupFocusOut(group.id, $event)"
            >
              <button
                :ref="(el) => setTrigger(group.id, el)"
                type="button"
                class="nav-trigger"
                :class="{ 'is-open': openGroup === group.id }"
                :aria-expanded="openGroup === group.id"
                :aria-controls="`nav-menu-${group.id}`"
                @click="toggleGroup(group.id)"
              >
                {{ group.label }}
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 160ms;" :style="{ transform: openGroup === group.id ? 'rotate(180deg)' : 'none' }"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <!-- Padding (not margin) bridges the trigger and the panel so hover never drops across the gap. -->
              <div
                :id="`nav-menu-${group.id}`"
                class="nav-menu"
                :class="{ 'is-wide': group.links.length > 3 }"
                :hidden="openGroup !== group.id"
              >
                <div class="nav-menu-inner">
                  <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 2px;" :style="group.links.length > 3 ? 'grid-template-columns: 1fr 1fr;' : ''">
                    <li v-for="link in group.links" :key="link.label">
                      <a v-if="link.external" :href="link.to as string" class="nav-menu-link" @click="closeAll">
                        <span class="nav-menu-label">{{ link.label }}</span>
                        <span v-if="link.hint" class="nav-menu-hint">{{ link.hint }}</span>
                      </a>
                      <RouterLink v-else :to="link.to" class="nav-menu-link" @click="closeAll">
                        <span class="nav-menu-label">{{ link.label }}</span>
                        <span v-if="link.hint" class="nav-menu-hint">{{ link.hint }}</span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </template>
          <li>
            <RouterLink :to="companyLink.to" class="nav-link">{{ companyLink.label }}</RouterLink>
          </li>
        </ul>
        <div style="display: flex; align-items: center; gap: 10px;">
          <a :href="DASHBOARD_URL" class="dash-btn">Dashboard</a>
          <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 14.5px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 10px 18px; border-radius: 999px; white-space: nowrap;">Book a demo</RouterLink>
        </div>
      </div>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="r-nav-toggle nav-toggle"
        :aria-expanded="mobileOpen"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        aria-controls="mobile-menu"
        style="appearance: none; background: none; border: 1px solid #C0CCC3; border-radius: 10px; width: 42px; height: 42px; align-items: center; justify-content: center; cursor: pointer; color: #171D1A;"
        @click="mobileOpen = !mobileOpen"
      >
        <svg v-if="!mobileOpen" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        <svg v-else aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
    </nav>

    <!-- Mobile panel: grouped, single-column, large tap targets -->
    <div
      id="mobile-menu"
      class="r-nav-panel"
      :class="{ 'is-open': mobileOpen }"
      style="border-top: 1px solid #D8DED9; background: rgba(237,240,238,0.97); padding: 8px 20px 20px; max-height: calc(100vh - 72px); overflow-y: auto; overscroll-behavior: contain;"
    >
      <nav aria-label="Mobile">
        <section v-for="group in groups" :key="group.id" style="padding: 10px 0 6px; border-bottom: 1px solid #DCE3DD;">
          <div :id="`mobile-group-${group.id}`" style="margin: 0 0 4px; font-size: 11.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted);">{{ group.label }}</div>
          <ul :aria-labelledby="`mobile-group-${group.id}`" style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column;">
            <li v-for="link in group.links" :key="link.label">
              <a v-if="link.external" :href="link.to as string" class="mobile-link" @click="closeAll">{{ link.label }}</a>
              <RouterLink v-else :to="link.to" class="mobile-link" @click="closeAll">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </section>
        <section style="padding: 10px 0 6px; border-bottom: 1px solid #DCE3DD;">
          <RouterLink :to="companyLink.to" class="mobile-link" style="font-weight: 500;" @click="closeAll">{{ companyLink.label }}</RouterLink>
        </section>
        <div style="display: grid; gap: 10px; margin-top: 16px;">
          <a :href="DASHBOARD_URL" class="dash-btn dash-btn-mobile" @click="closeAll">Dashboard</a>
          <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="display: block; text-align: center; font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 18px; border-radius: 999px;" @click="closeAll">Book a demo</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link,
.nav-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  appearance: none;
  background: none;
  border: 0;
  font: inherit;
  font-size: 14.5px;
  color: #4B5550;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.nav-link:hover,
.nav-trigger:hover,
.nav-trigger.is-open {
  color: #171D1A;
  background: rgba(23, 29, 26, 0.05);
}
.nav-menu {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 8px;
  min-width: 260px;
}
.nav-menu.is-wide {
  min-width: 560px;
}
.nav-menu-inner {
  padding: 8px;
  background: #F7F9F7;
  border: 1px solid #D8DED9;
  border-radius: 14px;
  box-shadow: 0 18px 40px rgba(23, 29, 26, 0.12);
}
.nav-menu-link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: #171D1A;
}
.nav-menu-link:hover {
  background: rgba(23, 29, 26, 0.05);
}
.nav-menu-label {
  font-size: 14.5px;
  font-weight: 500;
}
.nav-menu-hint {
  font-size: 12.5px;
  color: var(--muted);
}
.book-btn:hover {
  filter: brightness(1.12);
}
.dash-btn {
  font-size: 14.5px;
  font-weight: 500;
  text-decoration: none;
  color: #171d1a;
  background: transparent;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid #c0ccc3;
  white-space: nowrap;
}
.dash-btn:hover {
  background: rgba(23, 29, 26, 0.05);
  border-color: #171d1a;
}
.dash-btn-mobile {
  display: block;
  text-align: center;
  font-size: 15px;
  padding: 13px 18px;
}
.mobile-link {
  display: block;
  text-decoration: none;
  color: #171D1A;
  font-size: 17px;
  padding: 11px 4px;
}
.mobile-link:active {
  opacity: 0.6;
}
.nav-toggle:hover {
  border-color: #171D1A !important;
}
</style>
