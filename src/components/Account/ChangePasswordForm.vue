<template>
  <div class="login">
    <div class="header">
      <h1 v-if="!resetDone">Let's recover your account</h1>
      <h1 v-else>Your password has been successfully reset.</h1>
    </div>
    <div v-if="!resetDone" class="body">
      <p>Please enter your new password</p>
      <form @submit.prevent="submit" ref="form">
        <div class="email">
          <input
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            autofocus="autofocus"
            name="newPassword"
            v-model="newPassword"
            type="password"
            placeholder="New password"
          />
        </div>
        <div
          :class="
            `password ${newPassword != repeatPassword ? 'form-error' : ''}`
          "
        >
          <input
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            autofocus="autofocus"
            name="password"
            v-model="repeatPassword"
            type="password"
            placeholder="Repeat New Password"
          />
        </div>
        <button
          v-if="!resetDone"
          class="btn-hover color"
          :disabled="loading || newPassword != repeatPassword"
        >
          <span v-show="!loading">Reset</span>
          <div v-show="loading" class="loading-dots">
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
          </div>
        </button>
        <router-link v-else to="/login">
          <button class="btn-hover color">
            Go back to Login
          </button>
        </router-link>
      </form>
    </div>
    <div class="footer">
      <p>
        <router-link to="/login">Go back to login</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import * as types from './../../store/mutation-types';

export default {
  name: 'request-password-form',
  data() {
    return {
      resetDone: false,
      loading: false,
      access_token: '',
      email: '',
      repeatPassword: '',
      newPassword: '',
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      const data = {
        newPassword: this.newPassword,
        token: this.access_token,
        email: this.email,
      };

      try {
        const res = await this.$store.dispatch('RESET_PASSWORD', data);
        this.$store.commit(types.SHOW_SNACKBAR, {
          data: res.data.content,
          color: 'success',
        });
        this.resetDone = true;
      } catch (err) {
        this.$router.push('/@error');
        this.loading = false;
      }
      this.loading = false;
    },
  },
  mounted() {
    if (typeof window != 'undefined') {
      const { access_token } = this.$route.query;
      const { email } = this.$route.query;
      window.sessionStorage.setItem('resetToken', access_token);
      this.access_token = access_token;
      this.email = email;
    }
  },
  beforeDestroy() {
    if (typeof window != 'undefined') {
      window.sessionStorage.removeItem('resetToken');
    }
  },
};
</script>
