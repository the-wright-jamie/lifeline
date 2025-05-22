<script setup lang="ts">
import DependencyInfo from '@/components/DependencyInfo.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading_info = `Loading info on '${route.params.dependency}''`
</script>

<template>
  <Suspense>
    <DependencyInfo :dependency="route.params.dependency" />
    <template #fallback> <AnimeSpinner class="middle" :msg="loading_info" /></template>
  </Suspense>
  <!-- hey, what are you doing here? this is a secret new feature - it's not ready yet! -->
</template>
