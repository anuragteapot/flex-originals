<template>
  <browser>
    <watch></watch>
  </browser>
</template>

<script>
import watch from './../components/Browser/Watch/VideoViewer';
import browser from './../components/Browser/Browser';

export default {
  name: 'fo-home',
  data() {
    return {};
  },
  components: {
    browser,
    watch,
  },
  asyncData({ isServer, store }) {
    return store.dispatch('GET_CONTENT', { isServer });
  },
};
</script>
