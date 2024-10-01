<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
let dropdown = ref(false)
let reset = ref(false)

function showResetModal() {
  dropdown.value = !dropdown.value
  reset.value = !reset.value
}

function resetLifeline() {
  localStorage.clear()
  router.push('/welcome')
  console.log('reload')
  location.reload()
}
</script>

<template>
  <div class="grid grid-cols-2">
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
        <h2>
          <RouterLink to="/dashboard" class="not-hyperlink"
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

.icon-correction {
  padding-bottom: 0.15em;
}

.icon {
  padding-right: 0.25em;
  font-size: 1.5em;
}
</style>
