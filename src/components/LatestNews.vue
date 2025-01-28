<script setup lang="ts">
import {
  dateToUnixTimestamp,
  dependencyTitleCase,
  generateExternalLink,
  toLocalDate,
  unixTimestampToLocalDate
} from '@/assets/ts/utils'
import { type Config } from '../assets/ts/types'

const props = defineProps({
  data: String
})

const config: Config = JSON.parse(localStorage.getItem('config') || '')
const allData = JSON.parse(props.data)
const showEOL = config.dashboardConfig.upcomingEOL || config.dashboardConfig.pastEOL
let someData = []

for (var dependency in allData) {
  allData[`${dependency}`].forEach((eolData) => {
    if (eolData.latestReleaseDate) {
      someData.push([
        dateToUnixTimestamp(eolData.latestReleaseDate),
        dependency,
        eolData.latest,
        eolData.link
      ])
    } else {
      someData.push([
        dateToUnixTimestamp(eolData.releaseDate),
        dependency,
        eolData.cycle,
        eolData.link
      ])
    }
  })
}

someData.sort((a, b) => b[0] - a[0])

let dataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries)

function getCorrectClass() {
  let basicClass = 'text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'
  return showEOL ? basicClass + ' w-full lg:w-11/12' : basicClass + ' w-full'
}
</script>

<template>
  <h2>Latest Releases</h2>
  <table :class="getCorrectClass()">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Project</th>
        <th scope="col" class="px-6 py-3">Release</th>
        <th scope="col" class="px-6 py-3">Date</th>
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
  </table>
</template>
