<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref } from 'vue'
import { type Config } from '../assets/ts/types'
import { ganttChartUpdate, getFriendlyName } from '@/assets/ts/utils'

const props = defineProps({
  dependencies: String,
  depJson: JSON
})

const config: Config = JSON.parse(localStorage.getItem('config') || '')
const dependencies = props.dependencies.split(',')
const depJson = props.depJson
console.log(dependencies)

function updateWidth(input: number) {
  if (isNaN(input) || input == 0 || input < 30) {
    input = 30
  }
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
  config.dashboardConfig.ganttWidth = input
  userChartWidth.value = input
  diagram.value = ganttChartUpdate(
    userChartOffset.value,
    userChartWidth.value,
    depJson,
    focusedDependency.value
  )
  localStorage.setItem('config', JSON.stringify(config))
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
  let config: Config = JSON.parse(localStorage.getItem('config') || '')
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
  localStorage.setItem('config', JSON.stringify(config))
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
  <h2>Gantt Chart</h2>
  <div class="grid auto-cols-2 grid-flow-col gap-4">
    <Menu v-if="dependencies.length > 1" as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center p-2 pr-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-white"
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
        <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">30</span>
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
</template>
