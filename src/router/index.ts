import PathNotFound from '@/components/PathNotFound.vue'
import DashboardView from '@/views/DashboardView.vue'
import DependencyView from '@/views/DependencyView.vue'
import Settings from '@/views/SettingsView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import AttributionsView from '../views/AttributionsView.vue'
import HelpView from '../views/HelpView.vue'
import SetupView from '../views/SetupView.vue'
import ThanksView from '../views/ThanksView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import ImportView from '../views/ImportView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/thanks',
      name: 'thanks',
      component: ThanksView
    },
    {
      path: '/attributions',
      name: 'attributions',
      component: AttributionsView
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/dependency/:dependency',
      name: 'dependency',
      component: DependencyView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'fourohfour',
      component: PathNotFound
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
