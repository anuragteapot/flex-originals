<template>
  <browser>
    <upload></upload>
  </browser>
</template>

<script>
import upload from './../components/Browser/Upload/Upload';
import browser from './../components/Browser/Browser';

export default {
  name: 'fo-home',
  data() {
    return {};
  },
  components: {
    browser,
    upload,
  },
};
</script>
