<script setup lang="ts">
import { getRandomInt } from '@/assets/ts/utils'

const props = defineProps({
  header: String,
  message: String
})

function pickRandomErrorImage() {
  return `src/assets/img/error/${getRandomInt(1, 4)}.png`
}
</script>

<template>
  <div class="middle center">
    <img class="error-image rounded-xl" :src="pickRandomErrorImage()" />
    <br />
    <h1>{{ header }}</h1>
    <p>{{ message }}</p>
  </div>
</template>
