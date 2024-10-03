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

const config = JSON.parse(localStorage.getItem('config'))
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
let dataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries / 2)

someData = []
for (var dependency in allData) {
  allData[`${dependency}`].forEach((eolData) => {
    if (eolData.eol != false && eolData.eol != true && isDateBeforeToday(eolData.eol)) {
      someData.push([dateToUnixTimestamp(eolData.eol), dependency, eolData.cycle, eolData.link])
    }
  })
}
someData.sort((a, b) => b[0] - a[0])
let otherDataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries / 2 - 1)
</script>

<template>
  <h2>Known upcoming EOL dates</h2>

  <p class="disabled" v-if="dataToDisplay.length == 0 && otherDataToDisplay.length == 0">
    No known dates. The dependencies you are following might not publish upcoming end-of-life dates.
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
      <tbody v-for="news in dataToDisplay">
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
            <a v-if="news[3] !== undefined" :href="news[3]">{{ dependencyTitleCase(news[2]) }}</a>
            <p v-else>{{ dependencyTitleCase(news[2]) }}</p>
          </td>
          <td class="px-6 py-2">
            {{ unixTimestampToLocalDate(news[0]) }}
          </td>
        </tr>
      </tbody>
      <thead class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">Recently Passed EOL Dates</th>
        </tr>
      </thead>
      <tbody v-for="news in otherDataToDisplay">
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
            <a v-if="news[3] !== undefined" :href="news[3]">{{ dependencyTitleCase(news[2]) }}</a>
            <p v-else>{{ dependencyTitleCase(news[2]) }}</p>
          </td>
          <td class="px-6 py-2">
            {{ unixTimestampToLocalDate(news[0]) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
