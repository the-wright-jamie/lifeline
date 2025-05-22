<template>
  <h1>Help</h1>
  <h2>Does <i>Lifeline</i> work on mobile?</h2>
  <p>
    You're welcome to try, however <i>Lifeline</i> is not designed for nor tested on mobile devices.
    It is primarily designed to be used on larger screens.
  </p>
  <br />
  <h2 id="privacy">Does <i>Lifeline</i> send any of my information to a server?</h2>
  <p>
    <i>Lifeline</i> is a <b>wholely client-side web application</b>. As such, the service
    <b
      >does not store or transmit any of your information or requests to servers owned by
      <i>Lifelife</i></b
    >. Your <b>config is stored on your browser</b> - this means that if you uninstall your browser,
    move to a new computer, change your browser or potentially delete your cookies/reset your
    browser you will most likely lose your config. If it's important to you,
    <b>make sure you back up your config</b> by
    <span class="material-symbols-rounded">&#xE887;</span
    ><RouterLink to="/help#export-config"> exporting it</RouterLink>.
  </p>
  <br />
  <p>
    <b
      ><i>Lifeline</i> does access the API servers of
      <a href="https://endoflife.date/" target="_blank">endoflife.date</a>
      <span class="material-symbols-rounded icon-faded">&#xe89e;</span> via your browser</b
    >
    in order to get the information about the dependencies you have selected. The only information
    that is sent is the list of dependencies you have selected to track.
  </p>
  <br />
  <h2 id="export-config">How do I export my config?</h2>
  <p>
    <b>Exporting your configuration is simple!</b> All you need to do is go to the settings page,
    and scroll down to the bottom. The export function will be at the second last option on the
    page.
  </p>
  <br />
  <h2 id="import-config">How do I import my config, then?</h2>
  <p>
    <b>Importing your configuration is just as easy!</b> You'll need to be on a 'fresh' instance of
    Lifeline - so that could be another browser (or another user account on your browser or
    computer), another device, or even the same setup you're reading this from now! If you need to
    reset <i>Lifeline</i> on this instance and start again, read the next question.
  </p>
  <br />
  <p>
    Once you are back to 'square one', you'll see an option to import your configuration on the
    "out-of-box experience" (OOBE) page. It's the option below "Get Started".
  </p>
  <br />
  <h2 id="resetting">How do I reset <i>Lifeline</i>?</h2>
  <p>
    <b>You can easily reset <i>Lifeline</i> from the settings menu!</b> All you need to do is scroll
    down to the bottom. The reset function will be at the bottom of the page.
  </p>
  <br />
  <p>
    You will need to click the button twice to ensure that this is what you want to do, as
    <b>this operation is destructive</b> (as in it destroys your current configuration)
    <b>and irreversible</b>.
  </p>
</template>
