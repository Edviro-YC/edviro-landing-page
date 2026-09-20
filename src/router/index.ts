import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    // The ranking energy-management URL. Never repoint or repurpose it. The
    // former /solutions/school-facilities-operations page was merged into it
    // (2026-09-19) and 301s here via the generated Netlify _redirects.
    path: '/solutions/schools',
    name: 'solutions-schools',
    component: () => import('@/pages/SolutionSchools.vue'),
  },
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
  // Industry-neutral platform routes. They link to the school pages above and
  // back; neither side redirects or canonicalizes to the other.
  {
    path: '/facilities-operations',
    name: 'facilities-operations',
    component: () => import('@/pages/FacilitiesOperationsPage.vue'),
  },
  {
    path: '/work-orders',
    name: 'work-orders',
    component: () => import('@/pages/WorkOrdersPage.vue'),
  },
  {
    path: '/asset-management',
    name: 'asset-management',
    component: () => import('@/pages/AssetManagementPage.vue'),
  },
  {
    path: '/solutions/real-estate',
    name: 'solutions-real-estate',
    component: () => import('@/pages/SolutionRealEstate.vue'),
  },
  {
    path: '/solutions/construction',
    name: 'solutions-construction',
    component: () => import('@/pages/SolutionConstruction.vue'),
  },
  {
    path: '/solutions/data-centers',
    name: 'solutions-data-centers',
    component: () => import('@/pages/SolutionDataCenters.vue'),
  },
  {
    path: '/solutions/healthcare',
    name: 'solutions-healthcare',
    component: () => import('@/pages/SolutionHealthcare.vue'),
  },
  {
    path: '/measurement-and-verification',
    name: 'measurement-and-verification',
    component: () => import('@/pages/MeasurementVerification.vue'),
  },
  {
    path: '/capital-planning',
    name: 'capital-planning',
    component: () => import('@/pages/CapitalPlanning.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/pages/FaqPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
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
