import { createRouter, createWebHistory } from 'vue-router'
import MessageMain from '../components/MessageMain.vue'
import Login from '../components/login.vue'
import Regist from '../components/regist.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

      // test
      path: '/',
      name: 'home',
      component: MessageMain
    },
    {
      path: '/Login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: '/Regist',
      name: 'Regist',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Regist
    }
  ]
})

export default router
