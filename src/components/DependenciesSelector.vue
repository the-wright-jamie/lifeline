<script setup lang="ts">
import { ref } from 'vue'
import Fuse from 'fuse.js'
import { dependencyTitleCase } from '@/assets/ts/utils'

function selectDependency(dependency: String, dependencies: String[]) {
  const found = dependencies.indexOf(dependency)

  if (found < 0) {
    dependencies.push(dependency)
  } else {
    dependencies.splice(found, 1)
  }

  return dependencies
}

function saveDependencies(dependencies: String[]) {
  let config = {
    version: '1',
    dependencies: [],
    dashboardConfig: {
      latestNews: true
    }
  }

  dependencies.forEach((dependency) => {
    config.dependencies.push(dependency)
  })

  localStorage.setItem('config', JSON.stringify(config))
}

function search(search: String) {
  search_results = fuse.search(search).map((result) => result.item)
  if (search_results.length == 0) {
    total_results = dependencies.length
    return dependencies
  } else {
    total_results = search_results.length
    return search_results
  }
}

async function getData(url: String) {
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

let dependencies = await getData('https://endoflife.date/api/all.json')
const fuse = new Fuse(dependencies)

let index = ref(0)
let index_memory = 0
let page_size = ref(9)
let selected = ref([])
let search_text = ref('')
let search_results = ref([])

let loaded_dependencies = ref(dependencies)
let total_results = ref(dependencies.length)
</script>

<template>
  <h1>Please select the dependencies you want to track</h1>
  <br />
  <hr />
  <br />
  <div class="grid grid-cols-2">
    <div>
      <h2>Selected dependencies</h2>
      <p class="none-selected" v-if="selected.length == 0">None selected</p>
      <ul v-else>
        <template v-for="dependency in selected"
          ><li>{{ dependencyTitleCase(dependency) }}</li></template
        >
      </ul>
      <div class="center">
        <button
          v-if="selected.length == 0"
          class="bg-slate-600 text-gray-300 dark:bg-gray-300 dark:text-gray-500 py-2 px-4 rounded-full no-click"
        >
          Continue
        </button>
        <button
          v-else
          @click="saveDependencies(selected)"
          class="bg-black hover:bg-gray-600 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black py-2 px-4 rounded-full"
        >
          Continue
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
            @input="(event) => (loaded_dependencies = search(event.target.value))"
            required
          />
        </div>
      </form>
      <ul>
        <template v-for="dependency in loaded_dependencies.slice(index, index + page_size)">
          <li>
            <button @click="selected = selectDependency(dependency, selected)">
              <span v-if="selected.indexOf(dependency) > -1"
                ><span class="material-symbols-rounded">&#xf1fe;</span> {{ ' '
                }}<span class="solid">{{ dependencyTitleCase(dependency) }}</span></span
              >
              <span v-else
                ><span class="material-symbols-rounded">&#xe835;</span>
                {{ dependencyTitleCase(dependency) }}</span
              >
            </button>
          </li></template
        >
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
              @click="index = total_results - page_size"
              :class="{ disabled: index / page_size + 1 == Math.ceil(total_results / page_size) }"
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg not-hyperlink"
            >
              <span class="material-symbols-rounded pager">&#xe5dd;</span>
            </button>
          </li>
        </ul>
      </nav>
      <p class="disabled">
        Due to how <i>Lifeline</i> parse results from
        <a href="https://endoflife.date/" target="_blank">endoflife.date</a>
        <span class="material-symbols-rounded icon-faded">&#xe89e;</span>, some of the name might
        not look correct. We are working on adding as many exceptions to our parser as possible to
        improve this experience. <span class="material-symbols-rounded">&#xE887;</span
        ><RouterLink to="/help#parsing-from-eol-api"> Learn more here. </RouterLink>
      </p>
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
