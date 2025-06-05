<!--
 this is a test document,
TODO: remove or update this when you've finished the experiment
-->

<script setup lang="ts">
import GitHubReleasesTracker from '@/components/GitHubReleasesTracker.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const author: string = route.params.author.toString()
const repo: string = route.params.repo.toString()
const loading_info = `Loading info on '${author}/${repo}'`
</script>

<template>
  <Suspense>
    <GitHubReleasesTracker :author="author" :repo="repo" />
    <template #fallback> <AnimeSpinner class="middle" :msg="loading_info" /></template>
  </Suspense>
</template>
