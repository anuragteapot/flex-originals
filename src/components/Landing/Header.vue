<template>
  <div class="home__header">
    <div class="home__navbar">
      <img class="features-header-name" src="/public/text_logo2.png" alt="logo" />
      <a v-show="!isAuthenticated" href="/signup">Sign Up</a>
      <a v-show="!isAuthenticated" href="/login">Login</a>
      <a href @click.prevent="logout()" v-show="isAuthenticated">Logout</a>
      <a href="/">Home</a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'landing-footer',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    async logout() {
      try {
        await this.$api.logout();
        if (typeof window !== 'undefined') {
          window.location.href = '';
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
