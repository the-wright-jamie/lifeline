<script setup lang="ts">
import { RouterView } from 'vue-router'

const isSetupComplete = localStorage.getItem('config')
</script>

<template>
  <MegaHeader v-if="!isSetupComplete" />
  <Header v-if="isSetupComplete" />
  <RouterView :key="$route.fullPath" />
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
