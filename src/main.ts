import './assets/css/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Spinner from './components/Spinner.vue'
import MegaHeader from './components/MegaHeader.vue'
import Header from './components/Header.vue'

const app = createApp(App)

app.component('Spinner', Spinner).component('MegaHeader', MegaHeader).component('Header', Header)

app.use(router)

app.mount('#app')
