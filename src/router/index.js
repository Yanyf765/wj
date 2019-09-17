import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import AppIndex from '@/components/home/AppIndex'
import JotterIndex from '@/components/jotter/JotterIndex'
import Editor from '@/components/jotter/Editor'
import LibraryIndex from '@/components/library/LibraryIndex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/jotter',
          name: 'JotterIndex',
          component: JotterIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/editor',
          name: 'Editor',
          component: Editor,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
