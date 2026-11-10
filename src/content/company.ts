import foundersAtYc from '@/assets/img/founders-yc.jpg'
import type { ContentPage } from './types'

const YC_JOBS = 'https://www.ycombinator.com/companies/edviro/jobs'

const pages: ContentPage[] = [
  {
    path: '/about',
    title: 'About | Edviro',
    description:
      'Edviro started with one high school’s facilities team in Northern California. It now runs at 134 sites and is part of Y Combinator’s Summer 2026 batch.',
    hero: {
      label: 'About',
      title: 'About Edviro',
      lede: 'Edviro started with one high school’s facilities team in Northern California. Today we run at 134 sites, we’re based in San Francisco, and we’re part of Y Combinator’s Summer 2026 batch.',
      secondary: ['Meet the founders', '#team'],
    },
    sections: [
      {
        type: 'stats',
        items: [
          ['2025', 'Founded'],
          ['134', 'Sites'],
          ['$500K', 'Saved for customers'],
          ['S26', 'Y Combinator batch'],
        ],
      },
      {
        type: 'prose',
        title: 'How it started',
        image: {
          src: foundersAtYc,
          alt: 'Hursh Shah and Tanuj Siripurapu standing either side of a Y Combinator sign',
          width: 1400,
          height: 1171,
          caption: 'Hursh (left) and Tanuj at Y Combinator.',
        },
        blocks: [
          'Edviro began when Hursh was working with the facilities team at his own high school. The school had plenty of smart controls and a building management system, and it was still wasting a lot of energy. The data that would have shown where was scattered across meters, utility bills and control screens that nobody had time to read together.',
          'So he built the facilities manager a dashboard. It was useful enough that other schools in Northern California asked for it, and in 2025 Hursh and Tanuj turned it into a company. An early pilot across seven schools and 16 meters turned up hundreds of thousands of dollars in billing errors and wasted energy.',
          'The dashboard also taught us something. Facilities teams already have more screens and alarms than they have hours. What they are short on is someone to read the data, work out the cause and get the fix scheduled. That is the job Edviro does now: it watches the building, drafts the fix, waits for a person to approve it, and then checks the meter to see whether it worked.',
          'We joined Y Combinator in the summer of 2026. The same year we began working with our first data center operators, where the problems are different but the work is the same: too many alarms, and a small team deciding what to do about them.',
        ],
      },
      {
        type: 'chips',
        title: 'Districts we work with',
        items: [
          'Palo Alto Unified School District',
          'Los Gatos-Saratoga Union High School District',
        ],
      },
      {
        type: 'cards',
        id: 'team',
        title: 'The founders',
        cards: [
          {
            tag: 'Founder and CEO',
            title: 'Hursh Shah',
            text: 'Hursh started Edviro working alongside school facilities teams. Before that he co-authored a NeurIPS 2024 workshop paper on quantum vision transformers for MRI analysis, and at 16 he co-founded an AR aircraft-inspection startup, where he led AI and edge computing.',
          },
          {
            tag: 'Co-founder and CTO',
            title: 'Tanuj Siripurapu',
            text: 'Tanuj has been programming since he was nine. At RTX he worked on low-latency neural-network inference on FPGA hardware for RF signal classification. He leads Edviro’s integrations and deployment engineering.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'How we work',
        cards: [
          {
            title: 'A person approves every change',
            text: 'Edviro drafts the fix. Someone on your team decides whether it happens.',
          },
          {
            title: 'We count what the meter confirms',
            text: 'A saving goes in the report only after the building data shows it, measured against that building’s own baseline.',
          },
          {
            title: 'Security',
            text: 'SOC 2 is in progress. Zero data retention, air-gapped, on-premises and regional hosting are available.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          { title: 'Careers', text: 'We’re hiring our first teammates.', href: '/careers' },
          { title: 'Customer results', text: 'What we’ve measured so far.', href: '/results' },
          { title: 'Contact', text: 'Sales, partnerships and press.', href: '/contact' },
        ],
      },
    ],
  },
  {
    path: '/careers',
    title: 'Careers | Edviro',
    description:
      'Edviro is two founders in San Francisco, backed by Y Combinator and hiring its first teammates. Open roles are listed on our Y Combinator page.',
    hero: {
      label: 'Careers',
      title: 'Careers at Edviro',
      lede: 'We’re two founders in San Francisco, backed by Y Combinator, and we’re hiring our first teammates. Roles are full-time, in San Francisco or remote in the US, and you’d work directly with both of us.',
      primary: ['See open roles', '#roles'],
      secondary: ['All roles on Y Combinator', YC_JOBS],
    },
    sections: [
      {
        type: 'cards',
        id: 'roles',
        title: 'Open roles',
        intro:
          'We post roles on our Y Combinator page, which has the full descriptions, pay ranges and the application form.',
        cards: [
          {
            tag: 'San Francisco or remote (US) · Full-time',
            title: 'Member of Technical Staff',
            text: 'Model electrical, thermal and energy systems from sparse, noisy data, and build the agents that act on them. You’d help lead our first data center deployments.',
            href: 'https://www.ycombinator.com/companies/edviro/jobs/PlLCBWC-member-of-technical-staff',
          },
          {
            tag: 'San Francisco or remote (US) · Full-time',
            title: 'Founding GTM',
            text: 'Find the right operators and buyers, run outreach and events, and move pilots to signed contracts alongside the founders.',
            href: 'https://www.ycombinator.com/companies/edviro/jobs/xuWBSdL-founding-gtm',
          },
          {
            title: 'All roles on Y Combinator',
            text: 'The current list, in case it has changed since this page was written.',
            href: YC_JOBS,
          },
        ],
      },
      {
        type: 'cards',
        title: 'What the work is like',
        cards: [
          {
            title: 'It runs in real buildings',
            text: 'What you build is tested against live sites: schools, campuses and our first data center pods.',
          },
          {
            title: 'You work with the founders',
            text: 'There are two of us. You’d be building and selling next to both.',
          },
          {
            title: 'We care about the work',
            text: 'For the technical role, send us something difficult you’ve built or researched and tell us what you contributed. That matters more to us than the length of a résumé.',
          },
        ],
      },
    ],
  },
  {
    path: '/contact',
    title: 'Contact | Edviro',
    description:
      'Contact Edviro: book a demo, write to partnerships and press, or sign in to the dashboard.',
    hero: {
      label: 'Contact',
      title: 'Contact us',
      lede: 'The quickest way to reach us is to book a demo on our calendar, or to email founders@edviroenergy.com.',
    },
    sections: [
      {
        type: 'cards',
        title: 'Ways to reach us',
        cards: [
          {
            title: 'Book a demo',
            text: 'Pick a 30-minute slot on our calendar.',
            href: '#demo',
          },
          {
            title: 'Partnerships and press',
            text: 'Write to founders@edviroenergy.com.',
            href: 'mailto:founders@edviroenergy.com',
          },
          {
            title: 'Existing customers',
            text: 'Sign in to the dashboard.',
            href: 'https://dash.edviroenergy.com',
          },
          {
            title: 'Jobs',
            text: 'Open roles are on our Y Combinator page.',
            href: YC_JOBS,
          },
        ],
      },
      {
        type: 'cards',
        title: 'For purchasing teams',
        cards: [
          {
            title: 'Public agencies',
            text: 'Edviro is available through Sourcewell.',
          },
          {
            title: 'Security review',
            text: 'SOC 2 is in progress. We can send a completed security questionnaire on request.',
          },
          {
            title: 'Billing',
            text: 'The AI Crew is a software subscription. Utility tracking, project management, asset logging and facilities scheduling can be added at no extra cost. Work orders is a paid module.',
          },
        ],
      },
    ],
  },
]

export default pages
