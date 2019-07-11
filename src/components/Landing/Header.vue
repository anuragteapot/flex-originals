<template>
  <div class="home__header">
    <div class="home__navbar">
      <a v-show="!isAuthenticated" href="/signup">Sign Up</a>
      <a v-show="!isAuthenticated" href="/login">Login</a>
      <a href @click.prevent="logout()" v-show="isAuthenticated">Logout</a>
      <a href="/">Home</a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "landing-footer",
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    async logout() {
      try {
        await this.$api.logout();
        window.location.href = "";
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
