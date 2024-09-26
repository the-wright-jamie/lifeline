<template>
  <h1>Welcome! 👋</h1>
  <br />
  <p>
    Lifeline allows you to select dependencies from
    <a href="https://endoflife.date/">endoflife.date</a> and view important information about them
    in an all-in-one easy-to-use dashboard. <RouterLink to="/about">Click here</RouterLink> to learn more.
  </p>
  <main className="flex min-h-screen flex-col items-center justify-between p-4">
    <h1>Get Started</h1>
    <div className="mb-32 grid lg:grid-cols-1 lg:text-left">
      <RouterLink
        to="/setup/start"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 not-hyperlink"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Start from scratch
          <span
            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
          >
            →
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Follow on-screen instructions to select the dependencies you wish to track
        </p>
      </RouterLink>

      <RouterLink
        to="/setup/import"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 not-hyperlink"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Import JSON
          <span
            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
          >
            →
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Import a profile from a JSON file and restore a previous configuration, or from another
          instance of Lifeline<br /><br />
          <div>
            <span class="material-symbols-rounded">&#xE887;</span
            ><RouterLink to="/help#export-config" className="help-hyperlink vertical-center">
              How do I export my config?
            </RouterLink>
          </div>
        </p>
      </RouterLink>
    </div>
  </main>
</template>
