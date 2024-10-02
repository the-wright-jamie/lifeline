<script setup lang="ts">
const props = defineProps({
  active: Boolean
})
</script>

<template>
  <span v-if="active" class="material-symbols-rounded big">&#xe9f6;</span>
  <span v-else class="material-symbols-rounded big">&#xe9f5;</span>
</template>
