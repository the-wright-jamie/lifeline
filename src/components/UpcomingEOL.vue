<script setup lang="ts">
import {
  dateToUnixTimestamp,
  dependencyTitleCase,
  toLocalDate,
  unixTimestampToLocalDate,
  isDateAfterToday
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
      someData.push([dateToUnixTimestamp(eolData.eol), dependency, eolData.cycle])
    }
  })
}

someData.sort((a, b) => a[0] - b[0])

let dataToDisplay = someData.slice(0, config.dashboardConfig.newsEntries)
</script>

<template>
  <h2>Known upcoming EOL dates</h2>
  <p class="disabled" v-if="dataToDisplay.length == 0">
    No known dates. The dependencies you are following might not publish upcoming end-of-life dates.
  </p>
  <table class="flex-col" v-else>
    <tbody>
      <tr>
        <th>Project Name</th>
        <th>Release</th>
        <th>EOL Date</th>
      </tr>
      <tr v-for="news in dataToDisplay">
        <td>{{ dependencyTitleCase(news[1]) }}</td>
        <td>v{{ news[2] }}</td>
        <td>{{ unixTimestampToLocalDate(news[0]) }}</td>
      </tr>
    </tbody>
  </table>
</template>
