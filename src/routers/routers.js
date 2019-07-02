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
      import(/* webpackChunkName: "Browser" */ "./../views/Browser.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/app/@home",
    name: "@home",
    component: () =>
      import(/* webpackChunkName: "Browser" */ "./../views/Browser.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "./../views/Login.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "Signup" */ "./../views/Signup.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/verify/users/:type",
    name: "verify",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "./../views/Verify.vue")
  },
  {
    path: "/auth",
    name: "auth",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "./../views/Auth.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("./../views/Test.vue")
  },
  {
    path: "/@error",
    name: "@error",
    component: () => import("./../views/Error.vue")
  },
  {
    path: "*",
    name: "@pageNotFound",
    component: () => import("./../views/Error.vue")
  }
];
