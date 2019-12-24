<template>
  <div class="settings content">
    <div class="inner" v-show="user.username">
      <div class="settings__wrapper">
        <div class="card">
          <div class="card__body">
            <div class="container">
              <div class="grid">
                <h1>Settings</h1>
              </div>
            </div>
            <div class="container">
              <div class="grid grid--half">
                <h3>General</h3>
                <div class="form-item">
                  <div class="account__info">
                    <div class="avatar">
                      <div class="account__avatar" alt="logo">
                        <lazy-image :src="settings.profileAvatar"></lazy-image>
                      </div>
                    </div>
                    <div class="email__info">
                      <p>{{ user.realm }} ({{ user.username }})</p>
                      <p>{{ user.email }}</p>
                    </div>
                    <div class="username__info">
                      <button class="fo-settings-button info" @click="logout">
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label"
                    >Enable Email Notifications</label
                  >
                  <div
                    class="form-item__control toggle"
                    :class="settings.emailNotification ? 'is-on' : ''"
                    @click="
                      settings.emailNotification = !settings.emailNotification;
                      save();
                    "
                  >
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label"
                    >Enable Desktop Notifications</label
                  >
                  <div
                    class="form-item__control toggle"
                    :class="settings.desktopNotification ? 'is-on' : ''"
                    @click="
                      settings.desktopNotification = !settings.desktopNotification;
                      save();
                    "
                  >
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Theme ( Light/Dark )</label>
                  <div
                    class="form-item__control toggle"
                    :class="settings.theme == 'dark' ? 'is-on' : ''"
                    @click="
                      settings.theme == 'dark'
                        ? (settings.theme = 'light')
                        : (settings.theme = 'dark');
                      save();
                    "
                  >
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <!-- <div class="form-item">
                  <label class="form-item__label">Show icon in dock</label>
                  <div
                    class="form-item__control toggle"
                    :class="settings.emailNotification ? 'is-on' : ''"
                    @click="settings.emailNotification = !settings.emailNotification"
                  >
                    <div class="toggle__handle"></div>
                  </div>
                </div>-->
                <h3>Social Media Accounts</h3>
                <div class="form-item">
                  <label class="form-item__label">Facebook</label>
                  <div class="form-item__control">
                    <input
                      @change="save()"
                      v-model="settings.facebook"
                      class="form-item__control__input"
                      type="text"
                      placeholder="Facebook Username"
                    />
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Twitter</label>
                  <div class="form-item__control">
                    <input
                      @change="save()"
                      v-model="settings.twitter"
                      class="form-item__control__input"
                      type="text"
                      placeholder="Twitter Username"
                    />
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Redit</label>
                  <div class="form-item__control">
                    <input
                      @change="save()"
                      v-model="settings.redit"
                      class="form-item__control__input"
                      type="text"
                      placeholder="Redit Username"
                    />
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Linkdein</label>
                  <div class="form-item__control">
                    <input
                      @change="save()"
                      v-model="settings.linkedin"
                      class="form-item__control__input"
                      type="text"
                      placeholder="Linkedin Username"
                    />
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Instagram</label>
                  <div class="form-item__control">
                    <input
                      @change="save()"
                      v-model="settings.instagram"
                      class="form-item__control__input"
                      type="text"
                      placeholder="Instagram Username"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid--half">
                <h3>Security</h3>
                <p>Two-factor authentication</p>
                <p>
                  <small
                    >This will sign you out of sessions in other browsers or on
                    other computers.</small
                  >
                </p>
                <button class="fo-settings-button success">
                  Enable Two-Factor Auth
                </button>

                <p>Sign out of all other sessions</p>
                <p>
                  <small
                    >This will sign you out of sessions in other browsers or on
                    other computers.</small
                  >
                </p>
                <button
                  class="fo-settings-button warning"
                  @click="deleteAllSession"
                >
                  Sign out other sessions
                </button>
                <h3>Danger Zone</h3>
                <p>
                  <small>
                    Delete this repository Once you delete a repository, there
                    is no going back. Please be certain.
                  </small>
                </p>
                <button class="fo-settings-button danger">
                  Deactivate Account
                </button>
                <button class="fo-settings-button danger">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'fo-settings',
  data() {
    return {};
  },
  computed: {
    settings() {
      return this.$store.state.settings;
    },
    user() {
      return this.$user.getUser();
    },
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    async logout() {
      await this.$user.logout('/app/@home?u=logout');
    },
    deleteAllSession() {
      this.$store.commit(types.SHOW_MODAL, { state: true, type: 'MDelete' });
    },
    async save() {
      const payload = {};
      payload.id = this.$user.get('$userId');
      payload.newSettings = this.settings;
      const settings = await this.$store.dispatch('UPDATE_SETTINGS', payload);

      this.$store.commit(types.SET_SETTINGS, settings);
    },
  },
  async beforeMount() {
    const settings = await this.$store.dispatch('FIND_SETTINGS', {
      uid: this.$user.get('$userId'),
    });

    this.$store.commit(types.SET_SETTINGS, settings);
  },
};
</script>
