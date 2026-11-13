import type { ContentPage } from './types'

const pages: ContentPage[] = [
  {
    path: '/solutions/schools',
    title: 'Education | Edviro',
    description:
      'Edviro reads the meters, BMS and utility bills a school district or campus already has, flags waste when it starts, drafts the fix for a person to approve and checks the meter afterwards.',
    hero: {
      crumbs: [],
      label: 'Education',
      title: 'Edviro for schools and campuses',
      lede: 'Edviro started in Northern California schools. The founder built a dashboard for his own high school’s facilities team, and it spread to more schools from there. Today it reads a district’s meters, BMS and utility bills, flags waste when it starts, drafts the fix and checks the meter after the work is done. Your team approves every change.',
      secondary: ['How we verify savings', '/results/methodology'],
      note: 'No new hardware. Works with the controls you have. Every change approved by a person.',
    },
    sections: [
      {
        type: 'stats',
        label: 'Edviro so far (backed by Y Combinator)',
        items: [
          ['$500K', 'Saved for customers'],
          ['134', 'Sites company-wide'],
          ['PAUSD', 'Palo Alto Unified School District'],
          ['LGSUHSD', 'Los Gatos-Saratoga Union High School District'],
        ],
      },
      {
        type: 'answer',
        question: 'What is Edviro for schools?',
        answer:
          'Edviro is an AI facilities crew for school districts and campuses. It checks the meters, building management system and utility bills a district already has, every day. When something drifts, such as a boiler short-cycling or HVAC running through a break, it works out the likely cause and drafts a fix. A person on your team approves it, the work gets done, and Edviro compares the building data with its learned baseline to see whether the fix held.',
      },
      {
        type: 'cards',
        title: 'What it catches in schools',
        intro:
          'The gas reading under “Stuck valves” is a real one. The other figures are examples of how a finding reads.',
        cards: [
          {
            title: 'Boiler short-cycling',
            text: 'A boiler starting 14 times an hour. The drafted fix lists the reset steps.',
            tag: 'Fix drafted',
          },
          {
            title: 'After-hours and summer runtime',
            text: 'HVAC running on weekends as if the building were occupied, or a summer-break month that comes in 22% over expected.',
            tag: 'Staged for approval',
          },
          {
            title: 'Ventilation and comfort',
            text: 'CO₂ climbing in a gym or a classroom.',
            tag: 'Schedule proposed',
          },
          {
            title: 'Demand spikes',
            text: 'Each week Edviro forecasts the days most likely to set a peak and proposes pre-cooling.',
            tag: 'Forecast',
          },
          {
            title: 'Stuck valves',
            text: 'At one school the gas meter read 76 therms in a day against 16.7 expected. The likely cause was a hot-water valve stuck open.',
            tag: 'Investigation opened',
          },
          {
            title: 'Solar underperformance',
            text: 'Solar production is tracked against expected output, so a shortfall can be raised with the installer.',
            tag: 'Raised with installer',
          },
        ],
      },
      {
        type: 'cards',
        title: 'Work orders, assets and maintenance',
        intro:
          'The AI Crew is the subscription. If you don’t already have a tool for asset logging, utility tracking, project management or facilities scheduling, you can add ours as free modules. Work orders is a paid module.',
        cards: [
          {
            title: 'Work orders',
            text: 'Requests come in from the app, by email or from a BMS alarm. Each one gets a cause, a priority and a named reviewer before it’s dispatched.',
            href: '/work-orders',
          },
          {
            title: 'Assets and inspections',
            text: 'Every boiler, RTU and panel has a record with its nameplate, documents, service history and next inspection date.',
            href: '/asset-management',
          },
          {
            title: 'Preventive maintenance',
            text: 'Recurring work is scheduled against the asset. Repeat failures and rising repair cost move an asset up the list.',
          },
          {
            title: 'In the field',
            text: 'The technician gets the assignment, the asset history and the steps on a phone. Photos and notes are saved to the work order.',
          },
        ],
      },
      {
        type: 'panels',
        title: 'Keep your CMMS or use ours',
        intro:
          'Monitoring, diagnosis and verification work the same either way. You can switch later.',
        panels: [
          {
            tag: 'Connect',
            title: 'Keep your CMMS',
            text: 'Edviro sends approved work into your CMMS and reads the outcome back. We confirm what the integration covers system by system.',
            link: ['Integrations', '/integrations'],
          },
          {
            tag: 'Add',
            title: 'Use Edviro’s modules',
            text: 'Work orders, assets, inspections and mobile field workflows. Asset logging is free with the AI Crew subscription, and work orders is a paid module. We import your lists and open work first.',
            link: ['Modules', '/modules'],
          },
          {
            tag: 'Either way',
            title: 'What stays the same',
            text: 'Building data confirms the fix in both setups, and the repair history feeds preventive maintenance and the capital plan.',
            link: ['How Edviro works', '/facilities-operations'],
          },
        ],
      },
      {
        type: 'cards',
        title: 'Measuring savings and planning capital',
        intro:
          'Each fix is measured against how the school behaved before it. At one high school, Edviro detected $400,000 in gas overbilling against its weather-adjusted baseline.',
        cards: [
          {
            title: 'How verification works',
            text: 'Each fix is checked against the learned baseline. A boiler schedule fix, for example, might read as 12% fewer therms, verified over 60 days.',
            href: '/results/methodology',
          },
          {
            title: 'Capital planning',
            text: 'Repeat failures and repair cost show which equipment is costing the most. Compare replace against repair using your own data, then rank the list.',
            href: '/capital-planning',
          },
          {
            title: 'Customer results',
            text: 'What Edviro has measured at customer sites so far.',
            href: '/results',
          },
        ],
      },
      {
        type: 'panels',
        title: 'K–12 and higher education',
        panels: [
          {
            tag: 'K–12',
            title: 'K–12 districts',
            text: 'Many small sites and a small team. Problems from every school go on a single list, ranked by cost and comfort. In one district of seven schools, we found one school using five times the energy of its peers.',
            link: ['Edviro for K–12 districts', '/solutions/schools/k-12'],
          },
          {
            tag: 'Higher education',
            title: 'Universities and campuses',
            text: 'Labs, central plants and a lot of buildings. Fault diagnosis and measurement and verification sit alongside the work orders.',
            link: ['Edviro for universities and campuses', '/solutions/schools/higher-ed'],
          },
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Do we need new hardware or a new BMS?',
            'No. Edviro reads the meters, building management system and utility bills you already have. Where a site has no interval meter, metering can be added later.',
          ],
          [
            'Does Edviro change setpoints or schedules on its own?',
            'No. Edviro proposes the change and tests it against how the building behaved before. Someone on your team approves it before anything is sent to the BMS.',
          ],
          [
            'Can Edviro replace our CMMS?',
            'Yes. The modules cover work orders, asset records, inspections and mobile field workflows. Asset logging is free with the AI Crew subscription, and work orders is a paid module. You can also keep your CMMS and connect it.',
          ],
          [
            'How is this different from an energy audit?',
            'An audit looks at a building once. Edviro checks every site every day, so it catches drift when it starts and can check each fix against the learned baseline afterwards.',
          ],
          [
            'How fast does a district see results?',
            'We connect a few sites first and show you what Edviro catches in the first week.',
          ],
          [
            'Does it work for higher education campuses?',
            'Yes. Edviro serves higher education customers today.',
          ],
        ],
      },
    ],
  },
  {
    path: '/solutions/schools/k-12',
    title: 'K-12 Facilities Operations Software',
    description:
      'Prioritize K-12 facility problems using meters, BMS data and utility bills. Edviro drafts fixes for approval and verifies results across your school district.',
    hero: {
      crumbs: [['Education', '/solutions/schools']],
      label: 'K–12 districts',
      title: 'Edviro for K–12 districts',
      lede: 'Edviro reads the meters, BMS and utility bills your district already has and puts the problems from every school on one list, ranked by cost and comfort. It drafts the fix, a person approves it, and Edviro checks the building data once the work is done. It suits a small team covering many sites.',
      secondary: ['See the district view', '#district-view'],
      note: 'No new hardware. A named person approves every change.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is facilities software for K–12 school districts?',
        answer:
          'K–12 facilities software lets a district maintenance and operations team see every school’s energy use, equipment and open work in one place. Edviro reads the meters, building management system and utility bills a district already has, finds waste and failing equipment, drafts fixes for a person to approve, and checks each fix against the building’s learned baseline. Palo Alto Unified School District and Los Gatos-Saratoga Union High School District are customers.',
      },
      {
        type: 'screen',
        id: 'district-view',
        title: 'The district view',
        intro:
          'A district might be 10, 20 or 50 schools looked after by a director, a handful of technicians and the custodial leads. Edviro sorts open issues by dollars per month and comfort impact, and you can drill from district to school, building, system and asset. In one district of seven schools, we found one school using five times the energy of its peers. The rows below are an example.',
        screen: {
          crumb: 'District',
          heading: 'Open fixes',
          count: '2 need review',
          rows: [
            {
              title: 'Boiler-2 short-cycling',
              meta: 'Site A · 14 starts an hour · fix drafted with the reset steps',
              status: 'review',
            },
            {
              title: 'Weekend HVAC running as if occupied',
              meta: 'Site B · gym HVAC in occupied mode · fix drafted',
              status: 'review',
            },
            {
              title: 'Heating stage not firing',
              meta: 'Site A · RTU-3 · supply air 91°F, Room 214 holding 70°F',
              status: 'verified',
            },
          ],
        },
      },
      {
        type: 'cards',
        title: 'What it catches in schools',
        intro:
          'At one school the gas meter read 76 therms in a day against 16.7 expected, and the likely cause was a hot-water valve stuck open. These are other things that turn up, with example figures.',
        cards: [
          {
            title: 'Weekends and holidays',
            text: 'HVAC and lights left running in empty buildings over breaks.',
          },
          {
            title: 'Boiler short-cycling',
            text: 'A boiler starting 14 times an hour. The drafted fix lists the reset steps.',
          },
          {
            title: 'Classroom comfort',
            text: 'A classroom that’s freezing again, or CO₂ climbing in a gym.',
          },
          {
            title: 'Summer schedules',
            text: 'A summer HVAC schedule left active, or a summer-break month that comes in 22% over expected.',
          },
          {
            title: 'Kitchen equipment',
            text: 'A walk-in freezer compressor short-cycling because its start capacitor is failing, caught early.',
          },
          {
            title: 'Equipment left in Hand',
            text: 'A gym RTU supply fan left in Hand/On, so it runs 24/7 and ignores the summer schedule.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'Keep your CMMS or use ours',
        intro:
          'The AI Crew is the subscription. Asset logging, utility tracking, project management and facilities scheduling are modules you can add free if you don’t already have a tool for them. Work orders is a paid module.',
        cards: [
          {
            title: 'Work orders',
            text: 'Intake, assignment and field completion. Afterwards the fix is checked in the building data.',
            href: '/work-orders',
          },
          {
            title: 'Asset management',
            text: 'Organized as district, school, building, system and asset. Each asset’s history fills in as work is done.',
            href: '/asset-management',
          },
          {
            title: 'Your CMMS',
            text: 'Keep the CMMS you have and connect it. Edviro works with SchoolDude, FMX, AssetWorks and other major CMMS.',
            href: '/integrations',
          },
        ],
      },
      {
        type: 'cards',
        title: 'For the business office and the board',
        intro:
          'At one high school, Edviro detected $400,000 in gas overbilling against its weather-adjusted baseline. This is how numbers like that get measured and reported.',
        cards: [
          {
            title: 'Verified savings',
            text: 'Every fix is measured against a weather- and schedule-adjusted baseline and signed off by a named engineer or facilities director.',
            href: '/results/methodology',
          },
          {
            title: 'Yearly goals',
            text: 'Energy, budget and CO₂ targets are set per year against a baseline year and tracked from the district’s meters.',
          },
          {
            title: 'Forecasts',
            text: 'Next month’s demand and the next 12 months of energy use, for budgeting.',
          },
          {
            title: 'Capital plan',
            text: 'Repeat failures and repair cost rank next year’s projects. Each line traces back to the work orders behind it.',
            href: '/capital-planning',
          },
          {
            title: 'Funding',
            text: 'Verified savings reports you can attach to grant and rebate applications.',
          },
        ],
      },
      {
        type: 'rows',
        title: 'Getting started',
        intro: 'There’s no hardware project. It starts with data you already have.',
        rows: [
          [
            'Week 1',
            'Bills and meters. Utility bills and interval data are enough for the first findings.',
          ],
          [
            'Next',
            'BMS and work orders. Connect the BMS, then import the asset list and open work.',
          ],
          ['Then', 'The rest of the district. Add schools once the first few have shown results.'],
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Do we need new hardware or a new BMS?',
            'No. Edviro reads the meters, BMS and utility bills the district already has.',
          ],
          [
            'Can Edviro replace our CMMS?',
            'Yes, or you can keep your CMMS and connect it. Work orders is a paid module on top of the AI Crew subscription. We confirm what an integration covers system by system.',
          ],
          [
            'How fast does a district see results?',
            'We connect a few schools first and show you what Edviro catches in the first week.',
          ],
          [
            'Does Edviro change setpoints on its own?',
            'No. A named person approves every change before anything is sent to the BMS.',
          ],
          [
            'Can we start with only some schools?',
            'Yes. Most districts start with a few sites and expand.',
          ],
          [
            'How do we buy it?',
            'Edviro is a software subscription and is available through Sourcewell.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'Education overview',
            text: 'What Edviro does for schools and campuses.',
            href: '/solutions/schools',
          },
          {
            title: 'Universities and campuses',
            text: 'Labs, central plants and large portfolios.',
            href: '/solutions/schools/higher-ed',
          },
          { title: 'Customer results', text: 'What Edviro has measured so far.', href: '/results' },
          {
            title: 'Measurement and verification methodology',
            text: 'How a saving is measured and when it counts.',
            href: '/results/methodology',
          },
        ],
      },
    ],
  },
  {
    path: '/solutions/schools/higher-ed',
    title: 'University Facilities Management Software',
    description:
      'Connect campus BMS, central plant and meter data with Edviro. Diagnose facility problems, review proposed fixes and measure results across university buildings.',
    hero: {
      crumbs: [['Education', '/solutions/schools']],
      label: 'Higher education',
      title: 'Edviro for universities and campuses',
      lede: 'A campus has central plants, labs, housing and hundreds of buildings. Edviro reads the BMS and meters you already run, traces problems to a likely cause, drafts the fix for a person to approve and checks the result against the baseline.',
      secondary: ['See the campus view', '#campus-view'],
      note: 'Edviro serves higher education customers today. A named person approves every change.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is facilities operations software for universities?',
        answer:
          'Facilities operations software for universities connects campus building systems, meters, work orders and capital planning. Edviro reads the BMS, central plant and meter data a campus already has, detects waste and equipment faults, drafts fixes for a person to review, and measures each fix against a weather- and schedule-adjusted baseline. Those measured figures are what go into sustainability reports and budgets.',
      },
      {
        type: 'screen',
        id: 'campus-view',
        title: 'The campus view',
        intro:
          'A campus runs like a small city with one facilities team: central plants, labs, housing, athletics and a deferred maintenance backlog. Edviro ranks open issues by cost and risk across campus, building, system and asset, and you can filter by building type. The rows below are an example.',
        screen: {
          crumb: 'Campus',
          heading: 'Open fixes',
          count: '3 need review',
          rows: [
            {
              title: 'Chilled-water ΔT drifting low',
              meta: 'Central plant · chillers staging inefficiently',
              status: 'review',
            },
            {
              title: 'Air-change rates at occupied levels overnight',
              meta: 'Lab · ventilation',
              status: 'review',
            },
            {
              title: 'Empty residence hall heated and cooled',
              meta: 'Housing · break schedule',
              status: 'review',
            },
          ],
        },
      },
      {
        type: 'cards',
        title: 'What it catches on a campus',
        cards: [
          {
            title: 'Central plant drift',
            text: 'Chilled-water ΔT running low and chillers staging inefficiently.',
          },
          {
            title: 'Lab ventilation',
            text: 'Air-change rates held at occupied levels overnight. Labs are usually among the biggest energy users on a campus.',
          },
          {
            title: 'Breaks and summer',
            text: 'Empty residence halls and classrooms being heated and cooled.',
          },
          {
            title: 'Simultaneous heating and cooling',
            text: 'Reheat working against cooling in the same zone.',
          },
          {
            title: 'Demand peaks',
            text: 'Edviro forecasts the days most likely to set a peak and proposes pre-cooling.',
          },
          {
            title: 'Steam and water',
            text: 'Failed steam traps and leaks that show up in the meter data.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'For sustainability and finance offices',
        intro:
          'The measurement method is the same one we use in schools, where Edviro detected $400,000 in gas overbilling at one high school against its weather-adjusted baseline.',
        cards: [
          {
            title: 'Verified savings',
            text: 'Every fix is measured against a weather-adjusted baseline.',
            href: '/results/methodology',
          },
          { title: 'Carbon', text: 'CO₂ is tracked in goals and in savings reports.' },
          {
            title: 'Repair or replace',
            text: 'Repeat failures and repair cost are tallied asset by asset, so you can see when replacing is cheaper.',
          },
          {
            title: 'Ranked plan',
            text: 'Projects are ranked by cost, risk and savings. Each line traces back to the work orders behind it.',
            href: '/capital-planning',
          },
        ],
      },
      {
        type: 'panels',
        title: 'Keep your CMMS or use ours',
        intro:
          'Edviro works with SchoolDude, FMX, AssetWorks and other major CMMS, and with Niagara, Carrier i-Vu and other major BMS and BAS.',
        panels: [
          {
            tag: 'Connect',
            title: 'Keep your CMMS',
            text: 'Edviro sends reviewed work into your CMMS and reads the outcome back.',
            link: ['Integrations', '/integrations'],
          },
          {
            tag: 'Add',
            title: 'Use Edviro’s modules',
            text: 'Work orders, assets, inspections and mobile field workflows. Asset logging is free with the AI Crew subscription, and work orders is a paid module.',
            link: ['Modules', '/modules'],
          },
        ],
      },
      {
        type: 'rows',
        title: 'Getting started',
        intro: 'There’s no hardware project. You can start with a few buildings.',
        rows: [
          [
            'First',
            'Meters and bills. Interval and plant meters are enough for the first findings.',
          ],
          ['Next', 'BMS and work orders. Connect the BMS and import the asset list and open work.'],
          ['Then', 'The rest of the campus. Add buildings once the first few have shown results.'],
        ],
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Do we need new hardware or a new BMS?',
            'No. Edviro reads the BMS and meters the campus already runs.',
          ],
          [
            'Can we keep our CMMS?',
            'Yes. Edviro sends work into it and reads the outcome back. We confirm what the integration covers system by system.',
          ],
          ['Does Edviro change setpoints on its own?', 'No. A named person approves every change.'],
          [
            'Can it support our climate reporting?',
            'CO₂ is tracked in goals and savings reports. We’ll go through the details for your campus on the demo call.',
          ],
          [
            'What are the security and hosting options?',
            'SOC 2 is in progress. Zero data retention, air-gapped, on-premises and regional hosting are options.',
          ],
          [
            'How do universities buy it?',
            'Edviro is a software subscription and is available through Sourcewell.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'Education overview',
            text: 'What Edviro does for schools and campuses.',
            href: '/solutions/schools',
          },
          {
            title: 'K–12 districts',
            text: 'Many small sites and small teams.',
            href: '/solutions/schools/k-12',
          },
          { title: 'Customer results', text: 'What Edviro has measured so far.', href: '/results' },
          {
            title: 'How Edviro works',
            text: 'What the platform does, with an example from one building.',
            href: '/facilities-operations',
          },
        ],
      },
    ],
  },
  {
    path: '/solutions/data-centers',
    title: 'Data centers | Edviro',
    description:
      'Edviro models an existing data center from its own telemetry, shows how much more load each pod can safely carry and tests every change before your team makes it.',
    hero: {
      crumbs: [],
      label: 'Data centers',
      title: 'More capacity from the data center you already run',
      lede: 'Edviro fits a physics model to your BMS, EPMS, PDU and sensor data. It shows how much more load each pod can carry inside your own temperature and power limits, and lists the changes that would free that capacity up. Your team makes every change.',
      secondary: ['See the physics models', '#models'],
      note: 'Read-only. Nothing new installed. Your team approves every change.',
    },
    sections: [
      {
        type: 'stats',
        items: [
          ['24/7', 'Monitoring'],
          ['Read-only', 'Access to your telemetry'],
          ['Y Combinator', 'Backed by'],
        ],
      },
      {
        type: 'answer',
        question: 'What does Edviro do for data centers?',
        answer:
          'Edviro is an AI facilities crew for data center operations. It reads existing BMS, EPMS, PDU and sensor telemetry with read-only access and fits a physics model to the site. The model shows how much cooling and power headroom each pod has, which of the two runs out first, and what a setpoint change, a unit failure or an upgrade would do. The team can then run closer to what the building can carry without adding downtime risk. Edviro also ties related alarms to one likely cause and drafts the fix for an operator to approve.',
      },
      {
        type: 'cards',
        title: 'Where the capacity usually is',
        intro: 'An existing site often has capacity it isn’t using, for reasons like these.',
        cards: [
          {
            title: 'Safety margin nobody has measured',
            text: 'Operations teams are judged on uptime, so they keep a wide buffer. Edviro compares that buffer with how the site has actually run and shows how much of it is needed.',
          },
          {
            title: 'Power lost to overhead',
            text: 'Every kilowatt the cooling plant uses is one that can’t go to IT load. Lowering PUE leaves more of your utility allocation for the servers.',
          },
          {
            title: 'The limit you reach first',
            text: 'A pod can be short on cooling while it has power to spare, or the other way round. Edviro shows which limit comes first and where the hot spots are.',
          },
          {
            title: 'Faults using up headroom',
            text: 'A stuck valve or a leaking row uses cooling the pod needs. Edviro finds the fault and drafts the fix.',
          },
        ],
      },
      {
        type: 'screen',
        title: 'Example: a capacity plan for one pod',
        intro:
          'Each line is a change your team can approve, with what it does for the pod. Nothing is sent to the BMS.',
        screen: {
          crumb: 'Site A · Pod 3',
          heading: 'Capacity plan',
          count: '3 changes to review',
          rows: [
            {
              title: 'Raise supply air by 1 °C',
              meta: 'Pod 3 · every inlet stays under the limit on the model · less cooling energy',
              status: 'review',
            },
            {
              title: 'Fix the CRAH-2 chilled-water valve, stuck at 40%',
              meta: 'Pod 3 · likely cause of 41 alarms · restores cooling headroom',
              status: 'review',
            },
            {
              title: 'Fit blanking panels in row C',
              meta: 'Pod 3 · removes the afternoon hot spot that limits the row',
              status: 'review',
            },
          ],
        },
      },
      {
        type: 'cards',
        id: 'models',
        title: 'Questions you can put to the model',
        intro:
          'Edviro fits a physics model to your own telemetry and recalibrates it as load and layout change. It is far cheaper to run than a CFD study, so you can ask it things like these before touching the floor.',
        cards: [
          {
            title: 'How many more racks can Pod 3 take?',
            text: 'Cooling headroom for the pod, from a model that is checked against measured inlet temperatures.',
          },
          {
            title: 'Can we raise supply air a degree?',
            text: 'The model checks for hot spots before the setpoint changes.',
          },
          {
            title: 'If CRAH-2 goes down, which rows go over?',
            text: 'A failure scenario shows which rows cross the inlet limit, and how fast.',
          },
          {
            title: 'What would an upgrade unlock?',
            text: 'Model an added cooling unit or more power before you buy it, and see how much load it would let you add.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'Uptime comes first',
        intro:
          'A change only goes on the plan if the model shows the site staying inside your own limits.',
        cards: [
          {
            title: 'Checked against your sensors',
            text: 'Modeled inlet temperatures are shown next to measured ones for every pod. In the Pod 3 example the gap is ±0.4 °C.',
          },
          {
            title: 'Tested with a unit down',
            text: 'You can run any change against a unit failure and see the margin that is left.',
          },
          {
            title: 'Read-only access',
            text: 'Edviro reads your telemetry. Nothing new gets installed, and it has no control of the plant.',
          },
          {
            title: 'Changes stay with you',
            text: 'Any change to the floor or the plant is made by your team and your vendors.',
          },
        ],
      },
      {
        type: 'panels',
        title: 'Capacity, cooling and alarm diagnosis',
        panels: [
          {
            tag: 'Capacity and cooling',
            title: 'Headroom, pod by pod',
            text: 'The model shows how much load each pod can take before inlets cross the design limit, and what a setpoint change or a new row would do. It’s checked against the temperatures your sensors measure.',
            link: ['Capacity and cooling', '/solutions/data-centers/cooling'],
          },
          {
            tag: 'Alarm diagnosis',
            title: 'No alarms, just fixes',
            text: 'Day to day, Edviro ties related alarms together and names the likely cause, with the evidence attached. Operators get a short list of what to fix, and nothing goes out until someone approves it.',
            link: ['Alarm diagnosis', '/solutions/data-centers/alarm-diagnosis'],
          },
        ],
      },
      {
        type: 'chips',
        title: 'What it connects to',
        items: [
          'BMS points and alarms',
          'EPMS and PDU power data',
          'Cooling plant: CRAH/CRAC and chilled water',
          'Environmental sensors',
        ],
        note: 'Edviro connects to major DCIM, BMS, EPMS and PDU systems through open protocols or APIs.',
      },
      {
        type: 'faq',
        title: 'Common questions',
        items: [
          [
            'Does running closer to capacity raise the risk of downtime?',
            'The plan only includes changes the model shows staying inside your own inlet and power limits, and you can test each one with a unit down. You see modeled against measured numbers for your site, and your team decides what to change.',
          ],
          [
            'Is this for existing sites or new builds?',
            'Mostly existing sites, where the question is how much more load the building can carry. You can also test a design on the model before you build, and we’ll go through that on the demo call.',
          ],
          [
            'What data does Edviro need?',
            'Whatever your controls already export: BMS points and alarms, EPMS and PDU power, cooling plant data and environmental sensors. Nothing new gets installed and access is read-only.',
          ],
          [
            'We already have a DCIM and a BMS. Why add this?',
            'Those systems collect the data and raise the alarms. Edviro sits on top of them, models what the site can carry, and writes up changes and fixes your team can approve and act on.',
          ],
          [
            'Does Edviro control the cooling plant?',
            'No. Edviro reads, diagnoses and simulates. Any change to the floor or the plant stays with your team and your vendors.',
          ],
          [
            'How accurate is the model?',
            'It depends on the site and its sensors, so Edviro shows modeled against measured inlet temperatures for every site. In the Pod 3 example the gap is ±0.4 °C.',
          ],
          [
            'Does Edviro still handle alarms?',
            'Yes. It reads every alarm, groups the related ones, names the likely cause and drafts one fix for an operator to approve.',
          ],
        ],
      },
    ],
  },
  {
    path: '/solutions/data-centers/cooling',
    title: 'Data Center Cooling and Capacity Modeling',
    description:
      'Model data center cooling headroom with existing telemetry. Explore capacity changes with Edviro before making changes on the floor.',
    hero: {
      crumbs: [['Data centers', '/solutions/data-centers']],
      label: 'Capacity and cooling',
      title: 'Capacity and cooling for data centers',
      lede: 'Edviro fits a physics model to your own telemetry, keeps it calibrated, and shows how much more load each pod can carry before it runs out of cooling. You can try a new row, a unit failure or a setpoint change on the model before anything changes on the floor.',
      secondary: ['See the what-if scenarios', '#what-if'],
      note: 'Read-only. Nothing new installed. Your team decides every change.',
    },
    sections: [
      {
        type: 'answer',
        question: 'How do you measure data center cooling headroom?',
        answer:
          'Cooling headroom is how much more IT load a room or pod can take before rack inlet temperatures cross the design limit. Edviro works it out with a physics model calibrated to the site’s own BMS, power and sensor telemetry, and checks the model against measured temperatures. Operators can then try changes such as new racks or a unit failure on the model first.',
      },
      {
        type: 'cards',
        title: 'Why capacity ends up a guess',
        cards: [
          {
            title: 'Design-day estimates',
            text: 'Capacity was worked out on paper, years ago, for a different layout.',
          },
          {
            title: 'Wide safety margins',
            text: 'Teams are judged on uptime, so cooling is held in reserve that nobody can show is safe to use.',
          },
          {
            title: 'Hot spots after the fact',
            text: 'A new row goes in, and then row C runs hot every afternoon.',
          },
        ],
      },
      {
        type: 'rows',
        title: 'How the model works',
        intro:
          'Edviro fits a physics model to your own telemetry and recalibrates it as load and layout change.',
        rows: [
          [
            'Calibrated',
            'The model is fitted to the site’s own BMS, power and sensor telemetry, continuously.',
          ],
          [
            'Checked',
            'Modeled inlet temperatures are compared with measured ones and the gap is shown. In the Pod 3 example it is ±0.4 °C.',
          ],
          [
            'Headroom',
            'Each pod shows its current load, its modeled limit and the headroom between them.',
          ],
        ],
      },
      {
        type: 'cards',
        id: 'what-if',
        title: 'Try a change on the model first',
        cards: [
          {
            title: 'Add high-density racks',
            text: 'How many more racks can Pod 3 take before cooling runs out?',
          },
          {
            title: 'Unit failure',
            text: 'If CRAH-2 goes down, which rows cross the inlet limit, and how fast?',
          },
          {
            title: 'Raise supply air',
            text: 'Can we raise supply air a degree without creating hot spots?',
          },
          { title: 'Find the hot spot', text: 'Why does row C run hot every afternoon?' },
        ],
      },
      {
        type: 'cards',
        label: 'Efficiency',
        title: 'Raising setpoints and measuring the result',
        cards: [
          {
            title: 'Setpoints',
            text: 'Supply-air and chilled-water changes are checked on the model before your team makes them.',
          },
          {
            title: 'Cooling energy',
            text: 'Cooling energy is tracked against the baseline after each change.',
            href: '/results/methodology',
          },
          {
            title: 'PUE',
            text: 'Power the cooling plant doesn’t use stays available for IT load, inside the same utility allocation.',
          },
        ],
      },
      {
        type: 'cards',
        title: 'What Edviro can and can’t change',
        cards: [
          {
            title: 'Read-only',
            text: 'Nothing new is installed, and Edviro doesn’t write to the BMS.',
          },
          {
            title: 'Model only',
            text: 'Edviro reads, diagnoses and models. It doesn’t operate the cooling plant.',
          },
          {
            title: 'Your team decides',
            text: 'Changes to the floor or the plant are made by your team and vendors.',
          },
        ],
      },
      {
        type: 'cards',
        label: 'Capital decisions',
        title: 'Add racks, replace a unit or wait',
        cards: [
          { title: 'Add load', text: 'See which pods have headroom before placing new IT load.' },
          {
            title: 'Replace or repair',
            text: 'CRAH units and chillers ranked by risk and service history.',
            href: '/capital-planning',
          },
          {
            title: 'Defer spend',
            text: 'Check whether the room can take the load before buying more cooling.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Questions about cooling',
        items: [
          [
            'Is this CFD?',
            'No. It’s a model fitted to your own telemetry and recalibrated continuously, where a CFD study is usually done once.',
          ],
          [
            'Does Edviro change setpoints?',
            'No. It models the change. Your team decides and makes it.',
          ],
          [
            'What data does the model need?',
            'BMS, cooling plant (CRAH/CRAC, chilled water), power and rack inlet sensors.',
          ],
          [
            'How accurate is it?',
            'Edviro shows modeled against measured inlet temperatures for your site, so you can see the gap yourself.',
          ],
          [
            'Does it handle liquid cooling?',
            'That depends on the site. We’ll go through it with you on the demo call.',
          ],
          [
            'Can we plan a new build?',
            'You can test changes against the model before you build. How far that goes for a new site is something we’ll go through on the demo call.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'Data centers overview',
            text: 'What Edviro does for data center teams.',
            href: '/solutions/data-centers',
          },
          {
            title: 'Alarm diagnosis',
            text: 'How a flood of alarms gets traced to a likely cause.',
            href: '/solutions/data-centers/alarm-diagnosis',
          },
          {
            title: 'Capital planning',
            text: 'Ranking what to repair, replace or defer.',
            href: '/capital-planning',
          },
        ],
      },
    ],
  },
  {
    path: '/solutions/data-centers/alarm-diagnosis',
    title: 'Alarm diagnosis for data centers | Edviro',
    description:
      'Edviro groups related data center alarms, names the likely cause behind them and gives the team one diagnosed fix to approve.',
    hero: {
      crumbs: [['Data centers', '/solutions/data-centers']],
      label: 'Alarm diagnosis',
      title: 'Alarm diagnosis for data centers',
      lede: 'Edviro groups related BMS, EPMS and PDU alarms, compares them with how the site normally runs, and names the likely cause with the evidence. Your operators get one fix to approve.',
      secondary: ['See a diagnosis', '#diagnosis'],
      note: 'Read-only. Nothing new installed. A person approves every fix.',
    },
    sections: [
      {
        type: 'answer',
        question: 'What is alarm root-cause analysis for data centers?',
        answer:
          'Alarm root-cause analysis groups the alarms a data center’s BMS, power and environmental systems raise and traces them to the fault behind them. Edviro reads that telemetry read-only, learns how each unit and room normally behaves, ties related alarms together by time, location and equipment, and names the likely cause with its evidence. Operators get one fix to review.',
      },
      {
        type: 'cards',
        title: 'Why alarm lists don’t help',
        cards: [
          {
            title: 'Raised per point',
            text: 'A BMS alarms point by point, so one fault trips dozens of them.',
          },
          {
            title: 'Repeats',
            text: 'The same alarm clears and comes back all week. People stop looking.',
          },
          {
            title: 'Buried faults',
            text: 'The one alarm that matters sits on page 4 of the list.',
          },
          {
            title: 'No context',
            text: 'The alarm says which limit was crossed. It doesn’t say why.',
          },
        ],
      },
      {
        type: 'rows',
        id: 'diagnosis',
        title: 'Example: a diagnosis for CRAH-2',
        intro: 'Pod 3 raises 312 alarms in 24 hours, and one fix reaches the team.',
        rows: [
          ['Likely cause', 'CRAH-2 chilled-water valve stuck at 40%.'],
          ['Alarms tied', 'The diagnosis ties 41 alarms together.'],
          [
            'Evidence',
            'Fan pinned at 100% for 3 days. Low ΔT (3.1 K) on CRAH-2 only. Row C inlets climbing each afternoon, to 27.4 °C.',
          ],
          ['Next', 'A drafted fix, ready for the site lead to approve.'],
        ],
      },
      {
        type: 'cards',
        title: 'Faults behind alarm floods',
        intro: 'Several of these also use up cooling headroom, so fixing them gives capacity back.',
        cards: [
          {
            title: 'Sticking valves',
            text: 'A chilled-water valve stuck part-open, with low ΔT and the fan pinned.',
          },
          {
            title: 'Fan saturation',
            text: 'CRAH/CRAC fans at 100% to cover for a fault somewhere else.',
          },
          { title: 'Airflow leaks', text: 'Missing blanking panels and hot spots in one row.' },
          { title: 'Sensor drift', text: 'A humidity or temperature sensor slowly reading wrong.' },
          {
            title: 'Power anomalies',
            text: 'PDU and UPS load and alarms that are out of pattern.',
          },
          {
            title: 'Units fighting',
            text: 'Neighboring units humidifying and dehumidifying at the same time.',
          },
        ],
      },
      {
        type: 'chips',
        title: 'What it connects to',
        items: ['BMS', 'DCIM', 'EPMS', 'PDU', 'Sensors'],
        note: 'Access is read-only. Edviro never acknowledges, suppresses or changes alarms in your BMS. It connects to major DCIM, BMS, EPMS and PDU systems through open protocols or APIs, and fixes go to the operator list or your ticketing.',
      },
      {
        type: 'faq',
        title: 'Questions about alarm diagnosis',
        items: [
          [
            'How is this different from BMS alarms?',
            'A BMS raises alarms per point. Edviro compares behavior with a learned baseline, groups related alarms, and names the likely cause with the evidence attached.',
          ],
          [
            'Does Edviro change or silence our alarms?',
            'No. Access is read-only. Your BMS alarms stay exactly as they are.',
          ],
          [
            'What data does it need?',
            'BMS points and alarms, EPMS and PDU power, and the environmental sensors you already have.',
          ],
          [
            'How long until diagnoses are useful?',
            'That depends on the site. We’ll go through timing with you on the demo call.',
          ],
          [
            'What if the diagnosis is wrong?',
            'A person reviews every diagnosis before a fix goes out, and the outcome is fed back into the model.',
          ],
          [
            'Does it work in colocation?',
            'That depends on the site. We’ll go through fit with you on the demo call.',
          ],
        ],
      },
      {
        type: 'cards',
        title: 'Related pages',
        cards: [
          {
            title: 'Data centers overview',
            text: 'What Edviro does for data center teams.',
            href: '/solutions/data-centers',
          },
          {
            title: 'Capacity and cooling',
            text: 'How much more load each pod can carry, and what-if scenarios.',
            href: '/solutions/data-centers/cooling',
          },
          {
            title: 'Building intelligence',
            text: 'How Edviro detects faults and finds the likely cause.',
            href: '/building-intelligence',
          },
          {
            title: 'Work orders',
            text: 'How a fix is assigned, tracked and closed out.',
            href: '/work-orders',
          },
        ],
      },
    ],
  },
]

export default pages
