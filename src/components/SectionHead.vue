<script setup lang="ts">
defineProps<{ label?: string; title?: string; intro?: string }>()
</script>

<template>
  <div v-if="label || title || intro" class="head">
    <div v-if="label" class="label">{{ label }}</div>
    <h2 v-if="title">{{ title }}</h2>
    <p v-if="intro" class="sub">{{ intro }}</p>
  </div>
</template>
