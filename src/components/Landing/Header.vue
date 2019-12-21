<template>
  <div class="home__header">
    <div class="home__navbar">
      <div class="features-header-name">
        <h1>Flex originals</h1>
      </div>
      <router-link v-show="!isAuthenticated" to="/signup">Sign Up</router-link>
      <router-link v-show="!isAuthenticated" to="/login">Login</router-link>
      <a href @click.prevent="logout()" v-show="isAuthenticated">Logout</a>
      <a href="https://github.com/Anu1601CS/flex-originals">Github</a>
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
      await this.$user.logout('/app/@home');
    },
  },
};
</script>
