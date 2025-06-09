<script setup lang="ts">
import { getMachineName, setTabTitle } from '@/assets/ts/utils'
import { ref, watchEffect } from 'vue'
import { type ConfigV1 } from '../assets/ts/types/lifeline'
import ErrorMessage from './ErrorMessage.vue'
import GanttChart from './GanttChart.vue'
import LatestNews from './LatestNews.vue'
import UpcomingEOL from './UpcomingEOL.vue'
setTabTitle('Loading...')

const completedPromises = ref(0)
const totalPromises = ref(0)
const lastLoaded = ref('')
const emit = defineEmits(['progress'])

// This is an absolute mess 🤣
// Surely there's a better way to handle multiple waits...
async function getData(promises) {
  totalPromises.value = promises.length
  completedPromises.value = 0
  const responses = []
  for (let i = 0; i < promises.length; i++) {
    try {
      const response = await promises[i]
      completedPromises.value++
      // Set lastLoaded to the dependency name from the URL
      try {
        const url = (response && response.url) || ''
        const match = url.match(/products\/([^/]+)/)
        if (match && match[1]) {
          lastLoaded.value = match[1]
        }
      } catch {}
      if (response && response.ok) {
        responses.push(response)
      } else {
        error.value = true
      }
    } catch {
      error.value = true
      // skip this one, continue
    }
  }
  if (responses.length === 0) return // nothing succeeded
  try {
    const jsonResults = await Promise.all(responses.map((response) => response.json()))
    return jsonResults
  } catch {
    error.value = true
  }
}

watchEffect(() => {
  // Emit progress to parent
  emit('progress', {
    completed: completedPromises.value,
    total: totalPromises.value,
    lastLoaded: lastLoaded.value
  })
})

let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
let diagram = ref(``)
let error = ref(false)

const config: ConfigV1 = JSON.parse(localStorage.getItem('config') || '')
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

let fetchArray: Promise<void | Response>[] = []

try {
  dependencies.forEach((dependency) => {
    fetchArray.push(
      fetch(`https://endoflife.date/api/v1/products/${getMachineName(dependency)}`).catch(() => {
        console.error(`Failed to fetch data for ${dependency}`)
        error.value = true
      })
    )
  })
} catch {
  console.error('Failed to fetch')
}

let depJson: { [key: string]: any } = {}
const allData = await getData(fetchArray)
try {
  if (allData) {
    allData.forEach((data) => {
      depJson[`${data.result.label}`] = data.result
    })
  }
} catch {
  error.value = true
}

let depJsonString = JSON.stringify(depJson)
setTabTitle('Dashboard')
</script>

<template>
  <div>
    <div v-if="error">
      <div class="center-div">
        <div class="grid gap-4 grid-flow-col error-box">
          <div>
            <span class="material-symbols-rounded">&#xe88e;</span>
          </div>
          <div>
            <p class="info-title">There was an error</p>
            <div class="grid gap-2">
              <p>
                There seems to have been a change in the endoflife.date API, and one or more of your
                tracked dependencies couldn't be found.
              </p>
              <p>
                This is often caused by updates that endoflife.date have made to their API, or
                changes to the configuration such that it now includes an invalid dependency.
              </p>
              <p>
                You can see which tracked dependencies have a problem by going back to the tracked
                dependencies menu:
              </p>
              <RouterLink class="not-hyperlink" to="/setup">
                <button
                  class="block p-2 pr-3 text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-900 dark:border-neutral-600 dark:text-white"
                >
                  <span class="material-symbols-rounded">&#xf1fe;</span> Change Tracked Dependencies
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" v-if="showBothTopInfo">
      <div>
        <LatestNews :data="depJsonString" />
      </div>
      <div>
        <UpcomingEOL :data="depJsonString" />
      </div>
    </div>
    <div v-else>
      <div v-if="showLatest">
        <LatestNews :data="depJsonString" />
      </div>
      <div v-if="showUpcoming || showPastEOL">
        <UpcomingEOL :data="depJsonString" />
      </div>
    </div>
    <br />
    <div v-if="showGantt">
      <GanttChart
        :dependencies="dependencies.toString()"
        :depJson="JSON.stringify(depJson)"
      ></GanttChart>
    </div>
    <div v-if="allDisabled">
      <ErrorMessage
        header="Oops!"
        message="There's nothing to show here as you've disabled all toggles under the dashboard section in
      Settings."
      />
    </div>
  </div>
</template>
