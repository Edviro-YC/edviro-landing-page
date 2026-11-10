import company from './company'
import industries from './industries'
import platform from './platform'
import resources from './resources'
import results from './results'
import solutions from './solutions'
import type { ContentPage } from './types'

/**
 * Search titles and descriptions for the routes that existed before the
 * 2026-11 redesign. These URLs already rank, so the page copy changed but the
 * metadata search engines know them by did not.
 */
const ESTABLISHED_SEO: Record<string, { title: string; description: string }> = {
  '/facilities-operations': {
    title: 'AI-Powered Facilities Operations Platform',
    description:
      'Building signals, work orders, assets, field teams, and budgets in one system. Detect the problem, approve the fix, and verify the result in building data.',
  },
  '/work-orders': {
    title: 'Work Order Software with Review and Verification',
    description:
      'Requests, alarms, and detected problems become reviewed work orders: triage, a named approver, mobile dispatch, closure with cost, and proof the fix held.',
  },
  '/asset-management': {
    title: 'Facility Asset Management and Inspection Software',
    description:
      'One record per asset: nameplate, documents, full service history, inspections, and the repair-or-replace outlook that history produces. Works with your CMMS.',
  },
  '/measurement-and-verification': {
    title: 'Measurement and Verification (M&V) for Buildings',
    description:
      'Measurement and verification (M&V) explained: how Edviro learns a building energy baseline, measures every fix and project against it, confirms that completed work resolved the problem, and generates board-ready proof of savings automatically.',
  },
  '/capital-planning': {
    title: 'Capital Planning for School Facilities',
    description:
      'Edviro turns asset history, work orders, bills, meters, and BMS data into a living model of each building, then simulates replacements, retrofits, and schedule changes so districts can rank capital projects by real payback before spending a dollar.',
  },
  '/solutions/schools': {
    title: 'Energy Management Software for Schools',
    description:
      'Edviro finds energy waste in every school, drafts the work order, and verifies the fix on the meter. Work orders, assets, inspections, and capital planning for K-12 districts.',
  },
  '/solutions/data-centers': {
    title: '24/7 Monitoring and Optimization for Data Centers',
    description:
      'Edviro reads the telemetry your controls already produce, cuts through alarm noise, and gives operators a short list of what to fix. Calibrated physics models answer what-if questions like cooling headroom.',
  },
  '/solutions/real-estate': {
    title: 'Energy management for commercial real estate',
    description:
      'Occupancy-aware HVAC and lighting from the WiFi, BMS, and meters you have. Your team approves each change. Edviro verifies it on the meter.',
  },
  '/solutions/healthcare': {
    title: 'Facilities operations software for healthcare',
    description:
      'Edviro reads the BMS, meters, and loggers you have. It flags a room out of range, drafts the work order, and keeps the record surveyors ask for. Your team approves each change.',
  },
  '/solutions/construction': {
    title: 'Baselining and M&V for construction',
    description:
      'Independent energy baselining and M&V built into the build. Variances reach the contractor early. The owner receives a report at handover.',
  },
  '/faq': {
    title: 'Edviro FAQ',
    description:
      'Common questions about Edviro: what an AI-powered facilities operations platform does, how it works with your CMMS and BMS, and how it proves savings.',
  },
  '/about': {
    title: 'About Edviro',
    description:
      'Edviro started in California school districts and is a Y Combinator-backed team building an AI-powered facilities operations platform.',
  },
}

const all: ContentPage[] = [
  ...platform,
  ...solutions,
  ...industries,
  ...results,
  ...resources,
  ...company,
].map((page) => ({
  ...page,
  // The site name is appended by usePageSeo's title template.
  title: page.title.replace(/ \| Edviro$/, ''),
  ...ESTABLISHED_SEO[page.path],
}))

/** Every redesigned content page, in navigation order. */
export const contentPages = all

/** Look up a content page by its route path (no trailing slash). */
export const contentPage = (path: string): ContentPage | undefined =>
  all.find((page) => page.path === path)
