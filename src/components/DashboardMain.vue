<script setup lang="ts">
import { getMachineName, setTabTitle } from '@/assets/ts/utils'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { type ConfigV2 } from '../assets/ts/types/lifeline'
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

const config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
const showLatest = ref(config.dashboard_config.show_latest_news)
const showUpcoming = ref(config.dashboard_config.show_upcoming_EOL)
const showPastEOL = ref(config.dashboard_config.show_past_EOL)
const showGantt = ref(config.dashboard_config.show_gantt_chart)
const showGitHubReleases = ref(config.dashboard_config.show_github_releases)

const allDisabled = ref(
  !config.dashboard_config.show_latest_news &&
    !config.dashboard_config.show_upcoming_EOL &&
    !config.dashboard_config.show_past_EOL &&
    !config.dashboard_config.show_gantt_chart &&
    !config.dashboard_config.show_github_releases // Include GitHub releases in the disabled check
)

let fetchArray: Promise<void | Response>[] = []

try {
  config.dependencies.forEach((dependency) => {
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

// New section for GitHub releases
let releases = ref([])
let releasesLoading = ref(false)

async function fetchReleases(repo) {
  releasesLoading.value = true
  try {
    // Get token from config if present
    const config = JSON.parse(localStorage.getItem('config') || '{}')
    const token = config.personal_access_token
    const headers = token ? { Authorization: `token ${token}` } : {}

    const response = await fetch(`https://api.github.com/repos/${repo}/releases`, { headers })
    if (response.ok) {
      const data = await response.json()
      releases.value = data
    } else {
      console.error('Failed to fetch releases')
    }
  } catch (error) {
    console.error('Error fetching releases:', error)
  } finally {
    releasesLoading.value = false
  }
}

onMounted(async () => {
  const config = JSON.parse(localStorage.getItem('config') || '{}')
  if (config.tracked_repos && config.tracked_repos.length > 0) {
    const firstRepo = config.tracked_repos[0]
    await fetchReleases(firstRepo)
  }
})

const dependencies = ref(config.dependencies || [])

const showBothTopInfo = computed(() => showLatest.value && showUpcoming.value)
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
    <!-- New section for GitHub releases -->
    <section v-if="showGitHubReleases">
      <h2>GitHub Releases</h2>
      <div v-if="releasesLoading">
        <p>Loading releases...</p>
      </div>
      <div v-else-if="releases.length != 0">
        <ul>
          <li v-for="release in releases" :key="release.id">
            <a :href="release.html_url" target="_blank">{{ release.repo }} {{ release.name }}</a>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No releases found.</p>
      </div>
    </section>
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
