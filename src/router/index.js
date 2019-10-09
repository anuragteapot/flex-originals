import Vue from 'vue';
import AXIOS_API from './../api/axios';
import Nprogress from './../api/nprogress';
import Router from 'vue-router';
import Meta from 'vue-meta';
import routes from './routes';

Vue.use(Router);
Vue.use(Meta);

export default function createRouter() {
  const router = new Router({
    mode: 'history',
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    if (typeof document != 'undefined') {
      Nprogress.start();
    }

    if (
      to.matched.some(
        record => record.meta.requiresAuth && typeof window != 'undefined',
      )
    ) {
      const userId = window.localStorage.getItem('$userId');
      try {
        await AXIOS_API.get(`/api/users/${userId}`);
        next();
      } catch (err) {
        window.localStorage.removeItem('$accessToken');
        window.localStorage.removeItem('$userId');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('userInfo');
        window.localStorage.removeItem('created');
        window.localStorage.removeItem('ttl');
        next({
          path: '/login',
          query: {
            redirect: to.fullPath,
          },
        });
      }
    } else {
      next();
    }
  });

  router.afterEach(() => {
    if (typeof document != 'undefined') {
      Nprogress.done();
    }
  });

  return router;
}
