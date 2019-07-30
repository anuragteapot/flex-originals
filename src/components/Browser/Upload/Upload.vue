<template>
  <div class="settings content">
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
            <i class="fas fa-cloud-upload-alt fa-4x" @click="$refs.inputFile.click()"></i>
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
                  <div class="upload__progress" :style="`width:${uploadPercent}%`">
                    <p>{{uploadPercent}}%</p>
                  </div>
                </div>
                <h3>Select Thumbnail</h3>
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
                      v-model="videoData.name"
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
                <button class="success" @click="finilize()">Publish</button>
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
      isUploading: false,
      uploadPercent: 0,
      done: false,
      videoId: null,
      thumbnails: [
        "public/loading.gif",
        "public/loading.gif",
        "public/loading.gif"
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
  methods: {
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
      this.isUploading = true;
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
        "audio/ogg"
      ];

      let type = "";

      if (VIDEO_EXT.indexOf(this.$refs.inputFile.files[0].type) != -1) {
        type = "video";
      } else if (AUDIO_EXT.indexOf(this.$refs.inputFile.files[0].type) != -1) {
        type = "audio";
      }

      try {
        const uploadedVideo = await this.$api
          .axios()
          .post(`/api/actions/upload/${type}/${userId}`, formData, {
            retry: 3,
            retryDelay: 1000,
            onUploadProgress: e => {
              this.uploadPercent = Math.round((e.loaded * 100) / e.total);
            }
          });

        this.videoId = uploadedVideo.data.video.id;
        this.videoData.name = uploadedVideo.data.video.name;

        const videoThumb = await this.$api
          .axios()
          .get(`/api/actions/genrateThumbnail/${uploadedVideo.data.video.id}`);

        this.thumbnails = videoThumb.data.thumbnails;
      } catch (err) {
        this.$api._handleError(err);
      }

      const data = {
        data: `File Uploaded.`,
        color: "success"
      };

      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$refs.formFile.reset();
    },
    processFile: function() {
      this.isUploading = true;
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
        console.log(err);
      }
    }
  }
};
</script>
