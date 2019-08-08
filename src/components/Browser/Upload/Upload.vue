<template>
  <div :class="`settings content ${theme}`">
    <div class="inner">
      <div class="media-action">
        <div class="file">
          <form enctype="multipart/form-data" ref="formFile">
            <input type="file" hidden ref="inputFile" @change="processFile" />
          </form>
        </div>
      </div>
      <div class="settings__wrapper">
        <div class="card">
          <div
            class="upload__icon__body dragoutline"
            v-show="!isUploading"
            @dragenter="onDragEnter"
            @drop="onDrop"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
          >
            <i class="fas fa-cloud-upload-alt fa-4x" @click="openSelect"></i>
            <br />
            <h1>DRAG & DROP</h1>
            <p>to upload your video/music or click</p>
          </div>
          <div class="card__body">
            <div class="container" v-show="isUploading">
              <div class="grid">
                <h1>Upload Status</h1>
              </div>
            </div>
            <div class="container" v-show="isUploading">
              <div class="grid grid--half">
                <h3>Uploading Progress</h3>
                <div class="video__upload__progress">
                  <div
                    class="upload__progress"
                    :style="`width:${uploadPercent}%; background-color:${!isProcessing ? '#43b581' :''}!important`"
                  >
                    <p>{{uploadPercent}}%</p>
                  </div>
                </div>
                <h3>Select Thumbnail (Auto generate not avaliable yet.)</h3>
                <div class="video__thumbnails" v-for="(thumb, i) in loadingThumbnails" :key="i">
                  <img
                    class="fo-image"
                    :src="`/${thumb}`"
                    alt="thumbnail"
                    @click="uploadData.thumbImage = thumb"
                  />
                </div>
                <div class="upload__video__settings">
                  <div class="video__title">
                    <label for="videoTitle">Video Title</label>
                    <input
                      v-model="uploadData.title"
                      name="videoTitle"
                      type="text"
                      placeholder="Video Title"
                    />
                  </div>
                  <div class="video__description">
                    <label for="videoDescription">Video Description</label>
                    <textarea
                      v-model="uploadData.description"
                      rows="10"
                      name="videoDescription"
                      type="text"
                      placeholder="Video Description"
                    />
                  </div>
                  <div class="video__tags">
                    <label for="videoTags">Video Tags</label>
                    <input
                      v-model="uploadData.tags"
                      name="videoTags"
                      type="text"
                      placeholder="Video Tags"
                    />
                  </div>
                  <div class="form-item">
                    <label class="form-item__label">Visibility</label>
                    <div class="form-item__control">
                      <select class="control control--select" v-model="uploadData.visibility">
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
                    :class="uploadData.likedPrivate ? 'is-on' : ''"
                    @click="uploadData.likedPrivate = !uploadData.likedPrivate"
                  >
                    <div class="toggle__handle is-on"></div>
                  </div>
                </div>
                <div class="checkbox">
                  <input id="one" type="checkbox" v-model="uploadData.allowComments" />
                  <span class="check"></span>
                  <label for="one">Allow Comments</label>
                </div>
                <div class="checkbox">
                  <input id="two" type="checkbox" v-model="uploadData.ratings" />
                  <span class="check"></span>
                  <label for="two">Users can view ratings for this video</label>
                </div>
                <div class="checkbox">
                  <input id="three" type="checkbox" v-model="uploadData.agerestriction" />
                  <span class="check"></span>
                  <label for="three">Age restrictions</label>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Category</label>
                  <div class="form-item__control">
                    <select class="control control--select" v-model="uploadData.category">
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
                    <select class="control control--select" v-model="uploadData.licence">
                      <option selected="selected">Flex Originals</option>
                      <option>Other Creators</option>
                    </select>
                  </div>
                </div>
                <button class="fo-settings-button success" @click="finilize()">Publish</button>
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
      isProcessing: true,
      done: false,
      type: "",
      uploadId: null,
      thumbnails: [
        `public/profile-icon/avatar${Math.floor(Math.random() * 28) + 1}.svg`,
        `public/profile-icon/avatar${Math.floor(Math.random() * 28) + 1}.svg`,
        `public/profile-icon/avatar${Math.floor(Math.random() * 28) + 1}.svg`
      ],
      loadingThumbnails: [
        `public/loading.gif`,
        `public/loading.gif`,
        `public/loading.gif`
      ],
      uploadData: {
        title: "",
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
    openSelect() {
      if (this.isAllowed) {
        this.$refs.inputFile.click();
      } else {
        const data = {
          data: `Your upload limit exceed`,
          color: "error"
        };

        this.$store.commit(types.SHOW_SNACKBAR, data);
      }
    },
    // Listeners for drag and drop
    onDragEnter: function(event) {
      event.stopPropagation();
      return false;
    },
    // Notify user when file is over the drop area
    onDragOver: function(event) {
      event.preventDefault();
      document.querySelector(".dragoutline").classList.add("active");
      return false;
    },
    onDrop: function(event) {
      event.preventDefault();
      window.addEventListener("beforeunload", this.beforeunload);
      if (
        event.dataTransfer &&
        event.dataTransfer.files &&
        event.dataTransfer.files.length > 0
      ) {
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
          let file = event.dataTransfer.files[i];
          document.querySelector(".dragoutline").classList.remove("active");
          const formData = new FormData();
          formData.append("files", file);
          setTimeout(() => {
            this.processUpload(formData);
          }, 1000);
        }
      }
      document.querySelector(".dragoutline").classList.remove("active");
    },
    // Reset the drop area border
    onDragLeave: function(event) {
      event.stopPropagation();
      event.preventDefault();
      document.querySelector(".dragoutline").classList.remove("active");
      return false;
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      } catch (err) {
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      }
    },
    processUpload: async function(formData) {
      const userId = this.$api.webStorage.local.get("$userId");

      const VIDEO_EXT = ["video/mp4", "video/x-msvideo"];
      const AUDIO_EXT = [
        "audio/mpeg",
        "audio/vnd.wav",
        "audio/mp4",
        "audio/mp3",
        "audio/ogg"
      ];

      if (VIDEO_EXT.indexOf(this.$refs.inputFile.files[0].type) != -1) {
        this.type = "video";
      } else if (AUDIO_EXT.indexOf(this.$refs.inputFile.files[0].type) != -1) {
        this.type = "audio";
      }

      if (!this.type) {
        const data = {
          data: `File not allowed.`,
          color: "error"
        };

        this.$store.commit(types.SHOW_SNACKBAR, data);
        this.$refs.formFile.reset();
        window.removeEventListener("beforeunload", this.beforeunload);
        return false;
      }

      this.isUploading = true;

      try {
        const uploaded = await this.$api
          .axios()
          .post(`/api/actions/upload/${this.type}/${userId}`, formData, {
            retry: 3,
            retryDelay: 1000,
            onUploadProgress: e => {
              this.uploadPercent = Math.round((e.loaded * 100) / e.total);
            }
          });

        if (this.type === "video") {
          this.uploadId = uploaded.data.video.id;
          this.uploadData.title = uploaded.data.video.title;

          const videoThumb = await this.$api
            .axios()
            .get(`/api/actions/genrateThumbnail/${uploaded.data.video.id}`);

          this.loadingThumbnails = videoThumb.data.thumbnails;
        } else if (this.type === "audio") {
          this.uploadId = uploaded.data.audio.id;
          this.uploadData.title = uploaded.data.audio.title;
          this.loadingThumbnails = this.thumbnails;
        }
      } catch (err) {
        console.log(err);
        this.$api._handleError(err);
      }

      const data = {
        data: `File Uploaded.`,
        color: "success"
      };

      this.isProcessing = false;
      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$refs.formFile.reset();
    },
    processFile: function() {
      window.addEventListener("beforeunload", this.beforeunload);
      const formData = new FormData();
      formData.append("file", this.$refs.inputFile.files[0]);

      setTimeout(() => {
        this.processUpload(formData);
      }, 1000);
    },
    beforeunload(event) {
      event = event || window.event;
      // event.preventDefault();

      // For IE and Firefox prior to version 4
      if (event && !this.done) {
        event.returnValue = "Sure?";
      }

      // For Safari
      if (!this.done) {
        return "Sure?";
      }
    },
    finilize: async function() {
      if (!this.uploadData.thumbImage) {
        this.uploadData.thumbImage = this.thumbnails[0];
      }

      if (this.type === "video") {
        try {
          const publishedVideo = await this.$api.axios().post(
            `/api/videos/publish`,
            { id: this.uploadId, videoData: this.uploadData },
            {
              retry: 3,
              retryDelay: 1000
            }
          );
          const data = {
            data: `Published.`,
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
          console.log(err);
        }
      } else if (this.type === "audio") {
        try {
          const publishedAudio = await this.$api.axios().post(
            `/api/audios/publish`,
            { id: this.uploadId, audioData: this.uploadData },
            {
              retry: 3,
              retryDelay: 1000
            }
          );
          const data = {
            data: `Published`,
            color: "success"
          };
          this.$store.commit(types.SHOW_SNACKBAR, data);
          this.done = true;
          window.removeEventListener("beforeunload", this.beforeunload);

          setTimeout(() => {
            window.location.href = `/app/@song?a=${publishedAudio.data.id}`;
          }, 1000);
        } catch (err) {
          this.$api._handleError(err);
          console.log(err);
        }
      }
    }
  },
  async beforeMount() {
    const storage = await this.$store.dispatch(
      "getUserStorage",
      this.$api.webStorage.local.get("$userId")
    );

    const limit =
      process.env.NODE_ENV === "production" ? 262854847 : 26285484700;

    if (storage.data.totalStorage > limit) {
      this.isAllowed = false;
    } else {
      this.isAllowed = true;
    }
  }
};
</script>
