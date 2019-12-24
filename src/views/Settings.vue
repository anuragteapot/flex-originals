<template>
  <browser>
    <settings></settings>
  </browser>
</template>

<script>
import settings from './../components/Browser/Settings/Settings';
import browser from './../components/Browser/Browser';

export default {
  name: 'fo-home',
  data() {
    return {};
  },
  components: {
    browser,
    settings,
  },
};
</script>
