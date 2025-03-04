<script setup lang="ts">
import { ref } from 'vue'
import LatestNews from './LatestNews.vue'
import UpcomingEOL from './UpcomingEOL.vue'
import {
  getRandomInt,
  dependencyTitleCase,
  dateToUnixTimestamp,
  todayAsISO,
  unixAsISO
} from '@/assets/ts/utils'
import VueMermaidString from 'vue-mermaid-string'
import endent from 'endent'
import { type Config } from '../assets/ts/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DEPENDENCY_STRING_TYPE } from '@/assets/ts/enums'

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

function updateWidth(input: number) {
  if (isNaN(input) || input == 0 || input < 30) {
    input = 30
  }
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.ganttWidth = input
  userChartWidth.value = input
  ganttChartLiveUpdate()
  localStorage.setItem('config', JSON.stringify(config))
}

function updateOffset(input: number) {
  userChartOffset.value = input
  ganttChartLiveUpdate()
}

function setFocusedDependency(dependency: string) {
  focusedDependency.value = dependency
  ganttChartLiveUpdate()
}

function resetSliders() {
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.ganttWidth = config.dashboardConfig.ganttMaxWidth / 2
  userChartWidth.value = config.dashboardConfig.ganttMaxWidth / 2
  userChartOffset.value = 0
  focusedDependency.value = 'all'
  ganttChartLiveUpdate()
  localStorage.setItem('config', JSON.stringify(config))
}

let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
let diagram = ref(``)

const config: Config = JSON.parse(localStorage.getItem('config') || '')
const allDisabled = ref(
  !config.dashboardConfig.latestNews &&
    !config.dashboardConfig.upcomingEOL &&
    !config.dashboardConfig.pastEOL &&
    !config.dashboardConfig.ganttChart
)
const dependencies = config.dependencies
const showBothTopInfo = ref(
  config.dashboardConfig.latestNews &&
    (config.dashboardConfig.upcomingEOL || config.dashboardConfig.pastEOL)
)
const showLatest = ref(config.dashboardConfig.latestNews)
const showUpcoming = ref(config.dashboardConfig.upcomingEOL)
const showPastEOL = ref(config.dashboardConfig.pastEOL)
const showGantt = ref(config.dashboardConfig.ganttChart)
// set the max width of the chart in days
const userChartMaxWidth = ref(config.dashboardConfig.ganttMaxWidth)
// set the width of the chart in days
const userChartWidth = ref(config.dashboardConfig.ganttWidth)
const userChartOffset = ref(0)
const focusedDependency = ref('all')

let fetchArray = []

try {
  dependencies.forEach((dependency) => {
    fetchArray.push(fetch(`https://endoflife.date/api/${dependency}.json`))
  })
} catch {
  console.error('Failed to fetch')
}

let depJson = {}
const allData = await getData(fetchArray)
let iter = 0
allData.forEach((data) => {
  depJson[`${dependencies[iter]}`] = data
  iter++
})

function ganttChartLiveUpdate() {
  diagram.value = ``
  if (isDarkMode) {
    diagram.value = `
%%{
    init: {
        'theme': 'dark',
        'fontFamily': 'Roboto',
        'gantt': {
              'numberSectionStyles': '2'
          }
    }
}%%
      gantt
    dateFormat YYYY-MM-DD
    `
  } else {
    diagram.value = `
%%{init: {'theme':'neutral', 'fontFamily': 'Roboto' }}%%
      gantt
    dateFormat YYYY-MM-DD
    `
  }

  // One day = 86400 seconds
  let unixOneDay = 86400
  // get the current Unix timestamp
  let unixCurrentTime = Math.trunc(Date.now() / 1000) - userChartOffset.value * unixOneDay
  // convert the days to unix time
  let unixChartWidth = unixOneDay * (userChartWidth.value / 2)
  // calculate the seek back in unix
  let unixSeekback = unixCurrentTime - unixChartWidth
  // calculate the seek forward in unix
  let unixSeekforwad = unixCurrentTime + unixChartWidth

  for (var data in depJson) {
    if (focusedDependency.value != 'all' && data != focusedDependency.value) {
      continue
    }

    // for each entry in the array for each of the KEYS in the dependency JSON
    depJson[`${data}`].forEach((eolData) => {
      // if the EOL is greater than the seekback...
      if (dateToUnixTimestamp(eolData.eol) > unixSeekback) {
        // ...and
        if (
          dateToUnixTimestamp(eolData.releaseDate) < unixSeekback &&
          dateToUnixTimestamp(eolData.eol) > unixSeekforwad
        ) {
          diagram.value =
            diagram.value +
            `
    section ${dependencyTitleCase(data)}
        ← ${dependencyTitleCase(eolData.cycle, DEPENDENCY_STRING_TYPE.RELEASE)} →: ${unixAsISO(unixSeekback)}, ${unixAsISO(unixSeekforwad)}`
        } else if (dateToUnixTimestamp(eolData.releaseDate) < unixSeekback) {
          diagram.value =
            diagram.value +
            `
    section ${dependencyTitleCase(data)}
        ← ${dependencyTitleCase(eolData.cycle, DEPENDENCY_STRING_TYPE.RELEASE)}: ${unixAsISO(unixSeekback)}, ${eolData.eol}`
        } else if (dateToUnixTimestamp(eolData.eol) > unixSeekforwad) {
          diagram.value =
            diagram.value +
            `
    section ${dependencyTitleCase(data)}
        ${dependencyTitleCase(eolData.cycle, DEPENDENCY_STRING_TYPE.RELEASE)} →: ${eolData.releaseDate}, ${unixAsISO(unixSeekforwad)}`
        } else {
          diagram.value =
            diagram.value +
            `
    section ${dependencyTitleCase(data)}
        ${dependencyTitleCase(eolData.cycle, DEPENDENCY_STRING_TYPE.RELEASE)}: ${eolData.releaseDate}, ${eolData.eol}`
        }
      }
      if (!eolData.eol) {
        if (
          dateToUnixTimestamp(eolData.releaseDate) > unixSeekback &&
          dateToUnixTimestamp(eolData.releaseDate) < unixCurrentTime + unixChartWidth
        ) {
          diagram.value =
            diagram.value +
            `
    section ${dependencyTitleCase(data)}
        ${dependencyTitleCase(eolData.cycle, DEPENDENCY_STRING_TYPE.RELEASE)} (Supported, unknown EOL): milestone, ${eolData.releaseDate}, 0d`
        } else {
          if (dateToUnixTimestamp(eolData.releaseDate) < unixCurrentTime + unixChartWidth) {
            diagram.value =
              diagram.value +
              `
    section ${dependencyTitleCase(data)}
        ← ${dependencyTitleCase(eolData.cycle, DEPENDENCY_STRING_TYPE.RELEASE)} (Supported, unknown EOL): ${unixAsISO(unixSeekback)}, 0d`
          }
        }
      }
    })
  }

  diagram.value =
    diagram.value +
    `
    section Info
         Start - ${unixAsISO(unixSeekback)}: ${unixAsISO(unixSeekback)}, 0d
         End - ${unixAsISO(unixSeekforwad)}: ${unixAsISO(unixSeekforwad)}, 0d`
}

ganttChartLiveUpdate()
let depJsonstring = JSON.stringify(depJson)
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" v-if="showBothTopInfo">
    <div>
      <LatestNews :data="depJsonstring" />
    </div>
    <div>
      <UpcomingEOL :data="depJsonstring" />
    </div>
  </div>
  <div v-else>
    <div v-if="showLatest">
      <LatestNews :data="depJsonstring" />
    </div>
    <div v-if="showUpcoming || showPastEOL">
      <UpcomingEOL :data="depJsonstring" />
    </div>
  </div>
  <br />
  <div v-if="showGantt">
    <h2>Gantt Chart</h2>
    <h2>Chart controls <span class="beta-pill">BETA</span></h2>
    <div class="grid auto-cols-2 grid-flow-col gap-4">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex w-full justify-center p-2 pr-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-white"
          >
            Showing: {{ dependencyTitleCase(focusedDependency) }}
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-900 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
          >
            <div class="py-1">
              <MenuItem>
                <button
                  @click="setFocusedDependency('all')"
                  class="block px-4 py-2 text-sm not-hyperlink"
                >
                  Show All
                  <span class="material-symbols-rounded">{{
                    focusedDependency == 'all' ? '&#xe5ca;' : ''
                  }}</span>
                </button>
              </MenuItem>
              <hr />
              <MenuItem v-for="dependency in dependencies">
                <button
                  @click="setFocusedDependency(dependency)"
                  href="#"
                  class="block px-4 py-2 text-sm not-hyperlink"
                >
                  {{ dependencyTitleCase(dependency) }}
                  <span class="material-symbols-rounded">{{
                    focusedDependency == dependency ? '&#xe5ca;' : ''
                  }}</span>
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <button
        @click="resetSliders()"
        class="relative inline-block p-2 pr-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-white"
      >
        Reset Chart
      </button>
    </div>

    <div class="stickyHeader bg-white dark:bg-black">
      <br />
      <div class="grid auto-cols-2 grid-flow-col gap-4">
        <div class="relative mb-6">
          <label for="labels-range-input">Chart Zoom: {{ userChartWidth }} days</label>
          <input
            id="labels-range-input"
            type="range"
            :value="userChartWidth"
            min="30"
            :max="userChartMaxWidth"
            step="1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            @input="(event) => updateWidth(Number((event.target as HTMLInputElement).value))"
          />
          <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6"
            >30</span
          >
          <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">{{
            userChartMaxWidth
          }}</span>
        </div>
        <div class="relative mb-6">
          <label for="labels-range-input"
            >Chart Offset: {{ -userChartOffset }} {{ userChartOffset == 1 ? 'day' : 'days' }}</label
          >
          <input
            id="labels-range-input"
            type="range"
            :value="userChartOffset"
            :min="-userChartMaxWidth / 2"
            :max="userChartMaxWidth / 2"
            step="1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            @input="(event) => updateOffset(Number((event.target as HTMLInputElement).value))"
          />
          <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">{{
            userChartMaxWidth / 2
          }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">{{
            -userChartMaxWidth / 2
          }}</span>
        </div>
      </div>
      <br />
    </div>
    <vue-mermaid-string :value="diagram" />
  </div>
  <div v-if="allDisabled">
    <ErrorMessage
      header="Oops!"
      message="There's nothing to show here as you've disabled all toggles under the dashboard section in
      Settings."
    />
  </div>
</template>
