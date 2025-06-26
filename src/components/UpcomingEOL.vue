<script setup lang="ts">
import {
  dateToUnixTimestamp,
  generateAboutLink,
  isDateAfterToday,
  isDateBeforeToday,
  unixTimestampToLocalDate
} from '@/assets/ts/utils'
import { type ConfigV2 } from '../assets/ts/types/lifeline'

const config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
const props = defineProps({
  data: String
})
const allData = JSON.parse(props.data || '{}')
let someData: any[][] = []

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
if (!config.dashboard_config.show_past_EOL) {
  dataToDisplay = someData.slice(0, config.dashboard_config.news_entries - 1)
} else {
  dataToDisplay = someData.slice(0, config.dashboard_config.news_entries / 2 - 1)
}

someData = []
for (var dependency in allData) {
  allData[`${dependency}`].releases.forEach(
    (eolData: { isEol: boolean; eolFrom: string; label: any; latest: string | null }) => {
      if (eolData.isEol == true && isDateBeforeToday(eolData.eolFrom)) {
        someData.push([
          dateToUnixTimestamp(eolData.eolFrom),
          dependency,
          eolData.label,
          allData[`${dependency}`].name,
          eolData.latest != null ? eolData.latest.link : ''
        ])
      }
    }
  )
}

someData.sort((a, b) => b[0] - a[0])
let otherDataToDisplay = []
if (!config.dashboard_config.show_upcoming_EOL) {
  otherDataToDisplay = someData.slice(0, config.dashboard_config.news_entries - 1)
} else {
  otherDataToDisplay = someData.slice(0, config.dashboard_config.news_entries / 2 - 1)
}

const highlightThisMonthEOL = config.dashboard_config.highlight_this_month_EOL

function isThisMonth(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000)
  const now = new Date()
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
}
</script>

<template>
  <h2 class="select-none">Known end-of-life dates</h2>
  <div>
    <table
      class="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400 rounded-xl"
    >
      <thead
        class="text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 select-none"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Project</th>
          <th scope="col" class="px-6 py-3">Release</th>
          <th scope="col" class="px-6 py-3">EOL Date</th>
        </tr>
      </thead>
      <!-- actual headers -->
      <thead
        v-if="config.dashboard_config.show_past_EOL && otherDataToDisplay.length == 0"
        class="text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 select-none"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">No known past EOL dates</th>
        </tr>
      </thead>
      <!-- no known past EOL -->
      <thead
        v-if="config.dashboard_config.show_past_EOL && otherDataToDisplay.length != 0"
        class="text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 select-none"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">Recently past EOL Dates</th>
        </tr>
      </thead>
      <tbody v-if="config.dashboard_config.show_past_EOL" v-for="(news, i) in otherDataToDisplay">
        <tr
          class="border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          :class="i % 2 == 0 ? 'bg-neutral-100 dark:bg-neutral-900' : 'bg-white'"
        >
          <th
            scope="row"
            class="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
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
            <span
              :class="
                highlightThisMonthEOL && isThisMonth(news[0]) ? 'text-amber-500 font-bold' : ''
              "
            >
              {{ unixTimestampToLocalDate(news[0]) }}
            </span>
          </td>
        </tr>
      </tbody>
      <!-- body of past EOL -->
      <thead
        v-if="config.dashboard_config.show_upcoming_EOL && dataToDisplay.length != 0"
        class="text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 select-none"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">Future EOL Dates</th>
        </tr>
      </thead>
      <!-- future EOL -->
      <thead
        v-if="config.dashboard_config.show_upcoming_EOL && dataToDisplay.length == 0"
        class="text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 select-none"
      >
        <tr>
          <th scope="col" class="px-6 py-2 spacer" colspan="3">No known future EOL dates</th>
        </tr>
      </thead>
      <!-- no known future EOL -->
      <tbody v-if="config.dashboard_config.show_upcoming_EOL" v-for="(news, i) in dataToDisplay">
        <tr
          class="border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          :class="i % 2 == 0 ? 'bg-neutral-100 dark:bg-neutral-900' : 'bg-white'"
        >
          <th
            scope="row"
            class="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
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
            <span
              :class="
                highlightThisMonthEOL && isThisMonth(news[0]) ? 'text-amber-500 font-bold' : ''
              "
            >
              {{ unixTimestampToLocalDate(news[0]) }}
            </span>
          </td>
        </tr>
      </tbody>
      <!-- body of future EOL -->
    </table>
  </div>
</template>
