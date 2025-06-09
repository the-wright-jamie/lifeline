<script setup lang="ts">
import Spinner from './Spinner.vue'

const props = defineProps({
  header: String,
  message: String,
  image: String
})

// Import all error images (including subfolders)
const allErrorImages = import.meta.glob('@/assets/img/error/**/*.{png,jpg,jpeg,gif,webp}', {
  eager: true,
  import: 'default'
})

// Import all cat images for fallback
const catImages = import.meta.glob('@/assets/img/error/cats/*.png', {
  eager: true,
  import: 'default'
})
const catImageUrls = Object.values(catImages)

function pickRandomCatImage() {
  const idx = Math.floor(Math.random() * catImageUrls.length)
  return catImageUrls[idx]
}

function resolveErrorImage() {
  if (props.image) {
    // Try to find the image in the error images folder (including subfolders)
    // Accepts e.g. 'disconnected.png', 'cats/1.png', etc.
    const possibleKeys = Object.keys(allErrorImages)
    // Try to match by filename or subpath
    const match = possibleKeys.find((key) => key.endsWith('/' + props.image))
    if (match) {
      return allErrorImages[match]
    }
  }
  // Fallback to random cat image
  return pickRandomCatImage()
}
</script>

<template>
  <div class="middle center">
    <ImagePlaceholder :styling="'error-image rounded-xl'" :src="resolveErrorImage()">
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
