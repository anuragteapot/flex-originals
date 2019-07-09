export default [
  {
    path: "/",
    name: "Landing",
    component: () =>
      import(/* webpackChunkName: "landing" */ "./../views/Landing.vue")
  },
  {
    path: "/app/@settings",
    name: "@settings",
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
    path: "/app/@watch",
    name: "@watch",
    component: () =>
      import(/* webpackChunkName: "browser" */ "./../views/Browser.vue")
  },
  {
    path: "/app/@song",
    name: "@song",
    component: () =>
      import(/* webpackChunkName: "browser" */ "./../views/Browser.vue")
  },
  {
    path: "/app/@upload",
    name: "@upload",
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
    path: "/verify/users/confirm",
    name: "verify",
    component: () =>
      import(/* webpackChunkName: "verify" */ "./../views/Verify.vue")
  },
  {
    path: "/verify/users/verified",
    name: "verified",
    component: () =>
      import(/* webpackChunkName: "verified" */ "./../views/Verified.vue")
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
    component: () =>
      import(/* webpackChunkName: "test" */ "./../views/Test.vue")
  },
  {
    path: "/@error",
    name: "@error",
    component: () =>
      import(/* webpackChunkName: "error" */ "./../views/Error.vue")
  },
  {
    path: "*",
    name: "@pageNotFound",
    component: () =>
      import(/* webpackChunkName: "error" */ "./../views/Error.vue")
  }
];
