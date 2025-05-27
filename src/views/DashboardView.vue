<script setup lang="ts">
import DashboardMain from '@/components/DashboardMain.vue'
import { ref } from 'vue'

let loadingMessage = ref(``)
</script>

<template>
  <Suspense>
    <DashboardMain />
    <template #fallback> <AnimeSpinner class="middle" msg="Loading dashboard" /></template>
  </Suspense>
</template>
