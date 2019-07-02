export default [
  {
    path: "/",
    name: "Landing",
    component: () =>
      import(/* webpackChunkName: "landing" */ "./../views/Landing.vue")
  },
  {
    path: "/app/@profile",
    name: "@profile",
    component: () =>
      import(/* webpackChunkName: "browser" */ "./../views/Browser.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/app/@home",
    name: "@home",
    component: () =>
      import(/* webpackChunkName: "browser" */ "./../views/Browser.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "./../views/Login.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "./../views/Signup.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/verify/users/:type",
    name: "verify",
    component: () =>
      import(/* webpackChunkName: "verify" */ "./../views/Verify.vue")
  },
  {
    path: "/auth",
    name: "auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "./../views/Auth.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "test" */ "./../views/Test.vue")
  },
  {
    path: "/@error",
    name: "@error",
    component: () => import( /* webpackChunkName: "error" */ "./../views/Error.vue")
  },
  {
    path: "*",
    name: "@pageNotFound",
    component: () => import(/* webpackChunkName: "error" */ "./../views/Error.vue")
  }
];
