<script setup lang="ts">
import { getCurrentYear } from '@/assets/ts/utils'
// @ts-ignore
const APP_VERSION = import.meta.env.VITE_APP_VERSION
</script>

<template>
  <br />
  <hr />

  <div class="disabled button-info">
    <h6 class="monospace">
      <span class="material-symbols-rounded material-symbols-rounded-large icon-correction"
        >&#xe650;</span
      ><i class="title solid">Lifeline</i>
      <span class="material-symbols-rounded material-symbols-rounded-large icon-correction"
        >&#xe650;</span
      >
      v{{ APP_VERSION }} <span class="text-sm">2024-{{ getCurrentYear() }}</span>
    </h6>
    <div>
      <p class="pt-1">
        This is an
        <a href="https://github.com/the-wright-jamie/lifeline" target="_blank">open source</a>
        project with an AGPL-3.0 license; contributions are welcome.
      </p>
      <p>
        Dependency end-of-life data is made available by
        <a href="https://endoflife.date/" target="_blank">endoflife.date</a>.
        <RouterLink to="/attributions">See more attributions</RouterLink>.
      </p>
    </div>
  </div>
</template>
