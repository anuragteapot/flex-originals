<template>
  <div class="login">
    <div class="header">
      <h1>{{ data }}</h1>
    </div>
    <div class="body">
      <p>Please enter your email</p>
      <form @submit.prevent="submit" ref="form">
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
        <button class="btn-hover color" :disabled="loading">
          <span v-show="!loading">Find Account</span>
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
        <router-link to="/login">Cancel</router-link>
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
      data: 'First, let\'s find your account',
      loading: false,
      email: '',
    };
  },
  computed: {
    Vemail: function() {
      if (!this.email) return true;
      return this.$utils.regEmail.test(this.email);
    },
  },
  methods: {
    async submit() {
      this.loading = true;
      const data = {
        email: this.email,
      };

      try {
        await this.$store.dispatch('REQUEST_RESET_PASSWORD', data);
        this.$store.commit(types.SHOW_SNACKBAR, {
          data: 'Reset link send to email',
          color: 'success',
        });
        this.data = 'We just sent a verification link to your email.';
        this.email = '';
      } catch (err) {
        this.loading = false;
      }
      this.loading = false;
    },
  },
};
</script>
