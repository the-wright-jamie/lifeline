<script setup lang="ts">
import { setTabTitle } from '@/assets/ts/utils'

function isOriginalDomain(): boolean {
  return window.location.hostname === 'the-wright-jamie.dev'
}

setTabTitle('Credits')
</script>

<template>
  <h1>Attributions & Technologies Used</h1>
  <ul>
    <li>
      <a href="https://vuejs.org/">Vue.js</a> & <a href="https://vite.dev/">Vite</a> - the framework
      and build tools used
    </li>
    <li><a href="https://bun.sh/">Bun</a> - the runtime used to run the build tools</li>
    <li>
      <a href="https://mermaid.js.org/">Mermaid.js</a> &
      <a href="https://github.com/dword-design/vue-mermaid-string">vue-mermaid-string</a> - the
      libraries providing the chart technology
    </li>
    <li><a href="https://tailwindcss.com/">Tailwind CSS</a> - the CSS framework used</li>
    <li>
      <a href="https://www.fusejs.io/">Fuse.js</a> - for providing the fuzzy search engine used in
      the dependency search screen
    </li>
    <li v-if="isOriginalDomain()">
      <a href="https://pages.github.com/">GitHub Pages</a> - for hosting this instance of Lifeline
    </li>
    <br />
    <li>
      <a href="https://endoflife.date/">endoflife.date</a> - the provider of the data used for
      Lifeline
    </li>

    <li>
      The <a href="https://docs.github.com/en/rest">GitHub</a> API - the provider of GitHub
      repository data
    </li>
  </ul>

  <AboutFooter />
</template>

<style scoped>
ul {
  list-style-type: '☞ ';
  margin-left: 1.25em;
  margin-right: 1em;
  font-size: larger;
}
</style>
