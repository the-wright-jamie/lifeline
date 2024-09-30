<script setup lang="ts">
import { ref } from 'vue'
let dropdown = ref(false)
let reset = ref(false)

function showResetModal() {
  dropdown = !dropdown
  reset = !reset
}
</script>

<template>
  <div class="grid grid-cols-2">
    <div>
      <h1>
        <span class="material-symbols-rounded material-symbols-rounded-large">&#xe650;</span
        ><i>Lifeline</i>
        <span class="material-symbols-rounded material-symbols-rounded-large">&#xe650;</span>
      </h1>
    </div>
    <div class="col-end-7 col-span-2">
      <div class="grid gap-6 grid-cols-2 same-line">
        <h2>
          <RouterLink to="/dashboard" class="not-hyperlink">Dashboard</RouterLink>
        </h2>
        <div class="relative inline-block text-left">
          <div>
            <button @click="dropdown = !dropdown">
              <h2>
                Settings<span class="material-symbols-rounded material-symbols-rounded-large">{{
                  dropdown ? '&#xe5c5;' : '&#xe5df;'
                }}</span>
              </h2>
            </button>
          </div>
          <div
            class="absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 dark:divide-gray-600 rounded-md bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
            :class="dropdown ? '' : 'hidden'"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-white not-hyperlink"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
                ><span class="material-symbols-rounded icon">&#xe6b8;</span> Export config</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-white not-hyperlink"
                role="menuitem"
                tabindex="-1"
                id="menu-item-1"
                @click="reset = !reset"
                ><span class="material-symbols-rounded icon">&#xf053;</span> Reset
                <i>Lifeline</i></a
              >
            </div>
            <div class="py-1" role="none">
              <RouterLink
                to="/about"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-white not-hyperlink"
                role="menuitem"
                tabindex="-1"
                id="menu-item-4"
                ><span class="material-symbols-rounded icon">&#xe766;</span> About</RouterLink
              >
              <RouterLink
                to="/help"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-white not-hyperlink"
                role="menuitem"
                tabindex="-1"
                id="menu-item-5"
                ><span class="material-symbols-rounded icon">&#xE887;</span> Help</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <div
    :class="reset ? '' : 'hidden'"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-300 sm:mx-0 sm:h-10 sm:w-10"
              >
                <span class="text-red-600 material-symbols-rounded">&#xe645;</span>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h2 class="text-gray-900 dark:text-white">Reset Lifeline?</h2>
                <div class="mt-2">
                  <p class="text-gray-500 dark:text-gray-300">
                    Are you sure you want to reset? All of your configuration will be permanently
                    erased. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Reset
            </button>
            <button
              type="button"
              @click="reset = !reset"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}

.material-symbols-rounded-large {
  font-size: 2rem;
  padding-left: 0.1em;
}

.icon {
  padding-right: 0.25em;
  font-size: 1.5em;
}
</style>
