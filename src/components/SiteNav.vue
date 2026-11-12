<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/img/edviro-logo.svg'
import DemoButton from './DemoButton.vue'
import SiteLink from './SiteLink.vue'
import { NAV } from '@/content/nav'
import { DASHBOARD_URL } from '@/seo/site'

const route = useRoute()
const menuOpen = ref(false)
// Hides the hovered dropdown after one of its links is clicked.
const dismissed = ref(false)

watch(
  () => route.path,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <div class="nd site-header">
    <header>
      <div class="wrap">
        <RouterLink class="logo" to="/"
          ><img :src="logo" alt="Edviro" width="103" height="25"
        /></RouterLink>
        <nav :class="['nav', { dismissed }]" aria-label="Main">
          <div
            v-for="item in NAV"
            :key="item.label"
            class="nav-item"
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
