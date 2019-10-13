<template>
  <div :class="`video-viewer content ${theme}`">
    <div class="inner">
      <div class="video-viewer__wrapper">
        <div class="card">
          <div class="card__body">
            <div class="container">
              <div class="grid grid--half left">
                <div class="video__unavaliable" v-show="videoUnavaliable">
                  <p>
                    <i class="fas fa-exclamation-circle"></i> Video unavaliable
                  </p>
                </div>
                <div v-if="!isMobile" :class="`video-wrapper ${ isMobile ? 'mobile' : ''}`">
                  <fo-video-player
                    :src="videoSource"
                    v-show="!videoUnavaliable"
                    :autoPlay="true"
                    @handleEnded="handleEnded"
                    @halfTime="halfTime"
                    :videoInfo="video"
                    :disablekey="comment.length > 0"
                  ></fo-video-player>
                </div>
                <div v-else :class="`video-wrapper ${ isMobile ? 'mobile' : ''}`">
                  <default-video-player v-show="!videoUnavaliable" :src="videoSource"></default-video-player>
                </div>
                <div :class="`video_actions ${theme}`" v-show="!videoUnavaliable">
                  <p class="video__name">{{ video.title}}</p>
                  <div class="video__analytics__info">
                    <div class="left">
                      <span
                        class="video__views"
                      >{{analytic.views}} views . Published {{ $utils.time_ago(new Date(video.published)) }}</span>
                    </div>
                    <div class="right">
                      <video-reactions :video="video"></video-reactions>
                      <video-options :video="video"></video-options>
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
                      <button class="edit__video" v-show="user.id == loggedUser.id">
                        <router-link :to="`/app/@editvideo?v=${this.video.id}`">Edit Video</router-link>
                      </button>
                      <button
                        class="following"
                        v-show="(user.id != loggedUser.id) && following"
                        @click="unFollow"
                      >Following</button>
                      <button
                        class="follow"
                        v-show="(user.id != loggedUser.id) && !following"
                        @click="follow"
                      >Follow</button>
                    </div>
                  </div>

                  <div :class="`full__video__desctiption ${theme}`">{{ video.description}}</div>
                  <br />
                  <p class="show__more">Show More</p>
                  <div class="video__comments">
                    <div class="v-comment">
                      <div class="v-comment__user">
                        Comments as
                        <strong>{{ user.username}}</strong>
                      </div>
                      <div class="v-comment_box__wrapper">
                        <textarea
                          v-model="comment"
                          class="v-comment__box"
                          type="text"
                          placeholder="Add your comment "
                        ></textarea>
                        <div class="v-comment__button">
                          <button class="v-comment__button_submit" @click="doComment">Comment</button>
                        </div>
                      </div>
                    </div>
                    <div class="comments-container">
                      <ul id="comments-list" class="comments-list">
                        <li>
                          <div class="comment-main-level">
                            <div class="comment-avatar">
                              <img :src="settings.profileAvatar" alt />
                            </div>
                            <div class="comment-box">
                              <div class="comment-head">
                                <h6 class="comment-name by-author">
                                  <a href="https://anu1601cs.github.io/my_web/">Anurag Kumar</a>
                                </h6>
                                <span>Just now</span>

                                <i class="fa fa-heart"></i>
                              </div>
                              <div class="comment-content">Comment feature coming soon.... :)</div>
                            </div>
                          </div>
                          <!-- <ul class="comments-list reply-list">
                            <li>
                              <div class="comment-avatar">
                                <img :src="settings.profileAvatar" alt />
                              </div>
                              <div class="comment-box">
                                <div class="comment-head">
                                  <h6 class="comment-name">
                                    <a href="https://anu1601cs.github.io/my_web/">Amit raj</a>
                                  </h6>
                                  <span>hace 10 minutos</span>

                                  <i class="fa fa-heart"></i>
                                </div>
                                <div class="comment-content">
                                  Presenting Bekhayali full video song, In the voice of Arijit Singh, a song that evokes the emotion of heartbreak & love at once.
                                  The upcoming Bollywood movie Kabir Singh is starring Shahid Kapoor and Kiara Advani.
                                </div>
                              </div>
                            </li>

                            <li>
                              <div class="comment-avatar">
                                <img :src="settings.profileAvatar" alt />
                              </div>
                              <div class="comment-box">
                                <div class="comment-head">
                                  <h6 class="comment-name by-author">
                                    <a href="https://anu1601cs.github.io/my_web/">Anurag Kumar</a>
                                  </h6>
                                  <span>hace 10 minutos</span>

                                  <i class="fa fa-heart"></i>
                                </div>
                                <div class="comment-content">
                                  Presenting Bekhayali full video song, In the voice of Arijit Singh, a song that evokes the emotion of heartbreak & love at once.
                                  The upcoming Bollywood movie Kabir Singh is starring Shahid Kapoor and Kiara Advani.
                                </div>
                              </div>
                            </li>
                          </ul>-->
                        </li>

                        <!-- <li>
                          <div class="comment-main-level">
                            <div class="comment-avatar">
                              <img :src="settings.profileAvatar" alt />
                            </div>
                            <div class="comment-box">
                              <div class="comment-head">
                                <h6 class="comment-name">
                                  <a href="https://anu1601cs.github.io/my_web/">Amit Raj</a>
                                </h6>
                                <span>hace 10 minutos</span>

                                <i class="fa fa-heart"></i>
                              </div>
                              <div class="comment-content">
                                Presenting Bekhayali full video song, In the voice of Arijit Singh, a song that evokes the emotion of heartbreak & love at once.
                                The upcoming Bollywood movie Kabir Singh is starring Shahid Kapoor and Kiara Advani.
                              </div>
                            </div>
                          </div>
                        </li>-->
                      </ul>
                    </div>
                    <div class="load__more">
                      <p>Load More</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid--half right" v-show="!videoUnavaliable">
                <video-suggestions
                  v-for="item in videoSuggestions"
                  :src="'/' + item.thumbImage"
                  :key="item.id"
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
import videoSuggestions from './videoSuggestions';
import videoOptions from './videoOptions';
import videoReactions from './videoReaction';
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
    theme() {
      return this.$store.state.theme;
    },
    loggedUser() {
      return this.$user.getUser();
    },
  },
  components: {
    videoSuggestions,
    videoOptions,
    videoReactions,
  },
  methods: {
    doComment(){

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
        if (currentVideo.data.video.videoFile.includes('https')) {
          this.videoSource = currentVideo.data.video.videoFile;
        } else {
          this.videoSource = '/' + currentVideo.data.video.videoFile;
        }
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
