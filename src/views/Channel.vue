<template>
  <div class="fo-browser">
    <div v-show="isMobile" :class="`nav-offcanvas ${appDrawer ? 'open' : ''}`">
      <div class="nav-offcanvas-menu">
        <aside-action></aside-action>
        <aside-des v-show="isAuthenticated"></aside-des>
      </div>
    </div>
    <div
      v-show="isMobile"
      :class="`offcanvas-overlay ${appDrawer ? 'on' : ''}`"
      @click="toggleMenu"
    ></div>

    <aside-action v-show="!isMobile && appDrawer"></aside-action>
    <aside-des v-show="!isMobile && appDrawer && isAuthenticated"></aside-des>
    <div class="main-container">
      <toolbar @toggleAppDrawer="toggleAppDrawer"></toolbar>
      <channel></channel>
    </div>
  </div>
</template>

<script>
import channel from './../components/Browser/Profile/Profile';
import asideAction from './../components/Browser/Aside/AsideAction';
import asideDes from './../components/Browser/Aside/AsideDes';
import toolbar from './../components/Browser/Toolbar/Toolbar';

import { mapGetters } from 'vuex';

export default {
  name: 'fo-channel',
  data() {
    return {
      appDrawer: false,
    };
  },
  components: {
    channel,
    toolbar,
    asideDes,
    asideAction,
  },
  computed: {
    ...mapGetters(['isMobile', 'isAuthenticated']),
  },
  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
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
  methods: {
    toggleAppDrawer: function(val) {
      this.appDrawer = val;
    },
    toggleMenu: function() {
      if (this.appDrawer) {
        this.appDrawer = false;
        window.localStorage.setItem('APP_DRAWER', false);
      } else {
        this.appDrawer = true;
        window.localStorage.setItem('APP_DRAWER', true);
      }
    },
  },
  async beforeMount() {
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('APP_DRAWER') == 'true') {
        this.appDrawer = true;
      } else if (window.localStorage.getItem('APP_DRAWER') == 'false') {
        this.appDrawer = false;
      } else {
        this.appDrawer = true;
      }
    }

    // if (this.$route.params.id) {
    //   try {
    //     await this.$store.dispatch('GET_CONTENT', {
    //       userId: this.$route.params.id,
    //     });
    //   } catch (err) {
    //     this.$router.push('/@error');
    //     console.log(err);
    //   }
    // }
  },
};
</script>
