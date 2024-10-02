import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import SetupView from '../views/SetupView.vue'
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
      name: 'setup',
      component: SetupView
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

  if (
    !isSetupComplete &&
    to.name !== 'welcome' &&
    to.name !== 'setup' &&
    to.name !== 'help' &&
    to.name !== 'about' &&
    to.name !== 'import'
  ) {
    next({ name: 'welcome' })
  } else if (to.name == 'welcome' && isSetupComplete) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
