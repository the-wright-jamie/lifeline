<script setup lang="ts">
import { setTabTitle } from '@/assets/ts/utils';

setTabTitle("Welcome!")
</script>

<template>
  <h2 class="center">The Dependency End-of-Life Dashboard</h2>
  <h1 class="center">Welcome! 👋</h1>
  <br />
  <p>
    <i>Lifeline</i> allows you to select dependencies from
    <a href="https://endoflife.date/" target="_blank">endoflife.date</a>
    <span class="material-symbols-rounded icon-faded">&#xe89e;</span> and view important information
    about them in an all-in-one easy-to-use dashboard.
    <RouterLink to="/about">Click here</RouterLink> to learn more.
  </p>
  <main className="flex flex-col items-center justify-between p-4">
    <h1>Get Started</h1>
    <div className="mb-32 grid lg:grid-cols-1 lg:text-left">
      <RouterLink
        to="/setup"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30 not-hyperlink"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Start from scratch
          <span
            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
          >
            <span class="material-symbols-rounded">&#xe5c8;</span>
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Follow on-screen instructions to select the dependencies you wish to track
        </p>
      </RouterLink>
      <RouterLink
        to="/import"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30 not-hyperlink"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Import JSON
          <span
            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
          >
            <span class="material-symbols-rounded">&#xe5c8;</span>
          </span>
        </h2>
        <div className="m-0 max-w-[30ch] text-sm opacity-50">
          <p>
            Import a profile from a JSON file and restore a previous configuration from another
            instance of <i>Lifeline</i><br /><br />
          </p>
          <div>
            <span class="material-symbols-rounded">&#xE887;</span
            ><RouterLink to="/help#export-config" className="help-hyperlink">
              How do I export my config?
            </RouterLink>
          </div>
        </div>
      </RouterLink>
    </div>
  </main>
</template>
