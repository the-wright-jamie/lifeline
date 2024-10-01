import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import WizardView from '../views/WizardView.vue'
import ImportView from '../views/ImportView.vue'
import AboutView from '../views/AboutView.vue'
import HelpView from '../views/HelpView.vue'
import DashboardView from '@/views/DashboardView.vue'
import Settings from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/setup',
      name: 'wizard',
      component: WizardView
    },
    {
      path: '/import',
      name: 'import',
      component: ImportView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isSetupComplete = localStorage.getItem('config')

  if (to.name === 'dashboard' && to.name === "settings" && !isSetupComplete) {
    console.log('not set up yet, going to welcome page')
    next({ name: 'welcome' })
  }
  if (to.name == 'welcome' && isSetupComplete) {
    console.log("set up, don't let them see welcome page")
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
