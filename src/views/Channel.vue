<template>
  <browser>
    <channel></channel>
  </browser>
</template>

<script>
import channel from './../components/Browser/Profile/Profile';
import browser from './../components/Browser/Browser';

export default {
  name: 'fo-channel',
  data() {
    return {};
  },
  components: {
    browser,
    channel,
  },
  asyncData({
    store,
    isServer,
    route: {
      params: { id },
    },
  }) {
    return store.dispatch('GET_CONTENT', {
      userId: id,
      isServer,
    });
  },
};
</script>
