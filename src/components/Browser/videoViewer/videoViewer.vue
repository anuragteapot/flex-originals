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
                    :videoInfo="video"
                    :disablekey="comment.length > 0"
                  ></fo-video-player>
                </div>
                <div :class="`video_actions ${theme}`" v-if="!videoUnavaliable">
                  <p class="video__name">{{ video.title}}</p>
                  <div class="video__analytics__info">
                    <div class="left">
                      <span
                        class="video__views"
                      >{{analytic.views}} views . Published {{ $utils.time_ago(new Date(video.published)) }}</span>
                    </div>
                    <div class="right">
                      <div class="feed">
                        <button class="like-btn fo-button">
                          <img
                            v-if="like != 0 && likeMap[like-1]"
                            :src="likeMap[like-1]"
                            alt="like"
                            width="20"
                            height="20"
                            @click="reaction(0)"
                          />
                          <img
                            v-else
                            src="/public/emoji/001-no.svg"
                            alt="like"
                            width="20"
                            height="20"
                          />
                          <div class="reaction-box">
                            <div class="reaction-icon show">
                              <label>Like</label>
                              <img
                                @click="reaction(1)"
                                src="/public/emoji/002-heart.svg"
                                alt="like"
                              />
                            </div>
                            <div class="reaction-icon show">
                              <label>Love</label>
                              <img
                                @click="reaction(2)"
                                src="/public/emoji//002-in-love.svg"
                                alt="Love"
                              />
                            </div>
                            <div class="reaction-icon show">
                              <label>Haha</label>
                              <img @click="reaction(3)" src="/public/emoji/happy.svg" alt="smiling" />
                            </div>
                            <div class="reaction-icon show">
                              <label>Thinking</label>
                              <img
                                @click="reaction(4)"
                                src="/public/emoji/001-thinking.svg"
                                alt="wow"
                              />
                            </div>
                            <div class="reaction-icon show">
                              <label>Sad</label>
                              <img @click="reaction(5)" src="/public/emoji/004-sad.svg" alt="sad" />
                            </div>
                            <div class="reaction-icon show">
                              <label>Angry</label>
                              <img
                                @click="reaction(6)"
                                src="/public/emoji/005-angry.svg"
                                alt="angry"
                              />
                            </div>
                          </div>
                        </button>
                      </div>
                      <button class="fo-button video-option" aria-label="save">
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          width="20px"
                          height="20px"
                          viewBox="0 0 431.972 431.972"
                          style="enable-background:new 0 0 431.972 431.972;"
                          xml:space="preserve"
                        >
                          <g>
                            <path
                              d="M393.146,14.279c-3.713-5.333-8.713-9.233-14.989-11.707c-3.997-1.711-8.186-2.568-12.565-2.568V0H66.378
		c-4.377,0-8.562,0.857-12.56,2.568c-6.28,2.472-11.278,6.377-14.989,11.707c-3.71,5.33-5.568,11.228-5.568,17.701v368.019
		c0,6.475,1.858,12.371,5.568,17.706c3.711,5.329,8.709,9.233,14.989,11.704c3.994,1.711,8.183,2.566,12.56,2.566
		c8.949,0,16.844-3.142,23.698-9.418l125.91-121.062l125.91,121.065c6.663,6.081,14.562,9.127,23.695,9.127
		c4.76,0,8.948-0.756,12.565-2.279c6.276-2.471,11.276-6.375,14.989-11.711c3.71-5.328,5.564-11.225,5.564-17.699V31.98
		C398.71,25.507,396.852,19.609,393.146,14.279z M362.166,391.139L241.397,275.224l-25.411-24.264l-25.409,24.264L69.809,391.139
		V36.549h292.357V391.139L362.166,391.139z"
                            />
                          </g>
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                        </svg>
                      </button>
                      <button class="fo-button video-option" aria-label="share">
                        <svg
                          id="Capa_1"
                          enable-background="new 0 0 551.13 551.13"
                          height="20"
                          viewBox="0 0 551.13 551.13"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m465.016 172.228h-51.668v34.446h34.446v310.011h-344.457v-310.011h34.446v-34.446h-51.669c-9.52 0-17.223 7.703-17.223 17.223v344.456c0 9.52 7.703 17.223 17.223 17.223h378.902c9.52 0 17.223-7.703 17.223-17.223v-344.456c0-9.52-7.703-17.223-17.223-17.223z"
                          />
                          <path
                            d="m258.342 65.931v244.08h34.446v-244.08l73.937 73.937 24.354-24.354-115.514-115.514-115.514 115.514 24.354 24.354z"
                          />
                        </svg>
                      </button>
                      <button class="fo-button video-option" aria-label="more">
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          width="20px"
                          height="20px"
                          viewBox="0 0 60 60"
                          style="enable-background:new 0 0 60 60;"
                          xml:space="preserve"
                        >
                          <g>
                            <path
                              d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z"
                            />
                            <path
                              d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z"
                            />
                            <path
                              d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"
                            />
                          </g>
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                          <g />
                        </svg>
                      </button>
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
                          <button class="v-comment__button_submit">Comment</button>
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
                                  <a href="http://creaticode.com/blog">Anurag Kumar</a>
                                </h6>
                                <span>hace 20 minutos</span>

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
                                <img :src="settings.profileAvatar" alt />
                              </div>
                              <div class="comment-box">
                                <div class="comment-head">
                                  <h6 class="comment-name">
                                    <a href="http://creaticode.com/blog">Amit raj</a>
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
                              <!-- Avatar -->
                              <div class="comment-avatar">
                                <img :src="settings.profileAvatar" alt />
                              </div>
                              <div class="comment-box">
                                <div class="comment-head">
                                  <h6 class="comment-name by-author">
                                    <a href="http://creaticode.com/blog">Anurag Kumar</a>
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
                          </ul>
                        </li>

                        <li>
                          <div class="comment-main-level">
                            <div class="comment-avatar">
                              <img :src="settings.profileAvatar" alt />
                            </div>
                            <div class="comment-box">
                              <div class="comment-head">
                                <h6 class="comment-name">
                                  <a href="http://creaticode.com/blog">Amit Raj</a>
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
import utils from './../../../api/utils';
import { mapGetters } from 'vuex';
import * as types from './../../../store/mutation-types';
export default {
  name: 'media-settings',
  data: () => ({
    comment: '',
    likeMap: [
      '/public/emoji/002-heart.svg',
      '/public/emoji//002-in-love.svg',
      '/public/emoji/happy.svg',
      '/public/emoji/001-thinking.svg',
      '/public/emoji/004-sad.svg',
      '/public/emoji/005-angry.svg',
    ],
    following: false,
    videoSource: '',
    like: 0,
    videoId: '',
    lazyImage: '/public/logo.png',
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
  },
  methods: {
    async reaction(react) {
      const like = await this.$store.dispatch('LIKE_END_POINT', {
        userId: this.loggedUser.id,
        videoId: this.video.id,
        reaction: react,
      });

      this.like = like.data.REACTION;
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
    logout() {
      this.$user.logout('/app/@home?u=logout');
    },
    async init() {
      if (this.$route.query.v) {
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

        const follow = await this.$store.dispatch('GET_FOLLOW', {
          followId: this.loggedUser.id,
          channelId: this.user.id,
        });

        this.following = follow.data.SUCCESS;

        if (this.loggedUser.id && this.video.id) {
          const like = await this.$store.dispatch('GET_LIKE', {
            userId: this.loggedUser.id,
            videoId: this.video.id,
          });

          this.like = like.data.REACTION;
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
