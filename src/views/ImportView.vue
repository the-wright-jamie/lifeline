<script setup lang="ts">
import { setTabTitle } from '@/assets/ts/utils'
import Spinner from '@/components/Spinner.vue'
import router from '@/router'
import { ref } from 'vue'
import { type ConfigV1, type ConfigV2 } from '../assets/ts/types/lifeline'

setTabTitle('Import')

let versionCheck = ref(false)
let dependenciesCheck = ref(false)
let headerCheck = ref(false)
let dashboardCheck = ref(false)
let success = ref(false)
let uploaded = ref(false)
let errorMessages = ref<string[]>([])
let safeConfig = ref('')

function migrateV1toV2(configV1: ConfigV1): ConfigV2 {
  return {
    version: 2,
    dependencies: configV1.dependencies,
    tracked_repos: [],
    personal_access_token: null,
    dashboard_config: {
      show_latest_news: configV1.dashboardConfig.latestNews,
      show_upcoming_EOL: configV1.dashboardConfig.upcomingEOL,
      show_past_EOL: configV1.dashboardConfig.pastEOL,
      show_gantt_chart: configV1.dashboardConfig.ganttChart,
      show_github_releases: false, // Added default for GitHub releases
      highlight_this_month_EOL: false, // default for migration
      highlight_recent_releases: false, // Default for highlight recent releases
      highlight_today_and_yesterday: false, // Highlight releases from today and yesterday
      news_entries: configV1.dashboardConfig.newsEntries,
      gantt_width: configV1.dashboardConfig.ganttWidth ?? 30,
      gantt_max_width: configV1.dashboardConfig.ganttMaxWidth
    },
    header_config: {
      show_about_button: configV1.headerConfig.showAbout,
      show_help_button: configV1.headerConfig.showHelp
    }
  }
}

function checkHealth(rawConfig: string) {
  uploaded.value = true

  versionCheck.value = false
  dependenciesCheck.value = false
  headerCheck.value = false
  dashboardCheck.value = false
  success.value = false
  errorMessages.value = []

  let config: any
  let configV2: ConfigV2 | null = null

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

  if (config.version === 1) {
    // Migrate V1 to V2
    configV2 = migrateV1toV2(config as ConfigV1)
  } else if (config.version === 2) {
    configV2 = config as ConfigV2
  } else {
    errorMessages.value.push(
      'Configuration file is reporting that it is a version that is not supported by this instance of Lifeline'
    )
    return
  }

  versionCheck.value = true

  // Check dependencies
  if (!Array.isArray(configV2.dependencies) || configV2.dependencies.length === 0) {
    errorMessages.value.push(`Dependencies array is empty or missing`)
    return
  }
  dependenciesCheck.value = true

  // Check dashboard_config
  const dashboardKeys = [
    'show_latest_news',
    'show_upcoming_EOL',
    'show_past_EOL',
    'show_gantt_chart',
    'highlight_this_month_EOL',
    'news_entries',
    'gantt_width',
    'gantt_max_width'
  ]
  dashboardKeys.forEach((key) => {
    if (!configV2!.dashboard_config.hasOwnProperty(key)) {
      errorMessages.value.push(`Dashboard config does not have ${key}`)
    }
  })
  dashboardCheck.value = true

  // Check header_config
  const headerKeys = ['show_about_button', 'show_help_button']
  headerKeys.forEach((key) => {
    if (!configV2!.header_config.hasOwnProperty(key)) {
      errorMessages.value.push(`Header config does not have ${key}`)
    }
  })
  headerCheck.value = true

  success.value = errorMessages.value.length === 0
  if (success.value) {
    safeConfig.value = JSON.stringify(configV2)
  }
}

function saveAndContinue() {
  localStorage.setItem('config', safeConfig.value)
  router.replace('/')
  setTimeout(function () {
    location.reload()
  }, 100)
}

function clickUpload() {
  const fileInput = document.getElementById('fileUpload')
  if (fileInput) {
    fileInput.click()
  }
}

function handleFileUpload(e: any) {
  const file = e.target.files[0]
  var reader = new FileReader()
  reader.readAsText(file, 'UTF-8')
  reader.onload = function (evt) {
    if (evt.target && evt.target.result) {
      checkHealth(evt.target.result.toString())
    }
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
      class="bg-black hover:bg-neutral-600 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-black py-2 px-4 rounded-full"
    >
      <h1><span class="material-symbols-rounded large">&#xf090;</span> Import</h1>
    </button>
    <br /><br />
  </div>
  <h2>Configuration Health Check</h2>
  <Spinner v-if="!uploaded" msg="Waiting for upload" />
  <div v-if="uploaded">
    <table>
      <thead
        class="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Check</th>
          <th scope="col" class="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
          >
            <p>Version</p>
          </th>
          <td class="px-6 py-2 center">
            <span v-html="checkOrCross(versionCheck).rawHtml"></span>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
          >
            <p>Tracked Dependencies</p>
          </th>
          <td class="px-6 py-2 center">
            <span v-html="checkOrCross(dependenciesCheck).rawHtml"></span>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
          >
            <p>Dashboard Preferences</p>
          </th>
          <td class="px-6 py-2 center">
            <span v-html="checkOrCross(dashboardCheck).rawHtml"></span>
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
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
        class="bg-black hover:bg-neutral-600 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-black py-2 px-4 rounded-full"
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
