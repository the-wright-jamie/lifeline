<script setup lang="ts">
import { ref } from 'vue'
import { type Config } from '../assets/ts/types'

const config: Config = JSON.parse(localStorage.getItem('config') || '')

const showAbout = ref(config.headerConfig.showAbout)
const showHelp = ref(config.headerConfig.showHelp)
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 select-none">
    <div>
      <h1>
        <span class="material-symbols-rounded material-symbols-rounded-large icon-correction"
          >&#xe650;</span
        ><i class="title">Lifeline</i>
        <span class="material-symbols-rounded material-symbols-rounded-large icon-correction"
          >&#xe650;</span
        >
      </h1>
    </div>
    <div class="col-end-7 col-span-2">
      <div class="grid gap-6 grid-cols-2 same-line">
        <h2 v-if="showAbout">
          <RouterLink to="/about" class="not-hyperlink"
            ><span class="material-symbols-rounded material-symbols-rounded-large"
              >&#xe766;</span
            ></RouterLink
          >
        </h2>
        <h2 v-if="showHelp">
          <RouterLink to="/help" class="not-hyperlink"
            ><span class="material-symbols-rounded material-symbols-rounded-large"
              >&#xe887;</span
            ></RouterLink
          >
        </h2>
        <h2>
          <RouterLink to="/" class="not-hyperlink"
            ><span class="material-symbols-rounded material-symbols-rounded-large"
              >&#xe871;</span
            ></RouterLink
          >
        </h2>
        <h2>
          <RouterLink to="/settings" class="not-hyperlink"
            ><span class="material-symbols-rounded material-symbols-rounded-large"
              >&#xe8b8;</span
            ></RouterLink
          >
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}

.title {
  margin-left: -0.18em;
}

.material-symbols-rounded-large {
  font-size: 2rem;
}

.icon {
  padding-right: 0.25em;
  font-size: 1.5em;
}
</style>
