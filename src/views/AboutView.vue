<script setup lang="ts">
import { setTabTitle } from '@/assets/ts/utils'

const isSetupComplete = localStorage.getItem('config')

setTabTitle('About')
</script>

<template>
  <MegaHeader v-if="isSetupComplete" />
  <h2 class="center">The Dependency End-of-Life Dashboard</h2>
  <div class="center" v-if="!isSetupComplete">
    <h1>Welcome! 👋</h1>
    <br />
    <button
      class="bg-black hover:bg-neutral-600 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-black py-2 px-4 rounded-full"
      @click="$router.go(-1)"
    >
      <span class="material-symbols-rounded">&#xe5c4;</span> Go Back
    </button>
    <br /><br />
  </div>
  <p>
    <i>Lifeline</i> allows you to select dependencies from
    <a href="https://endoflife.date/" target="_blank">endoflife.date</a>
    <span class="material-symbols-rounded icon-faded">&#xe89e;</span> and view important information
    about them in an all-in-one easy-to-use dashboard. You can view the latest releases, upcoming
    end-of-life dates as well as recently passed ones, and also get a visual representation of this
    data in a configurable Gantt chart.
  </p>
  <br />
  <p>
    There's not much more to <i>Lifeline</i> currently and all features that were initially planned
    have been implemented, but there are more stretch goal features planned. You can suggest new
    features too using
    <a href="https://github.com/the-wright-jamie/lifeline/issues" target="_blank"
      >the project's Issues tab</a
    ><span class="material-symbols-rounded icon-faded">&#xe89e;</span>. on GitHub. There is a plan
    to further flesh out this project, but currently it serves the purpose it's creator intended it
    to serve so these improvements may be a little further in the future.
  </p>
  <br />
  <p>
    <i>Lifeline</i> was initially created to make it easier to be aware of new release for key
    dependencies, and the awesome work of the people over at
    <a href="https://endoflife.date/" target="_blank">endoflife.date</a>
    <span class="material-symbols-rounded icon-faded">&#xe89e;</span> make this possible by making
    their data available as an API.
  </p>
  <br />
  <p>
    I - the developer - hope you make <i>Lifeline</i> a part of your toolchain, and that I've made
    it as intuitive as possible for you. However, always feel free to submit issues and requests to
    the GitHub page. And if it helps you out, please let me know how it has!
  </p>
  <AboutFooter />
</template>
