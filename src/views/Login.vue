<template>
  <div class="fo-home">
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
import LoginForm from '@/components/Account/LoginForm';

import { mapGetters } from 'vuex';

export default {
  name: 'fo-login',
  data() {
    return {};
  },
  components: {
    'lazy-login': LoginForm,
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>
