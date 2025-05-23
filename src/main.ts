import './assets/css/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Spinner from './components/Spinner.vue'
import AnimeSpinner from './components/AnimeSpinner.vue'
import MegaHeader from './components/MegaHeader.vue'
import AboutFooter from './components/AboutFooter.vue'
import Header from './components/Header.vue'
import DependencyInfo from './components/DependencyInfo.vue'
import ToggleButton from './components/ToggleButton.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import VueMermaidString from 'vue-mermaid-string'
import GanttChart from './components/GanttChart.vue'

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

app.use(router)

app.mount('#app')
