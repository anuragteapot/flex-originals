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
                    :autoPlay="false"
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
                        <a class="like-btn">
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
                        </a>
                      </div>
                      <img
                        class="video_tool"
                        src="/public/tool_svg/003-bookmark-white.svg"
                        alt="like"
                        width="20"
                        height="20"
                      />
                      <img
                        class="video_tool"
                        src="/public/tool_svg/004-share.svg"
                        alt="like"
                        width="20"
                        height="20"
                      />
                      <img
                        class="video_tool"
                        src="/public/tool_svg/more.svg"
                        alt="like"
                        width="20"
                        height="20"
                      />
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
