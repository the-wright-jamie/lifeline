<script setup lang="ts">
import Spinner from '@/components/Spinner.vue'
import router from '@/router'
import { ref } from 'vue'
import { type Config } from '../assets/ts/types'
import { setTabTitle } from '@/assets/ts/utils'

setTabTitle('Import')

let versionCheck = ref(false)
let dependenciesCheck = ref(false)
let headerCheck = ref(false)
let dashboardCheck = ref(false)
let success = ref(false)
let uploaded = ref(false)
let errorMessages = ref([])
let safeConfig = ref('')

function checkHealth(rawConfig: string) {
  uploaded.value = true

  versionCheck.value = false
  dependenciesCheck.value = false
  headerCheck.value = false
  dashboardCheck.value = false
  success.value = false
  errorMessages.value = []

  let config: Config

  try {
    config = JSON.parse(rawConfig)
  } catch (e) {
    errorMessages.value.push('File does not appear to contain valid JSON')
    return
  }

  if (!config.hasOwnProperty('version')) {
    errorMessages.value.push('Configuration file does not have a specified version number')
    return
  }

  if (config.version != 1) {
    errorMessages.value.push(
      'Configuration file is reporting that it is a version that is not supported by this instance of Lifeline'
    )
    return
  }

  versionCheck.value = true

  let expectedKeys = ['dependencies', 'dashboardConfig', 'headerConfig']

  expectedKeys.forEach((key) => {
    if (!config.hasOwnProperty(key)) {
      errorMessages.value.push(`Configuration file does not have ${key}`)
      return
    }
  })

  expectedKeys = ['latestNews', 'upcomingEOL', 'pastEOL', 'ganttChart', 'newsEntries', 'ganttWidth']

  expectedKeys.forEach((key) => {
    if (!config.dashboardConfig.hasOwnProperty(key)) {
      errorMessages.value.push(`Dashboard config does not have ${key}`)
      return
    }
  })

  dashboardCheck.value = true

  expectedKeys = ['showAbout', 'showHelp']

  expectedKeys.forEach((key) => {
    if (!config.headerConfig.hasOwnProperty(key)) {
      errorMessages.value.push(`Header config does not have ${key}`)
      return
    }
  })

  headerCheck.value = true

  if (config.dependencies.length == 0) {
    errorMessages.value.push(`Dependencies array is empty`)
    return
  }

  dependenciesCheck.value = true

  success.value = true

  safeConfig.value = JSON.stringify(config)
}

function saveAndContinue() {
  localStorage.setItem('config', safeConfig.value)

  router.replace('/')
  setTimeout(function () {
    location.reload()
  }, 100)
}

function clickUpload() {
  document.getElementById('fileUpload').click()
}

function handleFileUpload(e: any) {
  const file = e.target.files[0]
  var reader = new FileReader()
  reader.readAsText(file, 'UTF-8')
  reader.onload = function (evt) {
    checkHealth(evt.target.result.toString())
  }
}

function checkOrCross(result: boolean) {
  return {
    rawHtml: `<span class="material-symbols-rounded">&#x${result ? 'e5ca' : 'e5cd'};</span>`
  }
}
</script>

<template>
  <h1>Import from another instance</h1>
  <br />
  <div class="center">
    <input
      @change="handleFileUpload"
      id="fileUpload"
      type="file"
      hidden
      accept="application/json"
    />
    <button
      @click="clickUpload()"
      class="bg-black hover:bg-gray-600 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black py-2 px-4 rounded-full"
    >
      <h1><span class="material-symbols-rounded large">&#xf090;</span> Import</h1>
    </button>
    <br /><br />
  </div>
  <h2>Configuration Health Check</h2>
  <Spinner v-if="!uploaded" msg="Waiting for upload" />
  <div v-if="uploaded">
    <table>
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Check</th>
          <th scope="col" class="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <p>Version</p>
          </th>
          <td class="px-6 py-2 center">
            <span v-html="checkOrCross(versionCheck).rawHtml"></span>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <p>Tracked Dependencies</p>
          </th>
          <td class="px-6 py-2 center">
            <span v-html="checkOrCross(dependenciesCheck).rawHtml"></span>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <p>Dashboard Preferences</p>
          </th>
          <td class="px-6 py-2 center">
            <span v-html="checkOrCross(dashboardCheck).rawHtml"></span>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <p>Header Preferences</p>
          </th>
          <td class="px-6 py-2 center">
            <span v-html="checkOrCross(headerCheck).rawHtml"></span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="success">
      <h2>
        <br />
        <span class="material-symbols-rounded large">&#xe86c;</span> All healthy
        <span class="material-symbols-rounded large">&#xe86c;</span>
      </h2>
      <button
        @click="saveAndContinue()"
        class="bg-black hover:bg-gray-600 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black py-2 px-4 rounded-full"
      >
        Continue <span class="material-symbols-rounded">&#xe5c8;</span>
      </button>
    </div>
    <div v-else>
      <br />
      <h2>
        <span class="material-symbols-rounded large">&#xe5c9;</span> Something is wrong
        <span class="material-symbols-rounded large">&#xe5c9;</span>
      </h2>
      <p>The following errors were reported:</p>
      <ul>
        <li v-for="error in errorMessages">
          <span class="material-symbols-rounded">&#xe000;</span> {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.large {
  font-size: 1.25em;
}
</style>
