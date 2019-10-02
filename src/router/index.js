import Vue from 'vue';
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

  return router;
}
