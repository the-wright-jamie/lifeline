import './assets/css/base.css'

import { createApp } from 'vue'
import VueMermaidString from 'vue-mermaid-string'
import App from './App.vue'
import AboutFooter from './components/AboutFooter.vue'
import AnimeSpinner from './components/AnimeSpinner.vue'
import DependencyInfo from './components/DependencyInfo.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import GanttChart from './components/GanttChart.vue'
import Header from './components/Header.vue'
import ImagePlaceholder from './components/ImagePlaceholder.vue'
import MegaHeader from './components/MegaHeader.vue'
import Spinner from './components/Spinner.vue'
import router from './router'

// --- MIGRATION LOGIC ---
function migrateV1toV2(configV1: any): any {
  return {
    version: 2,
    dependencies: configV1.dependencies,
    tracked_repos: [],
    personal_access_token: null,
    dashboard_config: {
      show_latest_news: configV1.dashboardConfig.latestNews,
      show_upcoming_EOL: configV1.dashboardConfig.upcomingEOL,
      show_past_EOL: configV1.dashboardConfig.pastEOL,
      show_gantt_chart: configV1.dashboardConfig.ganttChart,
      highlight_this_month_EOL: false, // default for migration
      news_entries: configV1.dashboardConfig.newsEntries,
      gantt_width: configV1.dashboardConfig.ganttWidth ?? 30,
      gantt_max_width: configV1.dashboardConfig.ganttMaxWidth
    },
    header_config: {
      show_about_button: configV1.headerConfig.showAbout,
      show_help_button: configV1.headerConfig.showHelp
    }
  }
}

const rawConfig = localStorage.getItem('config')
if (rawConfig) {
  try {
    const parsed = JSON.parse(rawConfig)
    if (parsed.version === 1) {
      const migrated = migrateV1toV2(parsed)
      localStorage.setItem('config', JSON.stringify(migrated))
    }
  } catch (e) {
    // ignore, let app handle invalid config
  }
}
// --- END MIGRATION LOGIC ---

const app = createApp(App)

app
  .component('AnimeSpinner', AnimeSpinner)
  .component('Spinner', Spinner)
  .component('MegaHeader', MegaHeader)
  .component('AboutFooter', AboutFooter)
  .component('Header', Header)
  .component('Dependency', DependencyInfo)
  .component('ErrorMessage', ErrorMessage)
  .component('VueMermaidString', VueMermaidString)
  .component('GanttChart', GanttChart)
  .component('ImagePlaceholder', ImagePlaceholder)

app.use(router)

app.mount('#app')
