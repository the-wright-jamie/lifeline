<script setup lang="ts">
import { getMachineName, setTabTitle } from '@/assets/ts/utils'
import { ref } from 'vue'
import { type Config } from '../assets/ts/types'
import ErrorMessage from './ErrorMessage.vue'
import GanttChart from './GanttChart.vue'
import LatestNews from './LatestNews.vue'
import UpcomingEOL from './UpcomingEOL.vue'

setTabTitle('Loading...')

// This is an absolute mess 🤣
// Surely there's a better way to handle multiple waits...
async function getData(array) {
  const res = await Promise.all(array)
  try {
    const data = await Promise.all(
      res.map((item) => {
        return item.json()
      })
    )
    return data
  } catch {
    error.value = true
  }
}

let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
let diagram = ref(``)
let error = ref(false)

const config: Config = JSON.parse(localStorage.getItem('config') || '')
const allDisabled = ref(
  !config.dashboardConfig.latestNews &&
    !config.dashboardConfig.upcomingEOL &&
    !config.dashboardConfig.pastEOL &&
    !config.dashboardConfig.ganttChart
)
const dependencies = config.dependencies
const showBothTopInfo = ref(
  config.dashboardConfig.latestNews &&
    (config.dashboardConfig.upcomingEOL || config.dashboardConfig.pastEOL)
)
const showLatest = ref(config.dashboardConfig.latestNews)
const showUpcoming = ref(config.dashboardConfig.upcomingEOL)
const showPastEOL = ref(config.dashboardConfig.pastEOL)
const showGantt = ref(config.dashboardConfig.ganttChart)

let fetchArray = []

try {
  dependencies.forEach((dependency) => {
    fetchArray.push(fetch(`https://endoflife.date/api/v1/products/${getMachineName(dependency)}`))
  })
} catch {
  console.error('Failed to fetch')
}

let depJson = {}
const allData = await getData(fetchArray)
try {
  allData.forEach((data) => {
    depJson[`${data.result.label}`] = data.result
  })
} catch {
  error.value = true
}

let depJsonString = JSON.stringify(depJson)
setTabTitle('Dashboard')
</script>

<template>
  <div v-if="error">
    <ErrorMessage
      header="Unable to load the Dashboard"
      message="Lifeline was unable to retrieve information from endoflife.date about one or more of your selected dependencies. Please check your tracked dependencies in the settings - the selections that have problems will be highlighted. You may have to reselect some dependencies."
      image="https://raw.githubusercontent.com/the-wright-jamie/lifeline/refs/heads/main/src/assets/img/error/disconnected.png"
    />
  </div>
  <div v-else>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" v-if="showBothTopInfo">
      <div>
        <LatestNews :data="depJsonString" />
      </div>
      <div>
        <UpcomingEOL :data="depJsonString" />
      </div>
    </div>
    <div v-else>
      <div v-if="showLatest">
        <LatestNews :data="depJsonString" />
      </div>
      <div v-if="showUpcoming || showPastEOL">
        <UpcomingEOL :data="depJsonString" />
      </div>
    </div>
    <br />
    <div v-if="showGantt">
      <GanttChart
        :dependencies="dependencies.toString()"
        :depJson="JSON.stringify(depJson)"
      ></GanttChart>
    </div>
    <div v-if="allDisabled">
      <ErrorMessage
        header="Oops!"
        message="There's nothing to show here as you've disabled all toggles under the dashboard section in
      Settings."
      />
    </div>
  </div>
</template>
