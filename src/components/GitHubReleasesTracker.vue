<script setup lang="ts">
import type { Release } from '@/assets/ts/types/github'
import { getData, setTabTitle } from '@/assets/ts/utils'
import { marked } from 'marked'
import { ref } from 'vue'
const props = defineProps({
  author: String,
  repo: String
})

setTabTitle('Loading...')

/*function toLocalDate(date: string) {
  date = new Date(date).toLocaleDateString(navigator.language)
  return date
}

function checkIfDevice() {
  return dependencyType === 'device'
}*/

let error = ref(false)
let releases_info = undefined

try {
  releases_info = await getData(
    `https://api.github.com/repos/${props.author}/${props.repo}/releases`
  )
  error.value = false
} catch {
  error.value = true
}

let releases: Release[] = releases_info

// Compute markdown HTML for each release body
type ReleaseWithHtml = Release & { bodyHtml?: string }
let releasesWithHtml: ReleaseWithHtml[] = []
if (!error.value && releases) {
  // @ts-expect-error
  releasesWithHtml = releases.map((release) => {
    let body = release.body ? String(release.body) : ''
    // Remove empty lines from markdown
    let cleanedBody = body
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join('\n')
    return {
      ...release,
      bodyHtml: cleanedBody ? marked.parse(cleanedBody) : ''
    }
  })
} else {
  releasesWithHtml = []
}

// let helpShowMore = ref(false)

let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
/*let friendlyName = ''
let iconLink = ''
let eolLink = ''
let releasePolicy = ''
let latestRelease = ''
let releaseDate = ''
let latestVersion = ''
let latestPatchRelease = ''
let dependencyType = ''
let howToGetCurrentVersion = ''
let currentVersionSupportLink = ''
let showSuccessIcon = ref(false)
let anyKnownEOES = false
let anyKnownPatches = false
let host = location.host

let depJson = []
let ganttDepJSON = {}*/

// Helper: Convert GitHub releases to Gantt-compatible format
function githubReleasesToGanttJson(releases: Release[], repoLabel: string) {
  // Sort releases by published date ascending (oldest first)
  const sorted = [...releases].sort((a, b) => {
    const aDate = a.published_at
      ? new Date(a.published_at).getTime()
      : new Date(a.created_at).getTime()
    const bDate = b.published_at
      ? new Date(b.published_at).getTime()
      : new Date(b.created_at).getTime()
    return aDate - bDate
  })
  return {
    [repoLabel]: {
      label: repoLabel,
      releases: sorted.reverse().map((release, idx, arr) => {
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
  releases.forEach((release) => {
    console.log(`${release.body}`)
  })

  console.log(releases)
  /*friendlyName = dependency_info.result.label
  iconLink = dependency_info.result.links.icon
  eolLink = dependency_info.result.links.html
  releasePolicy = dependency_info.result.links.releasePolicy
  latestRelease = dependency_info.result.releases[0].label
  releaseDate = dependency_info.result.releases[0].releaseDate
  if (dependency_info.result.releases[0].latest != null) {
    latestVersion = dependency_info.result.releases[0].latest.name
    latestPatchRelease = dependency_info.result.releases[0].latest.date
  }
  dependencyType = dependency_info.result.category
  howToGetCurrentVersion = dependency_info.result.versionCommand
  try {
    currentVersionSupportLink = dependency_info.result.releases[0].latest.link
  } catch {}
  anyKnownEOES = false
  anyKnownPatches = false

  depJson = []
  dependency_info.result.releases.forEach((data) => {
    depJson.push(data)
  })

  for (var i in depJson) {
    if (anyKnownEOES != true) {
      try {
        anyKnownEOES = depJson[i].eoesFrom != null
      } catch {}
    }

    if (anyKnownPatches != true) {
      try {
        anyKnownPatches = depJson[i].latest != null
      } catch {}
    }
  }

  // generate the depJSON as gantt expects it...
  ganttDepJSON[`${dependency_info.result.label}`] = dependency_info.result*/
  ganttDepJSON = githubReleasesToGanttJson(releases, `${props.author}/${props.repo}`)
  setTabTitle(`${props.author}/${props.repo}`)
}

let depJsonString = JSON.stringify(ganttDepJSON)

/*function copyToClipboard(text: string) {
  try {
    navigator.clipboard.writeText(text)
    // Show success icon
    showSuccessIcon.value = true

    // Reset to default icon after 2 seconds
    setTimeout(() => {
      showSuccessIcon.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
    // Optionally, handle error feedback to the user
  }
}

setTabTitle(friendlyName == '' ? 'Oops! 😵‍💫' : friendlyName)
let depJsonString = JSON.stringify(ganttDepJSON)*/

let baseIconClass = `dependency-icon material-symbols-rounded `
let iconClass = `${baseIconClass} ${isDarkMode ? 'invert' : ''}`
// https://cdn.jsdelivr.net/npm/simple-icons/icons/github.svg
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
            <th scope="col" class="px-6 py-3">Tag</th>
            <th scope="col" class="px-6 py-3">Release Date</th>
            <th scope="col" class="px-6 py-3">Link</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(release, i) in releasesWithHtml"
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
            <td class="px-6 py-2 font-mono">
              {{ release.tag_name }}
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
