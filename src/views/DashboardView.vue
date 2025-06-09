<script setup lang="ts">
import DashboardMain from '@/components/DashboardMain.vue'
import { ref } from 'vue'

let progress = ref(0)
let lastLoaded = ref('')
function handleProgress(event: Event) {
  // @ts-expect-error
  progress.value = Math.round((event.completed / event.total) * 100)
  // @ts-expect-error
  lastLoaded.value = event.lastLoaded || ''
}
</script>

<template>
  <KeepAlive>
    <Suspense>
      <DashboardMain @progress="handleProgress" />
      <template #fallback> <AnimeSpinner class="middle" msg="Loading dashboard" /></template>
    </Suspense>
  </KeepAlive>
  <div v-if="progress != 100">
    <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-6">
      <div
        class="bg-black dark:bg-white text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        :style="`width: ${progress}%`"
      />
    </div>
    <p class="text-center text-sm opacity-60 mt-2">
      {{ lastLoaded ? `Loaded: ${lastLoaded}` : 'Loading...' }}
    </p>
  </div>
</template>
