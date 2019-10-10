<template>
  <aside :class="`features ${theme}`">
    <header class="features-header focusable">
      <img class="features-header-name" src="/public/text_logo2.png" alt="logo" />
    </header>
    <section class="features-list">
      <header class="features-list-header focusable">
        <h5>FOLLOWING</h5>
      </header>

      <ul class="features-list-text">
        <router-link
          :to="`/app/@channel/${channel.channel.id}`"
          v-for="channel in channels"
          :key="channel.id"
        >
          <li class="channel channel-text">
            <span class="channel-name">{{ channel.channel.realm }}</span>
            <button class="button" role="button" aria-label="settings">
              <i class="fa fa-cog"></i>
            </button>
          </li>
        </router-link>
      </ul>
    </section>

    <footer :class="`features-footer ${theme}`">
      <router-link :to="`/app/@channel/${user.id}`">
        <img
          class="avatar"
          alt="Avatar"
          :src="settings.profileAvatar || '/public/icons/logo.png'"
          style="cursor:pointer"
        />
      </router-link>
      <!-- <div class="features-footer-details">
        <span class="username">{{user.realm || 'Anonymous'}}</span>
        <span class="tag">{{user.username || 'Flex'}}</span>
      </div>-->
      <div class="features-footer-controls button-group">
        <button role="button" aria-label="Mute" class="button button-mute">
          <i class="fa fa-headphones"></i>
        </button>
        <button role="button" aria-label="Deafen" class="button button-deafen">
          <i class="fa fa-microphone"></i>
        </button>
        <router-link to="/app/@settings">
          <button role="button" aria-label="Settings" class="button button-settings">
            <i class="fa fa-cog"></i>
          </button>
        </router-link>
      </div>
    </footer>
  </aside>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'lazy-aside',
  data() {
    return {};
  },
  computed: {
    settings() {
      return this.$store.state.settings;
    },
    theme() {
      return this.$store.state.theme;
    },
    channels() {
      return this.$store.state.following;
    },
    user() {
      return this.$user.getUser();
    },
  },
  async beforeMount() {
    if (typeof window != 'undefined') {
      const userId = this.$user.get('$userId');
      if (userId) {
        const res = await this.$store.dispatch('GET_FOLLOWERS', {
          followId: userId,
        });
        this.$store.commit(types.SET_FOLLOWING, res.data);
      }
    }
  },
};
</script>
