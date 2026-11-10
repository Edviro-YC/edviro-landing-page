import type { ContentPage, Crumb, Section } from './types'

const PLATFORM: Crumb = ['Platform', '/facilities-operations']

const WORKS_WITH: Section = {
  type: 'chips',
  label: 'Works with what you already have',
  items: [
    'Modern BMS',
    'Legacy controls',
    'Interval meters',
    'Utility bills and Green Button',
    'Your CMMS',
    'Mobile app',
  ],
}

const GETTING_STARTED: Section = {
  type: 'rows',
  title: 'Getting started',
  intro:
    'The first findings come from utility bills and interval meter data. Nothing is installed.',
  rows: [
    [
      'Week 1: bills and meters',
      'We start with your utility bills and interval meter data. That’s enough for the first findings.',
    ],
    [
      'Next: BMS, assets, work orders',
      'Connecting BMS data, an asset list and a work-order export lets Edviro tie a problem to a piece of equipment and its repair history.',
    ],
    ['Then: expand', 'Add sites and modules once the first step has paid for itself.'],
  ],
}

const pages: ContentPage[] = [
  {
    path: '/facilities-operations',
    title: 'How Edviro works | Edviro',
    description:
      'How Edviro finds building problems, drafts a fix for a person to approve, and checks the result in the building data.',
    hero: {
      label: 'How Edviro works',
      title: 'How a building problem gets found, fixed and checked',
      lede: 'Edviro reads your utility data, building controls and maintenance records. When something goes wrong, it works out the likely cause and drafts a fix. A person on your team approves it, a technician does the work, and we check the building data afterwards to see that it held. You can start with the sites and systems you have now.',
      secondary: ['See the steps', '#loop'],
      note: 'No new hardware. Works with any vendor. A person approves every change.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is an AI-powered facilities operations platform?',
        answer:
          'It’s software that reads building data, work orders and asset records, spots problems, and helps the facilities team get them fixed and confirm the fix worked. Edviro works as an AI facilities crew: it does the watching and the follow-up around the clock, and a named person approves every change before it happens. We work with schools, campuses and data centers.',
      },
      {
        type: 'steps',
        id: 'loop',
        title: 'How it works',
        intro:
          'Edviro watches utility data, BMS and BAS points, and asset and maintenance logs around the clock, on any vendor’s equipment. Every problem goes through the same five steps.',
        steps: [
          {
            title: 'Signal',
            text: 'A request in the app or by email, an alarm, or a change on a meter.',
          },
          {
            title: 'Diagnose',
            text: 'Edviro works out the likely cause and attaches the evidence.',
          },
          {
            title: 'Review',
            text: 'A person on your team approves the drafted fix, edits it or rejects it.',
            tag: 'Human',
          },
          {
            title: 'Dispatch',
            text: 'The technician gets the location, the equipment history and the steps.',
          },
          { title: 'Verify', text: 'We check the building data to confirm the problem stopped.' },
        ],
      },
      {
        type: 'rows',
        label: 'Example',
        title: 'A rooftop unit left running overnight',
        intro: 'An example with made-up numbers.',
        rows: [
          ['Detect', 'After-hours load on the main meter is up 38%.'],
          ['Diagnose', 'A schedule override has left RTU-3 in occupied mode for four nights.'],
          ['Review', 'The facilities lead approves the drafted fix.'],
          ['Verify', 'Over the next 30 days, electricity use is 18% below the baseline.'],
        ],
      },
      {
        type: 'cards',
        title: 'The parts of the platform',
        intro:
          'You can use any one of these on its own. They share the same data, so each works better when the others are connected.',
        cards: [
          {
            title: 'Building intelligence',
            text: 'Flags problems as they start and names the likely cause.',
            href: '/building-intelligence',
          },
          {
            title: 'Work orders',
            text: 'One queue for requests and detected problems. A person approves each order, and it closes when the data shows the fix worked.',
            href: '/work-orders',
          },
          {
            title: 'Asset management',
            text: 'A record for each piece of equipment: nameplate, documents, service history and cost.',
            href: '/asset-management',
          },
          {
            title: 'Measurement & verification',
            text: 'Measures each fix and project against a baseline learned from your meter data.',
            href: '/measurement-and-verification',
          },
          {
            title: 'Capital planning',
            text: 'Models a replacement or retrofit on your own usage before you fund it.',
            href: '/capital-planning',
          },
        ],
      },
      {
        type: 'panels',
        title: 'What it looks like in schools and data centers',
        panels: [
          {
            tag: 'Education',
            title: 'Schools and campuses',
            text: 'Edviro started in Northern California schools, where a small team covers many small sites. In our Room 214 example, a custodian reports a cold classroom, Edviro traces it to a rooftop unit’s heating stage, and the room is back to temperature the same morning.',
            link: ['Edviro for education', '/solutions/schools'],
          },
          {
            tag: 'Data centers',
            title: 'Data centers',
            text: 'This is newer for us: we began working with our first data center operators in 2026. In one example, 312 BMS alarms trace back to a single sticking valve on CRAH-2. Edviro also models cooling to ±0.4 °C, so you can check headroom before you add racks.',
            link: ['Edviro for data centers', '/solutions/data-centers'],
          },
        ],
      },
      {
        type: 'cards',
        title: 'What Edviro can and can’t change',
        cards: [
          {
            title: 'A person approves every change',
            text: 'Schedule changes, setpoint changes, emails and work orders all wait for a named reviewer.',
          },
          {
            title: 'It doesn’t replace your team',
            text: 'Your staff, engineers and contractors still do the work, and your building controls stay in place.',
          },
          {
            title: 'Savings are measured',
            text: 'We count a saving only after the meter confirms it against the baseline.',
          },
        ],
      },
      GETTING_STARTED,
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Which industries does Edviro serve?',
            'Edviro started in K–12 schools, and education is where we have the most deployment history. It also covers higher education, data centers, commercial real estate, healthcare and construction. Data centers are newer for us: we began working with our first operators in 2026.',
          ],
          [
            'Do we need to replace our CMMS?',
            'No. Edviro can be your work-order and asset system. Or you can keep your CMMS: Edviro diagnoses the problem, sends the work into it and reads the outcome back to verify the fix.',
          ],
          [
            'What data does Edviro need to start?',
            'Utility bills and interval meter data. BMS data, an asset list and a work-order export help later. Nothing is installed before the first report.',
          ],
          [
            'Does Edviro operate building systems on its own?',
            'No. Schedule and setpoint changes, emails and work orders are drafted, then wait for a named person to approve them.',
          ],
          [
            'How does Edviro prove results?',
            'Each fix is measured against a baseline learned from the building’s own data and adjusted for weather and schedule. If the problem comes back, the work reopens with the evidence attached.',
          ],
        ],
      },
    ],
  },
  {
    path: '/building-intelligence',
    title: 'Building intelligence | Edviro',
    description:
      'Edviro learns a baseline for each site, flags anomalies as they start and names the likely cause, with the evidence.',
    hero: {
      crumbs: [PLATFORM],
      label: 'Building intelligence',
      title: 'Fault detection that names the likely cause',
      lede: 'Edviro learns a baseline for each site from its meters, BMS points, bills and weather. When something drifts from that baseline, Edviro flags it and names the likely cause, with the evidence. A person reviews the fix before anything is dispatched.',
      secondary: ['How it works', '#how'],
    },
    sections: [
      {
        type: 'answer',
        question: 'What is automated fault detection and diagnostics?',
        answer:
          'Automated fault detection and diagnostics (AFDD) is software that watches building data all the time and flags equipment or schedules that are behaving abnormally. Edviro learns a baseline for each site, adjusted for weather and schedule, and looks for departures from it in meter, BMS and alarm data. When it finds one, it names the likely cause and shows the evidence.',
      },
      {
        type: 'steps',
        id: 'how',
        title: 'How it works',
        steps: [
          {
            title: 'Learn',
            text: 'Edviro builds a baseline for each site from meter data, weather, schedules and tariffs.',
          },
          {
            title: 'Detect',
            text: 'It flags anomalies as they start, at any hour, on any vendor’s system.',
          },
          {
            title: 'Diagnose',
            text: 'It names the likely cause and shows the evidence: runtime, setpoints, the calendar.',
          },
          { title: 'Review', text: 'A named person approves the drafted fix.', tag: 'Human' },
          { title: 'Verify', text: 'The building data shows whether the condition stopped.' },
        ],
      },
      {
        type: 'cards',
        title: 'What you get',
        cards: [
          {
            title: 'Anomaly detection',
            text: 'After-hours runtime, short cycling, demand spikes, and gas or water use nobody expected.',
          },
          {
            title: 'A likely cause, with evidence',
            text: 'For example: “Runtime from 11 pm to 6 am on four nights, setpoint held at 68°F, no calendar event on site.”',
          },
          {
            title: 'No alarms, just fixes',
            text: 'Edviro has no alarms tab. Related alarms are grouped under the fault that caused them, and your team gets one fix to review.',
          },
          {
            title: 'Forecasts',
            text: 'Days with a high risk of a demand peak or a comfort problem are flagged ahead of time.',
          },
        ],
      },
      {
        type: 'screen',
        title: 'What your team sees',
        intro: 'An example view with made-up data.',
        screen: {
          crumb: 'Fixes',
          heading: 'Open fixes',
          count: '1 needs review',
          rows: [
            {
              title: 'RTU-3 left in occupied mode overnight',
              meta: 'Site A · main meter · after-hours load up 38%',
              status: 'review',
            },
            {
              title: 'Boiler-2 short cycling',
              meta: 'Site B · cause found, technician on the way',
              status: 'dispatched',
            },
            {
              title: 'Lighting bank C on after hours',
              meta: 'Site A · fix confirmed in meter data',
              status: 'verified',
            },
          ],
        },
      },
      {
        type: 'panels',
        title: 'What it catches in schools and data centers',
        panels: [
          {
            tag: 'Education',
            title: 'Schools and campuses',
            text: 'At one school the gas meter read 76 therms in a day against 16.7 expected, a 357% jump. The likely cause was a hot-water valve stuck open.',
            link: ['Edviro for education', '/solutions/schools'],
          },
          {
            tag: 'Data centers',
            title: 'Data centers',
            text: 'An example: 312 BMS alarms that all trace to one cause, a sticking chilled-water valve on CRAH-2. The cooling model predicts supply temperature to ±0.4 °C, so the fix can be checked against the model. Data centers are newer for us. We began working with our first operators in 2026.',
            link: ['Edviro for data centers', '/solutions/data-centers'],
          },
        ],
      },
      {
        type: 'cards',
        title: 'Related parts of Edviro',
        cards: [
          {
            title: 'Work orders',
            text: 'Each diagnosis is drafted as a work order for someone to approve.',
            href: '/work-orders',
          },
          {
            title: 'Measurement & verification',
            text: 'Each fix is checked against the same baseline that caught the problem.',
            href: '/measurement-and-verification',
          },
          {
            title: 'Capital planning',
            text: 'Equipment that keeps faulting shows up in repair-or-replace decisions.',
            href: '/capital-planning',
          },
        ],
      },
      WORKS_WITH,
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'What data does diagnostics need?',
            'Utility bills and interval meter data are enough for the first findings. The diagnosis gets more specific as BMS points, an asset list and a work-order export are connected.',
          ],
          [
            'Do we need new sensors or a new BMS?',
            'No. Edviro works with any vendor’s BMS, modern or legacy. Nothing is installed before the first report.',
          ],
          [
            'Does Edviro change setpoints or schedules on its own?',
            'No. Schedule and setpoint changes, emails and work orders wait for a named person to review and approve them.',
          ],
          [
            'How is this different from BMS alarms?',
            'A BMS raises an alarm for each point. Edviro compares behavior with a learned baseline, groups the related alarms and names the likely cause, with the evidence attached. Your team gets one fix to review.',
          ],
          [
            'Does it work for data centers?',
            'Yes. In data centers Edviro traces alarm floods to their root cause and models cooling. In our example, 312 alarms trace to a single CRAH valve.',
          ],
        ],
      },
    ],
  },
  {
    path: '/work-orders',
    title: 'Work orders | Edviro',
    description:
      'Edviro drafts the work order, a person approves it, and building data shows whether the fix worked.',
    hero: {
      crumbs: [PLATFORM],
      label: 'Work orders',
      title: 'Work orders that close when the data shows the fix worked',
      lede: 'Requests, alarms and problems Edviro detects go into one queue. Edviro drafts the work order and a person approves it. After the technician finishes, Edviro checks the building data to see whether the problem stopped. You can use Edviro as your work-order system or connect it to the one you have.',
      secondary: ['How it works', '#how'],
      note: 'Work orders is a paid module on top of the AI Crew subscription.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is a closed-loop work order?',
        answer:
          'A closed-loop work order stays open until building data shows the problem has stopped. In Edviro, a request, alarm or detected anomaly opens the order, a named person approves it and a technician does the work. Edviro then checks the meter or BMS against the baseline, and if the condition comes back, the order reopens with the evidence.',
      },
      {
        type: 'steps',
        id: 'how',
        title: 'How it works',
        steps: [
          {
            title: 'Intake',
            text: 'A request, alarm, anomaly or inspection finding opens the order.',
          },
          {
            title: 'Triage',
            text: 'Edviro drafts the site, the likely asset, its history and a proposed priority.',
          },
          {
            title: 'Review',
            text: 'A named person approves, edits or rejects the order. Nothing is dispatched before that.',
            tag: 'Human',
          },
          {
            title: 'Dispatch and field',
            text: 'The technician gets the location, history and steps on a phone, and sends back photos and readings.',
          },
          {
            title: 'Close and verify',
            text: 'The cost is recorded on the asset. Building data confirms the fix, or the order reopens.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'What you get',
        cards: [
          {
            title: 'One queue',
            text: 'Requests and detected problems share a queue. A “too hot” request and a stuck damper in the data get matched as one problem.',
          },
          {
            title: 'Proposed priority',
            text: 'Each order comes with a suggested priority based on comfort, safety, cost, occupancy and the asset’s history.',
          },
          {
            title: 'Duplicates caught',
            text: 'A new request about work that’s already open is shown as a match and doesn’t become a second ticket.',
          },
          {
            title: 'Repeat-failure flags',
            text: 'When the same asset keeps failing, it’s flagged for repair-or-replace review.',
          },
        ],
      },
      {
        type: 'screen',
        title: 'The work-order queue',
        intro: 'An example view with made-up data.',
        screen: {
          crumb: 'Work orders',
          heading: 'Open work orders',
          count: '1 needs review',
          rows: [
            {
              title: 'RTU-3 heating stage not firing',
              meta: 'Site A · HVAC · high priority',
              status: 'review',
            },
            {
              title: 'Boiler-2 short cycling',
              meta: 'Site B · HVAC · medium priority',
              status: 'progress',
            },
            {
              title: 'Lighting bank C',
              meta: 'Site A · electrical · low priority',
              status: 'verified',
            },
          ],
        },
      },
      {
        type: 'rows',
        label: 'Example',
        title: 'A cold classroom',
        intro: 'An illustrative example of one order, start to finish.',
        rows: [
          ['Request', 'A custodian reports that Room 214 is freezing again.'],
          ['Diagnosis', 'The heating stage on RTU-3 isn’t firing. It’s the third time in 30 days.'],
          ['9:47 am', 'The facilities lead approves the work order.'],
          [
            '11:20 am',
            'The technician has replaced the igniter. Supply air reads 91°F, the room is back at 70°F, and the order closes as verified.',
          ],
        ],
      },
      {
        type: 'panels',
        title: 'Keep your CMMS or use ours',
        panels: [
          {
            tag: 'Replace',
            title: 'Use Edviro for work orders',
            text: 'Work orders, assets, inspections and mobile field workflows all run in Edviro. We import your lists and open work first.',
          },
          {
            tag: 'Connect',
            title: 'Keep your work-order system',
            text: 'Edviro sends the work into your system and reads the outcome back. It connects to SchoolDude, FMX, AssetWorks and other major CMMS platforms.',
            link: ['See integrations', '/integrations'],
          },
        ],
      },
      {
        type: 'cards',
        title: 'Related parts of Edviro',
        cards: [
          {
            title: 'Building intelligence',
            text: 'A detected problem opens a draft work order.',
            href: '/building-intelligence',
          },
          {
            title: 'Asset management',
            text: 'Labor, parts and cost are recorded on the asset.',
            href: '/asset-management',
          },
          {
            title: 'Measurement & verification',
            text: 'The check at the end of each order uses the same baseline.',
            href: '/measurement-and-verification',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'How do requests reach Edviro?',
            'Through the app and by email. Edviro also opens work itself when it detects a problem.',
          ],
          [
            'Does anything get dispatched without a person approving it?',
            'No. Edviro drafts the order with a proposed priority, trade and assignee. A named reviewer approves, edits or rejects it.',
          ],
          [
            'How does Edviro verify that completed work fixed the problem?',
            'Each order is tied to the signal or asset behind it. After the order closes, Edviro keeps watching the building and energy data against the baseline. If the condition comes back, the order reopens with the evidence.',
          ],
          [
            'Can Edviro work with the CMMS we already use?',
            'Yes. Edviro can diagnose the problem, send the work into your CMMS and read the outcome back.',
          ],
          [
            'Can technicians use Edviro in the field?',
            'Yes. Assignments, asset history, checklists, photos and readings are available on a phone or tablet, and technicians mark work complete on site.',
          ],
          [
            'Is Edviro a CMMS?',
            'It can be. If you want one system, you can run work orders, assets and inspections in Edviro. If you’d prefer to keep your CMMS, Edviro adds diagnosis and verification on top of it.',
          ],
        ],
      },
    ],
  },
  {
    path: '/asset-management',
    title: 'Asset management | Edviro',
    description:
      'A record for each asset with its nameplate, documents, service history, inspections and cost, which feeds the capital plan.',
    hero: {
      crumbs: [PLATFORM],
      label: 'Asset management',
      title: 'A record and service history for every piece of equipment',
      lede: 'Each asset has its nameplate, documents, service history, inspections and costs in one place, so when it fails again next year, the history is already there. Import the list you have and fill the gaps during the first inspections.',
      secondary: ['How it works', '#how'],
      note: 'Asset logging is a free module with your AI Crew subscription.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is facility asset management software?',
        answer:
          'It’s software that keeps a record for each piece of equipment a facilities team looks after. In Edviro, each record holds the nameplate, location, documents, service history with labor, parts and cost, and scheduled inspections. That history produces a repair-or-replace outlook, which goes into the capital plan.',
      },
      {
        type: 'steps',
        id: 'how',
        title: 'How it works',
        steps: [
          { title: 'Import', text: 'Bring in spreadsheets, CMMS exports and nameplate photos.' },
          {
            title: 'Map',
            text: 'Each asset is placed in a hierarchy: organization, site, building, system, asset.',
          },
          {
            title: 'Inspect',
            text: 'Technicians complete checklists and add photos and readings in the field.',
          },
          {
            title: 'Record',
            text: 'Every order, reading and cost is logged against the right asset.',
          },
          {
            title: 'Plan',
            text: 'Repeat failures and repair costs feed the repair-or-replace review.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'What you get',
        cards: [
          {
            title: 'One hierarchy',
            text: 'Site, building, system, asset. You can go from the whole portfolio down to a single rooftop unit.',
          },
          {
            title: 'Mobile tagging',
            text: 'Scan a nameplate and attach documents while you’re standing at the equipment.',
          },
          {
            title: 'Scheduled inspections',
            text: 'Inspections appear in the same queue as work orders. A finding opens an order for review.',
          },
          {
            title: 'Repair-or-replace outlook',
            text: 'Edviro tracks repeat failures, rising repair cost and age for each asset.',
          },
        ],
      },
      {
        type: 'rows',
        label: 'Example',
        title: 'A boiler that keeps failing',
        intro: 'An example with made-up figures.',
        rows: [
          [
            'History',
            'Boiler-2 has failed three times in 12 months, and its repair cost has risen for three years.',
          ],
          ['Decision', 'Its record flags it for replacement in FY27.'],
          ['Result', 'In the 60 days after the retrofit, gas use is 22% below the baseline.'],
        ],
      },
      {
        type: 'cards',
        title: 'Related parts of Edviro',
        cards: [
          {
            title: 'Work orders',
            text: 'Every order is logged on the asset it was for.',
            href: '/work-orders',
          },
          {
            title: 'Capital planning',
            text: 'Failure history and repair cost are used to rank projects.',
            href: '/capital-planning',
          },
          {
            title: 'Building intelligence',
            text: 'Each fault is tied to the asset that caused it.',
            href: '/building-intelligence',
          },
        ],
      },
      WORKS_WITH,
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'What does an asset record hold?',
            'The nameplate (make, model, serial number, install year), its location in the hierarchy, documents and manuals, service history with labor, parts and cost, scheduled inspections, and the repair-or-replace outlook.',
          ],
          [
            'How do inspections work?',
            'They’re scheduled against the asset and show up in the work-order queue. The technician follows a checklist on a phone and attaches photos and readings. Any finding opens a work order for a reviewer to approve.',
          ],
          [
            'How does the registry feed capital planning?',
            'Edviro tracks repeat failures, rising repair cost and age for each asset. That history, along with verified savings, is what the multi-year capital priorities are built from.',
          ],
          [
            'Can we import the asset list we already have?',
            'Yes. Spreadsheets, CMMS exports and nameplate photos are mapped into the hierarchy, and any gaps are flagged to fill in during the first inspections.',
          ],
          [
            'Do we have to replace our CMMS?',
            'No. Edviro can be your asset system, or it can read from and write to the one you keep. You can change that later.',
          ],
          [
            'Which equipment types are supported?',
            'Any building asset. In schools that’s boilers, RTUs, AHUs, chillers and lighting. In data centers it’s CRAH units, chillers, pumps and UPS.',
          ],
        ],
      },
    ],
  },
  {
    path: '/measurement-and-verification',
    title: 'Measurement & verification | Edviro',
    description:
      'Every fix and project is measured against a baseline learned from the building’s own data, with reports a board can read.',
    hero: {
      crumbs: [PLATFORM],
      label: 'Measurement & verification',
      title: 'Savings measured against each building’s own baseline',
      lede: 'Every fix and every project is measured against a baseline learned from how the building ran before. The report shows what changed, what it cost and whether the saving lasted. Reports are generated automatically, and every line traces back to metered data.',
      secondary: ['Read the methodology', '/results/methodology'],
    },
    sections: [
      {
        type: 'answer',
        question: 'What is measurement and verification (M&V)?',
        answer:
          'Measurement and verification is how you show an energy saving with meter data. You establish a baseline for how much energy the building would have used, measure what it actually used after a change, and report the difference. Edviro does this continuously, for every fix and project, against a baseline adjusted for weather and schedule.',
      },
      {
        type: 'steps',
        title: 'How it works',
        steps: [
          {
            title: 'Baseline',
            text: 'A model is fitted to the building’s meter data, weather, schedules and tariffs.',
          },
          {
            title: 'Measure',
            text: 'From the day a fix lands, actual consumption is tracked against the baseline.',
          },
          {
            title: 'Report',
            text: 'The report gives the difference, the method and whether the saving held.',
          },
          {
            title: 'Persist',
            text: 'Savings are re-checked over 90 days. If they don’t hold, the work reopens.',
          },
          { title: 'Plan', text: 'Verified results go into the capital plan as evidence.' },
        ],
      },
      {
        type: 'cards',
        title: 'What you get',
        cards: [
          {
            title: 'Continuous checks',
            text: 'Each fix is verified when it lands and re-checked afterwards.',
          },
          {
            title: 'Work orders too',
            text: 'A closed work order has to show in the data that the problem stopped.',
          },
          {
            title: 'Audit-grade',
            text: 'Every line in a report traces to metered data and a documented baseline.',
          },
          {
            title: 'Reports for the board',
            text: 'Electricity, gas, carbon and cost saved. Each report is signed off by a named engineer or facilities director.',
          },
          {
            title: 'Yearly goals',
            text: 'Set energy, budget and CO₂ targets for each year against a baseline year. Progress is tracked from meter data.',
          },
          {
            title: 'Forecasts',
            text: 'Demand and 12-month energy forecasts with confidence bands, compared with actuals as they come in.',
          },
          {
            title: 'Tied to projects',
            text: 'A report can stand alone or be tied to an efficiency project such as an LED retrofit, an HVAC upgrade or solar.',
          },
          {
            title: 'Bill-level detail',
            text: 'Each utility bill is broken down into energy, demand, fixed charges and credits.',
          },
        ],
      },
      {
        type: 'panels',
        title: 'What we’ve measured so far',
        intro: 'Edviro has saved customers $500K and runs at 134 sites.',
        panels: [
          {
            tag: 'Verified',
            title: '21.4% below baseline',
            text: 'One high school that’s live on Edviro cut its energy use 21.4% against its weather-adjusted baseline.',
            link: ['See customer results', '/results'],
          },
          {
            tag: 'Method',
            title: 'How we get the number',
            text: 'Savings are measured against a baseline fitted to the site’s metered data, weather, schedules and tariffs.',
            link: ['Read the methodology', '/results/methodology'],
          },
        ],
      },
      {
        type: 'cards',
        title: 'Related parts of Edviro',
        cards: [
          {
            title: 'Building intelligence',
            text: 'The same baseline is what detects the problem in the first place.',
            href: '/building-intelligence',
          },
          {
            title: 'Work orders',
            text: 'Every order ends with a verification check.',
            href: '/work-orders',
          },
          {
            title: 'Capital planning',
            text: 'Projected savings are checked against what actually happened.',
            href: '/capital-planning',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'How is an energy baseline created?',
            'Edviro fits a model to the building’s historical and live meter data, accounting for weather, schedules, occupancy and tariffs. Every fix and project is measured against it.',
          ],
          [
            'What makes M&V audit-grade or board-ready?',
            'Every reported saving ties back to measured data and a documented baseline, so someone outside the team can check how the number was reached.',
          ],
          [
            'How does Edviro know its fixes actually saved energy?',
            'It checks the meter data and the bill against the baseline. If a change didn’t deliver, Edviro flags it, and it isn’t counted as a saving.',
          ],
          [
            'Does verification apply to work orders or only energy projects?',
            'Both. A closed work order that came from a detected problem has to show the condition stopped, or it reopens with the evidence. Retrofits and capital projects get the same check.',
          ],
        ],
      },
    ],
  },
  {
    path: '/capital-planning',
    title: 'Capital planning | Edviro',
    description:
      'Simulate replacements, retrofits and schedule changes against a model of your building, and rank projects by payback on your own usage.',
    hero: {
      crumbs: [PLATFORM],
      label: 'Capital planning',
      title: 'Model a replacement or retrofit before you fund it',
      lede: 'Edviro builds a model of each building from its bills, meter readings, BMS points, asset records and work orders. You can simulate a replacement, a retrofit or a schedule change against that model, and rank capital projects by payback on your own usage.',
      secondary: ['How it works', '#how'],
    },
    sections: [
      {
        type: 'answer',
        question: 'What is capital planning software for buildings?',
        answer:
          'It’s software that helps a facilities team decide which building investments to fund, and in what order. Edviro builds a model of each building from bills, meters, BMS points, weather, tariffs, asset records and work orders, then simulates replacements, retrofits and schedule changes against it. Projects are ranked by payback on your actual usage, and the result is measured after the work is done.',
      },
      {
        type: 'steps',
        id: 'how',
        title: 'How it works',
        steps: [
          {
            title: 'Model',
            text: 'The model is recalibrated every night against metered data, with no extra setup.',
          },
          {
            title: 'Simulate',
            text: 'Try repair against replacement, retrofits, schedule changes and rate changes.',
          },
          { title: 'Decide', text: 'You get a ranked plan with the evidence behind each line.' },
          { title: 'Fund', text: 'Each project gets an owner, a funding source and a budget.' },
          { title: 'Verify', text: 'After install, the result is measured against the baseline.' },
        ],
      },
      {
        type: 'cards',
        title: 'What you get',
        cards: [
          {
            title: 'An operating model',
            text: 'A model of how the building actually runs, calibrated against the meter so it can answer “what if” questions.',
          },
          { title: '10-year cost', text: 'Projected from your metered use and your tariff.' },
          {
            title: 'History built in',
            text: 'Repeat failures and repair costs come from the work orders themselves.',
          },
          {
            title: 'Verified after',
            text: 'Every funded project is checked against the baseline once it’s installed.',
          },
        ],
      },
      {
        type: 'rows',
        label: 'Example',
        title: 'Two lines from a ranked plan',
        intro: 'An example with made-up figures.',
        rows: [
          [
            'Boiler-2',
            'Replacing it in FY27 costs $293k, against $412k to keep repairing it. Payback is 6.2 years.',
          ],
          [
            'Gym lighting',
            'Occupancy controls cost $119k, against $186k over 10 years to leave the lighting as it is. Payback is 3.1 years, based on measured after-hours use.',
          ],
          ['After install', 'Each funded project is measured against the baseline.'],
        ],
      },
      {
        type: 'cards',
        title: 'Related parts of Edviro',
        cards: [
          {
            title: 'Asset management',
            text: 'Failure history and repair cost go into the model.',
            href: '/asset-management',
          },
          {
            title: 'Measurement & verification',
            text: 'The same baseline is used to measure the result.',
            href: '/measurement-and-verification',
          },
          {
            title: 'Building intelligence',
            text: 'Each fix updates the model.',
            href: '/building-intelligence',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'What is a digital twin of a building?',
            'In Edviro it means an operating model of how your building actually behaves, built from bills, meters, BMS points, weather, tariffs, occupancy, asset records and every fix. It isn’t a 3D drawing.',
          ],
          [
            'Where does the maintenance history come from?',
            'From the work orders. Every order, inspection, repair and cost is logged against the asset, and repeat failures are flagged for repair-or-replace review.',
          ],
          [
            'What can Edviro simulate?',
            'Replacement against repair, controls upgrades and LED retrofits, schedule and setpoint changes, rate and tariff changes, and additions such as a new wing or an electrified fleet.',
          ],
          [
            'How do I know the projections are trustworthy?',
            'They use the same baseline as M&V, calibrated against your meter data. Every recommendation you act on is measured afterwards, so you can compare the projection with what happened.',
          ],
          [
            'How does this help with budget and bond planning?',
            'You bring the board a list ranked by modeled payback on your own data. Later you can show the measured results for what was funded.',
          ],
          [
            'Can data centers use capital planning?',
            'Yes. You can simulate cooling capacity and headroom before adding racks or replacing CRAH units and chillers.',
          ],
        ],
      },
    ],
  },
  {
    path: '/integrations',
    title: 'Integrations | Edviro',
    description:
      'Edviro connects to the building controls, meters, utility bills and work-order systems you already run. No hardware is installed.',
    hero: {
      crumbs: [PLATFORM],
      label: 'Integrations',
      title: 'What Edviro connects to',
      lede: 'Edviro connects to the building controls, meters, utility bills and work-order systems you run today. You don’t replace anything, and nothing is installed before the first findings.',
      secondary: ['See supported systems', '#systems'],
    },
    sections: [
      {
        type: 'answer',
        question: 'What systems does Edviro connect to?',
        answer:
          'Building management systems, modern and legacy, plus interval meters, utility bills, Green Button data and work-order systems. Edviro reads from these to detect and diagnose problems. Approved work goes into Edviro’s own work orders or into the CMMS you already use, and the outcome is read back to verify the fix.',
      },
      {
        type: 'steps',
        title: 'How data moves',
        steps: [
          {
            title: 'In',
            text: 'Modern BMS and legacy controls, interval meters, bills and Green Button data, and requests from staff through the app and by email.',
          },
          {
            title: 'Edviro',
            text: 'Edviro compares the data with a learned baseline and diagnoses the problem. A person approves the fix.',
            tag: 'Human',
          },
          {
            title: 'Out',
            text: 'Edviro work orders or your CMMS, updates on the technician’s phone, and M&V reports, budgets and the capital plan.',
          },
        ],
      },
      {
        type: 'chips',
        id: 'systems',
        title: 'Building controls',
        intro: 'Edviro reads modern BMS and legacy controls.',
        items: ['Niagara (Tridium)', 'Pelican', 'Carrier i-Vu', 'Other major BMS and BAS'],
      },
      {
        type: 'chips',
        title: 'Energy data',
        intro: 'Meters and bills are enough for the first findings in week one.',
        items: [
          'Interval meters',
          'Utility bills with line-item tariffs',
          'Green Button',
          'Solar export meters',
        ],
      },
      {
        type: 'panels',
        title: 'Keep your CMMS or use ours',
        panels: [
          {
            tag: 'Replace',
            title: 'Use Edviro as your CMMS',
            text: 'Work orders, assets, inspections and mobile field workflows all run in Edviro. We import your lists and open work first.',
            link: ['See the modules', '/modules'],
          },
          {
            tag: 'Connect',
            title: 'Keep your CMMS',
            text: 'Edviro sends the work into it and reads the outcome back. It connects to SchoolDude, FMX, AssetWorks and other major CMMS platforms.',
          },
        ],
      },
      {
        type: 'chips',
        title: 'For data center operators',
        intro: 'Edviro runs on top of the DCIM and BMS you already have.',
        items: ['DCIM', 'BMS', 'EPMS', 'PDU telemetry'],
        note: 'Edviro connects to all major DCIM, EPMS and PDU systems over open protocols or APIs. Connections are read-only by default.',
      },
      {
        type: 'cards',
        title: 'What Edviro can and can’t change',
        cards: [
          {
            title: 'Read-only connections',
            text: 'Connections are read-only by default. Nothing is written to the BMS without approval.',
          },
          {
            title: 'Approval before action',
            text: 'Schedule changes, setpoint changes, emails and work orders wait for a named reviewer.',
          },
          {
            title: 'Data handling',
            text: 'SOC 2 certification is in progress. We also offer zero data retention, air-gapped and on-premises deployments, and dedicated hosting regions, including the Middle East.',
          },
        ],
      },
      GETTING_STARTED,
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Do we need new hardware or a new BMS?',
            'No. Edviro reads the meters, BMS and utility bills you already have.',
          ],
          [
            'Which BMS vendors do you support?',
            'Niagara, Pelican, Carrier i-Vu and other major BMS and BAS vendors, modern and legacy.',
          ],
          [
            'Can we keep our CMMS?',
            'Yes. Edviro sends work into it and reads the outcome back. It connects to SchoolDude, FMX, AssetWorks and other major CMMS platforms.',
          ],
          [
            'Does Edviro write to our building systems?',
            'Only after a named person approves the change.',
          ],
          [
            'What if our system isn’t listed?',
            'Ask us. Edviro works with all major systems, and we confirm the details for your site on the demo call.',
          ],
        ],
      },
    ],
  },
  {
    path: '/modules',
    title: 'Modules | Edviro',
    description:
      'The AI Crew is the Edviro subscription. Utility tracking, project management, asset logging and facilities scheduling can be added at no extra cost. Work orders is a paid module.',
    hero: {
      crumbs: [PLATFORM],
      label: 'Modules',
      title: 'Modules you can add to the AI Crew',
      lede: 'The AI Crew is the Edviro subscription. It watches your buildings, drafts fixes for a person to approve and checks the result, and it works alongside the tools you already run. If you’re missing a tool, you can add an Edviro module for it. Four are free with the subscription, and work orders is a paid module.',
      secondary: ['How the AI Crew works', '/facilities-operations'],
    },
    sections: [
      {
        type: 'cards',
        title: 'The modules',
        intro: 'Four are free with the AI Crew subscription. Work orders is a paid module.',
        cards: [
          {
            tag: 'Free with the AI Crew',
            title: 'Utility tracking',
            text: 'Utility bills, interval meters and Green Button data.',
            href: '/modules#utility-tracking',
          },
          {
            tag: 'Free with the AI Crew',
            title: 'Project management',
            text: 'Capital projects with their budgets and schedules.',
            href: '/modules#project-management',
          },
          {
            tag: 'Free with the AI Crew',
            title: 'Asset logging',
            text: 'Your equipment, with its age and condition.',
            href: '/asset-management',
          },
          {
            tag: 'Free with the AI Crew',
            title: 'Facilities scheduling',
            text: 'Requests and bookings for gyms, fields and rooms.',
            href: '/facilities-scheduling',
          },
          {
            tag: 'Paid module',
            title: 'Work orders',
            text: 'Requests, dispatch and repair history.',
            href: '/work-orders',
          },
        ],
      },
      {
        type: 'cards',
        id: 'utility-tracking',
        title: 'Utility tracking',
        intro: 'Bills and meter data for every site, kept together.',
        cards: [
          {
            title: 'Bills, line by line',
            text: 'Each utility bill is broken down into energy, demand, fixed charges and credits.',
          },
          {
            title: 'Meters and Green Button',
            text: 'Interval meters, Green Button data and solar export meters are read alongside the bills.',
          },
          {
            title: 'Yearly goals',
            text: 'Set energy, budget and CO₂ targets for each year against a baseline year. Progress is tracked from meter data.',
          },
          {
            title: 'Forecasts',
            text: 'Demand and 12-month energy forecasts with confidence bands, compared with actuals as they come in.',
          },
        ],
      },
      {
        type: 'cards',
        id: 'project-management',
        title: 'Project management',
        intro: 'Each project records its owner, its funding and what it delivered.',
        cards: [
          {
            title: 'Owner, funding and budget',
            text: 'Each project records who owns it, where the money comes from and what it costs.',
          },
          {
            title: 'Drawn from the capital plan',
            text: 'Projects come from the ranked capital plan, with the evidence behind each one.',
            href: '/capital-planning',
          },
          {
            title: 'Verified after install',
            text: 'A savings report can be tied to the project, such as an LED retrofit, an HVAC upgrade or solar.',
            href: '/measurement-and-verification',
          },
        ],
      },
      {
        type: 'panels',
        title: 'Keep your tools or move them into Edviro',
        panels: [
          {
            tag: 'Keep',
            title: 'Connect the systems you run',
            text: 'The AI Crew sends work into the CMMS you keep and reads the outcome back to verify it.',
            link: ['See integrations', '/integrations'],
          },
          {
            tag: 'Consolidate',
            title: 'Run it in Edviro',
            text: 'Add a module where a tool is missing or getting old. We import your lists and open work first.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Do modules cost extra?',
            'Four of them don’t: utility tracking, project management, asset logging and facilities scheduling are included with your AI Crew subscription. Work orders is a paid module.',
          ],
          [
            'Do we have to use the modules?',
            'No. The AI Crew works alongside the systems you already run. Add a module only where you’re missing a tool or want to consolidate.',
          ],
          [
            'Can we change our mind later?',
            'Yes. Edviro can be the system of record, or it can read from and write to the one you keep. You can switch later.',
          ],
        ],
      },
    ],
  },
  {
    path: '/facilities-scheduling',
    title: 'Facilities scheduling | Edviro',
    description:
      'Requests to use school and building spaces, approved by a person and kept on one calendar per site. A free module with the Edviro AI Crew subscription.',
    hero: {
      crumbs: [PLATFORM, ['Modules', '/modules']],
      label: 'Facilities scheduling',
      title: 'Scheduling for gyms, fields, auditoriums and rooms',
      lede: 'Staff and community groups ask for a space and a time. Someone on your team approves it, and the booking goes on one calendar for the site. It’s a free module with the AI Crew subscription.',
      secondary: ['All modules', '/modules'],
    },
    sections: [
      {
        type: 'answer',
        question: 'What is facilities scheduling software?',
        answer:
          'Facilities scheduling software handles requests to use a building’s spaces, such as gyms, fields, auditoriums and classrooms. In Edviro, each request goes to a person for approval, and approved bookings sit on one calendar per site, so everyone can see what is in use and when.',
      },
      {
        type: 'steps',
        title: 'How it works',
        steps: [
          {
            title: 'Request',
            text: 'Staff or a community group asks for a space, a date and a time.',
          },
          { title: 'Check', text: 'Edviro checks the calendar for anything already booked there.' },
          {
            title: 'Approve',
            text: 'A person on your team approves or declines the request.',
            tag: 'Human',
          },
          { title: 'Calendar', text: 'The booking appears on the site’s calendar.' },
        ],
      },
      {
        type: 'cards',
        title: 'What you get',
        cards: [
          {
            title: 'One calendar per site',
            text: 'Every booked gym, field, auditorium and room, in one place.',
          },
          {
            title: 'One queue of requests',
            text: 'Each request shows the space, the date and who asked.',
          },
          {
            title: 'Approval by a person',
            text: 'Nothing is booked until someone on your team says yes.',
          },
          {
            title: 'Double bookings caught',
            text: 'Two requests for the same space and time are flagged before either is approved.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'How it works with the AI Crew',
        cards: [
          {
            title: 'The crew knows what’s booked',
            text: 'When a unit runs after hours, Edviro checks whether anything was on the calendar. If nothing was, it’s flagged.',
            href: '/building-intelligence',
          },
          {
            title: 'Keep your current scheduler',
            text: 'If you already use a scheduling tool, keep it. This module is there for teams that don’t have one.',
            href: '/modules',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Does it cost extra?',
            'No. Facilities scheduling is a module you can add to your AI Crew subscription at no extra cost.',
          ],
          [
            'Who approves a booking?',
            'A person on your team. Edviro checks for conflicts and puts the request in front of them, and they decide.',
          ],
          [
            'Do we have to use it?',
            'No. The AI Crew works alongside the tools you already run. Add this module only if you don’t have a scheduler or want to move off the one you have.',
          ],
        ],
      },
    ],
  },
]

export default pages
