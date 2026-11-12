<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * One link component for content data: site paths become router links, and
 * anchors, mailto: and full URLs stay plain links.
 */
const props = defineProps<{ href: string }>()

const isRoute = computed(() => props.href.startsWith('/') && !/^\/blog(?:\/|$|[?#])/.test(props.href))
const isExternal = computed(() => props.href.startsWith('http') && new URL(props.href).origin !== 'https://edviro.com')

// Pages are prerendered as directories (see ssgOptions in vite.config.ts), so
// internal links use the trailing-slash form that serves without a redirect.
const to = computed(() => {
  const [path = '/', hash] = props.href.split('#')
  const slashed = path.endsWith('/') ? path : `${path}/`
  return hash ? { path: slashed, hash: `#${hash}` } : slashed
})
</script>

<template>
  <RouterLink v-if="isRoute" :to="to"><slot /></RouterLink>
  <a
    v-else
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener' : undefined"
    ><slot
  /></a>
</template>
