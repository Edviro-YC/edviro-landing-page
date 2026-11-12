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
 * established search intents stay intact. Descriptions can be tightened for clarity.
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
      'Track facility assets, inspections, documents and service history in Edviro. Plan maintenance and repair-or-replace decisions with your existing CMMS or ours.',
  },
  '/measurement-and-verification': {
    title: 'Measurement and Verification (M&V) for Buildings',
    description:
      'Measure building energy savings against a learned baseline. See how Edviro verifies fixes and projects with meter data and measurement and verification reports.',
  },
  '/capital-planning': {
    title: 'Capital Planning for School Facilities',
    description:
      'Plan school facility investments using asset history, work orders and energy data. Compare repairs, replacements and retrofits with Edviro before funding them.',
  },
  '/solutions/schools': {
    title: 'Energy Management Software for Schools',
    description:
      'Find school energy waste, approve work orders and verify fixes on the meter. Explore Edviro energy management software for schools and district facilities teams.',
  },
  '/solutions/data-centers': {
    title: '24/7 Monitoring and Optimization for Data Centers',
    description:
      'Turn data center telemetry into diagnosed alarms and cooling models. See how Edviro helps operators prioritize fixes and test capacity changes before acting.',
  },
  '/solutions/real-estate': {
    title: 'Energy management for commercial real estate',
    description:
      'Occupancy-aware HVAC and lighting from the WiFi, BMS, and meters you have. Your team approves each change. Edviro verifies it on the meter.',
  },
  '/solutions/healthcare': {
    title: 'Facilities operations software for healthcare',
    description:
      'Connect healthcare BMS and meter data to reviewed work orders and asset records. See how Edviro helps facilities teams diagnose problems and verify repairs.',
  },
  '/solutions/construction': {
    title: 'Baselining and M&V for construction',
    description:
      'Independent energy baselining and M&V built into the build. Variances reach the contractor early. The owner receives a report at handover.',
  },
  '/faq': {
    title: 'Facilities Software FAQ',
    description:
      'Common questions about Edviro: what an AI-powered facilities operations platform does, how it works with your CMMS and BMS, and how it proves savings.',
  },
  '/about': {
    title: 'About Our Facilities Software Team',
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
