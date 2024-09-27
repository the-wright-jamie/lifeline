<script setup lang="ts">
defineProps<{
  msg: {
    type: String
    required: false
  }
}>()
</script>

<template>
  <h1>
    <span class="material-symbols-rounded">&#xe650;</span><i>Lifeline</i>
    <span class="material-symbols-rounded">&#xe650;</span>
  </h1>
  <h2>{{ msg }}</h2>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}

.material-symbols-rounded {
  font-size: 2rem;
  padding-left: 0.1em;
}
</style>
