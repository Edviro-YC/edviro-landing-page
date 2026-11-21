<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { WHATS_NEW_URL } from '@/seo/site'
import { fetchWhatsNew, formatUpdateDate, type WhatsNewItem } from '@/content/whatsNew'

/*
 * The three latest product updates, read from the blog's JSON feed in the
 * browser after the page has loaded. Nothing is fetched at build time, so the
 * build never depends on the blog; the prerendered page has no strip, and it
 * only appears when the feed answers with at least one update. It sits below
 * the closing demo section so that appearing late never moves anything a
 * visitor is looking at, including links to /#demo.
 */
const items = ref<WhatsNewItem[]>([])

onMounted(async () => {
  items.value = await fetchWhatsNew(3)
})
</script>

<template>
  <section v-if="items.length" class="whats-new" aria-labelledby="whats-new-title">
    <div class="wrap">
      <div class="wn-head">
        <h2 id="whats-new-title">What’s new <span>in Edviro</span></h2>
        <a class="more" :href="WHATS_NEW_URL">All product updates →</a>
      </div>
      <ul class="wn-items">
        <li v-for="item in items" :key="item.path">
          <a :href="item.path">
            <time :datetime="item.date">{{ formatUpdateDate(item.date) }}</time>
            <b>{{ item.title }}</b>
            <span>{{ item.lede }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.whats-new {
  padding: 72px 0 0;
}

.whats-new .wrap {
  padding-bottom: 72px;
  border-bottom: 1px solid var(--line);
}

.wn-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
}

.wn-head h2 {
  font-size: clamp(26px, 2.6vw, 32px);
  max-width: none;
}

.wn-head .more {
  margin-top: 0;
  white-space: nowrap;
}

.wn-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 28px;
}

.wn-items a {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 24px 24px 26px;
  transition: border-color 0.15s;
}

.wn-items a:hover {
  border-color: var(--ink);
}

.wn-items time {
  font-size: 13px;
  color: var(--mute);
}

.wn-items b {
  font: 600 17px/1.3 var(--font);
  letter-spacing: -0.01em;
  color: var(--ink);
}

.wn-items span {
  font-size: 15px;
  line-height: 1.5;
}

@media (max-width: 1040px) {
  .wn-items {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 780px) {
  .whats-new {
    padding-top: 56px;
  }

  .whats-new .wrap {
    padding-bottom: 56px;
  }

  .wn-head {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
