<template>
  <div class="lazy__home">
    <div class="background-shapes-wrapper">
      <div class="background-shapes-container">
        <div class="background-shape square-one"></div>
        <div class="background-shape square-two"></div>
        <div class="background-shape square-three"></div>
        <div class="background-shape square-four"></div>
      </div>
    </div>
    <lazy-login></lazy-login>
  </div>
</template>

<script>
import { api } from "./../app/Api";
import LoginForm from "@/components/Account/LoginForm";

export default {
  name: "media-home",
  data() {
    return {};
  },
  components: {
    "lazy-login": LoginForm
  },
  computed: {
    isLoggedIn: function() {
      return api.auth.loggedIn();
    }
  }
};
</script>
