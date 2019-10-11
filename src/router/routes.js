export default [
  {
    path: '/',
    name: 'Landing',
    component: () =>
      import(/* webpackChunkName: "landing" */ './../views/Landing.vue'),
  },
  {
    path: '/app/@settings',
    name: '@settings',
    component: () =>
      import(/* webpackChunkName: "settings" */ './../views/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/app/@home',
    name: '@home',
    component: () =>
      import(/* webpackChunkName: "home" */ './../views/Home.vue'),
  },
  {
    path: '/app/@watch',
    name: '@watch',
    component: () =>
      import(/* webpackChunkName: "watch" */ './../views/Watch.vue'),
  },
  {
    path: '/app/@song',
    name: '@song',
    component: () =>
      import(/* webpackChunkName: "song" */ './../views/Song.vue'),
  },
  {
    path: '/embed/:v?',
    name: 'embed',
    component: () =>
      import(/* webpackChunkName: "embed" */ './../views/Embed.vue'),
  },
  {
    path: '/app/@upload',
    name: '@upload',
    component: () =>
      import(/* webpackChunkName: "upload" */ './../views/Upload.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/app/@editvideo',
    name: '@editvideo',
    component: () =>
      import(/* webpackChunkName: "edit" */ './../views/Edit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/app/@channel/:id',
    name: '@channel',
    component: () =>
      import(/* webpackChunkName: "channel" */ './../views/Channel.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ './../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ './../views/Signup.vue')
  },
  {
    path: '/verify/users/confirm',
    name: 'verify',
    component: () =>
      import(/* webpackChunkName: "verify" */ './../views/Verify.vue'),
  },
  {
    path: '/verify/users/verified',
    name: 'verified',
    component: () =>
      import(/* webpackChunkName: "verified" */ './../views/Verified.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () =>
      import(/* webpackChunkName: "auth" */ './../views/Auth.vue'),
  },
  {
    path: '/test/:id?',
    name: 'test',
    component: () =>
      import(/* webpackChunkName: "test" */ './../views/Test.vue'),
  },
  {
    path: '/@error',
    name: '@error',
    component: () =>
      import(/* webpackChunkName: "error" */ './../views/Error.vue'),
  },
  {
    path: '*',
    name: '@pageNotFound',
    component: () =>
      import(/* webpackChunkName: "pageNotFound" */ './../views/Error.vue'),
  },
];
