<script setup lang="ts">
const props = defineProps({
  data: String
})

const allData = JSON.parse(props.data)
</script>


<template>
  <h2>EOL Date Visualization</h2>
</template>
