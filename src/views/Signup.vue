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
    <media-signup></media-signup>
  </div>
</template>

<script>
import SignupForm from '@/components/Account/SignupForm';

export default {
  name: 'media-main-signup',
  components: {
    'media-signup': SignupForm,
  },
};
</script>
