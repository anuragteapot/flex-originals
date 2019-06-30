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
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="name" type="text" placeholder="Name" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button class="btn-hover color" :disabled="loading">
          <span v-show="!loading">Sign Up</span>
          <div v-show="loading" class="loading-dots">
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
          </div>
        </button>
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
import * as types from "./../../store/mutation-types";

export default {
  name: "lazy-signup",
  data() {
    return {
      loading: false,
      password: "",
      username: "",
      name: "",
      email: ""
    };
  },
  methods: {
    async submit() {
      this.loading = true;

      const data = {
        realm: this.name,
        username: this.username,
        emailVerified: false,
        email: this.email,
        password: this.password
      };

      try {
        const val = await this.$store.dispatch("signup", data);

        if (val.status == 200) {
          this.$store.commit(types.SHOW_SNACKBAR, {
            data: val.data.content,
            color: "success"
          });
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
