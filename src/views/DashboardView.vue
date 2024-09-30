<script setup lang="ts">
import DashboardMain from '@/components/DashboardMain.vue'
</script>

<template>
  <Suspense>
    <DashboardMain />
    <template #fallback> <AnimeSpinner class="middle" msg="Loading dashboard" /></template>
  </Suspense>
</template>
