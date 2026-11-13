import type { ContentPage } from './types'

const pages: ContentPage[] = [
  {
    path: '/solutions/real-estate',
    title: 'Commercial real estate | Edviro',
    description:
      'In office buildings Edviro reads occupancy from WiFi access points or its own occupancy sensors, drafts HVAC schedule changes for a person to approve, and checks the load change on the meter.',
    hero: {
      crumbs: [],
      label: 'Commercial real estate',
      title: 'Edviro for commercial real estate',
      lede: 'In office buildings, Edviro uses your WiFi access points or its own occupancy sensors to see which floors are in use. When a floor is empty and still being conditioned, it drafts an HVAC schedule change for a person on your team to approve, then checks the load change on the meter.',
      secondary: ['See an example', '#example'],
      note: 'Occupancy from WiFi access points or Edviro sensors. Works with any major BMS. A person approves every change.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is occupancy-aware energy management for commercial real estate?',
        answer:
          'It means comparing how many people are in each zone with how that zone is being heated, cooled and lit. Edviro gets occupancy from WiFi access points or from its own occupancy sensors, and reads HVAC mode and load from the BMS and meters. When a zone is empty and still in occupied mode, it drafts a setback and a restore rule. Nothing changes until a named person approves it, and each approved change is checked against a baseline of the same weekdays.',
      },
      {
        type: 'cards',
        title: 'How it works in an office',
        cards: [
          {
            title: 'Occupancy from WiFi or sensors',
            text: 'Edviro counts devices on the WiFi access points on each floor. It can also use its own occupancy sensors.',
          },
          {
            title: 'Connects to the BMS and meters',
            text: 'It reads the BMS, main meters and submeters. Edviro works with Niagara, Carrier i-Vu and all major BMS vendors.',
          },
          {
            title: 'A person approves',
            text: 'Each setback, restore rule or pre-cooling change is drafted with the evidence attached. A named person approves it before the BMS applies it.',
          },
          {
            title: 'Checked on the meter',
            text: 'Each change is compared with the baseline and reported as measured load.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'What it catches',
        cards: [
          {
            title: 'Empty zones in occupied mode',
            text: 'Floors and wings still being conditioned after people have left.',
          },
          {
            title: 'Weekend short cycling',
            text: 'A chiller cycling on and off with nobody in the building.',
          },
          {
            title: 'Lighting overrides',
            text: 'Lobby or floor lighting left on past its schedule.',
          },
          {
            title: 'Demand peaks',
            text: 'Edviro forecasts the daily peak from weather, occupancy and load, and drafts pre-cooling ahead of it.',
          },
        ],
      },
      {
        type: 'screen',
        id: 'example',
        label: 'Example',
        title: 'What your team sees',
        intro:
          'There is no alarm list. Each item is a diagnosed fix that is waiting for approval, in progress or verified. Verified changes also feed the capital plan, which ranks buildings, systems and retrofits by payback from measured use.',
        screen: {
          crumb: 'Fixes',
          heading: 'Tower A',
          count: '1 needs review',
          rows: [
            {
              title: 'Floor 4 East setback',
              meta: 'Tower A · Floor 4 East · empty after 6 pm, fix drafted',
              status: 'review',
            },
            {
              title: 'Chiller 2 short cycling',
              meta: 'Tower A · Chiller 2 · weekend cycling',
              status: 'progress',
            },
            {
              title: 'Lobby lighting override',
              meta: 'Tower A · Lobby · back on schedule',
              status: 'verified',
            },
          ],
        },
      },
      {
        type: 'cards',
        title: 'Who uses it',
        cards: [
          {
            title: 'Asset or portfolio manager',
            text: 'Sees which buildings waste the most and which retrofits pay back first.',
          },
          {
            title: 'Chief engineer',
            text: 'Gets each drafted fix with its evidence, and approves, edits or rejects it.',
          },
          {
            title: 'Property manager',
            text: 'Sets the restore rule, so a zone comes back on when it fills early and tenants stay comfortable.',
          },
          {
            title: 'Sustainability and ESG',
            text: 'Gets the measured load change for reporting.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Where does the occupancy data come from?',
            'From the WiFi access points on each floor, or from Edviro’s own occupancy sensors. Edviro compares occupancy with each zone’s HVAC and lighting mode. When they disagree, it drafts a schedule change with the evidence attached.',
          ],
          [
            'Does Edviro change setpoints or schedules on its own?',
            'No. A named person approves, edits or rejects each change. Approved changes go through your BMS schedule and are logged.',
          ],
          [
            'Will setbacks affect tenant comfort?',
            'Setbacks apply only to empty space. Your team sets the restore rule: first badge-in, first WiFi device, or a fixed time.',
          ],
          [
            'What systems does Edviro connect to?',
            'The BMS, main meters and submeters, and WiFi occupancy data. It works alongside the CMMS you already have. If you don’t have one, you can add Edviro’s work-order module.',
          ],
          [
            'How does Edviro reduce peak demand charges?',
            'It forecasts the daily peak and drafts pre-cooling or load shifting for approval. The avoided demand is then checked in interval meter data.',
          ],
          [
            'How does Edviro help prioritize capital projects?',
            'It simulates retrofits, replacements and controls upgrades against each building’s model and ranks them by payback from measured use.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'Measurement and verification',
            text: 'How a load change is checked on the meter.',
            href: '/measurement-and-verification',
          },
          {
            title: 'Capital planning',
            text: 'How retrofits are ranked by payback.',
            href: '/capital-planning',
          },
          {
            title: 'Integrations',
            text: 'BMS, meters, WiFi and CMMS connections.',
            href: '/integrations',
          },
        ],
      },
    ],
  },
  {
    path: '/solutions/healthcare',
    title: 'Healthcare facilities | Edviro',
    description:
      'What Edviro does in hospitals and clinics: it reads the BMS, meters and loggers you have, catches a critical space drifting out of range, drafts the fix for a person to approve, and keeps a dated record.',
    hero: {
      crumbs: [],
      label: 'Healthcare',
      title: 'Edviro for healthcare facilities',
      lede: 'Edviro reads the BMS, meters and temperature loggers you already have. When a room drifts out of range or a unit runs past its hours, it drafts the fix for a person on your team to approve, and it keeps the dated record surveyors ask for.',
      secondary: ['See what it catches', '#catches'],
      note: 'No new sensors. Critical spaces can be excluded. A person approves every change.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is facilities operations software for healthcare?',
        answer:
          'It is software that watches critical spaces such as operating rooms, isolation rooms and pharmacy coolers, and gets drift in front of someone who can fix it. Edviro reads existing BMS points, meters and temperature loggers. When pressure, temperature or humidity goes out of range, it names the likely cause, drafts the fix, and keeps the readings, fixes and tests together with their dates. It does not control critical spaces on its own and does not certify compliance.',
      },
      {
        type: 'cards',
        id: 'catches',
        title: 'What it catches',
        cards: [
          {
            title: 'Pressure drift',
            text: 'An AII room or OR trending toward neutral pressure.',
          },
          {
            title: 'Temperature and humidity',
            text: 'An OR outside 68–75 °F or 20–60% RH, or a vaccine cooler outside 2–8 °C.',
          },
          {
            title: 'After-hours runtime',
            text: 'Clinics and offices being conditioned all night.',
          },
          {
            title: 'Heating against cooling',
            text: 'Reheat working against the chiller on the same air handler.',
          },
          {
            title: 'Tests and inspections due',
            text: 'Generator load tests coming due, and filter changes past their interval.',
          },
          {
            title: 'Repeat failures',
            text: 'The same fan, pump or damper failing three times in a year.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'Work orders, assets and field work',
        intro:
          'Edviro works alongside the CMMS you have. If you don’t have one, you can add ours: asset logging is free with the AI Crew subscription, and work orders is a paid module.',
        cards: [
          {
            title: 'Work orders',
            text: 'A request from nursing or EVS, or a BMS alarm, gets a cause, a priority and a named reviewer.',
            href: '/work-orders',
          },
          {
            title: 'Assets and inspections',
            text: 'Each air handler, exhaust fan and cooler has its nameplate, history and next test date. When a surveyor asks, it is one search.',
            href: '/asset-management',
          },
          {
            title: 'In the field',
            text: 'The technician gets the assignment, the asset history and the steps on a phone.',
          },
        ],
      },
      {
        type: 'rows',
        title: 'Energy in support spaces',
        intro:
          'Critical spaces have to run to the standard around the clock. Clinics, offices and other support spaces can follow a schedule, so that is where Edviro looks for energy savings.',
        rows: [
          [
            '193 vs 70 kBtu/sq ft',
            'Energy use in inpatient buildings compared with all commercial buildings (EIA CBECS 2018).',
          ],
          [
            'Example finding',
            'Night load is up 31% at a medical office building, seen on the main meter over 7 days.',
          ],
          [
            'Example fix',
            'An AHU schedule fix cuts kWh by 16%, checked over 60 days against the baseline.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'What Edviro does not do',
        cards: [
          {
            title: 'It doesn’t replace your monitors',
            text: 'Pressure monitors, loggers and the BMS stay as they are. Edviro reads them.',
          },
          {
            title: 'It doesn’t change anything on its own',
            text: 'No setpoint, schedule or damper changes without a person approving it. Critical spaces can be excluded entirely.',
          },
          {
            title: 'It doesn’t certify compliance',
            text: 'Edviro keeps the readings, work orders and tests on record. Your team and your surveyor decide what they mean.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'Who uses it',
        cards: [
          {
            title: 'Director of facilities',
            text: 'Sees every open issue with its cause, priority, owner and age.',
          },
          {
            title: 'HVAC and BMS technicians',
            text: 'Get assignments on a phone, with the asset history and steps.',
          },
          {
            title: 'Safety officer and EOC committee',
            text: 'Get readings, tests and fixes with dates and names.',
          },
          {
            title: 'Finance',
            text: 'Sees verified savings and cost in the same place.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Do we need new sensors?',
            'No. Edviro reads the BMS points, meters and loggers you have. Where a space has no sensor, it tells you about the gap and makes no guess.',
          ],
          [
            'Does Edviro control HVAC in critical spaces?',
            'No. A named person approves, edits or rejects every drafted fix. Critical spaces can be excluded entirely.',
          ],
          [
            'Does Edviro make us compliant?',
            'No. It keeps readings, work orders and tests on a dated record. Your team and your surveyor decide what they mean.',
          ],
          [
            'Can we keep our CMMS?',
            'Yes. Edviro routes work into it and reads the outcome back. We confirm the integration scope system by system.',
          ],
          [
            'What are the security and hosting options?',
            'SOC 2 is in progress. Zero data retention, air-gapped and on-premises deployments are available.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'Work orders',
            text: 'How work is reviewed, dispatched and verified.',
            href: '/work-orders',
          },
          {
            title: 'Asset management',
            text: 'Asset records, tests and fix history.',
            href: '/asset-management',
          },
          {
            title: 'Integrations',
            text: 'BMS, loggers, meters and CMMS connections.',
            href: '/integrations',
          },
        ],
      },
    ],
  },
  {
    path: '/solutions/construction',
    title: 'Construction | Edviro',
    description:
      'Edviro fits an independent energy baseline during fit-out, compares the building with its design model each week, and gives the owner an M&V report and a calibrated baseline at handover.',
    hero: {
      crumbs: [],
      label: 'Construction',
      title: 'Baselining and M&V for construction',
      lede: 'Edviro fits an independent energy baseline during fit-out and measures the building against it. The contractor sees a variance while still on site, and the owner gets an M&V report at handover. We have piloted baselining and M&V with a construction company.',
      secondary: ['How it works', '#how'],
      note: 'Independent baseline. Weekly comparison with the design model. M&V report at handover.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is independent energy baselining and M&V for construction?',
        answer:
          'Independent baselining means fitting an energy model to a new building’s own metered data and weather during fit-out, before anyone moves in. Each week Edviro compares measured performance with the design model. Variances go to the general contractor with the evidence, while they are still cheap to fix. At handover the owner gets an M&V report and a calibrated baseline, and Edviro goes on checking the building against that baseline afterwards.',
      },
      {
        type: 'rows',
        id: 'how',
        title: 'How it works',
        rows: [
          ['Design model', 'The engineer’s model is the reference.'],
          ['Baseline locked', 'We fit the baseline to metered data during fit-out.'],
          [
            'Variance found',
            'We compare measured use with the model every week and send deviations to the GC.',
          ],
          [
            'Commissioning fix',
            'The fix is tracked as work. The following weeks show whether it held.',
          ],
          ['Handover', 'The owner receives the M&V report and the calibrated baseline.'],
          [
            'Ongoing verification',
            'The same baseline keeps checking the building after occupancy.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Who uses it',
        cards: [
          {
            title: 'General contractor',
            text: 'Gets variances with evidence while still on site.',
          },
          {
            title: 'Owner or developer',
            text: 'Gets an independent record of how the building performs.',
          },
          {
            title: 'Commissioning agent or MEP engineer',
            text: 'Gets measured data to set against the design model.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'After handover',
        intro:
          'The owner keeps the calibrated baseline and the asset records. Edviro goes on comparing the building with that baseline after occupancy, and a person approves every change.',
        cards: [
          {
            title: 'Measurement and verification',
            text: 'How the baseline is built.',
            href: '/measurement-and-verification',
          },
          {
            title: 'M&V methodology',
            text: 'How a saving gets counted.',
            href: '/results/methodology',
          },
          {
            title: 'Capital planning',
            text: 'How the owner ranks what to do next.',
            href: '/capital-planning',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'What is an energy baseline and why does it matter?',
            'It’s a model of how a building uses energy, fit to its metered data and weather. Every later performance or savings claim is measured against it.',
          ],
          [
            'How does Edviro provide independent M&V?',
            'It compares measured performance with the baseline each week. Variances go to the GC as they appear, and the owner gets a written report.',
          ],
          [
            'Does Edviro keep working after handover?',
            'Yes. The same baseline and the same checks continue after occupancy.',
          ],
          [
            'Can Edviro support performance guarantees and incentives?',
            'It produces M&V documentation an owner can submit for guarantees, utility incentives and financing reviews. Whether it is accepted is each program’s decision.',
          ],
          [
            'How does the as-built model compare to the design model?',
            'Edviro builds a model of the building as it actually performs and checks it against the design model during the build.',
          ],
          [
            'Has Edviro done this on a real project?',
            'We have piloted baselining and M&V with a construction company.',
          ],
        ],
      },
    ],
  },
]

export default pages
