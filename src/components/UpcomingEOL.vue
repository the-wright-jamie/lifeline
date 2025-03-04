<script setup lang="ts">
import {
  dateToUnixTimestamp,
  dependencyTitleCase,
  toLocalDate,
  unixTimestampToLocalDate,
  isDateAfterToday,
  isDateBeforeToday,
  generateExternalLink
} from '@/assets/ts/utils'
import { type Config } from '../assets/ts/types'
import { DEPENDENCY_STRING_TYPE } from '@/assets/ts/enums'

const config: Config = JSON.parse(localStorage.getItem('config') || '')
const props = defineProps({
  data: String
})
const allData = JSON.parse(props.data)
let someData = []

for (var dependency in allData) {
  allData[`${dependency}`].forEach((eolData) => {
    if (eolData.eol != false && eolData.eol != true && isDateAfterToday(eolData.eol)) {
      someData.push([dateToUnixTimestamp(eolData.eol), dependency, eolData.cycle, eolData.link])
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
  allData[`${dependency}`].forEach((eolData) => {
    if (eolData.eol != false && eolData.eol != true && isDateBeforeToday(eolData.eol)) {
      someData.push([dateToUnixTimestamp(eolData.eol), dependency, eolData.cycle, eolData.link])
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

  <p
    class="disabled"
    v-if="
      !config.dashboardConfig.upcomingEOL &&
      dataToDisplay.length != 0 &&
      otherDataToDisplay.length == 0
    "
  >
    The dependencies you are following don't have any known past end-of-life dates, but there is
    data about future end-of-life dates. However, you have opted to not see these in the settings
    and as such they will not be shown here.
  </p>
  <p
    class="disabled"
    v-else-if="
      !config.dashboardConfig.pastEOL && otherDataToDisplay.length != 0 && dataToDisplay.length == 0
    "
  >
    The dependencies you are following don't have any published future end-of-life dates, but there
    is data about past end-of-life dates. However, you have opted to not see these in the settings
    and as such they will not be shown here.
  </p>
  <p
    class="disabled"
    v-else-if="
      !config.dashboardConfig.upcomingEOL &&
      !config.dashboardConfig.pastEOL &&
      dataToDisplay.length == 0 &&
      otherDataToDisplay.length == 0
    "
  >
    The dependencies you are following don't haven't published any past end-of-life dates
  </p>
  <div v-else>
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
      <thead
        v-if="config.dashboardConfig.pastEOL && otherDataToDisplay.length != 0"
        class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">Recently past EOL Dates</th>
        </tr>
      </thead>
      <!-- no known past EOL -->
      <tbody v-if="config.dashboardConfig.pastEOL" v-for="news in otherDataToDisplay">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <a class="not-hyperlink" :href="generateExternalLink(news[1])">{{
              dependencyTitleCase(news[1])
            }}</a>
          </th>
          <td class="px-6 py-2">
            <a v-if="news[3] !== undefined" :href="news[3]">{{ dependencyTitleCase(news[2], DEPENDENCY_STRING_TYPE.RELEASE) }}</a>
            <p v-else>{{ dependencyTitleCase(news[2], DEPENDENCY_STRING_TYPE.RELEASE) }}</p>
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
            <a class="not-hyperlink" :href="generateExternalLink(news[1])">{{
              dependencyTitleCase(news[1])
            }}</a>
          </th>
          <td class="px-6 py-2">
            <a v-if="news[3] !== undefined" :href="news[3]">{{ dependencyTitleCase(news[2], DEPENDENCY_STRING_TYPE.RELEASE) }}</a>
            <p v-else>{{ dependencyTitleCase(news[2], DEPENDENCY_STRING_TYPE.RELEASE) }}</p>
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
