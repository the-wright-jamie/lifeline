<script setup lang="ts">
import type { Release } from '@/assets/ts/types/github'
import { getData, setTabTitle } from '@/assets/ts/utils'
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
}

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
    <div v-for="release in releases">
      <div class="flex flex-col gap-2 mb-4">
        <h2 class="text-lg font-semibold">{{ release.name || release.tag_name }}</h2>
        <p class="text-sm">
          Published by {{ release.author.login }} on
          {{ new Date(release.published_at).toLocaleDateString() }}
        </p>
        <p v-if="release.body" class="text-sm pre-formatted">{{ release.body }}</p>
        <a :href="release.html_url" target="_blank" class="text-blue-500 hover:underline"
          >View Release</a
        >
      </div>
    </div>
  </div>
</template>
