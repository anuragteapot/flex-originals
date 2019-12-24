<template>
  <browser>
    <home></home>
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
    browser,
    home,
  },
  asyncData({ isServer, store }) {
    return store.dispatch('GET_CONTENT', { isServer });
  },
};
</script>
