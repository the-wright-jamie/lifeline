<script setup lang="ts">
import { ref } from 'vue' // Import ref for reactivity
const config = JSON.parse(localStorage.getItem('config'))

(async function () {
  for await (const dependency of config.dependencies) {
    console.log(dependency)
    break // Closes iterator, triggers return
  }
})()

/*await config.dependencies.forEach((dependency) => {
  let url = `https://endoflife.date/api/${dependency}.json`
  let response = await fetch(url).then((response) => response.json()) // send response body to next then chain
  console.log(response)
})

console.log('heloo')*/
</script>

<template></template>
