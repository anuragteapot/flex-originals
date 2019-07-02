<template>
  <div class="home__header">
    <div class="home__navbar">
      <a v-show="!loggedIn" href="/signup">Sign Up</a>
      <a v-show="!loggedIn" href="/login">Login</a>
      <a href @click.prevent="logout()" v-show="loggedIn">Logout</a>
      <a href="/">Home</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "landing-footer",
  computed: {
    loggedIn() {
      return this.$api.auth.loggedIn();
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$api.auth.logout();
        window.location.href = "";
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
