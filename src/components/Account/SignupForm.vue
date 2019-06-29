<template>
  <div class="login">
    <div class="header">
      <h1>Create Account</h1>
      <div class="social">
        <div class="box">
          <i class="fa fa-facebook" aria-hidden="true"></i>
        </div>
        <div class="box">
          <i class="fa fa-google" aria-hidden="true"></i>
        </div>
        <div class="box">
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="body">
      <p>or use your email for registration</p>
      <form @submit.prevent="submit">
        <input v-model="username" type="text" placeholder="Username">
        <input v-model="name" type="text" placeholder="Name">
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <button class="btn-hover color">Sign Up</button>
      </form>
    </div>
    <div class="footer">
      <p>
        Already have an account?
        <a href="/login">Login</a>
      </p>
    </div>
  </div>
</template>
<script>
import { api } from "./../../app/Api";

export default {
  name: "lazy-login",
  data() {
    return {
      loading: false,
      password: "",
      username: "",
      password: "",
      name: "",
      email: ""
    };
  },
  methods: {
    submit() {
      const data = {
        realm: this.name,
        username: this.username,
        emailVerified: false,
        email: this.email,
        password: this.password
      };
      this.loading = true;
      this.$store
        .dispatch("signup", data)
        .then(result => {
          this.finalize(result);
        })
        .catch(err => {
          this.loading = false;
          api._handleError(err);
        });
    },
    finalize(response) {
      api.mediastorage.cookies.set("name", response.data.userData.name, 5000);
      api.mediastorage.cookies.set("email", response.data.userData.email, 5000);
      api.mediastorage.cookies.set("token", response.data.token, 5000);
      api.mediastorage.session.set("name", response.data.userData.name);
      api.mediastorage.session.set("email", response.data.userData.email);
      api.mediastorage.session.set("token", response.data.token);
      this.$store.state.token = response.data.token;
      this.$store.state.isUserLoggedIn = true;

      var timer = setInterval(
        function() {
          if (api.auth.loggedIn()) {
            clearInterval(timer);
            if (response.status == 200) {
              const payload = {};

              payload.action = "get";
              payload.settings = response.data.userData;

              this.$store
                .dispatch("settings", payload)
                .then(() => {
                  this.$router.push("/drive/u/0/my-drive");
                })
                .catch(err => {
                  api._handleError(err);
                });
              this.loading = false;
            }
          }
        }.bind(this),
        500
      );
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
