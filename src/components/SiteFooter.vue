<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoIcon from '@/assets/img/logo-icon.png'
import {
  ABOUT_PATH,
  ASSETS_PATH,
  BLOG_URL,
  BOOK_DEMO_PATH,
  BRAND_STATEMENT,
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  CONTACT_EMAIL,
  FAQ_PATH,
  LINKEDIN_URL,
  MV_PATH,
  PLATFORM_ASSETS_PATH,
  PLATFORM_FACILITIES_OPS_PATH,
  PLATFORM_WORK_ORDERS_PATH,
  PRIVACY_PATH,
  SCHOOL_ENERGY_PATH,
  SOLUTION_CONSTRUCTION_PATH,
  SOLUTION_DATA_CENTERS_PATH,
  SOLUTION_HEALTHCARE_PATH,
  SOLUTION_REAL_ESTATE_PATH,
  WORK_ORDERS_PATH,
  X_URL,
} from '@/seo/site'

type FooterLink = { label: string; to: string | { path: string; hash: string } }

/**
 * Platform → Industries → Education → Company. The Education column keeps every
 * school-specific route internally linked (and labeled as such) while the
 * shared blurb and Platform column stay industry-neutral.
 */
const columns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Platform',
    links: [
      { label: 'Platform overview', to: PLATFORM_FACILITIES_OPS_PATH },
      { label: 'Work orders', to: PLATFORM_WORK_ORDERS_PATH },
      { label: 'Assets and inspections', to: PLATFORM_ASSETS_PATH },
      { label: 'Measurement and verification', to: MV_PATH },
      { label: 'Capital planning', to: CAPITAL_PLANNING_PATH },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Data centers', to: SOLUTION_DATA_CENTERS_PATH },
      { label: 'Education', to: SCHOOL_ENERGY_PATH },
      { label: 'Commercial real estate', to: SOLUTION_REAL_ESTATE_PATH },
      { label: 'Healthcare', to: SOLUTION_HEALTHCARE_PATH },
      { label: 'Construction', to: SOLUTION_CONSTRUCTION_PATH },
    ],
  },
  {
    heading: 'Education',
    links: [
      { label: 'Energy management software for schools', to: SCHOOL_ENERGY_PATH },
      { label: 'School work-order software', to: WORK_ORDERS_PATH },
      { label: 'CMMS for schools', to: CMMS_PATH },
      { label: 'School asset management', to: ASSETS_PATH },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: ABOUT_PATH },
      { label: 'FAQ', to: FAQ_PATH },
      { label: 'Privacy policy', to: PRIVACY_PATH },
      { label: 'Book a demo', to: BOOK_DEMO_PATH },
    ],
  },
]
</script>

<template>
  <!-- FOOTER -->
  <footer class="is-dark" style="padding: 56px 32px 34px; background: #101815; color: var(--on-dark-faint);">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div class="footer-grid" style="padding-bottom: 36px; border-bottom: 1px solid #26302A;">
        <div class="footer-brand">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img :src="logoIcon" alt="" width="20" height="20" style="width: 20px; height: 20px; border-radius: 6px; display: block;" />
            <span style="font-size: 17px; font-weight: 600; letter-spacing: -0.02em; color: #EDF0EE;">Edviro</span>
          </div>
          <p style="margin: 14px 0 0; font-size: 15px; color: #C4CBC5; line-height: 1.5;">{{ BRAND_STATEMENT }}</p>
          <p style="margin: 10px 0 0; max-width: 380px; font-size: 13.5px; line-height: 1.55;">AI-powered facilities operations: signals and requests become reviewed work orders, verified fixes, and capital plans. Use Edviro as your work-order and asset system—or connect the systems you already have.</p>
        </div>
        <nav v-for="col in columns" :key="col.heading" :aria-label="`Footer: ${col.heading}`">
          <div style="font-weight: 600; font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--on-dark-faint); margin-bottom: 14px;">{{ col.heading }}</div>
          <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 9px;">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink :to="link.to" class="footer-link" style="font-size: 13.5px; color: #A7B4AB; text-decoration: none;">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <div style="padding-top: 22px; display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: center; justify-content: space-between;">
        <div style="font-size: 12.5px;">© {{ new Date().getFullYear() }} Edviro. Backed by Y Combinator.</div>
        <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
          <RouterLink :to="PRIVACY_PATH" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: var(--on-dark-faint); text-decoration: none;">Privacy</RouterLink>
          <a :href="BLOG_URL" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: var(--on-dark-faint); text-decoration: none;">Blog</a>
          <a :href="LINKEDIN_URL" target="_blank" rel="noopener" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: var(--on-dark-faint); text-decoration: none;">LinkedIn</a>
          <a :href="X_URL" target="_blank" rel="noopener" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: var(--on-dark-faint); text-decoration: none;">X</a>
          <a :href="`mailto:${CONTACT_EMAIL}`" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: var(--on-dark-faint); text-decoration: none;">{{ CONTACT_EMAIL }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 36px;
}
.footer-link:hover {
  color: #edf0ee !important;
}
@media (max-width: 1024px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
}
</style>
