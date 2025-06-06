<script setup lang="ts">
import type { Release } from '@/assets/ts/types/github'
import { getData, setTabTitle } from '@/assets/ts/utils'
import { ref } from 'vue'
const props = defineProps({
  author: String,
  repo: String
})

setTabTitle('Loading...')

let error = ref(false)
let releases_info = undefined

// Helper: Fetch all pages of releases from GitHub API
async function fetchAllReleases(author: string, repo: string) {
  let allReleases: Release[] = []
  let page = 1
  const perPage = 100
  while (true) {
    try {
      const pageData = await getData(
        `https://api.github.com/repos/${author}/${repo}/releases?per_page=${perPage}&page=${page}`
      )
      if (Array.isArray(pageData)) {
        allReleases = allReleases.concat(pageData)
        if (pageData.length < perPage) break
        page++
      } else {
        break
      }
    } catch {
      throw new Error('Failed to fetch releases')
    }
  }
  return allReleases
}

try {
  releases_info = await fetchAllReleases(props.author, props.repo)
  error.value = false
} catch {
  error.value = true
}

let releases: Release[] = releases_info

let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

// Helper: Convert GitHub releases to Gantt-compatible format
function githubReleasesToGanttJson(releases: Release[], repoLabel: string) {
  return {
    [repoLabel]: {
      label: repoLabel,
      releases: releases.map((release, idx, arr) => {
        const thisReleaseDate = release.published_at || release.created_at
        // EOL for this release is the release date of the next release, if it exists
        let eolFrom = null
        if (idx < arr.length - 1) {
          eolFrom = arr[idx + 1].published_at || arr[idx + 1].created_at
        }
        // For the last release, eolFrom remains null
        return {
          label: release.name || release.tag_name,
          releaseDate: thisReleaseDate,
          eolFrom: eolFrom,
          isEol: false, // GitHub doesn't provide EOL
          latest: null // Not applicable
        }
      })
    }
  }
}

let ganttDepJSON = {}

if (!error.value) {
  ganttDepJSON = githubReleasesToGanttJson(releases, `${props.author}/${props.repo}`)
  setTabTitle(`${props.author}/${props.repo}`)
}

let depJsonString = JSON.stringify(ganttDepJSON)

let baseIconClass = `dependency-icon material-symbols-rounded `
let iconClass = `${baseIconClass} ${isDarkMode ? 'invert' : ''}`
</script>

<template>
  <div v-if="error">
    <ErrorMessage
      header="Repository not found!"
      message="We weren't able to find that repository. It may not exist or you may not have access to it. Please check your spelling and try again.
      If you do have access to it, please enter your Personal Access Token in the settings."
    />
  </div>
  <div v-else>
    <br />
    <h1 class="center-with-icons">
      <ImagePlaceholder
        :styling="iconClass"
        src="https://cdn.jsdelivr.net/npm/simple-icons/icons/github.svg"
      >
        <Spinner :class="baseIconClass" />
      </ImagePlaceholder>
      {{ author }}/{{ repo }}
    </h1>
    <!-- New: Table of releases at the top -->
    <div class="mb-8">
      <h2>All Releases</h2>
      <table
        class="rounded-xl w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400"
      >
        <thead
          class="text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Version</th>
            <th scope="col" class="px-6 py-3">Release Date</th>
            <th scope="col" class="px-6 py-3">Link</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(release, i) in releases"
            :key="release.id"
            :class="[
              'border-b',
              'dark:bg-neutral-800',
              'dark:border-neutral-700',
              'hover:bg-neutral-100',
              'dark:hover:bg-neutral-700',
              i % 2 === 0 ? 'bg-neutral-100 dark:bg-neutral-900' : 'bg-white'
            ]"
          >
            <td class="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
              {{ release.name || release.tag_name }}
            </td>
            <td class="px-6 py-2">
              {{ new Date(release.published_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-2">
              <a :href="release.html_url" target="_blank" class="text-blue-500 hover:underline"
                >View Release</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Gantt Chart below the table -->
    <div>
      <GanttChart :dependencies="`${author}/${repo}`" :depJson="depJsonString" />
    </div>
  </div>
</template>
