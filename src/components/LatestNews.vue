<script setup lang="ts">
import {
  dateToUnixTimestamp,
  dependencyTitleCase,
  generateExternalLink,
  toLocalDate,
  unixTimestampToLocalDate
} from '@/assets/ts/utils'

const props = defineProps({
  data: String
})
const config = JSON.parse(localStorage.getItem('config'))
const allData = JSON.parse(props.data)
let someData = []

for (var dependency in allData) {
  allData[`${dependency}`].forEach((eolData) => {
    if (eolData.latestReleaseDate) {
      someData.push([dateToUnixTimestamp(eolData.latestReleaseDate), dependency, eolData.latest])
    } else {
      someData.push([dateToUnixTimestamp(eolData.releaseDate), dependency, eolData.cycle])
    }
  })
}

someData.sort((a, b) => b[0] - a[0])

let dataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries)
</script>

<template>
  <h2>Latest Releases</h2>
  <table class="table-fixed">
    <tbody>
      <tr>
        <th>Project Name</th>
        <th>Latest Release</th>
        <th>Date</th>
      </tr>
      <tr v-for="news in dataToDisplay">
        <td>
          <a :href="generateExternalLink(news[1])">{{ dependencyTitleCase(news[1]) }}</a>
        </td>
        <td>v{{ news[2] }}</td>
        <td>{{ unixTimestampToLocalDate(news[0]) }}</td>
      </tr>
    </tbody>
  </table>
</template>
