<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, onMounted, ref } from 'vue'

interface Release {
  id: number | string
  repo: string
  name?: string
  tag_name?: string
  published_at: string
  html_url: string
}

const props = defineProps({
  releases: {
    type: Array as PropType<Release[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 10
  },
  progress: {
    type: Object as PropType<{ current: number; total: number; repo: string }>,
    default: () => ({ current: 0, total: 0, repo: '' })
  }
})

// Sort releases in descending order by published_at (most recent first) and limit
const sortedReleases = computed(() => {
  return [...props.releases]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, props.limit)
})

const isDarkMode = ref(false)
onMounted(() => {
  isDarkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
})

// Highlight logic for new releases (last 7 days, today/yesterday)
function isWithinLast7Days(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return date >= sevenDaysAgo && date <= now
}

function isTodayOrYesterday(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  return date >= yesterday && date < new Date(today.getTime() + 24 * 60 * 60 * 1000)
}
</script>

<template>
  <h2 class="select-none">GitHub Releases</h2>
  <table class="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
    <thead
      class="text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 select-none"
    >
      <tr>
        <th scope="col" class="px-6 py-3">Owner</th>
        <th scope="col" class="px-6 py-3">Repo</th>
        <th scope="col" class="px-6 py-3">Release</th>
        <th scope="col" class="px-6 py-3">Date</th>
        <th scope="col" class="px-6 py-3"></th>
        <th scope="col" class="px-6 py-3"></th>
      </tr>
    </thead>
    <tbody v-if="loading">
      <tr>
        <td colspan="6" class="px-6 py-2">
          <div class="w-full h-2 bg-white dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              class="h-2 bg-green-500 dark:bg-green-400 animate-pulse"
              :style="{
                width: progress.total > 0 ? (progress.current / progress.total) * 100 + '%' : '0%'
              }"
            ></div>
          </div>
          <span class="block text-xs mt-2 text-center">
            <template v-if="progress.repo">
              Currently loading: <b>{{ progress.repo }}</b>
            </template>
            <template v-if="progress.total > 0">
              ({{ progress.current }}/{{ progress.total }})
            </template>
          </span>
        </td>
      </tr>
    </tbody>
    <tbody v-else-if="sortedReleases.length != 0">
      <tr
        v-for="(release, i) in sortedReleases"
        :key="release.id"
        class="border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        :class="i % 2 == 0 ? 'bg-neutral-100 dark:bg-neutral-900' : 'bg-white'"
      >
        <td class="px-6 py-2">{{ release.repo.split('/')[0] }}</td>
        <td class="px-6 py-2">
          <span class="font-bold" :class="isDarkMode ? 'text-white' : 'text-black'">
            <a :href="`https://github.com/${release.repo}`" target="_blank">
              {{ release.repo.split('/')[1] }}
            </a>
          </span>
        </td>
        <td class="px-6 py-2">{{ release.name || release.tag_name }}</td>
        <td class="px-6 py-2">{{ new Date(release.published_at).toLocaleDateString() }}</td>
        <td class="px-6 py-2">
          <a :href="release.html_url" target="_blank">View</a>
        </td>
        <td class="px-6 py-2">
          <span
            v-if="isWithinLast7Days(release.published_at)"
            class="dot"
            :class="isTodayOrYesterday(release.published_at) ? 'bg-green-400' : 'bg-green-900'"
            aria-label="New release"
          ></span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="6" class="px-6 py-2">No releases found.</td>
      </tr>
    </tbody>
  </table>
</template>
