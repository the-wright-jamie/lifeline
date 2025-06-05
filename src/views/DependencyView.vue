<script setup lang="ts">
import DependencyInfo from '@/components/DependencyInfo.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dependency: string = route.params.dependency.toString()
const loading_info = `Loading info on '${dependency}''`
</script>

<template>
  <Suspense>
    <DependencyInfo :dependency="dependency" />
    <template #fallback> <AnimeSpinner class="middle" :msg="loading_info" /></template>
  </Suspense>
</template>
