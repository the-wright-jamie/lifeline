<script setup lang="ts">
import { dateToUnixTimestamp, generateAboutLink, unixTimestampToLocalDate } from '@/assets/ts/utils'
import { ref } from 'vue'
import { type ConfigV2 } from '../assets/ts/types/lifeline'

const props = defineProps({
  data: String
})

const config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
const allData = JSON.parse(props.data)
const showEOL = config.dashboard_config.show_upcoming_EOL || config.dashboard_config.show_past_EOL
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

let dataToDisplay = someData.slice(0, config.dashboard_config.news_entries)
// fallback for highlightRecentReleases if not present in config type
const showHighlightRecentReleases = ref(false)
const showHighlightTodayAndYesterday = ref(false)
try {
  showHighlightRecentReleases.value = config.dashboard_config.highlight_recent_releases
  showHighlightTodayAndYesterday.value = config.dashboard_config.highlight_today_and_yesterday
} catch {}

function isWithinLast7Days(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000)
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return date >= sevenDaysAgo && date <= now
}

function isTodayOrYesterday(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  return date >= yesterday && date < new Date(today.getTime() + 24 * 60 * 60 * 1000)
}
</script>

<template>
  <h2 class="select-none">Latest Releases</h2>
  <table class="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
    <thead
      class="text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 select-none"
    >
      <tr>
        <th scope="col" class="px-6 py-3">Project</th>
        <th scope="col" class="px-6 py-3">Release</th>
        <th scope="col" class="px-6 py-3">Date</th>
        <th scope="col" class="px-6 py-3"></th>
      </tr>
    </thead>
    <tbody v-for="(news, i) in dataToDisplay">
      <tr
        class="border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        :class="i % 2 == 0 ? 'bg-neutral-100 dark:bg-neutral-900' : 'bg-white'"
      >
        <th
          scope="row"
          class="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
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
        <td class="px-6 py-2">
          <span
            v-if="showHighlightRecentReleases && isWithinLast7Days(news[0])"
            class="dot"
            :class="
              showHighlightTodayAndYesterday && isTodayOrYesterday(news[0])
                ? 'bg-green-400'
                : 'bg-green-900'
            "
            aria-label="New release"
          ></span>
          <span
            v-else-if="showHighlightTodayAndYesterday && isTodayOrYesterday(news[0])"
            class="dot bg-green-400"
            aria-label="New release"
          ></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
