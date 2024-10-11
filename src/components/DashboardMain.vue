<script setup lang="ts">
import { ref } from 'vue'
import LatestNews from './LatestNews.vue'
import UpcomingEOL from './UpcomingEOL.vue'
import GanttChart from './GanttChart.vue'
import { getRandomInt } from '@/assets/ts/utils'

// This is an absolute mess 🤣
// Surely there's a better way to handle multiple waits...

async function getData(array) {
  const res = await Promise.all(array)
  const data = await Promise.all(
    res.map((item) => {
      return item.json()
    })
  )
  return data
}

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

dependencies.forEach((dependency) => {
  fetchArray.push(fetch(`https://endoflife.date/api/${dependency}.json`))
})

let depJson = {}
const allData = await getData(fetchArray)
let iter = 0
allData.forEach((data) => {
  depJson[`${dependencies[iter]}`] = data
  iter++
})
let depJsonstring = JSON.stringify(depJson)
</script>

<template>
  <div class="grid grid-cols-2" v-if="showBothTopInfo">
    <div>
      <LatestNews :data="depJsonstring" />
    </div>
    <div>
      <UpcomingEOL :data="depJsonstring" />
    </div>
  </div>
  <div v-else>
    <div v-if="showLatest">
      <LatestNews :data="depJsonstring" />
    </div>
    <div v-if="showUpcoming || showPastEOL">
      <UpcomingEOL :data="depJsonstring" />
    </div>
  </div>
  <br />
  <div v-if="showGantt">
    <h2>Gantt Chart</h2>
    <!--<GanttChart :tasks="tasks" :data="depJsonstring" />-->
  </div>
  <div v-if="allDisabled">
    <ErrorMessage
      header="Oops!"
      message="There's nothing to show here as you've disabled all toggles under the dashboard section in
      Settings."
    />
  </div>
</template>
