<script setup lang="ts">
import TeamSection from '@/components/TeamSection.vue'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, organizationLd } from '@/seo/jsonld'
import { ABOUT_PATH, CONTACT_EMAIL } from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: ABOUT_PATH },
]

usePageSeo({
  title: 'About Edviro',
  description:
    'Edviro started in California school districts and is a Y Combinator-backed team building an AI-powered facilities operations platform.',
  path: ABOUT_PATH,
  type: 'website',
  jsonLd: [organizationLd(), breadcrumbLd(breadcrumbs)],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <section class="hero">
      <div class="shell">
        <div class="hero-copy">
          <p class="eyebrow">About Edviro</p>
          <h1 class="h1">Started in schools. Backed by Y Combinator.</h1>
          <p class="hero-lede">Edviro began in California school districts — aging equipment, thin facilities teams, and meter data that made operational waste impossible to ignore. Backed by Y Combinator, we are building an AI-powered facilities operations platform so the people who run buildings can find the problem, get it fixed, and verify the result.</p>
        </div>
      </div>
    </section>

    <TeamSection />

    <section class="contact">
      <div class="shell">
        <div class="contact-card">
          <div>
            <h2 class="contact-h2">Get in touch</h2>
            <p class="contact-body">Questions, partnerships, or press? We'd love to hear from you.</p>
          </div>
          <a :href="`mailto:${CONTACT_EMAIL}`" class="btn btn-outline">{{ CONTACT_EMAIL }}</a>
        </div>
      </div>
    </section>

    <CtaSection />
  </main>
</template>

<style scoped>
.hero { padding: 32px 32px 8px; }
.hero-copy { max-width: 720px; }
.h1 {
  margin: 0;
  font-weight: 500;
  font-size: clamp(36px, 4.8vw, 58px);
  line-height: 1.07;
  letter-spacing: var(--track-display);
  text-wrap: balance;
}
.hero-lede {
  margin: 24px 0 0;
  max-width: 680px;
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink-2);
  text-wrap: pretty;
}
.contact { padding: 10px 32px 90px; }
.contact-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}
.contact-h2 { margin: 0 0 6px; font-size: 20px; font-weight: 600; }
.contact-body { margin: 0; font-size: 15.5px; color: var(--ink-2); }
.contact-card .btn { font-size: 14px; color: var(--accent); }
</style>
