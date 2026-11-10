import type { ContentPage } from './types'

const pages: ContentPage[] = [
  {
    path: '/results',
    title: 'Customer results | Edviro',
    description:
      'Edviro has saved customers $500K and runs at 134 sites. A live high-school site cut energy use 21.4% against its weather-adjusted baseline. Published results so far are from schools.',
    hero: {
      crumbs: [],
      label: 'Customer results',
      title: 'What Edviro has measured so far',
      lede: 'Edviro has saved customers $500K and runs at 134 sites. One live high-school site cut energy use 21.4% against its weather-adjusted baseline. The results we can publish so far are from schools.',
      secondary: ['How we measure savings', '/results/methodology'],
    },
    sections: [
      {
        type: 'answer',
        question: 'What results has Edviro delivered?',
        answer:
          'Edviro has saved customers $500K and runs at 134 sites. A live high-school site cut energy use 21.4% against its weather-adjusted baseline. We count a saving only after the meter confirms it, and we check again over 90 days to see that it held. The results published so far are from schools.',
      },
      {
        type: 'stats',
        title: 'The numbers so far',
        items: [
          ['$500K', 'Saved for customers'],
          ['134', 'Sites'],
          ['−21.4%', 'Energy use against the weather-adjusted baseline at a live high-school site'],
        ],
      },
      {
        type: 'chips',
        title: 'School districts using Edviro',
        intro:
          'Edviro started in Northern California schools, and these are the two districts we can name.',
        items: [
          'Palo Alto Unified School District',
          'Los Gatos-Saratoga Union High School District',
        ],
        note: 'Edviro is backed by Y Combinator.',
      },
      {
        type: 'cards',
        title: 'What we can show today',
        intro:
          'Three things we have seen at schools, and one data center scenario that is an illustration.',
        cards: [
          {
            tag: 'Education',
            title: 'A live high-school site',
            text: 'The site cut energy use 21.4% against its weather-adjusted baseline. The facilities team approved each fix, and the meter confirmed the result.',
            href: '/solutions/schools/k-12',
          },
          {
            tag: 'Education',
            title: 'One day of gas use at a school',
            text: 'The gas meter read 76 therms in a day against 16.7 expected, which is 357% over. The likely cause was a hot-water valve stuck open.',
          },
          {
            tag: 'Education',
            title: 'One outlier among seven schools',
            text: 'In one district of seven schools, one school used five times the energy of its peers. We wrote it up on the blog.',
            href: 'https://blog.edviroenergy.com',
          },
          {
            tag: 'Illustrative scenario',
            title: 'Data center alarm diagnosis',
            text: 'This is a product scenario with made-up data. In it, 312 BMS alarms trace to 1 root cause, a chilled-water valve on CRAH-2, and the cooling model is accurate to ±0.4 °C. Data centers are newer for us: we began working with our first data center operators in 2026.',
            href: '/solutions/data-centers/alarm-diagnosis',
          },
        ],
      },
      {
        type: 'steps',
        title: 'How a saving gets counted',
        steps: [
          {
            title: 'Baseline',
            text: 'We fit a model to the building’s meter data, weather, schedules and tariffs. It predicts what the building would have used.',
          },
          {
            title: 'Measure',
            text: 'From the moment a fix lands, we track actual use against that prediction.',
          },
          {
            title: 'Re-check',
            text: 'We check the saving again over 90 days. If it slips, the fix is reopened.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'How much has Edviro saved its customers?',
            '$500K so far, measured against each building’s baseline. Edviro runs at 134 sites.',
          ],
          [
            'How are Edviro’s savings verified?',
            'We measure each fix and project against a baseline adjusted for weather and schedule, then re-check over 90 days to see that the saving held. The M&V methodology page explains the method.',
          ],
          [
            'Do you have results outside schools?',
            'None published yet. We began working with our first data center operators in 2026, and we have piloted baselining and M&V with a construction company. The data center scenario on this page is an illustration.',
          ],
          [
            'Are the numbers in product screenshots real results?',
            'No. Product screens on this site use made-up data. Customer results are the ones listed on this page.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'M&V methodology',
            text: 'The method written out, so a board, auditor or lender can check it.',
            href: '/results/methodology',
          },
          {
            title: 'Measurement and verification',
            text: 'How each fix and project is checked on the meter.',
            href: '/measurement-and-verification',
          },
        ],
      },
    ],
  },
  {
    path: '/results/methodology',
    title: 'M&V methodology | Edviro',
    description:
      'How Edviro measures savings: a baseline model for each building, actual use tracked against it from the day a fix lands, and a re-check through 90 days before a saving stays counted.',
    hero: {
      crumbs: [['Results', '/results']],
      label: 'M&V methodology',
      title: 'How Edviro measures savings',
      lede: 'This is the method behind every savings number we report: what the baseline is, what we measure, when a saving is counted and when it is thrown out. It is written out so your board, auditor or lender can check it.',
      secondary: ['See the method', '#method'],
    },
    sections: [
      {
        type: 'answer',
        question: 'What is measurement and verification (M&V)?',
        answer:
          'M&V is how you find out whether a change actually saved energy. You build a baseline, which is a prediction of what the building would have used with no change. You measure what it did use. The saving is the difference. Edviro runs this check continuously on every fix and project, against a baseline adjusted for weather and schedule.',
      },
      {
        type: 'steps',
        id: 'method',
        title: 'How it works',
        steps: [
          {
            title: 'Baseline',
            text: 'A model learns how each building normally uses energy and predicts what it would have used.',
          },
          {
            title: 'Measure',
            text: 'From the moment a fix lands, we track real consumption at that site against the prediction. We do this for work orders as well as projects.',
          },
          {
            title: 'Report',
            text: 'The report gives the difference, how it was calculated and whether it held.',
          },
        ],
      },
      {
        type: 'chips',
        title: 'What goes into the baseline',
        intro:
          'The baseline is a model of one building. We fit it to that building’s historical and live meter data, along with weather, schedules, occupancy and tariffs. It answers one question: what would this building have used if nothing had changed?',
        items: ['Meter data', 'Weather', 'Schedules', 'Occupancy', 'Tariffs'],
      },
      {
        type: 'cards',
        title: 'When a saving is counted and when it is thrown out',
        cards: [
          {
            title: 'Checked through 90 days',
            text: 'We re-check each saving through 90 days after the fix. A saving the meter doesn’t confirm isn’t counted.',
          },
          {
            title: 'Reopened if it slips',
            text: 'If the saving slips or the problem comes back, the work reopens with the evidence attached.',
          },
          {
            title: 'Who reviews the report',
            text: 'The facilities director and the business office review each report.',
          },
        ],
      },
      {
        type: 'screen',
        title: 'Sample savings report',
        intro: 'The data here is made up to show the layout. It is not a customer result.',
        screen: {
          crumb: 'Reports',
          heading: 'Savings report · FY26 Q3',
          count: '3 sites',
          rows: [
            {
              title: 'Electricity −14% kWh',
              meta: '3 sites · measured against baseline',
              status: 'verified',
            },
            {
              title: 'Gas −9% therms',
              meta: '3 sites · measured against baseline',
              status: 'verified',
            },
            {
              title: 'Savings held through 90 days',
              meta: 'Persistence check',
              status: 'verified',
            },
            {
              title: '1 measure reopened',
              meta: 'Reopened with evidence',
              status: 'progress',
            },
          ],
        },
      },
      {
        type: 'cards',
        title: 'What gets verified in each market',
        cards: [
          {
            title: 'Schools',
            text: 'Measured savings for every site, which the district can show its board. This is where our published results come from.',
            href: '/solutions/schools',
          },
          {
            title: 'Data centers',
            text: 'The cooling model’s predictions are checked against measured pod telemetry before anyone relies on a headroom number.',
            href: '/solutions/data-centers',
          },
          {
            title: 'Construction',
            text: 'The baseline is fit during fit-out, so the owner and lender have a measured reference from handover. We have piloted this with a construction company.',
            href: '/solutions/construction',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'How is an energy baseline created?',
            'We fit a model to the building’s historical and live meter data, accounting for weather, schedules, occupancy and tariffs.',
          ],
          [
            'Can an auditor check the numbers?',
            'Yes. Every reported saving ties back to metered data and a documented baseline, and the report shows the method.',
          ],
          [
            'How does Edviro know its fixes actually saved energy?',
            'It checks meter data and the bill against the baseline. If the change didn’t deliver, Edviro flags it.',
          ],
          [
            'Does verification apply to work orders?',
            'Yes. When a work order comes from a detected problem, the data has to show the condition stopped before it stays closed. Otherwise it reopens.',
          ],
        ],
      },
    ],
  },
]

export default pages
