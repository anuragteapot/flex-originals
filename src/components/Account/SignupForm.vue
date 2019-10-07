<template>
  <div class="login">
    <div class="header">
      <h1>Create Account</h1>
      <div class="social">
        <div class="box">
          <i class="fab fa-facebook-f" aria-hidden="true"></i>
        </div>
        <div class="box">
          <i class="fab fa-google" aria-hidden="true"></i>
        </div>
        <div class="box">
          <i class="fab fa-twitter" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="body">
      <p>or use your email for registration</p>
      <form @submit.prevent="submit" ref="form">
        <div class="username">
          <input
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            autofocus="autofocus"
            name="username"
            v-model="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="name">
          <input
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            autofocus="autofocus"
            name="name"
            v-model="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div class="email">
          <input
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            autofocus="autofocus"
            name="email"
            v-model="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div class="password">
          <input
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            autofocus="autofocus"
            name="password"
            v-model="password"
            type="password"
            placeholder="Password"
          />
        </div>
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
        <router-link to="/login">Login</router-link>
      </p>
      <br />
      <p>
        <router-link to="/app/@home">Cancel</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import * as types from './../../store/mutation-types';

export default {
  name: 'lazy-signup',
  data() {
    return {
      loading: false,
      password: '',
      username: '',
      name: '',
      email: '',
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
        password: this.password,
      };

      try {
        const val = await this.$store.dispatch('SIGNUP', data);

        if (val.status == 200) {
          this.$store.commit(types.SHOW_SNACKBAR, {
            data: val.data.content,
            color: 'success',
          });
          this.clear();
          this.$router.push('/login');
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
