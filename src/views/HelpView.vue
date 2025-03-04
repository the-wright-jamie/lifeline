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
  <br />
  <h2 id="parsing-from-eol-api">
    Some of the names of dependencies look a little weird. Why is this?
  </h2>
  <p>
    <a href="https://endoflife.date/" target="_blank">endoflife.date</a>
    <span class="material-symbols-rounded icon-faded">&#xe89e;</span> provides the names of
    dependencies in <span style="font-family: monospace">a-format-like-this</span>. There is no
    option to get the 'friendly' name of the dependency from the API, and it would be untenable to
    manage a list of 'friendly' names as the data from the API is subject to change at any time (<i
      >Lifeline</i
    >
    is a side project with one developer).
  </p>
  <br />
  <p>
    So, instead, <i>Lifeline</i> has a custom 'semi-generic' function that turns '<span
      style="font-family: monospace"
      >a-format-like-this</span
    >' into 'A Format Like This' (so, replace hyphens with spaces, and capitalise each word). Next,
    <i>Lifeline</i> then handles any special names (or part of names) that it's aware of, such
    as '<span style="font-family: monospace">macos</span>' which becomes 'macOS' (os → OS) or '<span
      style="font-family: monospace"
      >pixel-proxl</span
    >' which becomes 'Pixel Pro XL' (<span style="font-family: monospace">pixel-proxl</span> → Pixel
    Proxl → Pixel Pro XL). One of the most drastic exceptions is for
    '<span style="font-family: monospace">dotnetfx</span>' which renders as '.NET Framework' (<span
      style="font-family: monospace"
      >dotnetfx</span
    >
    → Dotnetfx → .NETfx → .NET Framework). If you're interested, you can
    <a
      href="https://github.com/the-wright-jamie/lifeline/blob/main/src/assets/ts/utils.ts#L1"
      target="_blank"
      >view the list of exceptions and the logic here</a
    ><span class="material-symbols-rounded icon-faded">&#xe89e;</span> (beware - spaghetti code!)
  </p>
  <br />
  <p>
    So, to get back to the question, the answer is this: Simply, <i>Lifeline</i>'s developer hasn't
    had a chance to go through all 360+ dependencies tracked by the API provider and ensure that they
    are formatted correctly, or if they need an exception to add it (and then ensure the exception
    hasn't broken anything else). <i>Lifeline</i> currently has a list of ~150 corrections and
    exceptions, and some dependencies still don't render correctly. Most  dependencies
    have had exceptions introduced, but if you use a dependency that isn't rendering correctly you
    should raise an issue on GitHub (or, even better, provide your own exception by opening a PR).
  </p>
  <br />
  <h2 id="parsing-from-eol-api">
    <i>Lifeline</i>'s performance is poor on my machine, why?
  </h2>
  <p>
    A bit of black magic had to go into getting this to work. As mentioned in the previous section - there is a lot of cleaning up of the data that comes from the API. The data is barebones, just enough to work with, so in order for the data to display correctly there's a lot of preprocessing that needs to be done before the data is displayed (which all happens on your device, as <i>Lifeline</i> is a technically a static, single page, client-side web application). If you are struggling with long load times, it might help to reduce the amount of dependencies you are tracking. Even on an M1 MacBook Pro, tracking as many as 30 dependencies results in a small but noticeable reduction in performance, and live updates of the chart (when changing it's settings, for example), isn't as smooth as when tracking half as many projects.
  </p>
</template>
