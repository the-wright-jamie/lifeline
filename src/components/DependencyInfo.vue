<script setup lang="ts">
import { getFriendlyName, getData, isDateBeforeToday, setTabTitle } from '@/assets/ts/utils'
import { callWithErrorHandling, ref } from 'vue'
import ErrorMessage from './ErrorMessage.vue'
const props = defineProps({
  dependency: String
})

setTabTitle('Loading...')

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
let currentVersionSupportLink = ''
let showSuccessIcon = ref(false)
let anyKnownEOES = false
let anyKnownPatches = false
let host = location.host

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
}

// generate the depJSON as gantt expects it...
let ganttDepJSON = {}
ganttDepJSON[`${dependency_info.result.label}`] = dependency_info.result

function copyToClipboard(text: string) {
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
        <a :href="eolLink">See on <b>endoflife.date</b></a> |
        <a :href="releasePolicy">Release Policy</a>
      </p>
    </div>
    <br />
    <div class="center">
      <h2 class="info-title" v-if="checkIfDevice()">The latest device release is the</h2>
      <h2 class="info-title" v-else>The latest major release is</h2>
      <h1>{{ latestRelease }}</h1>
      <h3>released on {{ toLocalDate(releaseDate) }}</h3>
      <h5 v-if="anyKnownPatches">
        Current Patch:
        <a :href="currentVersionSupportLink" v-if="currentVersionSupportLink != ''">{{
          latestVersion
        }}</a
        ><span v-else>{{ latestVersion }}</span
        ><span v-if="latestPatchRelease != null">
          released on {{ toLocalDate(latestPatchRelease) }}</span
        >
      </h5>
    </div>
    <div class="center-div" v-if="howToGetCurrentVersion != null">
      <div class="grid gap-4 grid-flow-col info-box">
        <div>
          <span class="material-symbols-rounded">&#xe88e;</span>
        </div>
        <div>
          <p class="info-title">Use the following command to learn your current version</p>
          <div class="grid gap-2">
            <div class="code">
              <span class="large monospace"> {{ howToGetCurrentVersion }}</span>
              <button
                @click="copyToClipboard(howToGetCurrentVersion)"
                class="text-gray-500 hover:bg-gray-300 copy-button"
              >
                <span id="default-icon" v-if="!showSuccessIcon"
                  ><span
                    class="material-symbols-rounded material-symbols-rounded-large icon-correction"
                    >&#xe14d;</span
                  >
                </span>
                <span id="success-icon" v-else>
                  <span
                    class="material-symbols-rounded material-symbols-rounded-large icon-correction"
                    >&#xe5ca;</span
                  >
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <div>
      <h2>All Known Releases</h2>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Release</th>
            <th scope="col" class="px-6 py-3">Release Date</th>
            <th scope="col" class="px-6 py-3">End of Life</th>
            <th scope="col" class="px-6 py-3" v-if="anyKnownEOES">End of Extended Support</th>
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
                    : release.isEol
                      ? 'text-red-600'
                      : ''
                  : 'text-green-500'
              "
            >
              {{
                release.eolFrom != null
                  ? toLocalDate(release.eolFrom)
                  : release.isEol
                    ? 'Yes'
                    : 'Unknown'
              }}
            </td>
            <td class="px-6 py-2" v-if="anyKnownEOES">
              <span
                :class="
                  isDateBeforeToday(release.eoesFrom)
                    ? release.eoesFrom != null
                      ? 'text-red-600'
                      : release.isEoes
                        ? 'text-red-600'
                        : ''
                    : 'text-green-500'
                "
                >{{
                  release.eoesFrom != null
                    ? toLocalDate(release.eoesFrom)
                    : release.isEoes
                      ? 'Yes'
                      : 'Unknown'
                }}</span
              >
            </td>
            <td class="px-6 py-2" v-if="anyKnownPatches">
              <a v-if="release.latest.link != null" :href="release.latest.link">{{
                release.latest.name
              }}</a
              ><span v-else>{{ release.latest.name }}</span
              ><span v-if="release.latest != null && release.latest.date"
                ><br />({{ toLocalDate(release.latest.date) }})</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <hr />
    <br />
    <div>
      <GanttChart :dependencies="friendlyName" :depJson="ganttDepJSON"></GanttChart>
    </div>
    <br />
    <hr />
    <br />
    <div>
      <div>
        <div class="grid gap-4 grid-flow-col info-box">
          <div>
            <span class="material-symbols-rounded">&#xe88e;</span>
          </div>
          <div>
            <p class="info-title">FYI: You can get here from any endoflife.date info page</p>
            <br />
            <p>
              For example: the <b>endoflife.date</b> URL for this dependency is
              <span class="monospace large">endoflife.date/{{ dependency }}</span
              >.
            </p>
            <br />
            <p>
              If you take the last part - <span class="monospace large">{{ dependency }}</span> -
              and place it onto the end of the URL for <i>Lifeline</i>'s dependency info page (which
              is <span class="monospace large">{{ host }}/#/dependency/</span>), you can view the
              information for that dependency inside <i>Lifeline</i> (which will give you access to
              the Gantt chart for that dependency).
            </p>
            <br />
            <p>Just to be clear, here is an example URL transformation:</p>
            <p>
              <span class="monospace large">https://endoflife.date/{{ dependency }}</span> →
              <span class="large monospace">https://{{ host }}/#/dependency/{{ dependency }}</span>
            </p>
            <br />
            <p>Here's a template to get you started:</p>
            <div class="code">
              <span class="large monospace">https://{{ host }}/#/dependency/</span>
              <button
                @click="copyToClipboard(`https://${host}/#/dependency`)"
                class="text-gray-500 hover:bg-gray-300 copy-button"
              >
                <span id="default-icon" v-if="!showSuccessIcon"
                  ><span
                    class="material-symbols-rounded material-symbols-rounded-large icon-correction"
                    >&#xe14d;</span
                  >
                </span>
                <span id="success-icon" v-else>
                  <span
                    class="material-symbols-rounded material-symbols-rounded-large icon-correction"
                    >&#xe5ca;</span
                  >
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
