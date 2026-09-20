<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import PlatformHero from '@/components/platform/PlatformHero.vue'
import SegmentCallout from '@/components/platform/SegmentCallout.vue'
import UiAssetRecord from '@/components/ui/UiAssetRecord.vue'
import UiAssetTree from '@/components/ui/UiAssetTree.vue'
import UiBeforeAfter from '@/components/ui/UiBeforeAfter.vue'
import UiWorkQueue from '@/components/ui/UiWorkQueue.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  PLATFORM_ASSETS_PATH,
  PLATFORM_WORK_ORDERS_PATH,
} from '@/seo/site'

/**
 * Industry-neutral asset-management page. The school equivalent
 * (/school-asset-management-software/) keeps its own title, canonical, and
 * schema; the two link to each other through SegmentCallout.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Asset management', path: PLATFORM_ASSETS_PATH },
]

const inspections = [
  { title: 'Fall inspection · Boiler-2', priority: 'Medium' as const, trade: 'Mechanical', status: 'Due Oct 15' },
  { title: 'Quarterly filters · AHU-1 to AHU-6', priority: 'Low' as const, trade: 'HVAC', status: 'In progress' },
  { title: 'Backflow test · Building A', priority: 'High' as const, trade: 'Plumbing', status: 'Verified' },
]

const faqs: FaqItem[] = [
  {
    question: 'What does an asset record hold?',
    answer:
      'Nameplate details (make, model, serial, install year), location in the organization → site → building → system hierarchy, documents and manuals, the complete service history with labor, parts, and cost, scheduled inspections, and the repair-or-replace outlook that history produces.',
  },
  {
    question: 'How do inspections work?',
    answer:
      'Inspections are scheduled against the asset and appear in the same queue as work orders. Technicians follow the checklist on a phone or tablet, attach photos and readings, and findings can open a work order that a reviewer approves before dispatch.',
  },
  {
    question: 'How does the registry feed capital planning?',
    answer:
      'Repeat failures, rising repair cost, and age are tracked per asset, so repair-or-replace calls start from the record rather than from memory. Verified savings and failure history flow into multi-year capital priorities.',
  },
  {
    question: 'Can we import the asset list we already have?',
    answer:
      'Yes. Spreadsheets, exports from an existing CMMS, and nameplate photos are the usual starting points. Edviro maps them into the hierarchy and flags gaps to fill during the first inspections.',
  },
  {
    question: 'Do we have to replace our CMMS to use Edviro for assets?',
    answer:
      'No. Edviro can be the asset system or read from and write to the one you keep. Integration scope is confirmed system by system, and the choice can change later.',
  },
]

usePageSeo({
  title: 'Facility Asset Management and Inspection Software',
  description:
    'One record per asset: nameplate, documents, full service history, inspections, and the repair-or-replace outlook that history produces. Works with your CMMS.',
  path: PLATFORM_ASSETS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro asset management software',
      description:
        'Asset registry for facilities teams: organization → site → building → system → asset hierarchy, nameplate details, documents, service history, scheduled inspections, and lifecycle planning.',
      path: PLATFORM_ASSETS_PATH,
      serviceType: 'Asset management software',
      areaServed: 'United States',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <PlatformHero
      eyebrow="Assets and inspections"
      lede="Nameplate, documents, service history, inspections, and cost in one record per asset, so the same failure next year starts from evidence, not memory."
      note="Import the list you have. Fill the gaps during the first inspections."
      :secondary="{ label: 'See work orders', to: PLATFORM_WORK_ORDERS_PATH }"
    >
      Every asset carries <span class="accent">its own history.</span>
      <template #visual>
        <UiAssetRecord />
      </template>
    </PlatformHero>

    <!-- HIERARCHY -->
    <section id="hierarchy" class="section is-tint">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">Registry</p>
          <h2 class="h2">One hierarchy, from portfolio to part.</h2>
          <p class="lede">Organization, site, building, system, asset. Every work order, inspection, and reading lands on the right node.</p>
        </div>
        <div class="visuals">
          <UiAssetTree />
        </div>
      </div>
    </section>

    <!-- INSPECTIONS -->
    <section id="inspections" class="section">
      <div class="shell two-up is-reverse">
        <div class="visuals">
          <UiWorkQueue title="Inspections · Scheduled" :rows="inspections" summary="Inspection queue with three rows: a fall boiler inspection due Oct 15, quarterly filter changes in progress, and a verified backflow test." />
        </div>
        <div>
          <p class="eyebrow">Inspections</p>
          <h2 class="h2">Scheduled against the asset, run from the field.</h2>
          <p class="lede">Checklists, photos, and readings come back on a phone. A finding can open a work order, which a reviewer approves before it is dispatched.</p>
        </div>
      </div>
    </section>

    <!-- LIFECYCLE -->
    <section id="lifecycle" class="section is-tint">
      <div class="shell two-up">
        <div>
          <p class="eyebrow">Lifecycle</p>
          <h2 class="h2">From service history to repair-or-replace.</h2>
          <p class="lede">Repeat failures, rising repair cost, and verified results accumulate on the record and flow into the <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link">capital plan</RouterLink>.</p>
        </div>
        <div class="visuals">
          <UiBeforeAfter title="Verification · Boiler-2 retrofit" delta="−22% therms" note="Verified over 60 days against the learned baseline" summary="Bar comparison: gas use after the boiler retrofit is 22% below the learned baseline, verified over 60 days." :ratio="0.78" />
          <p class="ui-note">Illustrative product views with fictional data.</p>
        </div>
      </div>
    </section>

    <SegmentCallout
      eyebrow="For K‑12 and higher education"
      heading="Running a school district?"
      body="The same registry, written for maintenance and operations teams: district-wide hierarchy, campus inspections, and bond-cycle planning."
      :links="[
        { label: 'School asset management software', to: ASSETS_PATH },
        { label: 'CMMS for schools', to: CMMS_PATH },
      ]"
    />

    <FaqList eyebrow="Questions" heading="Asset management FAQ" :items="faqs" />

    <CtaSection />
  </main>
</template>

<style scoped>
.two-up {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px 56px;
  align-items: center;
}
.visuals {
  display: grid;
  gap: 12px;
  min-width: 0;
}
@media (max-width: 900px) {
  .two-up { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .two-up.is-reverse .visuals { order: 2; }
}
</style>
