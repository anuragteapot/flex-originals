<template>
  <browser>
    <home></home>
    <fo-audio-player />
  </browser>
</template>

<script>
import home from './../components/Browser/Content/MainContent';
import browser from './../components/Browser/Browser';

export default {
  name: 'fo-home',
  data() {
    return {};
  },
  components: {
    home,
    browser,
  },
  asyncData({ isServer, store }) {
    return store.dispatch('GET_CONTENT', { isServer });
  },
};
</script>
