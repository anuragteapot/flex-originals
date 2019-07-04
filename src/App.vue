<template>
  <div class="container">
    <div class="progress" v-show="isLoading">
      <div class="indeterminate"></div>
    </div>
    <router-view />
    <lazy-snack-bar></lazy-snack-bar>
    <lazy-model></lazy-model>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapGetters(["isLoading"])
  }
};
</script>
