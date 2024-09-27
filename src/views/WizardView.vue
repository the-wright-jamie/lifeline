<script setup lang="ts">
import DependenciesDropdown from '@/components/DependenciesSelector.vue'
</script>

<template>
  <Suspense>
    <DependenciesDropdown />
    <template #fallback>
      <Spinner class="middle" msg="Preparing dependencies" />
    </template>
  </Suspense>
</template>
