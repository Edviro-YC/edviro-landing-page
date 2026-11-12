<script setup lang="ts">
import { computed, ref } from 'vue'
import DesignerArtwork, { type ArtworkKind } from '@/components/design/DesignerArtwork.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import CtaSection from '@/components/CtaSection.vue'
import DemoButton from '@/components/DemoButton.vue'
import FixWindow from '@/components/FixWindow.vue'
import SectionHead from '@/components/SectionHead.vue'
import SiteLink from '@/components/SiteLink.vue'
import { contentPage } from '@/content'
import type { ContentPage } from '@/content/types'
import { breadcrumbLd, faqLd, webpageLd, type FaqItem } from '@/seo/jsonld'
import { usePageSeo } from '@/seo/usePageSeo'

/**
 * Renders one page from src/content: a hero followed by its sections. Each
 * route passes its own path (see src/router), so every page is prerendered.
 */
const props = defineProps<{ path: string }>()

// Routes are generated from the content list, so the lookup always succeeds.
const page = contentPage(props.path) as ContentPage
const crumbs = page.hero.crumbs ?? []
const root = ref<HTMLElement | null>(null)
useScrollReveal(root)

// Illustrations complement the existing content; all copy remains in src/content.
const artworkByPath: Record<string, ArtworkKind> = {
  '/building-intelligence': 'diagnostic',
  '/work-orders': 'work-orders',
  '/asset-management': 'capital',
  '/capital-planning': 'capital',
  '/measurement-and-verification': 'verification',
}
const heroArtwork = artworkByPath[page.path]
const showLoopArtwork = page.path === '/facilities-operations' || page.path === '/integrations'
const loopArtwork: ArtworkKind[] = ['signal', 'diagnose', 'review', 'dispatch', 'verify']

// Skip the small label when the headline already says the same thing.
const showLabel = computed(
  () =>
    crumbs.length === 0 && !page.hero.title.toLowerCase().includes(page.hero.label.toLowerCase()),
)

// Backgrounds alternate, ending on white so the tinted demo section follows cleanly.
const tinted = (index: number) => (page.sections.length - 1 - index) % 2 === 1

const faqItems: FaqItem[] = page.sections.flatMap((section) => {
  if (section.type !== 'faq') return []
  const items = section.groups
    ? section.groups.flatMap((group) => group.items)
    : (section.items ?? [])
  return items.map(([question, answer]) => ({ question, answer }))
})

usePageSeo({
  title: page.title,
  description: page.description,
  path: `${page.path}/`,
  jsonLd: [
    webpageLd({ name: page.title, description: page.description, path: page.path }),
    breadcrumbLd([
      { name: 'Home', path: '/' },
      ...crumbs.map(([name, path]) => ({ name, path })),
      { name: page.hero.label, path: page.path },
    ]),
    ...(faqItems.length ? [faqLd(faqItems)] : []),
  ],
})
</script>

<template>
  <main ref="root" class="nd">
    <div class="page-hero">
      <div class="wrap" :class="{ 'has-art': heroArtwork || showLoopArtwork }">
        <div>
          <div v-if="crumbs.length" class="crumbs">
            <span v-for="[label, href] in crumbs" :key="href"
              ><SiteLink :href="href">{{ label }}</SiteLink> /
            </span>
            {{ page.hero.label }}
          </div>
          <div v-else-if="showLabel" class="label">{{ page.hero.label }}</div>
          <h1>{{ page.hero.title }}</h1>
          <p class="nd-lede">{{ page.hero.lede }}</p>
          <div class="actions">
            <SiteLink v-if="page.hero.primary" class="nd-btn" :href="page.hero.primary[1]">{{
              page.hero.primary[0]
            }}</SiteLink>
            <DemoButton v-else />
            <SiteLink
              v-if="page.hero.secondary"
              class="nd-btn ghost"
              :href="page.hero.secondary[1]"
              >{{ page.hero.secondary[0] }}</SiteLink
            >
          </div>
          <p v-if="page.hero.note" class="note">{{ page.hero.note }}</p>
        </div>
        <DesignerArtwork v-if="heroArtwork" :kind="heroArtwork" />
        <div v-else-if="showLoopArtwork" class="hero-loop-art">
          <DesignerArtwork
            v-for="kind in ['diagnose', 'review', 'verify'] as const"
            :key="kind"
            :kind="kind"
          />
        </div>
      </div>
    </div>

    <section
      v-for="(section, index) in page.sections"
      :id="section.id"
      :key="index"
      :class="{ alt: tinted(index) }"
    >
      <div v-if="section.type === 'answer'" class="wrap answer">
        <h2>{{ section.question }}</h2>
        <p>{{ section.answer }}</p>
      </div>

      <div v-else-if="section.type === 'faq'" class="wrap faq">
        <div>
          <div v-if="section.label" class="label">{{ section.label }}</div>
          <h2>{{ section.title }}</h2>
          <p v-if="section.intro" class="sub">{{ section.intro }}</p>
        </div>
        <div>
          <template v-if="section.groups">
            <div v-for="group in section.groups" :key="group.title" class="faq-group">
              <h3>{{ group.title }}</h3>
              <details v-for="[question, answer] in group.items" :key="question">
                <summary>{{ question }}</summary>
                <p>{{ answer }}</p>
              </details>
            </div>
          </template>
          <template v-else>
            <details v-for="[question, answer] in section.items ?? []" :key="question">
              <summary>{{ question }}</summary>
              <p>{{ answer }}</p>
            </details>
          </template>
        </div>
      </div>

      <div v-else class="wrap">
        <SectionHead :label="section.label" :title="section.title" :intro="section.intro" />

        <div
          v-if="section.type === 'stats'"
          class="stat-row facts"
          :style="{ gridTemplateColumns: `repeat(${section.items.length}, 1fr)` }"
        >
          <div v-for="[value, label] in section.items" :key="label" class="stat">
            <b>{{ value }}</b
            ><span>{{ label }}</span>
          </div>
        </div>

        <div v-else-if="section.type === 'steps'" class="steps">
          <div
            v-for="(step, stepIndex) in section.steps"
            :key="step.title"
            :class="{ human: step.tag }"
            data-reveal
          >
            <DesignerArtwork
              v-if="showLoopArtwork && section.steps.length === 5"
              class="step-art"
              :kind="loopArtwork[stepIndex]!"
            />
            <div class="step-no">
              {{ String(stepIndex + 1).padStart(2, '0') }}<em v-if="step.tag">{{ step.tag }}</em>
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </div>

        <div v-else-if="section.type === 'cards'" class="tiles">
          <template v-for="card in section.cards" :key="card.title">
            <SiteLink v-if="card.href" class="tile link" :href="card.href">
              <small v-if="card.tag">{{ card.tag }}</small>
              <b>{{ card.title }}</b>
              <span v-if="card.text">{{ card.text }}</span>
              <i>→</i>
            </SiteLink>
            <div v-else class="tile">
              <small v-if="card.tag">{{ card.tag }}</small>
              <b>{{ card.title }}</b>
              <span v-if="card.text">{{ card.text }}</span>
            </div>
          </template>
        </div>

        <div
          v-else-if="section.type === 'panels'"
          class="panels"
          :style="{ gridTemplateColumns: `repeat(${section.panels.length}, 1fr)` }"
        >
          <div v-for="panel in section.panels" :key="panel.title" class="panel">
            <span v-if="panel.tag" class="free">{{ panel.tag }}</span>
            <h3>{{ panel.title }}</h3>
            <p>{{ panel.text }}</p>
            <SiteLink v-if="panel.link" class="more" :href="panel.link[1]"
              >{{ panel.link[0] }} →</SiteLink
            >
          </div>
        </div>

        <template v-else-if="section.type === 'chips'">
          <div class="chips">
            <span v-for="item in section.items" :key="item">{{ item }}</span>
          </div>
          <p v-if="section.note" class="note">{{ section.note }}</p>
        </template>

        <div v-else-if="section.type === 'rows'" class="rows">
          <div v-for="[term, text] in section.rows" :key="term">
            <b>{{ term }}</b>
            <p>{{ text }}</p>
          </div>
        </div>

        <FixWindow v-else-if="section.type === 'screen'" :screen="section.screen" />

        <div
          v-else-if="section.type === 'prose'"
          :class="['prose-layout', { 'has-figure': section.image }]"
        >
          <div class="prose">
            <template v-for="(block, blockIndex) in section.blocks" :key="blockIndex">
              <p v-if="typeof block === 'string'">{{ block }}</p>
              <h3 v-else-if="'h' in block">{{ block.h }}</h3>
              <ul v-else>
                <li v-for="item in block.list" :key="item">{{ item }}</li>
              </ul>
            </template>
          </div>
          <figure v-if="section.image">
            <img
              :src="section.image.src"
              :alt="section.image.alt"
              :width="section.image.width"
              :height="section.image.height"
              loading="lazy"
            />
            <figcaption v-if="section.image.caption">{{ section.image.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <CtaSection />
  </main>
</template>
