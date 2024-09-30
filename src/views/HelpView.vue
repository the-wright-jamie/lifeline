<template>
  <h1>Help</h1>
  <h2 id="privacy">Does <i>Lifeline</i> send any of my information to a server?</h2>
  <p>
    <i>Lifeline</i> is a <b>wholely client-side web application</b>. As such, the service does not
    store or transmit any of your information or requests to servers owned by <i>Lifelife</i>. Your
    config is stored on your browser - this means that if you uninstall your browser, move to a new
    computer, change your browser or potentially delete your cookies/reset your browser you will
    most likely lose your config. If it's important to you, make sure you back up your config by
    <span class="material-symbols-rounded">&#xE887;</span
    ><RouterLink to="/help#export-config"> exporting it</RouterLink>.
  </p>
  <br />
  <p>
    We do access the API servers of
    <a href="https://endoflife.date/" target="_blank">endoflife.date</a>
    <span class="material-symbols-rounded icon-faded">&#xe89e;</span> via your browser in order to
    get the information about the dependencies you have selected. The only information that is sent
    is the list of dependencies you have selected to track.
  </p>
  <br />
  <h2 id="export-config">How do I export my config?</h2>
  <p>
    Info on how to export <i>Lifelife</i> config, once that functionality is implemented of course
  </p>
  <br />
  <h2 id="parsing-from-eol-api">Some of the names look a little weird. Why is this?</h2>
  <p>
    Info about how <i>Lifeline</i> handles info from the API and how it's parsed and displayed to
    the user
  </p>
</template>
