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
