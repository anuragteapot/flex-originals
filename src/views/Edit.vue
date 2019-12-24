<template>
  <browser>
    <editvideo></editvideo>
  </browser>
</template>

<script>
import editvideo from './../components/Browser/EditVideo/EditVideo';
import browser from './../components/Browser/Browser';

export default {
  name: 'fo-channel',
  data() {
    return {};
  },
  components: {
    browser,
    editvideo,
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
