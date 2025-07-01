<script setup lang="ts">
import { setTabTitle } from '@/assets/ts/utils'
import ToggleButton from '@/components/ToggleButton.vue'
import { ref } from 'vue'
import { type ConfigV2 } from '../assets/ts/types/lifeline'

setTabTitle('Settings')

let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')

let showLatest = ref(config.dashboard_config.show_latest_news)
let showUpcoming = ref(config.dashboard_config.show_upcoming_EOL)
let showPastEOL = ref(config.dashboard_config.show_past_EOL)
let showGantt = ref(config.dashboard_config.show_gantt_chart)
let highlightThisMonthEOL = ref(config.dashboard_config.highlight_this_month_EOL)
let newsEntries = ref(config.dashboard_config.news_entries)
let ganttMaxWidth = ref(config.dashboard_config.gantt_max_width)

let disabledDashboard = ref(checkIfDashboardDisabled())

let showAbout = ref(config.header_config.show_about_button)
let showHelp = ref(config.header_config.show_help_button)

let resetting = ref(false)

let githubPAT = ref(config.personal_access_token || '')
let patSaved = ref(false)
let patWarning = ref(false)
let patShowMore = ref(false)

function updateLatest() {
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.dashboard_config.show_latest_news = !config.dashboard_config.show_latest_news
  localStorage.setItem('config', JSON.stringify(config))
  showLatest.value = !showLatest.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateUpcoming() {
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.dashboard_config.show_upcoming_EOL = !config.dashboard_config.show_upcoming_EOL
  localStorage.setItem('config', JSON.stringify(config))
  showUpcoming.value = !showUpcoming.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updatePastEOL() {
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.dashboard_config.show_past_EOL = !config.dashboard_config.show_past_EOL
  localStorage.setItem('config', JSON.stringify(config))
  showPastEOL.value = !showPastEOL.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateGantt() {
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.dashboard_config.show_gantt_chart = !config.dashboard_config.show_gantt_chart
  localStorage.setItem('config', JSON.stringify(config))
  showGantt.value = !showGantt.value
  disabledDashboard.value = checkIfDashboardDisabled()
}

function updateHighlightThisMonthEOL() {
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.dashboard_config.highlight_this_month_EOL =
    !config.dashboard_config.highlight_this_month_EOL
  localStorage.setItem('config', JSON.stringify(config))
  highlightThisMonthEOL.value = !highlightThisMonthEOL.value
}

function updateEntries(input: number) {
  if (isNaN(input) || input == 0) {
    input = 10
  }
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.dashboard_config.news_entries = input
  localStorage.setItem('config', JSON.stringify(config))
}

function updateWidth(input: number) {
  if (isNaN(input) || input == 0 || input < 30) {
    input = 30
  }
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.dashboard_config.gantt_max_width = input
  ganttMaxWidth.value = input
  localStorage.setItem('config', JSON.stringify(config))
}

function updateAbout() {
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.header_config.show_about_button = !config.header_config.show_about_button
  localStorage.setItem('config', JSON.stringify(config))
  showAbout.value = !showAbout.value
}

function updateHelp() {
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.header_config.show_help_button = !config.header_config.show_help_button
  localStorage.setItem('config', JSON.stringify(config))
  showHelp.value = !showHelp.value
}

function aboutToReset() {
  resetting.value = true
  setTimeout(function () {
    resetting.value = false
  }, 5000)
}

function resetLifeline() {
  localStorage.clear()
  location.reload()
}

function checkIfDashboardDisabled() {
  return !showLatest.value && !showUpcoming.value && !showPastEOL.value && !showGantt.value
}

function exportConfig() {
  let configStr = localStorage.getItem('config') || ''
  let config: ConfigV2 | null = null
  try {
    config = JSON.parse(configStr)
  } catch {}
  if (config && config.personal_access_token) {
    alert(
      'Warning: Your exported config contains your GitHub Personal Access Token (PAT). Do not share this file unless you have removed the PAT!'
    )
  }
  var a = document.createElement('a')
  var file = new Blob([configStr], { type: 'application/json' })
  a.href = URL.createObjectURL(file)
  a.download = 'Lifeline.json'
  a.click()
}

function updatePAT(newPAT: string) {
  let config: ConfigV2 = JSON.parse(localStorage.getItem('config') || '')
  config.personal_access_token = newPAT.trim() || null
  localStorage.setItem('config', JSON.stringify(config))
  githubPAT.value = newPAT
  patSaved.value = true
  setTimeout(() => (patSaved.value = false), 2000)
}
</script>

<template>
  <h2>Settings</h2>
  <h3>Header Preferences</h3>
  <p class="disabled">Changes may require refresh</p>
  <p>
    <button @click="updateAbout()"><ToggleButton :active="showAbout" /></button>
    Show About button
  </p>
  <p>
    <button @click="updateHelp()"><ToggleButton :active="showHelp" /></button>
    Show Help Page button
  </p>
  <br />
  <h3>Dashboard Preferences</h3>
  <p>
    <button @click="updateLatest()">
      <ToggleButton :active="showLatest" /> Show latest releases
    </button>
  </p>
  <p>
    <button @click="updateHighlightThisMonthEOL()">
      <ToggleButton :active="highlightThisMonthEOL" /> Highlight this month's EOLs
    </button>
  </p>
  <p>
    <button @click="updateUpcoming()">
      <ToggleButton :active="showUpcoming" /> Show future end-of-life dates
    </button>
  </p>
  <p>
    <button @click="updatePastEOL()">
      <ToggleButton :active="showPastEOL" /> Show past end-of-life dates
    </button>
  </p>
  <div v-if="showLatest || showUpcoming || showPastEOL">
    <p>How many news entries should <i>Lifeline</i> show?</p>
    <div class="relative mt-2 rounded-md shadow-xs">
      <input
        type="text"
        name="entries"
        id="entries"
        class="block w-24 p-2 ps-4 text-sm text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
        :value="newsEntries"
        @input="(event) => updateEntries(Number((event.target as HTMLInputElement).value))"
      />
    </div>
  </div>
  <br />
  <p>
    <button @click="updateGantt()"><ToggleButton :active="showGantt" /> Show Gantt Chart</button>
  </p>
  <div v-if="showGantt">
    <p>What should be the maximum amount of days you can see on the chart?</p>
    <div class="relative mt-2 rounded-md shadow-xs">
      <input
        type="text"
        name="entries"
        id="entries"
        class="block w-24 p-2 ps-4 text-sm text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
        :value="ganttMaxWidth"
        @input="(event) => updateWidth(Number((event.target as HTMLInputElement).value))"
      />
    </div>
    <p class="disabled button-info">
      The 'zoom' of the Gantt chart is measured in days. As such, with a max zoom of
      {{ ganttMaxWidth }}, you will be able to see at most {{ ganttMaxWidth / 2 }} days in the past
      and into the future.
    </p>
  </div>
  <p v-if="disabledDashboard" class="disabled">
    <span class="material-symbols-rounded">&#xe002;</span> Caution: you've disabled the dashboard...
  </p>

  <br />

  <h3>Other Preferences</h3>

  <div>
    <RouterLink class="not-hyperlink" to="/setup">
      <button
        class="block p-2 pr-3 text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-900 dark:border-neutral-600 dark:text-white"
      >
        <span class="material-symbols-rounded">&#xf1fe;</span> Change Tracked Dependencies
      </button>
    </RouterLink>
    <p class="disabled button-info">
      Return to the "Select Dependencies" screen to update your preferences.
    </p>
  </div>

  <br />

  <div>
    <button
      @click="exportConfig()"
      class="block p-2 pr-3 text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-900 dark:border-neutral-600 dark:text-white"
    >
      <span class="material-symbols-rounded">&#xf09b;</span> Export config
    </button>
    <p class="disabled button-info">
      Export this instance of <i>Lifeline</i>'s config to a portable JSON file that can be imported
      to other instances. This is currently the only way to back-up your configuration.
    </p>
  </div>

  <br />

  <div>
    <button
      v-if="resetting == false"
      @click="aboutToReset()"
      class="block p-2 pr-3 text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-900 dark:border-neutral-600 dark:text-white"
    >
      <span class="material-symbols-rounded">&#xf053;</span> Reset <i>Lifeline</i>
    </button>

    <button
      v-else
      @click="resetLifeline()"
      class="block p-2 pr-3 rounded-xl bg-red-500 hover:bg-red-700 dark:border-neutral-600 text-white"
    >
      <span class="material-symbols-rounded">&#xe002;</span> Are you sure?
    </button>
    <p class="disabled button-info" v-if="resetting == false">
      <i>Lifeline</i> does not store any of your data in the cloud, nor does it store any back-ups
      unless you have exported your config. Resetting <i>Lifeline</i> will delete your entire config
      and return it to its original settings. This is irreversible, be careful!
    </p>
    <h1 class="mt-3 uppercase" v-else>
      Careful: this is irreversible. Ensure you've exported your config.
    </h1>
  </div>

  <br />

  <h3>GitHub Authorisation</h3>
  <div>
    <input
      id="github-pat"
      type="password"
      class="block w-96 p-2 ps-4 text-sm text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
      :value="githubPAT"
      @input="(event) => updatePAT((event.target as HTMLInputElement).value)"
      placeholder="Paste your GitHub PAT here"
      autocomplete="off"
    />
    <div v-if="patSaved" class="mt-3">
      <span class="bg-green-600 p-2 pl-5 pr-5 rounded-xl">Changes saved!</span>
    </div>

    <br />

    <h3 class="disabled">GITHUB PAT AND AUTHORISATION DISCLAIMER</h3>
    <p class="disabled button-info">
      <span>
        <span class="text-amber-600">
          If you only need to access release data from public repositories, please
          <u>do not enter a PAT</u>
        </span>
        <span v-if="!patShowMore">. </span>
        <span v-else> as it is unnecessary for accessing API data from public repositories. </span>
        <br /><br />
        <p>
          By submitting a PAT, you confirm that you have read and understood the following
          information, including the risks associated with improperly scoped tokens and potential
          credential leakage; you also acknowledge that <i>Lifeline</i> cannot be held liable for
          any consequences arising from your actions.
          <span v-if="!patShowMore">If you do not understand this, please continue reading.</span>
        </p>
      </span>
    </p>
    <div class="disabled button-info" v-if="patShowMore">
      <h2>If in doubt, do not submit a PAT.</h2>
      If you do wish to continue please ensure that your token is appropriately scoped, avoiding
      excessive permissions. It is recommended to use a Personal Access Token (PAT) with the
      <span class="monospace">repo</span> scope to access private repositories and releases. This
      token is stored exclusively in your browser's local storage and is used solely to access the
      GitHub API for fetching release data. It is neither transmitted to any external server nor
      utilized by any other instance of <i>Lifeline</i>.<br /><br />
      <i>Lifeline</i>, GitHub, or Microsoft will never request your GitHub PAT via email, text,
      phone call, or any other form of communication. Any such request is a phishing attempt. Cease
      communication with the sender immediately and report the incident to GitHub or Microsoft.<br /><br />
      This token is stored in plain text within your browser's local storage. While this should not
      pose a significant risk, as it is accessible only to this web application, vulnerabilities in
      your browser's security could expose the app's memory to other websites. It is strongly
      advised to use a widely trusted, frequently updated web browser. <i>Lifeline</i> does not
      endorse any specific browser. If you choose to use a PAT, it is recommended to create a
      <b>low-privilege token</b> with only the necessary scopes for accessing the repositories you
      wish to track. Additionally, if you export your configuration, the PAT will be included in the
      export as plain text. <i>Lifeline</i> will notify you of this before proceeding with the
      export.<br /><br />
      Credential leakage, especially involving improperly scoped tokens, can have severe
      consequences. Unauthorized access to your repositories could result in data breaches, exposure
      of sensitive information, or malicious actions such as code tampering or deletion. Always
      ensure your tokens are scoped with the minimum permissions necessary to perform the required
      tasks. Regularly review and revoke unused tokens to minimize risks. Never, ever, share your
      tokens with anyone. The PAT is kept in the exported configuration for your convenience, but if
      you intend to share your config remove the token from the contents of the file. Treat your
      token as if it were a password.<br /><br />
      A reminder: by submitting a PAT, you confirm that you have read and understood the information
      provided, including the risks associated with improperly scoped tokens and potential
      credential leakage; you also acknowledge that <i>Lifeline</i> cannot be held liable for any
      consequences arising from your actions.
    </div>
    <br />
    <div>
      <button
        @click="patShowMore = !patShowMore"
        class="block p-1 pr-2.5 pl-2 pt-1.5 text-neutral-900 border border-neutral-300 rounded-xl bg-neutral-50 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-900 dark:border-neutral-600 dark:text-white"
      >
        <span class="material-symbols-rounded pr-1.5">{{
          patShowMore ? '&#xea19;' : '&#xf53c;'
        }}</span>
        {{ patShowMore ? 'Dismiss' : 'Read more' }}
      </button>
    </div>
  </div>

  <AboutFooter />
</template>

<style>
.big {
  font-size: 32px;
}

.button-info {
  padding-top: 0.75em;
}

h6 {
  font-size: 1rem;
}

.title {
  margin-left: -0.18em;
}

.material-symbols-rounded-large {
  font-size: 1rem;
}

.icon {
  padding-right: 0.25em;
  font-size: 1.5em;
}
</style>
