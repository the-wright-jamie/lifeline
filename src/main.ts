import './assets/css/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Spinner from './components/Spinner.vue'
import AnimeSpinner from './components/AnimeSpinner.vue'
import MegaHeader from './components/MegaHeader.vue'
import Header from './components/Header.vue'
import DependencyInfo from './components/DependencyInfo.vue'

const app = createApp(App)

app
  .component('AnimeSpinner', AnimeSpinner)
  .component('Spinner', Spinner)
  .component('MegaHeader', MegaHeader)
  .component('Header', Header)
  .component('Dependency', DependencyInfo)

app.use(router)

app.mount('#app')
