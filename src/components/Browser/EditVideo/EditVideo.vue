<template>
  <div :class="`settings content ${theme}`">
    <div class="inner">
      <div class="settings__wrapper">
        <div class="card">
          <div class="card__body">
            <div class="container">
              <div class="grid grid--half">
                <lazy-video-player :src="videoSource" v-if="!videoUnavaliable" :disablekey="true"></lazy-video-player>
                <h3>Select Thumbnail (Auto generate not avaliable yet.)</h3>
                <div class="video__thumbnails" v-for="(thumb, i) in thumbnails" :key="i">
                  <img
                    class="fo-image"
                    :src="`/${thumb}`"
                    alt="thumbnail"
                    @click="videoData.thumbImage = thumb"
                  />
                </div>
                <div class="upload__video__settings">
                  <div class="video__title">
                    <label for="videoTitle">Video Title</label>
                    <input
                      v-model="videoData.title"
                      name="videoTitle"
                      type="text"
                      placeholder="Video Title"
                    />
                  </div>
                  <div class="video__description">
                    <label for="videoDescription">Video Description</label>
                    <textarea
                      v-model="videoData.description"
                      rows="10"
                      name="videoDescription"
                      type="text"
                      placeholder="Video Description"
                    />
                  </div>
                  <div class="video__tags">
                    <label for="videoTags">Video Tags</label>
                    <input
                      v-model="videoData.tags"
                      name="videoTags"
                      type="text"
                      placeholder="Video Tags"
                    />
                  </div>
                  <div class="form-item">
                    <label class="form-item__label">Visibility</label>
                    <div class="form-item__control">
                      <select class="control control--select" v-model="videoData.visibility">
                        <option value="1" selected="selected">Public</option>
                        <option value="0">Private</option>
                      </select>
                    </div>
                  </div>
                  <!-- <div class="form-item">
                    <label class="form-item__label">Premier</label>
                    <div class="form-item__control toggle">
                      <div class="toggle__handle"></div>
                    </div>
                  </div>-->
                </div>
              </div>
              <div class="grid grid--half">
                <h3>Advanced Settings</h3>
                <div class="form-item">
                  <label class="form-item__label">Keep all my liked private</label>
                  <div
                    class="form-item__control toggle"
                    :class="videoData.likedPrivate ? 'is-on' : ''"
                    @click="videoData.likedPrivate = !videoData.likedPrivate"
                  >
                    <div class="toggle__handle is-on"></div>
                  </div>
                </div>
                <div class="checkbox">
                  <input id="one" type="checkbox" v-model="videoData.allowComments" />
                  <span class="check"></span>
                  <label for="one">Allow Comments</label>
                </div>
                <div class="checkbox">
                  <input id="two" type="checkbox" v-model="videoData.ratings" />
                  <span class="check"></span>
                  <label for="two">Users can view ratings for this video</label>
                </div>
                <div class="checkbox">
                  <input id="three" type="checkbox" v-model="videoData.agerestriction" />
                  <span class="check"></span>
                  <label for="three">Age restrictions</label>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Category</label>
                  <div class="form-item__control">
                    <select class="control control--select" v-model="videoData.category">
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
                    <select class="control control--select" v-model="videoData.licence">
                      <option selected="selected">Flex Originals</option>
                      <option>Other Creators</option>
                    </select>
                  </div>
                </div>
                <button class="fo-settings-button success" @click="finilize()">Update</button>
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
import { setTimeout } from "timers";

export default {
  name: "upload",
  data() {
    return {
      isAllowed: false,
      isUploading: false,
      uploadPercent: 0,
      videoSource: "",
      videoUnavaliable: false,
      done: false,
      videoId: null,
      thumbnails: [
        `public/profile-icon/avatar${Math.floor(Math.random() * 28) + 1}.svg`,
        `public/profile-icon/avatar${Math.floor(Math.random() * 28) + 1}.svg`,
        `public/profile-icon/avatar${Math.floor(Math.random() * 28) + 1}.svg`
      ],
      videoData: {
        name: "",
        agerestriction: false,
        description: "",
        tags: "",
        thumbImage: "",
        visibility: 1,
        likedPrivate: false,
        allowComments: true,
        ratings: true,
        category: "People & Blog",
        licence: "Flex Originals"
      }
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    }
  },
  methods: {
    finilize: async function() {
      if (!this.videoData.thumbImage) {
        this.videoData.thumbImage = this.thumbnails[0];
      }
      try {
        const publishedVideo = await this.$api.axios().post(
          `/api/videos/publish`,
          { id: this.videoId, videoData: this.videoData },
          {
            retry: 3,
            retryDelay: 1000
          }
        );
        const data = {
          data: `Saved.`,
          color: "success"
        };
        this.$store.commit(types.SHOW_SNACKBAR, data);
        this.done = true;
        window.removeEventListener("beforeunload", this.beforeunload);

        setTimeout(() => {
          window.location.href = `/app/@watch?v=${publishedVideo.data.id}`;
        }, 1000);
      } catch (err) {
        this.$api._handleError(err);
      }
    },
    async init() {
      if (this.$route.query.v) {
        this.$store.commit(types.SET_IS_LOADING, true);

        try {
          const video = await this.$api
            .axios()
            .get(`/api/videos/getVideoInfo/${this.$route.query.v}`);

          if (!video.data) {
            this.videoUnavaliable = true;
          }
          if (video.data.videoFile.includes("https")) {
            this.videoSource = video.data.videoFile;
          } else {
            this.videoSource = "/" + video.data.videoFile;
          }
          this.videoId = video.data.id;
          this.videoData = Object.assign(this.videoData, video.data);
        } catch (err) {
          this.videoUnavaliable = true;
          this.$api._handleError(err);
        }
      } else {
        this.$router.push("/@error");
      }
      this.$store.commit(types.SET_IS_LOADING, false);
    }
  },
  created() {
    this.init();
  }
};
</script>
