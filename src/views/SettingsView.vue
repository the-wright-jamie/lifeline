<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import ToggleButton from '@/components/ToggleButton.vue'

let config: Config = JSON.parse(localStorage.getItem('config'))

let showLatest = ref(config.dashboardConfig.latestNews)
let showUpcoming = ref(config.dashboardConfig.upcomingEOL)
let showGantt = ref(config.dashboardConfig.ganttChart)
let newsEntries = ref(config.dashboardConfig.newsEntries)

let disabledDashboard = ref(checkIfDashboardDisabled())

let showAbout = ref(config.headerConfig.showAbout)
let showHelp = ref(config.headerConfig.showHelp)

let resetting = ref(false)

function updateLatest() {
  let config = JSON.parse(localStorage.getItem('config'))
  config.dashboardConfig.latestNews = !config.dashboardConfig.latestNews
  localStorage.setItem('config', JSON.stringify(config))
  showLatest.value = !showLatest.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateUpcoming() {
  let config = JSON.parse(localStorage.getItem('config'))
  config.dashboardConfig.upcomingEOL = !config.dashboardConfig.upcomingEOL
  localStorage.setItem('config', JSON.stringify(config))
  showUpcoming.value = !showUpcoming.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateGantt() {
  let config = JSON.parse(localStorage.getItem('config'))
  config.dashboardConfig.ganttChart = !config.dashboardConfig.ganttChart
  localStorage.setItem('config', JSON.stringify(config))
  showGantt.value = !showGantt.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateEntries(input: Number) {
  if (isNaN(input) || input == 0) {
    input = 10
  }
  let config = JSON.parse(localStorage.getItem('config'))
  config.dashboardConfig.newsEntries = input
  localStorage.setItem('config', JSON.stringify(config))
}

function updateAbout() {
  let config = JSON.parse(localStorage.getItem('config'))
  config.headerConfig.showAbout = !config.headerConfig.showAbout
  localStorage.setItem('config', JSON.stringify(config))
  showAbout.value = !showAbout.value
}

function updateHelp() {
  let config = JSON.parse(localStorage.getItem('config'))
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
  return !showLatest.value && !showUpcoming.value && !showGantt.value
}

function exportConfig() {
  var a = document.createElement('a')
  var file = new Blob([localStorage.getItem('config')], { type: 'application/json' })
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
      <ToggleButton :active="showUpcoming" /> Show upcoming EOL
    </button>
  </p>
  <p>
    <button @click="updateGantt()"><ToggleButton :active="showGantt" /> Show Gantt Chart</button>
  </p>
  <p v-if="disabledDashboard" class="disabled">
    <span class="material-symbols-rounded">&#xe002;</span> Caution: you've disabled the dashboard...
  </p>
  <div>
    <p>How many news entries should <i>Lifeline</i> show?</p>
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        type="text"
        name="entries"
        id="entries"
        class="block w-24 rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :value="newsEntries"
        @input="(event) => updateEntries(event.target.value)"
      />
    </div>
  </div>

  <br />

  <h3>Other Preferences</h3>

  <div>
    <RouterLink to="/setup">
      <button
        class="bg-black hover:bg-gray-600 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black py-2 px-4 rounded-full"
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
      class="bg-black hover:bg-gray-600 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black py-2 px-4 rounded-full"
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
      class="bg-black hover:bg-gray-600 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black py-2 px-4 rounded-full"
    >
      <span class="material-symbols-rounded">&#xf053;</span> Reset <i>Lifeline</i>
    </button>

    <button
      v-else
      @click="resetLifeline()"
      class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full"
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
</template>

<style>
.big {
  font-size: 32px;
}

.button-info {
  padding-top: 0.75em;
}
</style>
