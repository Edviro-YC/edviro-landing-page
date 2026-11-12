import type { ContentPage } from './types'

const pages: ContentPage[] = [
  {
    path: '/faq',
    title: 'FAQ | Edviro',
    description:
      'Common questions about what Edviro does, what it connects to, who approves changes and how savings are verified.',
    hero: {
      crumbs: [],
      label: 'Resources',
      title: 'Frequently asked questions',
      lede: 'What Edviro does, what it connects to, who approves changes and how we check that a fix worked. If your question isn’t here, email founders@edviroenergy.com.',
    },
    sections: [
      {
        type: 'faq',
        id: 'questions',
        title: 'Questions by topic',
        groups: [
          {
            title: 'Product',
            items: [
              [
                'What is Edviro?',
                'Edviro is software that watches building data and incoming requests for a facilities team, works out the likely cause of a problem, and drafts a fix for a person to approve. We call it an AI facilities crew. It takes in building signals, staff requests, work orders, assets, schedules and budgets, routes approved work to the right person, and afterwards checks the building data to see that the fix held. We started in Northern California schools, and we’re backed by Y Combinator.',
              ],
              [
                'Does Edviro include work orders, or is it only an energy tool?',
                'It does work orders too. The AI Crew is the subscription. Work orders is a paid module you can add to it, and utility tracking, project management, asset logging and facilities scheduling are modules you can add free if you don’t already have them. The work-order module takes requests through the app and by email, suggests a category and priority, assigns by site, asset or trade, gives technicians instructions on their phone, holds photos and inspections, supports backlog review, and checks afterwards that the problem was resolved. Energy monitoring is where many teams start.',
              ],
              [
                'What is autonomous building energy management?',
                'It’s software that monitors a building, detects waste and faults as they start, finds the likely cause, drafts the corrective action and then checks the result in the meter data. In Edviro, a person on your team approves every change to building systems before it happens.',
              ],
              [
                'How is Edviro different from utility tracking, monitoring software, or a BMS dashboard?',
                'A monitoring tool or BMS dashboard shows you charts and alarms, and working out what to do is left to you. Edviro has no alarms tab. It triages every alarm, request and meter change, finds the likely cause and drafts a fix for your team to approve. Once a person approves it, Edviro dispatches and tracks the work, then checks the data to confirm the problem stopped. It runs on top of your existing BMS.',
              ],
              [
                'Who is Edviro for?',
                'Facilities directors, maintenance and operations leads and field technicians, plus the finance and leadership teams they report to. We work in K–12 and higher education, data centers, commercial real estate, healthcare and construction. Schools are where we started and where we have the most experience.',
              ],
              [
                'What is the digital twin, and what is it for?',
                'It’s a model of each building, built from the connected data and the fixes that have been verified there. You use it to test a decision before spending money: replacing a boiler, adding a wing, changing a schedule or absorbing a rate change. It gives projected savings and payback based on the building’s real usage.',
              ],
            ],
          },
          {
            title: 'Data and setup',
            items: [
              [
                'Do we have to replace our CMMS to use Edviro?',
                'No. If you already have a CMMS, keep it: Edviro sends approved fixes into it and checks the outcome. It connects to SchoolDude, FMX, AssetWorks and other major CMMS platforms. If you don’t have a work-order or asset system, you can add ours: asset logging is free with the AI Crew subscription, and work orders is a paid module.',
              ],
              [
                'Do I need to replace my existing equipment or controls?',
                'No. Edviro reads from what you already have: meters, submeters, sensors, your BMS, work-order systems and utility bills. That includes Niagara, Pelican, Carrier i-Vu and other major BMS/BAS vendors, as well as legacy controls, utility portals and monthly bills. Your controls stay in place.',
              ],
              [
                'How does Edviro detect energy waste and building problems?',
                'Edviro learns each building’s normal load, schedules and equipment behavior from its own data, then flags changes from that pattern as they appear. Typical catches are short-cycling boilers, after-hours runtime, stuck dampers, creeping base load, unexpected gas or water use and solar underperformance. At one school the gas meter read 76 therms in a day against 16.7 expected, and the likely cause was a hot-water valve stuck open. Each catch reaches your team with the likely cause and a drafted fix to approve.',
              ],
              [
                'How quickly can we get started and see results?',
                'Usually within the first week. We connect a few sites and show you what Edviro catches there. There’s no upfront audit, and you don’t replace any equipment.',
              ],
              [
                'What access does our IT team need to give?',
                'Read-only access to the systems you already run. Connecting the data is quick.',
              ],
              [
                'Is our data secure?',
                'We’re completing SOC 2 certification. We also offer zero data retention (ZDR), air-gapped and on-premises deployments, and dedicated hosting regions such as the Middle East.',
              ],
            ],
          },
          {
            title: 'Control and verification',
            items: [
              [
                'Does Edviro take action on its own?',
                'Not without approval. Edviro monitors, diagnoses and follows up around the clock, but anything with a side effect, such as an email, a work order or a schedule or setpoint change, is drafted for a person on your team to approve first. It doesn’t operate building systems without authorization.',
              ],
              [
                'How does Edviro prove the savings are real?',
                'We count a saving only after the meter confirms it. Every change is measured against a baseline learned from the building’s own data, then checked in the meter data and on the bill. Edviro generates M&V reports for leadership and flags any change that didn’t save as expected.',
              ],
              [
                'How does Edviro help with capital planning?',
                'It uses each asset’s history, repeated failures and repair cost for a repair-or-replace analysis, simulates each project against the building model, and ranks the projects by modeled payback.',
              ],
            ],
          },
          {
            title: 'By industry',
            items: [
              [
                'What results has Edviro verified?',
                'We’ve saved customers $500K and run at 134 sites. At one high school, we detected $400,000 in gas overbilling against its weather-adjusted baseline. Most of our work so far is in schools.',
              ],
              [
                'How does occupancy-based control work?',
                'In commercial buildings Edviro reads occupancy from WiFi access points, badge systems, existing sensors or our own occupancy sensors, and proposes HVAC and lighting schedules around who is actually there. A person approves each change first, and we check the result in the meter data.',
              ],
              [
                'Does Edviro control HVAC in hospital critical spaces?',
                'No. A named person approves every proposal, and you can exclude critical spaces entirely.',
              ],
              [
                'What does Edviro do for new construction?',
                'It sets an independent baseline during fit-out, flags variance against the design model while the contractor is still on site, and gives the owner an M&V report. So far we’ve piloted baselining and M&V with a construction company.',
              ],
            ],
          },
          {
            title: 'Buying Edviro',
            items: [
              [
                'Can public agencies buy through a cooperative contract?',
                'Yes. Edviro is available through Sourcewell.',
              ],
              ['Is there a pilot?', 'Yes. We confirm the scope for your site on the demo call.'],
            ],
          },
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'How Edviro works',
            text: 'The five steps, from a signal coming in to checking that the fix worked.',
            href: '/facilities-operations',
          },
          {
            title: 'M&V methodology',
            text: 'How we measure savings.',
            href: '/results/methodology',
          },
          {
            title: 'Blog',
            text: 'Posts on work orders, energy, M&V and capital planning.',
            href: 'https://edviro.com/blog/',
          },
        ],
      },
      {
        type: 'cards',
        title: 'Still have a question?',
        cards: [
          {
            title: 'Book a demo',
            text: 'Bring your questions to a call with us.',
            href: '#demo',
          },
          {
            title: 'Email us',
            text: 'Write to founders@edviroenergy.com.',
            href: 'mailto:founders@edviroenergy.com',
          },
        ],
      },
    ],
  },
  {
    path: '/glossary',
    title: 'Facilities and Energy Management Glossary',
    description:
      'Understand facilities and energy management terms, from BMS and CMMS to demand charges, fault detection and M&V. Explore practical definitions from Edviro.',
    hero: {
      crumbs: [],
      label: 'Resources',
      title: 'Glossary',
      lede: 'Short definitions of terms that come up in facilities, energy and data center work, including the ones we use on this site.',
    },
    sections: [
      {
        type: 'rows',
        id: 'a-c',
        title: 'A to C',
        rows: [
          [
            'AHU (air handling unit)',
            'The unit that moves, filters and conditions air for a building zone. Fan, filter and valve faults show up in its BMS data.',
          ],
          [
            'Alarm fatigue',
            'When so many alarms fire that operators stop trusting or reading them, and real faults get buried.',
          ],
          [
            'Asset register',
            'The list of every piece of equipment, with nameplate, location, documents and service history.',
          ],
          [
            'Baseline',
            'A measured model of how a building normally uses energy, fit to its own meter data and weather. Savings are measured against it.',
          ],
          [
            'BMS / BAS',
            'Building management (or automation) system: the controls that run HVAC and lighting schedules and setpoints. Edviro reads data from it.',
          ],
          [
            'Capital plan',
            'A multi-year list of repair, replace and upgrade projects. Edviro ranks them by modeled payback from measured use.',
          ],
          [
            'CMMS',
            'Computerized maintenance management system: software for work orders, assets and preventive maintenance. SchoolDude, FMX and AssetWorks are examples.',
          ],
          [
            'CO₂ (indoor)',
            'Carbon dioxide in occupied rooms, a proxy for ventilation. Classrooms are commonly checked against 800 and 1,100 ppm guidelines.',
          ],
          [
            'Commissioning',
            'Checking that a building’s systems work as designed. Continuous commissioning keeps checking after handover.',
          ],
          [
            'CRAH / CRAC',
            'Computer room air handler / air conditioner: the units that cool a data center. CRAH uses chilled water; CRAC has its own compressor.',
          ],
        ],
      },
      {
        type: 'rows',
        id: 'd-m',
        title: 'D to M',
        rows: [
          [
            'DCIM',
            'Data center infrastructure management software for racks, power and capacity. Edviro reads it alongside the BMS.',
          ],
          [
            'Demand charge',
            'The part of an electric bill set by the highest short peak in the month, not total use. One hot afternoon can set it.',
          ],
          [
            'Digital twin',
            'A living model of a building built from its connected data and verified fixes, used to test decisions before spending money.',
          ],
          [
            'ΔT (delta T)',
            'Temperature difference between supply and return water or air. Low ΔT on a cooling unit often means a valve or coil problem.',
          ],
          [
            'EPMS',
            'Electrical power monitoring system: meters and alarms for UPS, switchgear and PDUs.',
          ],
          [
            'Fault detection and diagnostics (FDD)',
            'Software that spots equipment faults in building data and names the likely cause.',
          ],
          [
            'Headroom (cooling)',
            'How much more IT load a room or pod can take before cooling runs out.',
          ],
          [
            'Interval data',
            'Meter readings every 15 minutes or hour. It shows schedule drift and peaks that a monthly bill hides.',
          ],
          [
            'IPMVP',
            'International Performance Measurement and Verification Protocol, the common standard for measuring energy savings.',
          ],
          [
            'M&V (measurement and verification)',
            'Proving that a change actually saved energy by comparing measured use with the baseline, adjusted for weather and occupancy.',
          ],
        ],
      },
      {
        type: 'rows',
        id: 'n-w',
        title: 'N to W',
        rows: [
          [
            'Negative pressure room (AII)',
            'An airborne-infection isolation room kept at lower pressure than the corridor so air flows in, not out.',
          ],
          [
            'Occupancy-based control',
            'Scheduling HVAC and lighting around who is actually present, using WiFi, badge or sensor data.',
          ],
          ['PDU', 'Power distribution unit: delivers power to racks and reports load per circuit.'],
          [
            'Preventive maintenance',
            'Scheduled inspections and service done before a failure, by time or by runtime.',
          ],
          [
            'PUE',
            'Power usage effectiveness: total facility power divided by IT power. 1.0 would mean no overhead.',
          ],
          [
            'Root cause',
            'The single fault behind a group of symptoms or alarms, as opposed to the alarms themselves.',
          ],
          [
            'Schedule drift',
            'When HVAC schedules slowly stop matching how a building is used, after overrides, breaks and calendar changes.',
          ],
          ['Setpoint', 'The target value a control system holds, such as 72 °F or −0.01 in. w.c.'],
          [
            'Short cycling',
            'Equipment turning on and off too often, wasting energy and wearing it out.',
          ],
          [
            'Simultaneous heating and cooling',
            'Heating and cooling running in the same space or air handler at once, fighting each other.',
          ],
          [
            'Work order',
            'A tracked job: the problem, cause, priority, owner, steps and proof it was fixed.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'FAQ',
            text: 'Questions about the product, setup and verification.',
            href: '/faq',
          },
          {
            title: 'Blog',
            text: 'Posts on work orders, energy, M&V and capital planning.',
            href: 'https://edviro.com/blog/',
          },
          {
            title: 'How Edviro works',
            text: 'The five steps, from a signal coming in to checking that the fix worked.',
            href: '/facilities-operations',
          },
        ],
      },
    ],
  },
]

export default pages
