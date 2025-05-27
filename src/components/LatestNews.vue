<script setup lang="ts">
import { dateToUnixTimestamp, generateAboutLink, unixTimestampToLocalDate } from '@/assets/ts/utils'
import { type Config } from '../assets/ts/types'

const props = defineProps({
  data: String
})

const config: Config = JSON.parse(localStorage.getItem('config') || '')
const allData = JSON.parse(props.data)
const showEOL = config.dashboardConfig.upcomingEOL || config.dashboardConfig.pastEOL
let someData = []

for (var dependency in allData) {
  allData[`${dependency}`].releases.forEach((eolData) => {
    if (eolData.latest != null && eolData.latest.date != null) {
      someData.push([
        dateToUnixTimestamp(eolData.latest.date),
        dependency,
        eolData.latest.name,
        eolData.latest.link,
        allData[`${dependency}`].links.html,
        allData[`${dependency}`].name
      ])
    } else if (eolData.latest != null && eolData.latest.link != null) {
      someData.push([
        dateToUnixTimestamp(eolData.releaseDate),
        dependency,
        `${eolData.label} (${eolData.latest.name})`,
        eolData.latest.link,
        allData[`${dependency}`].links.html,
        allData[`${dependency}`].name
      ])
    } else {
      someData.push([
        dateToUnixTimestamp(eolData.releaseDate),
        dependency,
        eolData.label,
        undefined,
        allData[`${dependency}`].links.html,
        allData[`${dependency}`].name
      ])
    }
  })
}

someData.sort((a, b) => b[0] - a[0])

let dataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries)
</script>

<template>
  <h2>Latest Releases</h2>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
          <RouterLink class="not-hyperlink" :to="generateAboutLink(news[5])">{{
            news[1]
          }}</RouterLink>
        </th>
        <td class="px-6 py-2">
          <a v-if="news[3] !== undefined" :href="news[3]">{{ news[2] }}</a>
          <p v-else>{{ news[2] }}</p>
        </td>
        <td class="px-6 py-2">
          {{ unixTimestampToLocalDate(news[0]) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
