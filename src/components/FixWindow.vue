<script setup lang="ts">
import icon from '@/assets/img/edviro-icon.svg'
import type { FixScreen, FixStatus } from '@/content/types'

/** Illustrative product window: a list of fixes with their status. */
defineProps<{ screen: FixScreen }>()

const STATUS: Record<FixStatus, { label: string; className: string }> = {
  review: { label: 'Needs review', className: 'pill' },
  progress: { label: 'In progress', className: 'pill progress' },
  dispatched: { label: 'Dispatched', className: 'pill dispatched' },
  verified: { label: 'Verified', className: 'pill verified' },
}
</script>

<template>
  <div class="app compact" role="img" :aria-label="`Edviro ${screen.crumb} screen (example)`">
    <div class="app-bar">
      <img :src="icon" alt="" width="15" height="20" />
      <span class="crumb"
        >All sites&ensp;/&ensp;<b>{{ screen.crumb }}</b></span
      >
      <span class="app-tools"><span class="avatar">FM</span></span>
    </div>
    <div class="list">
      <div class="list-head">
        <b>{{ screen.heading }}</b
        ><span>{{ screen.count }}</span>
      </div>
      <div
        v-for="(row, index) in screen.rows"
        :key="row.title"
        :class="['fix', { on: index === 0 }]"
      >
        <b>{{ row.title }}</b>
        <small>{{ row.meta }}</small>
        <span :class="STATUS[row.status].className">{{ STATUS[row.status].label }}</span>
      </div>
    </div>
  </div>
</template>
