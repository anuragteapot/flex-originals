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
              <i @click="$router.push('/app/@home')" class="far fa-times-circle close__settings"></i>
            </div>
            <div class="container">
              <div class="grid grid--half">
                <h3>General</h3>
                <div class="form-item">
                  <label class="form-item__label">Start at login</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Hide window at start up</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Keep window visible as bg app</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Keep window above other apps</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Show icon in dock</label>
                  <div class="form-item__control toggle is-on">
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
                <h3>Performance</h3>
                <div class="form-item">
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
                    <!-- <div ref="sliderPos" class="slider__positive" style="width: 50%;"></div>  -->
                  </div>
                </div>
                <p>
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
                </p>
                <button class="danger" @click="logout">Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "media-settings",
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      } catch (err) {
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      }
    }
  }
};
</script>
