import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import WizardView from '../views/WizardView.vue'
import ImportView from '../views/ImportView.vue'
import AboutView from '../views/AboutView.vue'
import HelpView from '../views/HelpView.vue'

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
      path: '/setup/start',
      name: 'wizard',
      component: WizardView
    },
    {
      path: '/setup/import',
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isSetupComplete = localStorage.getItem('config')

  if (
    to.name !== 'welcome' &&
    to.name !== 'wizard' &&
    to.name !== 'import' &&
    to.name !== 'about' &&
    to.name !== 'help' &&
    !isSetupComplete
  ) {
    next({ name: 'welcome' })
  } else {
    next()
  }
})

export default router
