import Vue from 'vue'
import VueRouter from 'vue-router'
import AppIndex from '@/components/home/Appindex'
import Login from '@/components/Login'
import Home from '@/components/Home'
import HmsIndex from '@/components/hms/HmsIndex'
import UserIndex from '@/components/user/UserIndex'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: AppIndex
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
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
