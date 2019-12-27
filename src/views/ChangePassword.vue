<template>
  <div class="fo-home">
    <change-password></change-password>
  </div>
</template>

<script>
import changePassword from '@/components/Account/ChangePasswordForm';

export default {
  name: 'reqest-password',
  data() {
    return {};
  },
  components: {
    changePassword,
  },
};
</script>
