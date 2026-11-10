<script setup lang="ts">
import logo from '@/assets/img/edviro-logo.svg'
import SiteLink from './SiteLink.vue'
import { FOOTER } from '@/content/nav'
import { BRAND_STATEMENT } from '@/seo/site'
</script>

<template>
  <div class="nd">
    <footer>
      <div class="wrap">
        <div class="footer-brand">
          <img :src="logo" alt="Edviro" width="98" height="24" />
          <p>{{ BRAND_STATEMENT }}</p>
        </div>
        <div v-for="column in FOOTER" :key="column.title">
          <h4>{{ column.title }}</h4>
          <ul>
            <li v-for="[label, href] in column.links" :key="label">
              <SiteLink :href="href">{{ label }}</SiteLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>
