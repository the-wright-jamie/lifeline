<script setup lang="ts">
import type { Release } from '@/assets/ts/types/github'
import { getData, setTabTitle } from '@/assets/ts/utils'
import { computed, ref } from 'vue'
const props = defineProps({
  author: String,
  repo: String
})

setTabTitle('Loading...')

let error = ref(false)
let releases_info = undefined
let repoDescription = ref<string | null>(null)

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

// Fetch repo description (public API, uses PAT if present)
async function fetchRepoDescription(author: string, repo: string) {
  try {
    const repoData = await getData(`https://api.github.com/repos/${author}/${repo}`)
    repoDescription.value = repoData.description || null
  } catch {
    repoDescription.value = null
  }
}

try {
  releases_info = await fetchAllReleases(props.author, props.repo)
  error.value = false
} catch {
  error.value = true
}

let releases: Release[] = releases_info

// Sort releases by published_at (or created_at) descending (most recent first)
if (releases) {
  releases = releases.slice().sort((a, b) => {
    const dateA = new Date(a.published_at || a.created_at).getTime()
    const dateB = new Date(b.published_at || b.created_at).getTime()
    return dateB - dateA
  })
}

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

// Fetch repo description on load
await fetchRepoDescription(props.author, props.repo)

// Get news_entries from config (default to 10 if not set)
let newsEntries = 10
try {
  const config = JSON.parse(localStorage.getItem('config') || '{}')
  if (config.dashboard_config && config.dashboard_config.news_entries) {
    newsEntries = config.dashboard_config.news_entries
  }
} catch {}

const currentPage = ref(1)
const pageSize = newsEntries
const totalPages = computed(() => (releases ? Math.ceil(releases.length / pageSize) : 1))
const pagedReleases = computed(() => {
  if (!releases) return []
  const start = (currentPage.value - 1) * pageSize
  return releases.slice(start, start + pageSize)
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}
</script>

<template>
  <div v-if="error">
    <ErrorMessage
      header="Repository not found!"
      message="<p>We weren't able to find that repository. It may not exist or you may not have access to it. Please check your spelling and try again.</p>
      <br/>
      <p>If you do have access to it, please enter your Personal Access Token in the settings.</p>
      <p>If you have entered your PAT, and you are still seeing this, ensure that you have entered it correctly.</p>"
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
    <div class="mb-8 flex flex-col gap-2">
      <div class="center">
        <p>
          <a :href="`https://github.com/${author}/${repo}`" target="_blank" class="hover:underline">
            Open in GitHub
          </a>
          |
          <a
            :href="`https://github.com/${author}/${repo}/releases`"
            target="_blank"
            class="hover:underline"
          >
            Releases Page
          </a>
        </p>
      </div>
      <p v-if="repoDescription" class="mb-4 mt-4 text-neutral-700 dark:text-neutral-300">
        {{ repoDescription }}
      </p>
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
            v-for="(release, i) in pagedReleases"
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
      <div v-if="totalPages > 1">
        <nav class="center">
          <br />
          <p>Page {{ currentPage }} of {{ totalPages }} | {{ releases.length }} releases</p>
          <ul class="inline-flex -space-x-px text-sm">
            <li>
              <button
                @click="goToPage(1)"
                :class="{ disabled: currentPage === 1 }"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg not-hyperlink"
              >
                <span class="material-symbols-rounded pager">&#xe5dc;</span>
              </button>
            </li>
            <li>
              <button
                @click="goToPage(currentPage - 1)"
                :class="{ disabled: currentPage === 1 }"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg not-hyperlink"
              >
                <span class="material-symbols-rounded pager">&#xe5c4;</span>
              </button>
            </li>
            <li>
              <button
                @click="goToPage(currentPage + 1)"
                :class="{ disabled: currentPage === totalPages }"
                class="flex items-center justify-center px-3 h-8 leading-tight not-hyperlink"
              >
                <span class="material-symbols-rounded pager">&#xe5c8;</span>
              </button>
            </li>
            <li>
              <button
                @click="goToPage(totalPages)"
                :class="{ disabled: currentPage === totalPages }"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg not-hyperlink"
              >
                <span class="material-symbols-rounded pager">&#xe5dd;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Gantt Chart below the table -->
    <div>
      <GanttChart mode="custom" :dependencies="`${author}/${repo}`" :depJson="depJsonString" />
    </div>
  </div>
</template>

<style scoped>
.pager {
  font-size: 2em;
}
</style>
