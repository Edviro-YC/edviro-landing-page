<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import OperatingLoop from '@/components/OperatingLoop.vue'
import MessageDemoSection from '@/components/MessageDemoSection.vue'
import PlatformRail from '@/components/PlatformRail.vue'
import EnergySection from '@/components/EnergySection.vue'
import ReportExcerpts from '@/components/ReportExcerpts.vue'
import IndustriesSection from '@/components/IndustriesSection.vue'
import SystemsMap from '@/components/SystemsMap.vue'
import EducationProof from '@/components/EducationProof.vue'
import CtaSection from '@/components/CtaSection.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { organizationLd, websiteLd, softwareApplicationLd } from '@/seo/jsonld'

/**
 * Evidence gates. Both stay false until the figures, permissions, and
 * procurement wording are signed off. Owner/source notes: report excerpts in
 * ReportExcerpts (per card), published figures in src/seo/site.ts (EDU_* and
 * MV_HEADLINE_RESULT), logos and the procurement slot in EducationProof.
 * Flipping a flag is a reviewed change. Sign-off owner: Tanuj.
 */
const showEvidence = false
const showProcurement = false

// Shared metadata is industry-neutral; school-specific titles live on the
// school routes (see src/seo/site.ts). Keep index.html's no-JS title in sync.
usePageSeo({
  title: 'Edviro | AI-Powered Facilities Operations Platform',
  titleTemplate: null,
  description:
    'Edviro turns building signals and staff requests into reviewed work orders, verified fixes, and capital plans for education, healthcare, data centers, and real estate.',
  path: '/',
  jsonLd: [organizationLd(), websiteLd(), softwareApplicationLd()],
})
</script>

<template>
  <!--
    Order is deliberate: neutral hero with the outcome triad (energy, money,
    time), the operating loop, then the message → work order → verified fix
    demo showing that loop for real, continuous optimization, the capability
    rail, the systems map, the industries (where education becomes explicit),
    then labeled education proof, then the CTA. Legacy anchors (#solutions,
    #how-it-works, #work-orders, #energy, #systems, #planning, #mv, #results,
    #customers, #who) all still resolve.
  -->
  <main>
    <HeroSection />
    <OperatingLoop />
    <MessageDemoSection />
    <EnergySection>
      <template v-if="showEvidence" #evidence>
        <ReportExcerpts />
      </template>
    </EnergySection>
    <PlatformRail />
    <SystemsMap />
    <IndustriesSection />
    <EducationProof :show-procurement="showProcurement" />
    <CtaSection />
  </main>
</template>
