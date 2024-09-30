<script setup lang="ts">
import { dependencyTitleCase } from '@/assets/ts/utils';
const props = defineProps({
  dependency: String
})

function toLocalDate(date: String) {
  var date = new Date(date).toLocaleDateString(navigator.language)
  return date
}

async function getData(url: String) {
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

let dependency_info = await getData(`https://endoflife.date/api/${props.dependency}.json`)
let eolLink = `https://endoflife.date/${props.dependency}`
</script>

<template>
  <h1>
    <a :href="eolLink" class="not-hyperlink">{{ dependencyTitleCase(dependency) }}</a>
  </h1>
  <table class="table-auto">
    <thead>
      <tr>
        <th>Latest Release</th>
        <th>Release Date</th>
        <th v-if="dependency_info[0].eol">End-of-life</th>
        <th v-if="dependency_info[0].latest">Latest</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ dependency_info[0].cycle }}</td>
        <td>{{ toLocalDate(dependency_info[0].releaseDate) }}</td>
        <td v-if="dependency_info[0].eol">{{ toLocalDate(dependency_info[0].eol) }}</td>
        <td v-if="dependency_info[0].latest">v{{ dependency_info[0].latest }}</td>
      </tr>
    </tbody>
  </table>
</template>
