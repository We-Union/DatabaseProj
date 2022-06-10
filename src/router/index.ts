import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'welcome',
    component: () => import("@/views/Welcome.vue"),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/reward',
    name: 'reward',
    component: () => import('@/views/Reward.vue')
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/views/Resume.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
