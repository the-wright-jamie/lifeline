import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OobeView from '@/views/OobeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/setup',
      name: 'Setup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/OobeView.vue')
    }
  ]
})

// Navigation guard to check for setup completion
router.beforeEach((to, from, next) => {
  const isSetupComplete = localStorage.getItem('config');

  // If setup is not complete and the user is not already on the setup route, redirect to the setup page
  if (!isSetupComplete && to.name !== 'Setup') {
    next({ name: 'Setup' });
  } else {
    next();
  }
});

export default router
