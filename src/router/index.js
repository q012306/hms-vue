import Vue from 'vue'
import VueRouter from 'vue-router'
import AppIndex from '@/components/home/Appindex'
import Login from '@/components/Login'
import Home from '@/components/Home'
import HmsIndex from '@/components/hms/HmsIndex'
import UserIndex from '@/components/user/UserIndex'
import Errorpage from '@/components/Errorpage'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: AppIndex,
      meta: {
          requireAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex
        },
        {
          path: '/hms',
          name: 'Hms',
          component: HmsIndex
        },
        {
          path: '/user',
          name: 'UserIndex',
          component: UserIndex
        }
      ],
      meta: {
          requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/error',
      name: 'Errorpage',
      component: Errorpage
    },
    {
      path: "*",
      redirect: "/error"
    }
  ]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
