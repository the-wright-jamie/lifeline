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

const config: Config = JSON.parse(localStorage.getItem('config'))
const allDisabled = ref(
  !config.dashboardConfig.latestNews &&
    !config.dashboardConfig.upcomingEOL &&
    !config.dashboardConfig.ganttChart
)
const dependencies = config.dependencies
const showBothTopInfo = ref(config.dashboardConfig.latestNews && config.dashboardConfig.upcomingEOL)
const showLatest = ref(config.dashboardConfig.latestNews)
const showUpcoming = ref(config.dashboardConfig.upcomingEOL)
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
let depJsonString = JSON.stringify(depJson)

function pickRandomErrorImage() {
  return `src/assets/img/error/${getRandomInt(1, 4)}.png`
}
</script>

<template>
  <div class="grid grid-cols-2" v-if="showBothTopInfo">
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
    <div v-if="showUpcoming">
      <UpcomingEOL :data="depJsonString" />
    </div>
  </div>
  <br />
  <div v-if="showGantt">
    <GanttChart :data="depJsonString" />
  </div>
  <div class="middle center" v-if="allDisabled">
    <img class="error-image rounded-xl" :src="pickRandomErrorImage()" />
    <br />
    <h1>Oops!</h1>
    <p>There's nothing to show here as you've disabled all toggles under the dashboard section in Settings.</p>
  </div>
</template>
