<template>
  <div class="fo-home">
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
