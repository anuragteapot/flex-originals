<template>
  <div class="settings content">
    <div class="inner">
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
                      <img class="account__avatar" :src="settings.profileAvatar" />
                      <!-- <span class="avatar__change">Change Avatar</span> -->
                    </div>
                    <div class="email__info">
                      <p>{{user.realm}} ({{user.username }})</p>
                      <p>{{ user.email}}</p>
                    </div>
                    <div class="username__info">
                      <button class="fo-settings-button  info" @click="logout">Log Out</button>
                    </div>
                  </div>
                  <!-- <label class="form-item__label">Start at login</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>-->
                </div>
                <div class="form-item">
                  <label class="form-item__label">Enable Email Notifications</label>
                  <div
                    class="form-item__control toggle"
                    :class="settings.emailNotification ? 'is-on' : ''"
                    @click="settings.emailNotification = !settings.emailNotification"
                  >
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Enable Desktop Notifications</label>
                  <div
                    class="form-item__control toggle"
                    :class="settings.desktopNotification ? 'is-on' : ''"
                    @click="settings.desktopNotification = !settings.desktopNotification; save()"
                  >
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Theme ( Light/Dark )</label>
                  <div
                    class="form-item__control toggle"
                    :class="settings.emailNotification ? 'is-on' : ''"
                    @click="settings.emailNotification = !settings.emailNotification"
                  >
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Show icon in dock</label>
                  <div
                    class="form-item__control toggle"
                    :class="settings.emailNotification ? 'is-on' : ''"
                    @click="settings.emailNotification = !settings.emailNotification"
                  >
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Hide &quot;Unlock Extreme&quot; button</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <h3>Desktop Status Menu</h3>
                <div class="form-item">
                  <label class="form-item__label">Use precentages</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Icon visible</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Text information</label>
                  <div class="form-item__control">
                    <select class="control control--select">
                      <option selected="selected">Default</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="grid grid--half">
                <!-- <h3>Performance</h3> -->
                <!-- <div class="form-item">
                  <label class="form-item__label">Threshold level</label>
                  <div class="form-item__control">
                    <small>
                      <strong>
                        <span class="slider__value">500</span>
                        <span>mb</span>
                      </strong>
                    </small>
                  </div>
                  <div class="slider">
                    <input class="slider__input" type="range" value="50" min="0" max="100" />
                    <div ref="sliderPos" class="slider__positive" style="width: 50%;"></div> 
                  </div>
                </div>-->
                <!-- <p>
                  <small>If the available memory goes below this amount, the status bar text will turn red.</small>
                </p>
                <div class="form-item">
                  <label class="form-item__label">Auto clean</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <p>
                  <small>Automatically clean when available memory drops below the above threshold. Auto clean is limited to once every 3 minutes.</small>
                </p>
                <div class="form-item">
                  <label class="form-item__label">Disable auto clean cooldown</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <p>
                  <small>
                    Auto clean cooldown:
                    <strong>136 seconds</strong>
                  </small>
                </p>
                <div class="form-item">
                  <label class="form-item__label">Refresh interval</label>
                  <div class="form-item__control">
                    <small>
                      <strong>
                        <span class="slider__value">5</span>
                        <span>&nbsp;seconds</span>
                      </strong>
                    </small>
                  </div>
                </div>
                <p>
                  <small>If the available memory goes below this amount, the status bar text will turn red.</small>
                </p>-->
                <h3>Security</h3>
                <p>Two-factor authentication</p>
                <p>
                  <small>This will sign you out of sessions in other browsers or on other computers.</small>
                </p>
                <button class="fo-settings-button success">Enable Two-Factor Auth</button>

                <p>Sign out of all other sessions</p>
                <p>
                  <small>This will sign you out of sessions in other browsers or on other computers.</small>
                </p>
                <button
                  class="fo-settings-button warning"
                  @click="deleteAllSession"
                >Sign out other sessions</button>
                <h3>Danger Zone</h3>
                <p>
                  <small>
                    Delete this repository
                    Once you delete a repository, there is no going back. Please be certain.
                  </small>
                </p>
                <button class="fo-settings-button danger">Deactivate Account</button>
                <button class="fo-settings-button danger">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "media-settings",
  data() {
    return {};
  },
  computed: {
    settings() {
      return this.$store.state.settings;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async logout() {
      await this.$api.logout();
      this.$router.push("/app/@home?u=logout");
    },
    deleteAllSession() {
      this.$store.commit(types.SHOW_MODAL, { state: true, type: "MDelete" });
    },
    async save() {
      const payload = {};
      payload.id = this.$api.webStorage.local.get("$userId");
      payload.newSettings = this.settings;
      await this.$store.dispatch("updateSettings", payload);
    }
  },
  async created() {
    const settings = await this.$store.dispatch("findSettings", {
      uid: this.$api.webStorage.local.get("$userId")
    });

    this.$store.commit(types.SET_SETTINGS, settings);
  }
};
</script>
