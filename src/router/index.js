import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: { name: 'planet', params: { name: 'earth' } },
    },
    {
      path: '/planet/:name',
      name: 'planet',
      // route level code-splitting
      // this generates a separate chunk (PlanetINfo.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlanetInfo.vue'),
      props: true
    },
  ],
})

export default router
