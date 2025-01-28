<script setup lang="ts">
import { ref } from 'vue'
import LatestNews from './LatestNews.vue'
import UpcomingEOL from './UpcomingEOL.vue'
import GanttChart from './GanttChart.vue'
import {
  getRandomInt,
  dependencyTitleCase,
  dateToUnixTimestamp,
  todayAsISO,
  unixAsISO
} from '@/assets/ts/utils'
import VueMermaidString from 'vue-mermaid-string'
import endent from 'endent'
import { type Config } from '../assets/ts/types'

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

let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
let diagram = ``

if (isDarkMode) {
  diagram = `
%%{init: {'theme':'dark', 'darkMode': 'true', 'fontFamily': 'Roboto', 'displayMode': 'compact' }}%%
      gantt
    dateFormat YYYY-MM-DD
    `
} else {
  diagram = `
%%{init: {'theme':'neutral', 'darkMode': 'true', 'fontFamily': 'Roboto', 'displayMode': 'compact' }}%%
      gantt
    dateFormat YYYY-MM-DD
    `
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
for (var data in depJson) {
  // One day = 86400 seconds
  let unixOneDay = 86400
  // get the current Unix timestamp
  let unixCurrentTime = Math.trunc(Date.now() / 1000)
  // set the width of the chart in days
  let userChartWidth = config.dashboardConfig.ganttWidth
  // convert the days to unix time
  let unixChartWidth = unixOneDay * userChartWidth
  // calculate the seek back in unix
  let unixSeekback = unixCurrentTime - unixChartWidth
  // calculate the seek forward in unix
  let unixSeekforwad = unixCurrentTime + unixChartWidth

  // for each entry in the array for each of the KEYS in the dependency JSON
  depJson[`${data}`].forEach((eolData) => {
    // if the EOL is greater than the seekback...
    if (dateToUnixTimestamp(eolData.eol) > unixSeekback) {
      // ...and
      if (
        dateToUnixTimestamp(eolData.releaseDate) < unixSeekback &&
        dateToUnixTimestamp(eolData.eol) > unixSeekforwad
      ) {
        diagram =
          diagram +
          `
    section ${dependencyTitleCase(data)}
        ← ${dependencyTitleCase(eolData.cycle)} →: ${unixAsISO(unixSeekback)}, ${unixAsISO(unixSeekforwad)}`
      } else if (dateToUnixTimestamp(eolData.releaseDate) < unixSeekback) {
        diagram =
          diagram +
          `
    section ${dependencyTitleCase(data)}
        ← ${dependencyTitleCase(eolData.cycle)}: ${unixAsISO(unixSeekback)}, ${eolData.eol}`
      } else if (dateToUnixTimestamp(eolData.eol) > unixSeekforwad) {
        diagram =
          diagram +
          `
    section ${dependencyTitleCase(data)}
        ${dependencyTitleCase(eolData.cycle)} →: ${eolData.releaseDate}, ${unixAsISO(unixSeekforwad)}`
      } else {
        diagram =
          diagram +
          `
    section ${dependencyTitleCase(data)}
        ${dependencyTitleCase(eolData.cycle)}: ${eolData.releaseDate}, ${eolData.eol}`
      }
    }
    if (!eolData.eol) {
      if (dateToUnixTimestamp(eolData.releaseDate) > unixSeekback) {
        diagram =
          diagram +
          `
    section ${dependencyTitleCase(data)}
        ${dependencyTitleCase(eolData.cycle)} (Supported, unknown EOL): milestone, ${eolData.releaseDate}, 0d`
      } else {
        diagram =
          diagram +
          `
    section ${dependencyTitleCase(data)}
        ← ${dependencyTitleCase(eolData.cycle)} (Supported, unknown EOL): ${unixAsISO(unixSeekback)}, 0d`
      }
    }
  })
}
let depJsonstring = JSON.stringify(depJson)
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2" v-if="showBothTopInfo">
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
    <div>
      <vue-mermaid-string :value="diagram" />
    </div>
  </div>
  <div v-if="allDisabled">
    <ErrorMessage
      header="Oops!"
      message="There's nothing to show here as you've disabled all toggles under the dashboard section in
      Settings."
    />
  </div>
</template>
