<template>
  <aside :class="`features ${theme}`" v-if="isAuthenticated">
    <header class="features-header focusable">
      <h3 role="header" class="features-header-name">Flex Originals</h3>
    </header>
    <!-- <input type="text" placeholder="Search..." /> -->
    <section class="features-list">
      <header class="features-list-header focusable">
        <h5>Suscriptions</h5>
      </header>

      <ul class="features-list-text">
        <li class="channel channel-text">
          <span class="channel-name">Machine Learning</span>
          <button class="button" role="button" aria-label="settings">
            <i class="fa fa-cog"></i>
          </button>
        </li>

        <li class="channel focusable channel-text">
          <span class="channel-name">Funny Videos</span>
          <button class="button" role="button" aria-label="settings">
            <i class="fa fa-cog"></i>
          </button>
        </li>
      </ul>
    </section>

    <footer :class="`features-footer ${theme}`">
      <img
        class="avatar"
        alt="Avatar"
        :src="settings.profileAvatar || '/public/icons/logo.png'"
        @click="$router.push(`/app/@channel/${user.id}`)"
        style="cursor:pointer"
      />
      <div class="features-footer-details">
        <span class="username">{{user.realm || 'Anonymous'}}</span>
        <span class="tag">{{user.username || 'Flex'}}</span>
      </div>
      <div class="features-footer-controls button-group">
        <button role="button" aria-label="Mute" class="button button-mute">
          <i class="fa fa-headphones"></i>
        </button>
        <button role="button" aria-label="Deafen" class="button button-deafen">
          <i class="fa fa-microphone"></i>
        </button>
        <button
          role="button"
          aria-label="Settings"
          class="button button-settings"
          @click="$router.push('/app/@settings')"
        >
          <i class="fa fa-cog"></i>
        </button>
      </div>
    </footer>
  </aside>
</template>

<script>
export default {
  name: "lazy-aside",
  data() {
    return {};
  },
  computed: {
    settings() {
      return this.$store.state.settings;
    },   theme() {
      return this.$store.state.theme;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
