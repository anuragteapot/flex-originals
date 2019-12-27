<template>
  <div class="fo-home">
    <request-password></request-password>
  </div>
</template>

<script>
import requestPassword from '@/components/Account/RequestPasswordForm';

export default {
  name: 'reqest-password',
  data() {
    return {};
  },
  components: {
    requestPassword,
  },
};
</script>
