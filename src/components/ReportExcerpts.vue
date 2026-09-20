<script setup lang="ts">
/**
 * Report-backed energy proof. GATED: HomePage renders this only when
 * `showEvidence` is true, and each excerpt renders only when `verified` is
 * true. Flip a card to verified only after the owner named in its comment has
 * confirmed the figure, the anonymization, and the customer's permission.
 *
 * Every excerpt needs: owner, source report + date, customer permission,
 * anonymized site label. Do not paste conversational estimates here.
 */
interface Excerpt {
  /** Anonymized site label, e.g. "K-12 district · 14 sites". */
  site: string
  figure: string
  caption: string
  source: string
  verified: boolean
}

const excerpts: Excerpt[] = [
  // Owner: Tanuj. Source: TBD (M&V report, date). Permission: TBD.
  { site: 'Education customer \u00B7 anonymized', figure: 'TBD', caption: 'Figure pending sign-off', source: 'M&V report, date TBD', verified: false },
  // Owner: Tanuj. Source: TBD (M&V report, date). Permission: TBD.
  { site: 'Education customer \u00B7 anonymized', figure: 'TBD', caption: 'Figure pending sign-off', source: 'M&V report, date TBD', verified: false },
]

const visible = excerpts.filter((e) => e.verified)
</script>

<template>
  <div v-if="visible.length" class="excerpts">
    <p class="ui-label">From customer M&amp;V reports · education customers, anonymized</p>
    <div class="excerpt-grid">
      <figure v-for="ex in visible" :key="ex.caption" class="ui-card excerpt">
        <div class="ui-head">
          <span class="ui-label">{{ ex.site }}</span>
          <span class="ui-pill is-verified">Verified</span>
        </div>
        <span class="excerpt-figure">{{ ex.figure }}</span>
        <figcaption>
          {{ ex.caption }}
          <span class="ui-note">Source: {{ ex.source }}</span>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.excerpts {
  margin-top: 28px;
  display: grid;
  gap: 12px;
}
.excerpt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}
.excerpt {
  gap: 8px;
}
.excerpt-figure {
  font-size: 34px;
  font-weight: 300;
  letter-spacing: var(--track-display);
  line-height: 1;
}
.excerpt figcaption {
  display: grid;
  gap: 4px;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-2);
}
</style>
