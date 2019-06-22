<template>
  <aside class="features">
    <header class="features-header focusable">
      <h3 role="header" class="features-header-name">My Server</h3>
    </header>

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

    <footer class="features-footer">
      <img class="avatar" alt="Avatar" src="/public/logo.svg">
      <div class="features-footer-details">
        <span class="username">Anurag Kumar</span>
        <span class="tag">anu1601cs</span>
      </div>
      <div class="features-footer-controls button-group">
        <button role="button" aria-label="Mute" class="button button-mute">
          <i class="fa fa-headphones"></i>
        </button>
        <button role="button" aria-label="Deafen" class="button button-deafen">
          <i class="fa fa-microphone"></i>
        </button>
        <button role="button" aria-label="Settings" class="button button-settings">
          <i class="fa fa-cog"></i>
        </button>
      </div>
    </footer>
  </aside>
</template>

<script>
import * as types from "./../../../store/mutation-types";
export default {
  name: "lazy-aside",
  methods: {
    closeMenu: function() {
      this.$store.commit(types.HIDE_MENU);
    }
  }
};
</script>
