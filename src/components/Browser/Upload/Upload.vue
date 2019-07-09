<template>
  <div class="settings content">
    <div class="inner">
      <div class="settings__wrapper">
        <div class="card">
          <div class="card__body">
            <div class="container">
              <div class="grid">
                <h1>Upload Status</h1>
                <i @click="$router.push('/app/@home')" class="far fa-times-circle close__settings"></i>
              </div>
            </div>
            <div class="container">
              <div class="grid grid--half">
                <h3>Uploading Progress</h3>
                <div class="video__upload__progress">
                  <div class="upload__progress">
                    <p>10%</p>
                  </div>
                </div>
                <h3>Select Thumbnail</h3>
                <div class="video__thumbnails">
                  <img class="lazy__image" src="/public/qq.webp" alt="thumbnail" />
                </div>
                <div class="video__thumbnails">
                  <img class="lazy__image" src="/public/qq.webp" alt="thumbnail" />
                </div>
                <div class="video__thumbnails">
                  <img class="lazy__image" src="/public/qq.webp" alt="thumbnail" />
                </div>
                <div class="upload__video__settings">
                  <div class="video__title">
                    <label for="videoTitle">Video Title</label>
                    <input name="videoTitle" type="text" placeholder="Video Title" />
                  </div>
                  <div class="video__description">
                    <label for="videoDescription">Video Description</label>
                    <textarea
                      rows="10"
                      name="videoDescription"
                      type="text"
                      placeholder="Video Description"
                    />
                  </div>
                  <div class="video__tags">
                    <label for="videoTags">Video Tags</label>
                    <input name="videoTags" type="text" placeholder="Video Tags" />
                  </div>
                  <div class="form-item">
                    <label class="form-item__label">Text information</label>
                    <div class="form-item__control">
                      <select class="control control--select">
                        <option selected="selected">Public</option>
                        <option>Private</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-item">
                    <label class="form-item__label">Premier</label>
                    <div class="form-item__control toggle">
                      <div class="toggle__handle"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid--half">
                <h3>Advanced Settings</h3>
                <div class="form-item">
                  <label class="form-item__label">Keep all my liked private</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="checkbox">
                  <input id="one" type="checkbox" />
                  <span class="check"></span>
                  <label for="one">Allow Comments</label>
                </div>
                <div class="checkbox">
                  <input id="two" type="checkbox" />
                  <span class="check"></span>
                  <label for="two">Users can view ratings for this video</label>
                </div>
                <div class="checkbox">
                  <input id="three" type="checkbox" />
                  <span class="check"></span>
                  <label for="three">Age restrictions</label>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Category</label>
                  <div class="form-item__control">
                    <select class="control control--select">
                      <option selected="selected">People & Blog</option>
                      <option>Gamming</option>
                      <option>Education</option>
                      <option>Comedy</option>
                    </select>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Licence and rights ownership</label>
                  <div class="form-item__control">
                    <select class="control control--select">
                      <option selected="selected">People & Blog</option>
                      <option>Gamming</option>
                      <option>Education</option>
                      <option>Comedy</option>
                    </select>
                  </div>
                </div>
                <button class="success">Publish</button>
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
