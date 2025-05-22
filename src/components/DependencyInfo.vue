<script setup lang="ts">
import { getFriendlyName, getData, isDateBeforeToday } from '@/assets/ts/utils'
import { callWithErrorHandling, ref } from 'vue'
import ErrorMessage from './ErrorMessage.vue'
const props = defineProps({
  dependency: String
})

function toLocalDate(date: string) {
  date = new Date(date).toLocaleDateString(navigator.language)
  return date
}

function checkIfDevice() {
  return dependencyType === 'device'
}

let error = ref(false)
let dependency_info = undefined

try {
  dependency_info = await getData(`https://endoflife.date/api/v1/products/${props.dependency}`)
  error.value = false
} catch {
  error.value = true
}

let isDarkMode = ''
let friendlyName = ''
let iconLink = ''
let eolLink = ''
let releasePolicy = ''
let latestRelease = ''
let releaseDate = ''
let latestVersion = ''
let latestPatchRelease = ''
let dependencyType = ''
let howToGetCurrentVersion = ''
let anyKnownEOES = false
let anyKnownPatches = false

let depJson = []

if (!error.value) {
  isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  friendlyName = dependency_info.result.label
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
      } catch {
        console.log('lmao')
      }
    }

    if (anyKnownPatches != true) {
      try {
        anyKnownPatches = depJson[i].latest != null
      } catch {
        console.log('lmao')
      }
    }
  }

  depJson.shift()
}
console.log()
</script>

<template>
  <div v-if="error">
    <ErrorMessage
      header="Dependency not found!"
      message="We weren't able to find that dependency in the archives. Please check your spelling and try again."
    />
  </div>
  <div v-else>
    <br />
    <h1 v-if="iconLink" class="center-with-icons">
      <img
        :src="iconLink"
        class="dependency-icon material-symbols-rounded"
        :class="isDarkMode ? 'invert' : ''"
      />
      {{ friendlyName }}
    </h1>
    <h1 v-else class="center">
      {{ friendlyName }}
    </h1>
    <br />
    <hr />
    <br />
    <div class="center">
      <p>
        <a :href="eolLink">See on <b>end-of-life.date</b></a> |
        <a :href="releasePolicy">Release Policy</a>
      </p>
    </div>
    <br />
    <div class="center">
      <h2 v-if="checkIfDevice()">The latest device release is the</h2>
      <h2 v-else>The latest major release is</h2>
      <h1>{{ latestRelease }}</h1>
      <h3>released on {{ toLocalDate(releaseDate) }}</h3>
      <h5 v-if="anyKnownPatches">
        Current Patch: {{ latestVersion
        }}<span v-if="latestPatchRelease != null">
          released on {{ toLocalDate(latestPatchRelease) }}</span
        >
      </h5>
    </div>
    <div v-if="howToGetCurrentVersion != null">
      <br />
      <div class="grid grid-flow-col info-box">
        <div>
          <span class="material-symbols-rounded">&#xe88e;</span>
        </div>
        <div>
          <p>Command to get current version:</p>
          <p>{{ howToGetCurrentVersion }}</p>
        </div>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <div>
      <h2>Other Releases</h2>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Release</th>
            <th scope="col" class="px-6 py-3">Release Date</th>
            <th scope="col" class="px-6 py-3">End of Life</th>
            <th scope="col" class="px-6 py-3" v-if="anyKnownEOES">End of Support</th>
            <th scope="col" class="px-6 py-3" v-if="anyKnownPatches">Latest Patch</th>
          </tr>
        </thead>
        <tbody v-for="release in depJson">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ release.label }}
            </th>
            <td class="px-6 py-2">
              {{ toLocalDate(release.releaseDate) }}
            </td>
            <td
              class="px-6 py-2"
              :class="
                isDateBeforeToday(release.eolFrom)
                  ? release.eolFrom != null
                    ? 'text-red-600'
                    : ''
                  : 'text-green-500'
              "
            >
              {{ release.eolFrom != null ? toLocalDate(release.eolFrom) : 'Unknown' }}
            </td>
            <td class="px-6 py-2" v-if="anyKnownEOES">
              <span
                :class="
                  isDateBeforeToday(release.eoesFrom)
                    ? release.eoesFrom != null
                      ? 'text-red-600'
                      : ''
                    : 'text-green-500'
                "
                >{{ release.eoesFrom != null ? toLocalDate(release.eoesFrom) : 'Unknown' }}</span
              >
            </td>
            <td class="px-6 py-2" v-if="anyKnownPatches">
              {{ release.latest.name
              }}<span v-if="release.latest != null && release.latest.date"
                ><br />({{ toLocalDate(release.latest.date) }})</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
