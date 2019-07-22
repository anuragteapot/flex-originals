import Vue from 'vue'
import Router from 'vue-router'
import Routers from './routers/routers'
import { api } from './app/Api'
import store from './store/store'
import * as types from './store/mutation-types'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: Routers
})

router.beforeEach(async (to, from, next) => {
  if (to.name) {
    store.commit(types.SET_IS_LOADING, true)
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!(await api.isLogged())) {
      if (to.name != 'login' && to.name != 'signup') {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    } else if (to.name == 'login' || to.name == 'signup') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  store.commit(types.SET_IS_LOADING, false)
})

export default router
