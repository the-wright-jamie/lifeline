<script setup lang="ts">
import { ref } from 'vue'
import LatestNews from './LatestNews.vue'
import UpcomingEOL from './UpcomingEOL.vue'
import GanttChart from './GanttChart.vue'

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
const dependencies = config.dependencies
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
</script>

<template>
  <div class="grid grid-cols-2">
    <div>
      <LatestNews :data="JSON.stringify(depJson)" />
    </div>
    <div>
      <UpcomingEOL :data="JSON.stringify(depJson)" />
    </div>
  </div>
  <br />
  <div>
    <GanttChart :data="JSON.stringify(depJson)" />
  </div>
</template>
