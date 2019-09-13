<template>
  <div :class="`video-viewer content ${theme}`">
    <div class="inner">
      <div class="video-viewer__wrapper">
        <div class="card">
          <div class="card__body">
            <div class="container">
              <div class="grid grid--half left">
                <div class="video__unavaliable" v-if="videoUnavaliable">
                  <p>
                    <i class="fas fa-exclamation-circle"></i> Video unavaliable
                  </p>
                </div>
                <div :class="`video-wrapper ${ isMobile ? 'mobile' : ''}`">
                  <fo-video-player
                    :src="videoSource"
                    v-if="!videoUnavaliable"
                    :autoPlay="true"
                    @handleEnded="handleEnded"
                    @halfTime="halfTime"
                  ></fo-video-player>
                </div>
                <!-- <div class="emoji__wrapper">
                  <div class="emoji emoji--like">
                    <div class="emoji__hand">
                      <div class="emoji__thumb"></div>
                    </div>
                  </div>
                  <div class="emoji emoji--love">
                    <div class="emoji__heart"></div>
                  </div>
                  <div class="emoji emoji--haha">
                    <div class="emoji__face">
                      <div class="emoji__eyes"></div>
                      <div class="emoji__mouth">
                        <div class="emoji__tongue"></div>
                      </div>
                    </div>
                  </div>
                  <div class="emoji emoji--yay">
                    <div class="emoji__face">
                      <div class="emoji__eyebrows"></div>
                      <div class="emoji__mouth"></div>
                    </div>
                  </div>
                  <div class="emoji emoji--wow">
                    <div class="emoji__face">
                      <div class="emoji__eyebrows"></div>
                      <div class="emoji__eyes"></div>
                      <div class="emoji__mouth"></div>
                    </div>
                  </div>
                  <div class="emoji emoji--sad">
                    <div class="emoji__face">
                      <div class="emoji__eyebrows"></div>
                      <div class="emoji__eyes"></div>
                      <div class="emoji__mouth"></div>
                    </div>
                  </div>
                  <div class="emoji emoji--angry">
                    <div class="emoji__face">
                      <div class="emoji__eyebrows"></div>
                      <div class="emoji__eyes"></div>
                      <div class="emoji__mouth"></div>
                    </div>
                  </div>
                </div>-->
                <div :class="`video_actions ${theme}`" v-if="!videoUnavaliable">
                  <p class="video__name">{{ video.title}}</p>
                  <div class="video__analytics__info">
                    <div class="left">
                      <span
                        class="video__views"
                      >{{analytic.views}} views . Published {{ $api.time_ago(new Date(video.published)) }}</span>
                    </div>
                    <div class="right">
                      <span>
                        <i class="far fa-heart"></i>
                        LIKE
                      </span>
                      <span>
                        <i class="fa fa-list"></i>
                        SAVE
                      </span>
                      <span @click="share()">
                        <i class="fas fa-share"></i>
                        SHARE
                      </span>
                      <span>
                        <i class="fas fa-ellipsis-h"></i>
                      </span>
                    </div>
                  </div>
                  <div class="video__description">
                    <div class="left">
                      <div class="channel__avater">
                        <router-link :to="`/app/@channel/${user.id}`">
                          <img
                            alt="Avatar"
                            :src=" settings.profileAvatar || `/public/logo.png`"
                            class="avatar"
                          />
                        </router-link>
                        <div class="channel__name">{{user.username}}</div>
                        <img src="/public/verified.svg" style="width:15px!important" />
                      </div>
                    </div>
                    <div class="right">
                      <button class="edit__video" v-if="user.id == loggedUser.id">
                        <router-link :to="`/app/@editvideo?v=${this.video.id}`">Edit Video</router-link>
                      </button>
                      <button class="following" v-else-if="following" @click="unFollow">Following</button>
                      <button class="follow" v-else-if="!following" @click="follow">Follow</button>
                    </div>
                  </div>

                  <div :class="`full__video__desctiption ${theme}`">{{ video.description}}</div>
                  <br />
                  <p class="show__more">Show More</p>
                  <div class="video__comments">
                    <div class="v-comment">
                      <i class="fas fa-comment"></i>
                      Comments
                      <br />
                      <input type="text" placeholder="Add your comment " />
                    </div>
                    <div class="comments-container">
                      <ul id="comments-list" class="comments-list">
                        <li>
                          <div class="comment-main-level">
                            <div class="comment-avatar">
                              <img
                                src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg"
                                alt
                              />
                            </div>
                            <div class="comment-box">
                              <div class="comment-head">
                                <h6 class="comment-name by-author">
                                  <a href="http://creaticode.com/blog">Anurag Kumar</a>
                                </h6>
                                <span>hace 20 minutos</span>
                                <i class="fa fa-reply"></i>
                                <i class="fa fa-heart"></i>
                              </div>
                              <div class="comment-content">
                                Presenting Bekhayali full video song, In the voice of Arijit Singh, a song that evokes the emotion of heartbreak & love at once.
                                The upcoming Bollywood movie Kabir Singh is starring Shahid Kapoor and Kiara Advani.
                              </div>
                            </div>
                          </div>
                          <ul class="comments-list reply-list">
                            <li>
                              <div class="comment-avatar">
                                <img
                                  src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg"
                                  alt
                                />
                              </div>
                              <div class="comment-box">
                                <div class="comment-head">
                                  <h6 class="comment-name">
                                    <a href="http://creaticode.com/blog">Amit raj</a>
                                  </h6>
                                  <span>hace 10 minutos</span>
                                  <i class="fa fa-reply"></i>
                                  <i class="fa fa-heart"></i>
                                </div>
                                <div class="comment-content">
                                  Presenting Bekhayali full video song, In the voice of Arijit Singh, a song that evokes the emotion of heartbreak & love at once.
                                  The upcoming Bollywood movie Kabir Singh is starring Shahid Kapoor and Kiara Advani.
                                </div>
                              </div>
                            </li>

                            <li>
                              <!-- Avatar -->
                              <div class="comment-avatar">
                                <img
                                  src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg"
                                  alt
                                />
                              </div>
                              <div class="comment-box">
                                <div class="comment-head">
                                  <h6 class="comment-name by-author">
                                    <a href="http://creaticode.com/blog">Anurag Kumar</a>
                                  </h6>
                                  <span>hace 10 minutos</span>
                                  <i class="fa fa-reply"></i>
                                  <i class="fa fa-heart"></i>
                                </div>
                                <div class="comment-content">
                                  Presenting Bekhayali full video song, In the voice of Arijit Singh, a song that evokes the emotion of heartbreak & love at once.
                                  The upcoming Bollywood movie Kabir Singh is starring Shahid Kapoor and Kiara Advani.
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <div class="comment-main-level">
                            <div class="comment-avatar">
                              <img
                                src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg"
                                alt
                              />
                            </div>
                            <div class="comment-box">
                              <div class="comment-head">
                                <h6 class="comment-name">
                                  <a href="http://creaticode.com/blog">Amit Raj</a>
                                </h6>
                                <span>hace 10 minutos</span>
                                <i class="fa fa-reply"></i>
                                <i class="fa fa-heart"></i>
                              </div>
                              <div class="comment-content">
                                Presenting Bekhayali full video song, In the voice of Arijit Singh, a song that evokes the emotion of heartbreak & love at once.
                                The upcoming Bollywood movie Kabir Singh is starring Shahid Kapoor and Kiara Advani.
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="load__more">
                      <p>Load More</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid--half right" v-if="!videoUnavaliable">
                <video-suggestions
                  v-for="item in videoSuggestions"
                  :src="'/' + item.thumbImage"
                  :key="item.id"
                  :lazySrc="item.lazySrc || lazyImage"
                  :item="item"
                ></video-suggestions>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videoSuggestions from "./videoSuggestions";
import { api } from "./../../../app/Api";
import { mapGetters } from "vuex";
import * as types from "./../../../store/mutation-types";
export default {
  name: "media-settings",
  data: () => ({
    following: false,
    videoSource: "",
    videoId: "",
    lazyImage: "/public/logo2.jpg",
    analytic: "",
    user: {},
    settings: {},
    video: {},
    videoUnavaliable: false
  }),
  watch: {
    $route() {
      this.init();
    }
  },
  computed: {
    ...mapGetters(["isMobile"]),
    videoSuggestions() {
      return this.$store.state.content.video.filter(
        item => item.id !== this.$route.query.v
      );
    },
    autoPlay() {
      return this.$store.state.autoplay;
    },
    theme() {
      return this.$store.state.theme;
    },
    loggedUser() {
      return this.$store.state.user;
    }
  },
  components: {
    videoSuggestions
  },
  methods: {
    async unFollow() {
      const follow = await this.$store.dispatch("unFollow", {
        followId: this.loggedUser.id,
        channelId: this.user.id
      });

      this.following = follow.data.SUCCESS;

      const res = await this.$store.dispatch("getFollowers", {
        followId: this.loggedUser.id
      });
      this.$store.commit(types.SET_FOLLOWING, res.data);
    },
    async follow() {
      const follow = await this.$store.dispatch("doFollow", {
        followId: this.loggedUser.id,
        channelId: this.user.id
      });

      this.following = follow.data.SUCCESS;

      const res = await this.$store.dispatch("getFollowers", {
        followId: this.loggedUser.id
      });
      this.$store.commit(types.SET_FOLLOWING, res.data);
    },
    share() {
      this.$store.commit(types.SHOW_MODAL, {
        state: true,
        type: "MShareModal"
      });
    },
    halfTime: api.debounce(async function() {
      try {
        await this.$api
          .axios()
          .post(`/api/videoAnalytics/updateViews`, { id: this.video.id });
      } catch (err) {
        this.$api._handleError(err);
      }
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
    async init() {
      if (this.$route.query.v) {
        this.$api.Nprogress.start();
        this.$store.commit(types.SET_IS_LOADING, true);
        let currentVideo = {};
        try {
          currentVideo = await this.$api
            .axios()
            .get(`/api/actions/getVideo/${this.$route.query.v}`);
          this.$store.commit(types.SET_IS_LOADING, false);
          this.$api.Nprogress.done();
        } catch (err) {
          this.videoUnavaliable = true;
          this.$store.commit(types.SET_IS_LOADING, false);
          this.$api.Nprogress.done();
        }

        if (!currentVideo.data) {
          this.videoUnavaliable = true;
        }
        if (currentVideo.data.video.videoFile.includes("https")) {
          this.videoSource = currentVideo.data.video.videoFile;
        } else {
          this.videoSource = "/" + currentVideo.data.video.videoFile;
        }
        this.analytic = currentVideo.data.analytic;
        this.user = currentVideo.data.user;
        this.settings = currentVideo.data.settings;
        this.video = currentVideo.data.video;

        const follow = await this.$store.dispatch("getFollow", {
          followId: this.loggedUser.id,
          channelId: this.user.id
        });

        this.following = follow.data.SUCCESS;
      } else {
        this.$router.push("/@error");
      }
    }
  },
  async beforeMount() {
    this.init();
  }
};
</script>
