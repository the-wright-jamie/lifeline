<script setup lang="ts">
import { getRandomInt } from '@/assets/ts/utils'

const props = defineProps({
  header: String,
  message: String
})

function pickRandomErrorImage() {
  // silly cat easter egg when there are errors - another
  // playful little thing I wanted to do
  return `https://raw.githubusercontent.com/the-wright-jamie/lifeline/refs/heads/main/src/assets/img/error/${getRandomInt(1, 5)}.png`
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
