<script setup lang="ts">
import { getRandomInt } from '@/assets/ts/utils'
import Spinner from './Spinner.vue'

const props = defineProps({
  header: String,
  message: String,
  image: String
})

function pickRandomErrorImage() {
  // silly cat easter egg when there are errors - another
  // playful little thing I wanted to do
  return `https://raw.githubusercontent.com/the-wright-jamie/lifeline/refs/heads/main/src/assets/img/error/${getRandomInt(1, 5)}.png`
}
</script>

<template>
  <div class="middle center">
    <ImagePlaceholder :class="'error-image rounded-xl'" :src="image ? image : pickRandomErrorImage()">
      <br />
      <br />
      <br />
      <div class="center-div"><Spinner /></div>
      <br />
      <br />
      <br />
    </ImagePlaceholder>
    <br />
    <h1>{{ header }}</h1>
    <p>{{ message }}</p>
  </div>
</template>
