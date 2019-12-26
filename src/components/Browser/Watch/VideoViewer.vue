<template>
  <div class="video-viewer content">
    <div class="inner">
      <div class="video-viewer__wrapper">
        <div class="container">
          <div class="grid grid--half left">
            <div class="video__unavaliable" v-show="videoUnavaliable">
              <p><i class="fas fa-exclamation-circle"></i> Video unavaliable</p>
            </div>
            <div
              v-if="!isMobile"
              :class="`video-wrapper ${isMobile ? 'mobile' : ''}`"
            >
              <fo-video-player
                :src="$utils.getUrl(videoSource, 'video')"
                v-show="!videoUnavaliable"
                :autoPlay="true"
                @handleEnded="handleEnded"
                @halfTime="halfTime"
                :videoInfo="video"
                :disablekey="comment.length > 0"
              ></fo-video-player>
            </div>
            <div v-else :class="`video-wrapper ${isMobile ? 'mobile' : ''}`">
              <default-video-player
                v-show="!videoUnavaliable"
                :src="$utils.getUrl(videoSource, 'video')"
              ></default-video-player>
            </div>
            <div class="video_actions" v-show="!videoUnavaliable">
              <p class="video__title">{{ video.title }}</p>
              <div class="video__analytics__info">
                <div class="left">
                  <span class="video__views"
                    >{{ analytic.views }} views . Published
                    {{ $utils.time_ago(new Date(video.published)) }}</span
                  >
                </div>
                <div class="right">
                  <video-reactions :video="video"></video-reactions>
                  <!-- <video-options :video="video"></video-options> -->
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid--half right" v-show="!videoUnavaliable">
            <video-comment
              @comment="
                val => {
                  comment = val;
                }
              "
            ></video-comment>
          </div>
        </div>
        <video-suggestions></video-suggestions>
      </div>
    </div>
  </div>
</template>

<script>
import videoSuggestions from './Suggestions';
import videoComment from './Comment';
// import videoOptions from './Options';
import videoReactions from './Reaction';
import utils from './../../../api/utils';
import { mapGetters } from 'vuex';
import * as types from './../../../store/mutation-types';
export default {
  name: 'media-settings',
  data: () => ({
    comment: '',
    following: false,
    videoSource: '',
    videoId: '',
    analytic: '',
    user: {},
    settings: {},
    video: {},
    videoUnavaliable: false,
  }),
  watch: {
    $route() {
      this.init();
    },
  },
  computed: {
    ...mapGetters(['isMobile']),
    videoSuggestions() {
      return this.$store.state.content.video.filter(
        item => item.id !== this.$route.query.v,
      );
    },
    autoPlay() {
      return this.$store.state.autoplay;
    },
    loggedUser() {
      return this.$user.getUser();
    },
  },
  components: {
    videoSuggestions,
    videoComment,
    // videoOptions,
    videoReactions,
  },
  methods: {
    doComment() {
      console.log(this.$store.state.user.id);
    },
    async unFollow() {
      const follow = await this.$store.dispatch('UN_FOLLOW', {
        followId: this.loggedUser.id,
        channelId: this.user.id,
      });

      this.following = follow.data.SUCCESS;

      const res = await this.$store.dispatch('GET_FOLLOWERS', {
        followId: this.loggedUser.id,
      });
      this.$store.commit(types.SET_FOLLOWING, res.data);
    },
    async follow() {
      const follow = await this.$store.dispatch('DO_FOLLOW', {
        followId: this.loggedUser.id,
        channelId: this.user.id,
      });

      this.following = follow.data.SUCCESS;

      const res = await this.$store.dispatch('GET_FOLLOWERS', {
        followId: this.loggedUser.id,
      });
      this.$store.commit(types.SET_FOLLOWING, res.data);
    },
    share() {
      this.$store.commit(types.SHOW_MODAL, {
        state: true,
        type: 'MShareModal',
      });
    },
    halfTime: new utils().debounce(async function() {
      await this.$store.dispatch('UPDATE_VIDEO_VIEWS', { id: this.video.id });
    }, 2000),
    handleEnded() {
      const videos = this.$store.state.content.video;
      if (this.autoPlay && this.videoSuggestions.length > 0) {
        const newVideoId =
          videos.findIndex(x => x.id === this.$route.query.v) + 1;
        if (newVideoId < videos.length) {
          this.$router.push(`/app/@watch?v=${videos[newVideoId].id}`);
        }
      }
    },
    async init() {
      if (this.$route.query.v) {
        this.$store.commit(types.APP_DRAWER, false);
        let currentVideo = {};
        try {
          currentVideo = await this.$store.dispatch('GET_VIDEO', {
            id: this.$route.query.v,
          });
        } catch (err) {
          this.videoUnavaliable = true;
        }

        if (!currentVideo.data) {
          this.videoUnavaliable = true;
        }

        this.videoSource = currentVideo.data.video.videoFile;

        this.analytic = currentVideo.data.analytic;
        this.user = currentVideo.data.user;
        this.settings = currentVideo.data.settings;
        this.video = currentVideo.data.video;

        if (this.loggedUser.id) {
          const follow = await this.$store.dispatch('GET_FOLLOW', {
            followId: this.loggedUser.id,
            channelId: this.user.id,
          });
          this.following = follow.data.SUCCESS;
        }
      } else {
        this.$router.push('/@error');
      }
    },
  },
  async beforeMount() {
    this.init();
  },
};
</script>
