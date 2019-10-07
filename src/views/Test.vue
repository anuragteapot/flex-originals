<template>
  <div class="name">
    Test
    <p>{{content}}</p>
  </div>
</template>
<script>
export default {
  name: 'test',
  computed: {
    content() {
      return this.$store.state.content;
    },
  },
  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
  asyncData({
    store,
    route: {
      params: { id },
    },
  }) {
    if (id) {
      return store.dispatch('GET_CONTENT', {
        userId: id,
      });
    } else {
      return store.dispatch('GET_CONTENT', {});
    }
  },

  data() {
    return {
      name: 'Anurg',
    };
  },
};
</script>