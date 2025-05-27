<script setup lang="ts">
import { ref } from 'vue'
import Fuse from 'fuse.js'
import {
  getFriendlyName,
  getFriendlyNameFromAPI,
  getMachineName,
  setTabTitle
} from '@/assets/ts/utils'
import router from '@/router'
import { type Config } from '../assets/ts/types'

setTabTitle('Loading...')

function selectDependency(dependency: string, dependencies: string[]) {
  const found = dependencies.indexOf(getMachineName(dependency))

  if (found < 0) {
    dependencies.push(getMachineName(dependency))
  } else {
    dependencies.splice(found, 1)
  }

  const sortedDependencies = [...dependencies].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  )

  return sortedDependencies
}

function returnPagedDependencies(start: number, end: number) {
  // apparently this nonsense works on prod, and it doesn't care
  // if it's on dev. maybe a vue bug. super weird behavior.
  // basically when searching the loaded_deps go inside a value
  // so you have to call value twice...
  try {
    let arrayCopy = [...loaded_dependencies.value]
    return arrayCopy.slice(start, end)
  } catch {
    console.warn('Something went wrong slicing the array. Going to try the scuffed method...')
  }

  try {
    //@ts-ignore
    // ignore because this is some black magic here, even I don't understand this
    let arrayCopy = [...loaded_dependencies.value.value]
    return arrayCopy.slice(start, end)
  } catch {
    console.error(
      "Scuffed method didn't work. If you see this, please get in touch with the dev: https://github.com/the-wright-jamie/lifeline"
    )
  }
}

// this should probably be in a library...
function saveDependencies(dependencies: string[]) {
  let rawConfig = localStorage.getItem('config')
  let config: Config = {
    version: 1,
    dependencies: [],
    dashboardConfig: {
      latestNews: true,
      upcomingEOL: true,
      pastEOL: true,
      ganttChart: true,
      newsEntries: 10,
      ganttWidth: 356,
      ganttMaxWidth: 730
    },
    headerConfig: {
      showAbout: false,
      showHelp: true
    }
  }
  if (rawConfig) {
    config = JSON.parse(rawConfig)
    config.dependencies = []
  }

  dependencies.forEach((dependency) => {
    config.dependencies.push(getMachineName(dependency))
  })

  localStorage.setItem('config', JSON.stringify(config))

  router.replace('/')
  setTimeout(function () {
    location.reload()
  }, 100)
}

function search(search: string) {
  index.value = 0
  search_results.value = fuse.search(search).map((result) => result.item)
  if (search_results.value.length == 0) {
    total_results.value = dependencies.length
    return dependencies
  } else {
    total_results.value = search_results.value.length
    return search_results.value
  }
}

async function getData(url: string) {
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

let response = await getData('https://endoflife.date/api/v1/products')
let results = response.result
// TODO: Need to process the results so that it's compatible with what we expected
let dependencies = []

results.forEach((result) => {
  dependencies.push(`${result.label}|${result.name}`)
})

let sortedDependencies = [...dependencies].sort((a, b) =>
  a.localeCompare(b, undefined, { sensitivity: 'base' })
)

dependencies = sortedDependencies

const fuse = new Fuse(dependencies)

let index = ref(0)
let index_memory = 0
let page_size = ref(10)
let selected = ref([])
let search_text = ref('')
let search_results = ref([])
let unknownSelectedDependencyError = ref(false)

let loaded_dependencies = ref(dependencies)
let total_results = ref(Object.keys(dependencies).length)

let rawConfig = localStorage.getItem('config')

if (rawConfig) {
  let config: Config = JSON.parse(rawConfig)
  selected = ref(config.dependencies)
}

selected.value.forEach((dependency) => {
  if (!getFriendlyNameFromAPI(dependency, dependencies)) {
    unknownSelectedDependencyError.value = true
  }
})

function goToLastPage() {
  index.value = total_results.value - page_size.value
  while (index.value / page_size.value + 1 < Math.ceil(total_results.value / page_size.value)) {
    index.value = index.value + 1
  }
}

function updatePageSize(size: number) {
  page_size.value = size
  index.value = 0
}

function checkIfSelected(selected: string[], dependency: string) {
  return selected.indexOf(getMachineName(dependency)) > -1
}

setTabTitle('Setup')
</script>

<template>
  <h1>Please select the dependencies you want to track</h1>
  <div v-if="!unknownSelectedDependencyError">
    <br />
    <hr />
    <br />
  </div>
  <div v-if="unknownSelectedDependencyError">
    <div class="center-div">
      <div class="grid gap-4 grid-flow-col error-box">
        <div>
          <span class="material-symbols-rounded">&#xe88e;</span>
        </div>
        <div>
          <p class="info-title">There was an error</p>
          <div class="grid gap-2">
            <p>
              There seems to have been a change in the endoflife.date API, and the stored selected
              dependencies have become de-synced with the names in the API. The dependencies that
              are causing issues are highlighted with ⚠️. To fix this problem, remove the
              dependency, optionally re-add it from the list, and the save.
            </p>
            <p>
              This is often caused by updates that endoflife.date have made to their API, or changes
              to the configuration such that it now includes an invalid dependency.
            </p>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
  <div class="grid grid-cols-2">
    <div>
      <h2>Selected dependencies</h2>
      <p class="none-selected" v-if="selected.length == 0">None selected</p>
      <ul v-else>
        <template v-for="dependency in selected"
          ><li>
            <button @click="selected = selectDependency(dependency, selected)">
              <span class="material-symbols-rounded">&#xe5cd;</span> {{ ' '
              }}{{
                getFriendlyNameFromAPI(dependency, dependencies)
                  ? getFriendlyNameFromAPI(dependency, dependencies)
                  : `⚠️ ${dependency}`
              }}
            </button>
          </li></template
        >
      </ul>
      <div class="center">
        <button
          v-if="selected.length != 0"
          @click="saveDependencies(selected)"
          class="relative inline-block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-white"
        >
          <span class="material-symbols-rounded">&#xe161;</span>
        </button>
      </div>
    </div>
    <div>
      <h2>Available dependencies</h2>
      <form class="max-w-md mx-auto padding">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <span class="material-symbols-rounded none-selected">&#xe8b6;</span>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search available dependencies..."
            @input="
              (event) => (loaded_dependencies = search((event.target as HTMLInputElement).value))
            "
            required
          />
        </div>
      </form>
      <ul>
        <template v-for="dependency in returnPagedDependencies(index, index + page_size)">
          <li>
            <button @click="selected = selectDependency(dependency, selected)">
              <span v-if="checkIfSelected(selected, dependency)"
                ><span class="material-symbols-rounded">&#xf1fe;</span> {{ ' '
                }}<span class="solid">{{ getFriendlyName(dependency) }}</span></span
              >
              <span v-else
                ><span class="material-symbols-rounded">&#xe835;</span>
                {{ getFriendlyName(dependency) }}</span
              >
            </button>
          </li></template
        >
        <template v-if="returnPagedDependencies(index, index + page_size).length < page_size">
          <li
            class="padder"
            v-for="i in page_size - returnPagedDependencies(index, index + page_size).length"
            :key="i"
          >
            <button @click="">
              <span
                ><span class="material-symbols-rounded">&#xf1fe;</span> {{ ' '
                }}<span class="solid">test</span></span
              >
            </button>
          </li>
        </template>
      </ul>
      <nav class="center">
        <br />
        <p>
          Page {{ index / page_size + 1 }} of {{ Math.ceil(total_results / page_size) }} |
          {{ total_results }} dependencies
        </p>
        <ul class="inline-flex -space-x-px text-sm">
          <li>
            <button
              @click="index = 0"
              :class="{ disabled: index <= 1 }"
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg not-hyperlink"
            >
              <span class="material-symbols-rounded pager">&#xe5dc;</span>
            </button>
          </li>
          <li>
            <button
              @click="index <= 1 ? index : (index = index - page_size)"
              :class="{ disabled: index <= 1 }"
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg not-hyperlink"
            >
              <span class="material-symbols-rounded pager">&#xe5c4;</span>
            </button>
          </li>
          <li>
            <button
              @click="
                index / page_size + 1 == Math.ceil(total_results / page_size)
                  ? index
                  : (index = index + page_size)
              "
              :class="{ disabled: index / page_size + 1 == Math.ceil(total_results / page_size) }"
              class="flex items-center justify-center px-3 h-8 leading-tight not-hyperlink"
            >
              <span class="material-symbols-rounded pager">&#xe5c8;</span>
            </button>
          </li>
          <li>
            <button
              @click="goToLastPage()"
              :class="{ disabled: index / page_size + 1 == Math.ceil(total_results / page_size) }"
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg not-hyperlink"
            >
              <span class="material-symbols-rounded pager">&#xe5dd;</span>
            </button>
          </li>
        </ul>
        <div class="mt-2 rounded-md shadow-xs form-group">
          <input
            type="text"
            name="entries"
            id="entries"
            class="block w-13 p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            :value="page_size"
            @input="(event) => updatePageSize(Number((event.target as HTMLInputElement).value))"
          />
          <label style="margin-left: 0.5em">items/page</label>
        </div>
      </nav>
    </div>
  </div>
</template>

<style>
.none-selected {
  opacity: 60%;
}

.pager {
  font-size: 2em;
}

.padding {
  padding-top: 1em;
  padding-bottom: 1em;
}
</style>
