<script setup lang="ts">
import { getCurrentYear } from '@/assets/ts/utils'
</script>

<template>
  <br />
  <hr />

  <div class="disabled button-info">
    <h6>
      <span class="material-symbols-rounded material-symbols-rounded-large icon-correction"
        >&#xe650;</span
      ><i class="title solid">Lifeline</i>
      <span class="material-symbols-rounded material-symbols-rounded-large icon-correction"
        >&#xe650;</span
      >
      is an
      <a href="https://github.com/the-wright-jamie/lifeline" target="_blank">Open Source project</a>
      <span class="material-symbols-rounded icon-faded">&#xe89e;</span>
      by <a href="https://github.com/the-wright-jamie" target="_blank">the-wright-jamie</a>
      <span class="material-symbols-rounded icon-faded">&#xe89e;</span> |
      <span class="monospace">v1.3.2</span> |
      <span class="monospace">2024 - {{ getCurrentYear() }}</span>
    </h6>
    <p>
      End of life data is made available by
      <a href="https://endoflife.date/" target="_blank">endoflife.date</a>
      <span class="material-symbols-rounded icon-faded">&#xe89e;</span>.
      <RouterLink to="/attributions">See more attributions</RouterLink>.
    </p>
    <RouterLink class="not-hyperlink" to="/thanks">Thank you</RouterLink> for utilizing my work!
  </div>
</template>
