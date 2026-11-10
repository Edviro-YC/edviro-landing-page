import type { RouteRecordRaw } from 'vue-router'
import { contentPages } from '@/content'

/**
 * Redesigned pages (2026-11). Their copy lives in src/content and one
 * component renders them all; each gets its own route so vite-ssg prerenders
 * it. Paths that existed before the redesign are unchanged, including
 * /solutions/schools, the ranking energy-management URL: never repoint it.
 */
const contentRoutes: RouteRecordRaw[] = contentPages.map((page) => ({
  path: page.path,
  name: page.path.slice(1).replaceAll('/', '-'),
  component: () => import('@/pages/ContentPage.vue'),
  props: { path: page.path },
}))

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  ...contentRoutes,
  // School-specific pages that rank for their own searches. They keep their
  // own copy, titles, canonicals and structured data.
  {
    path: '/school-work-order-software',
    name: 'school-work-order-software',
    component: () => import('@/pages/SchoolWorkOrderSoftware.vue'),
  },
  {
    path: '/cmms-for-schools',
    name: 'cmms-for-schools',
    component: () => import('@/pages/CmmsForSchools.vue'),
  },
  {
    path: '/school-asset-management-software',
    name: 'school-asset-management-software',
    component: () => import('@/pages/SchoolAssetManagementSoftware.vue'),
  },
  {
    // Canonical public privacy policy (https://edviroenergy.com/privacy).
    // The dashboard also hosts a copy at /privacy-policy; this page is the
    // URL the policy itself cites for updates.
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/pages/PrivacyPage.vue'),
  },
  {
    // Every "Book a demo" CTA links here. The scheduler lives one click further,
    // at /demo, and Calendly returns invitees to /demo-booked.
    path: '/book-a-demo',
    name: 'book-a-demo',
    component: () => import('@/pages/BookDemo.vue'),
  },
  {
    // Thin interstitial that redirects to BOOKING_URL.
    path: '/demo',
    name: 'demo',
    component: () => import('@/pages/DemoRedirect.vue'),
  },
  {
    // Calendly's post-booking redirect target, where the ad conversions for a
    // confirmed booking are reported.
    path: '/demo-booked',
    name: 'demo-booked',
    component: () => import('@/pages/DemoBooked.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
  },
]
