import { BLOG_URL, DASHBOARD_URL, LINKEDIN_URL, X_URL } from '@/seo/site'
import type { LinkPair } from './types'

export interface NavItem {
  label: string
  href: string
  groups: { title: string; links: LinkPair[] }[]
}

export const NAV: NavItem[] = [
  {
    label: 'Platform',
    href: '/facilities-operations',
    groups: [
      {
        title: 'Overview',
        links: [
          ['How Edviro works', '/facilities-operations'],
          ['Building intelligence', '/building-intelligence'],
          ['Integrations', '/integrations'],
        ],
      },
      {
        title: 'Operations',
        links: [
          ['Work orders', '/work-orders'],
          ['Asset management', '/asset-management'],
          ['All modules', '/modules'],
        ],
      },
      {
        title: 'Performance',
        links: [
          ['Measurement & verification', '/measurement-and-verification'],
          ['Capital planning', '/capital-planning'],
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions/schools',
    groups: [
      {
        title: 'Education',
        links: [
          ['Education overview', '/solutions/schools'],
          ['K–12 districts', '/solutions/schools/k-12'],
          ['Universities & campuses', '/solutions/schools/higher-ed'],
        ],
      },
      {
        title: 'Data centers',
        links: [
          ['Data centers overview', '/solutions/data-centers'],
          ['Cooling & capacity', '/solutions/data-centers/cooling'],
          ['Alarm diagnosis', '/solutions/data-centers/alarm-diagnosis'],
        ],
      },
      {
        title: 'More industries',
        links: [
          ['Commercial real estate', '/solutions/real-estate'],
          ['Healthcare', '/solutions/healthcare'],
          ['Construction', '/solutions/construction'],
        ],
      },
    ],
  },
  {
    label: 'Results',
    href: '/results',
    groups: [
      { title: 'Proof', links: [['Customer results', '/results']] },
      { title: 'Method', links: [['M&V methodology', '/results/methodology']] },
    ],
  },
  {
    label: 'Resources',
    href: '/faq',
    groups: [
      { title: 'Learn', links: [['Blog', BLOG_URL]] },
      {
        title: 'Answers',
        links: [
          ['FAQ', '/faq'],
          ['Glossary', '/glossary'],
        ],
      },
    ],
  },
  {
    label: 'Company',
    href: '/about',
    groups: [
      {
        title: 'Company',
        links: [
          ['About', '/about'],
          ['Careers', '/careers'],
        ],
      },
      {
        title: 'Get in touch',
        links: [
          ['Contact', '/contact'],
          ['Demo & pricing', '/book-a-demo'],
          ['Privacy', '/privacy'],
        ],
      },
    ],
  },
]

/**
 * Footer columns. The Education column keeps every school-specific route
 * (the pages that rank for school searches) linked from every page.
 */
export const FOOTER: { title: string; links: LinkPair[] }[] = [
  {
    title: 'Platform',
    links: [
      ['How Edviro works', '/facilities-operations'],
      ['Building intelligence', '/building-intelligence'],
      ['Work orders', '/work-orders'],
      ['Asset management', '/asset-management'],
      ['Measurement & verification', '/measurement-and-verification'],
      ['Capital planning', '/capital-planning'],
      ['Integrations', '/integrations'],
      ['Modules', '/modules'],
    ],
  },
  {
    title: 'Solutions',
    links: [
      ['Education', '/solutions/schools'],
      ['Data centers', '/solutions/data-centers'],
      ['Commercial real estate', '/solutions/real-estate'],
      ['Healthcare', '/solutions/healthcare'],
      ['Construction', '/solutions/construction'],
    ],
  },
  {
    title: 'Education',
    links: [
      ['K–12 districts', '/solutions/schools/k-12'],
      ['Universities & campuses', '/solutions/schools/higher-ed'],
      ['School work order software', '/school-work-order-software'],
      ['CMMS for schools', '/cmms-for-schools'],
      ['School asset management software', '/school-asset-management-software'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Customer results', '/results'],
      ['M&V methodology', '/results/methodology'],
      ['Blog', BLOG_URL],
      ['FAQ', '/faq'],
      ['Glossary', '/glossary'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Careers', '/careers'],
      ['Contact', '/contact'],
      ['Demo & pricing', '/book-a-demo'],
      ['Privacy', '/privacy'],
      ['Dashboard login', DASHBOARD_URL],
      ['LinkedIn', LINKEDIN_URL],
      ['X', X_URL],
    ],
  },
]
