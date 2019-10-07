<template>
  <div class="login">
    <div class="header">
      <h1>Welcome back!</h1>
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
      <p>We're so excited to see you again!</p>
      <form @submit.prevent="submit">
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
          <span>Forget Password ?</span>
        </div>
        <button class="btn-hover color" :disabled="loading">
          <span v-show="!loading">Login</span>
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
        Don't have an account?
        <router-link to="/signup">Sign up</router-link>
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
  name: 'lazy-login',
  data() {
    return {
      loading: false,
      password: '',
      email: '',
    };
  },
  computed: {
    Vname: function() {
      if (!this.name) return true;
      return this.$utils.regName.test(this.name);
    },
    Vemail: function() {
      if (!this.email) return true;
      return this.$utils.regEmail.test(this.email);
    },
    VmobileNumber: function() {
      if (!this.mobileNumber) return true;
      return this.$utils.regMobile.test(this.mobileNumber);
    },
  },
  methods: {
    async submit() {
      this.loading = true;
      const data = {
        email: this.email,
        password: this.password,
      };

      try {
        const user = await this.$store.dispatch('LOGIN', data);
        this.finalize(user);
      } catch (err) {
        this.loading = false;
      }
      this.loading = false;
    },
    finalize(response) {
      this.$user.auth(response.data);
      this.$store.commit(types.IS_AUTHENTICATED, true);

      if (typeof window !== 'undefined') {
        window.location.href = this.$route.query.redirect || '/app/@home';
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
