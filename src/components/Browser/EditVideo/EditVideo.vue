<template>
  <div :class="`settings content ${theme}`">
    <div class="inner" v-show="isAllowed">
      <div class="settings__wrapper">
        <div class="card">
          <div class="card__body">
            <div class="container">
              <form enctype="multipart/form-data" ref="formFileThumbnail">
                <input type="file" hidden ref="inputFileThumbnail" @change="processThumb" />
              </form>
              <div class="grid grid--half">
                <div class="video-wrapper" v-if="uploadData.videoFile">
                  <default-video-player :src="uploadData.videoFile"></default-video-player>
                </div>
                <div class="thumbnails__wrapper" v-show="type == 'video'">
                  <h3>Select Thumbnail</h3>
                  <div
                    :class="`video__thumbnails ${uploadData && uploadData.thumbImage == thumb ? 'selected' : ''}`"
                    v-for="(thumb, i ) in uploadData.thumbnails"
                    :key="i"
                  >
                    <img
                      class="fo-image"
                      :src="`/${thumb}`"
                      alt="thumbnail"
                      @click="uploadData.thumbImage = thumb"
                    />
                  </div>
                  <div
                    class="click__wrapper video"
                    @click="$refs.inputFileThumbnail.click()"
                  >Upload Thumbnail</div>
                </div>
                <div
                  class="thumbnails__wrapper"
                  v-show=" type != 'video' && (type == 'audio' || isThumbUpload ) "
                >
                  <div
                    v-show="uploadData.thumbImage == ''"
                    class="click__wrapper"
                    @click="$refs.inputFileThumbnail.click()"
                  >Upload Thumbnail</div>
                  <div class="audio__image__wrapper" v-show="uploadData.thumbImage != ''">
                    <img
                      @click="$refs.inputFileThumbnail.click()"
                      class="fo-image"
                      :src="`/${uploadData.thumbImage}`"
                      alt="thumbnail"
                    />
                  </div>
                </div>
                <div class="upload__video__settings">
                  <div class="video__title">
                    <label for="videoTitle">Title</label>
                    <input v-model="uploadData.title" name="title" type="text" placeholder="Title" />
                  </div>
                  <div class="video__description">
                    <label for="description">Description</label>
                    <textarea
                      v-model="uploadData.description"
                      rows="10"
                      name="description"
                      type="text"
                      placeholder="Description"
                    />
                  </div>
                  <div class="video__tags">
                    <label for="tags">Tags</label>
                    <input v-model="uploadData.tags" name="tags" type="text" placeholder="Tags" />
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
import * as types from './../../../store/mutation-types';
import { setTimeout } from 'timers';

export default {
  name: 'upload',
  data() {
    return {
      isAllowed: false,
      isThumbUpload: false,
      done: false,
      type: '',
      uploadData: {
        title: '',
        agerestriction: false,
        description: '',
        tags: '',
        thumbImage: '',
        visibility: 1,
        likedPrivate: false,
        allowComments: true,
        ratings: true,
        category: 'People & Blog',
        licence: 'Flex Originals',
      },
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    async newThumb(formData, inputFile) {
      const uploaded = await this.processUpload(formData, inputFile);
      if (!uploaded) {
        return false;
      }

      if (uploaded.data.res) {
        this.uploadData.thumbImage = uploaded.data.res.path;
        this.uploadData.thumbnails.push(uploaded.data.res.path);
      }
    },
    upload: async function(formData, inputFile) {
      const uploaded = await this.processUpload(formData, inputFile);

      if (!uploaded) {
        return false;
      }

      if (this.type === 'video') {
        this.uploadData.id = uploaded.data.video.id;
        this.uploadData.title = uploaded.data.video.title;

        const videoThumb = await this.$store.dispatch('GENERATE_THUMBNAILS', {
          id: uploaded.data.video.id,
        });

        this.thumbnails = videoThumb.data.thumbnails;
        this.uploadData.thumbnails = videoThumb.data.thumbnails;
        this.uploadData.thumbImage = videoThumb.data.thumbnails[0];
      } else if (this.type === 'audio') {
        this.uploadData.id = uploaded.data.audio.id;
        this.uploadData.title = uploaded.data.audio.title;
      }
      const data = {
        data: `Uploading done!`,
        color: 'success',
      };

      this.isProcessing = false;
      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$refs.formFile.reset();
    },
    processUpload: async function(formData, inputFile) {
      const userId = this.$user.get('$userId');

      const VIDEO_EXT = [
        'video/mp4',
        'video/x-msvideo',
        'video/avi',
        'application/x-troff-msvideo',
        'video/msvideo',
      ];
      const AUDIO_EXT = [
        'audio/mpeg',
        'audio/vnd.wav',
        'audio/mp4',
        'audio/mp3',
        'audio/ogg',
      ];
      const IMAGE_EXT = [
        'image/gif',
        'image/jpeg',
        'image/svg+xml',
        'image/x-icon',
        'image/png',
      ];

      if (!this.isThumbUpload) {
        if (VIDEO_EXT.indexOf(inputFile.files[0].type) != -1) {
          this.type = 'video';
        } else if (AUDIO_EXT.indexOf(inputFile.files[0].type) != -1) {
          this.type = 'audio';
        } else if (IMAGE_EXT.indexOf(inputFile.files[0].type) != -1) {
          this.type = 'image';
        }
      } else {
        if (IMAGE_EXT.indexOf(inputFile.files[0].type) == -1) {
          const data = {
            data: `File not allowed.`,
            color: 'error',
          };

          this.$store.commit(types.SHOW_SNACKBAR, data);

          return false;
        }
      }

      if (!this.type) {
        const data = {
          data: `File not allowed.`,
          color: 'error',
        };

        this.$store.commit(types.SHOW_SNACKBAR, data);
        this.$refs.formFile.reset();
        this.$refs.formFileThumbnail.reset();
        if (typeof window !== 'undefined') {
          window.removeEventListener('beforeunload', this.beforeunload);
        }
        return false;
      }

      this.isUploading = true;
      let uploaded = null;
      const uploadType = this.isThumbUpload ? 'image' : this.type;

      uploaded = await this.$store.dispatch('UPLOAD_FILE', {
        uploadType,
        userId,
        formData,
      });

      return uploaded;
    },
    processFile: function() {
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', this.beforeunload);
      }
      const formData = new FormData();
      formData.append('file', this.$refs.inputFile.files[0]);

      setTimeout(() => {
        this.upload(formData, this.$refs.inputFile);
      }, 1000);
    },
    processThumb: function() {
      this.isThumbUpload = true;
      const formData = new FormData();
      formData.append('file', this.$refs.inputFileThumbnail.files[0]);
      this.newThumb(formData, this.$refs.inputFileThumbnail);
    },
    beforeunload(event) {
      if (typeof window !== 'undefined') {
        event = event || window.event;
      }
      // event.preventDefault();

      // For IE and Firefox prior to version 4
      if (event && !this.done) {
        event.returnValue = 'Sure?';
      }

      // For Safari
      if (!this.done) {
        return 'Sure?';
      }
    },
    finilize: async function() {
      if (!this.uploadData.thumbImage) {
        this.uploadData.thumbImage = `public/profile-icon/avatar${Math.floor(
          Math.random() * 28,
        ) + 1}.svg`;
      }

      if (this.type === 'video') {
        const publishedVideo = await this.$store.dispatch('PUBLISH_VIDEO', {
          id: this.uploadData.id,
          videoData: this.uploadData,
        });

        const data = {
          data: `Published`,
          color: 'success',
        };

        this.$store.commit(types.SHOW_SNACKBAR, data);
        this.done = true;
        if (typeof window !== 'undefined') {
          window.removeEventListener('beforeunload', this.beforeunload);
        }

        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = `/app/@watch?v=${publishedVideo.data.id}`;
          }
        }, 1000);
      } else if (this.type === 'audio') {
        const publishedAudio = await this.$store.dispatch('PUBLISH_AUDIO', {
          id: this.uploadData.id,
          audioData: this.uploadData,
        });
        const data = {
          data: `Published`,
          color: 'success',
        };
        this.$store.commit(types.SHOW_SNACKBAR, data);
        this.done = true;
        if (typeof window !== 'undefined') {
          window.removeEventListener('beforeunload', this.beforeunload);
        }

        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = `/app/@song?a=${publishedAudio.data.id}`;
          }
        }, 1000);
      }
    },
  },
  async beforeMount() {
    if (this.$route.query.v) {
      try {
        const video = await this.$store.dispatch('GET_VIDEO_INFO', {
          id: this.$route.query.v,
        });

        this.uploadData = Object.assign(this.uploadData, video.data);

        if (video.data.videoFile.includes('https')) {
          this.uploadData.videoFile = video.data.videoFile;
        } else {
          this.uploadData.videoFile = '/' + video.data.videoFile;
        }
        this.type = 'video';
        this.isAllowed = true;
      } catch (err) {
        this.$router.push('/@error');
      }
    } else {
      this.$router.push('/@error');
    }
  },
};
</script>
