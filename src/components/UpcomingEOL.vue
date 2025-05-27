<script setup lang="ts">
import {
  dateToUnixTimestamp,
  generateAboutLink,
  isDateAfterToday,
  isDateBeforeToday,
  unixTimestampToLocalDate
} from '@/assets/ts/utils'
import { type Config } from '../assets/ts/types'

const config: Config = JSON.parse(localStorage.getItem('config') || '')
const props = defineProps({
  data: String
})
const allData = JSON.parse(props.data)
let someData = []

for (var dependency in allData) {
  allData[`${dependency}`].releases.forEach((eolData) => {
    if (eolData.isEol == false && isDateAfterToday(eolData.eolFrom)) {
      someData.push([
        dateToUnixTimestamp(eolData.eolFrom),
        dependency,
        eolData.label,
        allData[`${dependency}`].name,
        eolData.latest != null ? eolData.latest.link : ''
      ])
    }
  })
}

someData.sort((a, b) => a[0] - b[0])
let dataToDisplay = []
if (!config.dashboardConfig.pastEOL) {
  dataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries - 1)
} else {
  dataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries / 2 - 1)
}

someData = []
for (var dependency in allData) {
  allData[`${dependency}`].releases.forEach((eolData) => {
    if (eolData.isEol == true && isDateBeforeToday(eolData.eolFrom)) {
      someData.push([
        dateToUnixTimestamp(eolData.eolFrom),
        dependency,
        eolData.label,
        allData[`${dependency}`].name,
        eolData.latest != null ? eolData.latest.link : ''
      ])
    }
  })
}

someData.sort((a, b) => b[0] - a[0])
let otherDataToDisplay = []
if (!config.dashboardConfig.upcomingEOL) {
  otherDataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries - 1)
} else {
  otherDataToDisplay = someData.slice(
    0,
    config.dashboardConfig.newsEntries / 2 +
      (config.dashboardConfig.newsEntries / 2 - dataToDisplay.length) -
      2
  )
}
</script>

<template>
  <h2>Known end-of-life dates</h2>
  <div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Project</th>
          <th scope="col" class="px-6 py-3">Release</th>
          <th scope="col" class="px-6 py-3">EOL Date</th>
        </tr>
      </thead>
      <!-- actual headers -->
      <thead
        v-if="config.dashboardConfig.pastEOL && otherDataToDisplay.length == 0"
        class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">No known past EOL dates</th>
        </tr>
      </thead>
      <!-- no known past EOL -->
      <thead
        v-if="config.dashboardConfig.pastEOL && otherDataToDisplay.length != 0"
        class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">Recently past EOL Dates</th>
        </tr>
      </thead>
      <tbody v-if="config.dashboardConfig.pastEOL" v-for="news in otherDataToDisplay">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <RouterLink class="not-hyperlink" :to="generateAboutLink(news[3])">{{
              news[1]
            }}</RouterLink>
          </th>
          <td class="px-6 py-2">
            <a v-if="news[4] != ''" :href="news[4]">{{ news[2] }}</a>
            <p v-else>{{ news[2] }}</p>
          </td>
          <td class="px-6 py-2">
            {{ unixTimestampToLocalDate(news[0]) }}
          </td>
        </tr>
      </tbody>
      <!-- body of past EOL -->
      <thead
        v-if="config.dashboardConfig.upcomingEOL && dataToDisplay.length != 0"
        class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">Future EOL Dates</th>
        </tr>
      </thead>
      <!-- future EOL -->
      <thead
        v-if="config.dashboardConfig.upcomingEOL && dataToDisplay.length == 0"
        class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">No known future EOL dates</th>
        </tr>
      </thead>
      <!-- no known future EOL -->
      <tbody v-if="config.dashboardConfig.upcomingEOL" v-for="news in dataToDisplay">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <RouterLink class="not-hyperlink" :to="generateAboutLink(news[3])">{{
              news[1]
            }}</RouterLink>
          </th>
          <td class="px-6 py-2">
            <a v-if="news[4] != ''" :href="news[4]">{{ news[2] }}</a>
            <p v-else>{{ news[2] }}</p>
          </td>
          <td class="px-6 py-2">
            {{ unixTimestampToLocalDate(news[0]) }}
          </td>
        </tr>
      </tbody>
      <!-- body of future EOL -->
    </table>
  </div>
</template>
