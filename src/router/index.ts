import { createRouter, createWebHistory } from 'vue-router'
import MessageMain from '../components/MessageMain.vue'
import Login from '../components/login.vue'
import Regist from '../components/regist.vue'
import MessageList from '../components/MessageList.vue'
import MessageList_index from '../components/MessageList_index.vue'
import ListDetail from '../components/listDetail.vue'
import PersonInfo from '../components/personInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // test go to
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
    },
    {
      path: '/MessageList',
      name: 'list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MessageList,
      children: [
        {
          path: 'MessageList_index',
          name: 'MessageList_index',
          component: MessageList_index
        }
      ]
    },
    {
      path: '/ListDetail',
      name: 'ListDetail',
      component: ListDetail
    },
    {
      path: '/PersonInfo',
      name: 'PersonInfo',
      component: PersonInfo
    }
  ]
})

export default router
