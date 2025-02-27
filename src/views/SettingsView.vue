<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import ToggleButton from '@/components/ToggleButton.vue'
import { type Config } from '../assets/ts/types'

let config: Config = JSON.parse(localStorage.getItem('config') || '')

let showLatest = ref(config.dashboardConfig.latestNews)
let showUpcoming = ref(config.dashboardConfig.upcomingEOL)
let showPastEOL = ref(config.dashboardConfig.pastEOL)
let showGantt = ref(config.dashboardConfig.ganttChart)
let newsEntries = ref(config.dashboardConfig.newsEntries)
let ganttMaxWidth = ref(config.dashboardConfig.ganttMaxWidth)

let disabledDashboard = ref(checkIfDashboardDisabled())

let showAbout = ref(config.headerConfig.showAbout)
let showHelp = ref(config.headerConfig.showHelp)

let resetting = ref(false)

function updateLatest() {
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.latestNews = !config.dashboardConfig.latestNews
  localStorage.setItem('config', JSON.stringify(config))
  showLatest.value = !showLatest.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateUpcoming() {
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.upcomingEOL = !config.dashboardConfig.upcomingEOL
  localStorage.setItem('config', JSON.stringify(config))
  showUpcoming.value = !showUpcoming.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updatePastEOL() {
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.pastEOL = !config.dashboardConfig.pastEOL
  localStorage.setItem('config', JSON.stringify(config))
  showPastEOL.value = !showPastEOL.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateGantt() {
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.ganttChart = !config.dashboardConfig.ganttChart
  localStorage.setItem('config', JSON.stringify(config))
  showGantt.value = !showGantt.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateEntries(input: number) {
  if (isNaN(input) || input == 0) {
    input = 10
  }
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.newsEntries = input
  localStorage.setItem('config', JSON.stringify(config))
}

function updateWidth(input: number) {
  if (isNaN(input) || input == 0 || input < 30) {
    input = 30
  }
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.ganttMaxWidth = input
  ganttMaxWidth.value = input
  localStorage.setItem('config', JSON.stringify(config))
}

function updateAbout() {
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.headerConfig.showAbout = !config.headerConfig.showAbout
  localStorage.setItem('config', JSON.stringify(config))
  showAbout.value = !showAbout.value
}

function updateHelp() {
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.headerConfig.showHelp = !config.headerConfig.showHelp
  localStorage.setItem('config', JSON.stringify(config))
  showHelp.value = !showHelp.value
}

function aboutToReset() {
  resetting.value = true
  setTimeout(function () {
    resetting.value = false
  }, 5000)
}

function resetLifeline() {
  localStorage.clear()
  location.reload()
}

function checkIfDashboardDisabled() {
  return !showLatest.value && !showUpcoming.value && !showPastEOL.value && !showGantt.value
}

function exportConfig() {
  var a = document.createElement('a')
  var file = new Blob([localStorage.getItem('config') || ''], { type: 'application/json' })
  a.href = URL.createObjectURL(file)
  a.download = 'Lifeline.json'
  a.click()
}
</script>

<template>
  <h2>Settings</h2>
  <h3>Header Preferences</h3>
  <p class="disabled">Changes may require refresh</p>
  <p>
    <button @click="updateAbout()"><ToggleButton :active="showAbout" /></button>
    Show About button
  </p>
  <p>
    <button @click="updateHelp()"><ToggleButton :active="showHelp" /></button>
    Show Help Page button
  </p>
  <br />
  <h3>Dashboard Preferences</h3>
  <p>
    <button @click="updateLatest()">
      <ToggleButton :active="showLatest" /> Show latest releases
    </button>
  </p>
  <p>
    <button @click="updateUpcoming()">
      <ToggleButton :active="showUpcoming" /> Show future end-of-life dates
    </button>
  </p>
  <p>
    <button @click="updatePastEOL()">
      <ToggleButton :active="showPastEOL" /> Show past end-of-life dates
    </button>
  </p>
  <div>
    <p>How many news entries should <i>Lifeline</i> show?</p>
    <div class="relative mt-2 rounded-md shadow-xs">
      <input
        type="text"
        name="entries"
        id="entries"
        class="block w-24 p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        :value="newsEntries"
        @input="(event) => updateEntries(Number((event.target as HTMLInputElement).value))"
      />
    </div>
  </div>
  <br />
  <p>
    <button @click="updateGantt()"><ToggleButton :active="showGantt" /> Show Gantt Chart</button>
  </p>
  <div>
    <p>What should be the maximum amount of days you can see on the chart?</p>
    <div class="relative mt-2 rounded-md shadow-xs">
      <input
        type="text"
        name="entries"
        id="entries"
        class="block w-24 p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        :value="ganttMaxWidth"
        @input="(event) => updateWidth(Number((event.target as HTMLInputElement).value))"
      />
    </div>
    <p class="disabled button-info">
      The 'zoom' of the Gantt chart is measured in days. As such, with a max zoom of
      {{ ganttMaxWidth }}, you will be able to see at most {{ ganttMaxWidth / 2 }} days in the past
      and into the future.
    </p>
  </div>
  <p v-if="disabledDashboard" class="disabled">
    <span class="material-symbols-rounded">&#xe002;</span> Caution: you've disabled the dashboard...
  </p>

  <br />

  <h3>Other Preferences</h3>

  <div>
    <RouterLink class="not-hyperlink" to="/setup">
      <button
        class="block p-2 pr-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-white"
      >
        <span class="material-symbols-rounded">&#xf1fe;</span> Change Tracked Dependencies
      </button>
    </RouterLink>
    <p class="disabled button-info">
      Return to the "Select Dependencies" screen to update your preferences.
    </p>
  </div>

  <br />

  <div>
    <button
      @click="exportConfig()"
      class="block p-2 pr-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-white"
    >
      <span class="material-symbols-rounded">&#xf09b;</span> Export config
    </button>
    <p class="disabled button-info">
      Export this instance of <i>Lifeline</i>'s config to a portable JSON file that can be imported
      to other instances. This is currently the only way to back-up your configuration.
    </p>
  </div>

  <br />

  <div>
    <button
      v-if="resetting == false"
      @click="aboutToReset()"
      class="block p-2 pr-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-white"
    >
      <span class="material-symbols-rounded">&#xf053;</span> Reset <i>Lifeline</i>
    </button>

    <button
      v-else
      @click="resetLifeline()"
      class="block p-2 pr-3 text-gray-900 rounded-lg bg-red-500 hover:bg-red-700 dark:border-gray-600 dark:text-white"
    >
      <span class="material-symbols-rounded">&#xe002;</span> Are you sure?
    </button>
    <p class="disabled button-info" v-if="resetting == false">
      <i>Lifeline</i> does not store any of your data in the cloud, nor does it store any back-ups
      unless you have exported your config. Resetting <i>Lifeline</i> will delete your entire config
      and return it to its original settings. This is irreversible, be careful!
    </p>
    <h1 v-else>Be careful, this is irreversible!</h1>
  </div>
  <AboutFooter />
</template>

<style>
.big {
  font-size: 32px;
}

.button-info {
  padding-top: 0.75em;
}

h6 {
  font-size: 1rem;
}

.title {
  margin-left: -0.18em;
}

.material-symbols-rounded-large {
  font-size: 1rem;
}

.icon {
  padding-right: 0.25em;
  font-size: 1.5em;
}
</style>
