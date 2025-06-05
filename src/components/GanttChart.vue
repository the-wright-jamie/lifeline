<script setup lang="ts">
import { ganttChartUpdate, getFriendlyName } from '@/assets/ts/utils'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref } from 'vue'
import { type ConfigV1 } from '../assets/ts/types/lifeline'

// @ts-ignore
const props = defineProps({
  dependencies: String,
  depJson: JSON
})

let config: ConfigV1 = JSON.parse(localStorage.getItem('config') || null)
let configNotFound = false
if (config == null) {
  configNotFound = true
  // create fake config if it doesn't exist
  config = {
    version: 1,
    dashboardConfig: {
      ganttWidth: 365,
      ganttMaxWidth: 730,
      ganttChart: true,
      latestNews: true,
      upcomingEOL: true,
      pastEOL: true,
      newsEntries: 10
    },
    headerConfig: {
      showAbout: true,
      showHelp: true
    },
    dependencies: []
  }
}
const dependencies = props.dependencies.split(',')
const depJson = props.depJson

function updateWidth(input: number) {
  if (isNaN(input) || input == 0 || input < 30) {
    input = 30
  }
  //let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.ganttWidth = input
  userChartWidth.value = input
  diagram.value = ganttChartUpdate(
    userChartOffset.value,
    userChartWidth.value,
    depJson,
    focusedDependency.value
  )
  if (!configNotFound) localStorage.setItem('config', JSON.stringify(config))
}

function updateOffset(input: number) {
  userChartOffset.value = input
  diagram.value = ganttChartUpdate(
    userChartOffset.value,
    userChartWidth.value,
    depJson,
    focusedDependency.value
  )
}

function setFocusedDependency(dependency: string) {
  focusedDependency.value = dependency
  diagram.value = ganttChartUpdate(
    userChartOffset.value,
    userChartWidth.value,
    depJson,
    focusedDependency.value
  )
}

function resetSliders() {
  // let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.ganttWidth = config.dashboardConfig.ganttMaxWidth / 2
  userChartWidth.value = config.dashboardConfig.ganttMaxWidth / 2
  userChartOffset.value = 0
  focusedDependency.value = 'all'
  diagram.value = ganttChartUpdate(
    userChartOffset.value,
    userChartWidth.value,
    depJson,
    focusedDependency.value
  )
  if (!configNotFound) localStorage.setItem('config', JSON.stringify(config))
}

// set the max width of the chart in days
const userChartMaxWidth = ref(config.dashboardConfig.ganttMaxWidth)
// set the width of the chart in days
const userChartWidth = ref(config.dashboardConfig.ganttWidth)
const userChartOffset = ref(0)
const focusedDependency = ref('all')
let diagram = ref('')

diagram.value = ganttChartUpdate(
  userChartOffset.value,
  userChartWidth.value,
  depJson,
  focusedDependency.value
)
</script>

<template>
  <h2 class="select-none">Gantt Chart</h2>
  <div class="grid auto-cols-2 grid-flow-col gap-4 select-none">
    <Menu v-if="dependencies.length > 1" as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center p-2 pr-3 text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-900 dark:border-neutral-600 dark:text-white"
        >
          Showing: {{ getFriendlyName(focusedDependency) }}
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
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-neutral-900 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
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
                {{ getFriendlyName(dependency) }}
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
      class="relative inline-block p-2 pr-3 text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-900 dark:border-neutral-600 dark:text-white"
    >
      Reset Chart
    </button>
  </div>

  <!-- TODO: fix header background -->
  <div class="stickyHeader select-none">
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
          class="w-full h-2 bg-neutral-200 rounded-xl appearance-none cursor-pointer dark:bg-neutral-700 accent-neutral-600 dark:accent-white"
          @input="(event) => updateWidth(Number((event.target as HTMLInputElement).value))"
        />
        <span class="text-sm text-neutral-500 dark:text-neutral-400 absolute start-0 -bottom-6"
          >30</span
        >
        <span class="text-sm text-neutral-500 dark:text-neutral-400 absolute end-0 -bottom-6">{{
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
          class="w-full h-2 bg-neutral-200 rounded-xl appearance-none cursor-pointer dark:bg-neutral-700 accent-neutral-600 dark:accent-white"
          @input="(event) => updateOffset(Number((event.target as HTMLInputElement).value))"
        />
        <span class="text-sm text-neutral-500 dark:text-neutral-400 absolute start-0 -bottom-6">{{
          userChartMaxWidth / 2
        }}</span>
        <span class="text-sm text-neutral-500 dark:text-neutral-400 absolute end-0 -bottom-6">{{
          -userChartMaxWidth / 2
        }}</span>
      </div>
    </div>
    <br />
  </div>
  <vue-mermaid-string :value="diagram" class="select-none" />
  <div class="select-none" v-if="configNotFound">
    <div class="grid gap-4 grid-flow-col">
      <div>
        <span class="material-symbols-rounded">&#xe88e;</span>
      </div>
      <div>
        <p class="info-title">Want to be able to seek further back or forward?</p>
        <br />
        <p>
          You'll need to create a configuration by
          <RouterLink to="/">completing the setup wizard</RouterLink>, and then you'll be able to
          set the zoom of the Gantt chart to your liking from the settings. No signup or login
          required!
        </p>
      </div>
    </div>
  </div>
</template>
