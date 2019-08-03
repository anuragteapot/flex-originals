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
                <lazy-video-player
                  :src="videoSource"
                  v-if="!videoUnavaliable"
                  :autoPlay="true"
                  @handleEnded="handleEnded"
                ></lazy-video-player>
                <div :class="`video_actions ${theme}`" v-if="!videoUnavaliable">
                  <p class="video__name">Anurag</p>
                  <div class="video__analytics__info">
                    <div class="left">
                      <span class="video__views">11111 views</span>
                    </div>
                    <div class="right">
                      <span>
                        11111
                        <i class="far fa-heart"></i>
                        LIKE
                      </span>
                      <span>
                        <i class="fa fa-list" aria-hidden="true"></i>
                        SAVE
                      </span>
                      <span>
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
                        <img alt="Avatar" src="/public/atom.svg" class="avatar" />
                        <div class="channel__name">
                          Alenter
                          <i
                            class="fas fa-certificate"
                            style="color:lightgreen"
                            aria-label="verified"
                          ></i>
                        </div>
                      </div>
                    </div>

                    <div class="right">
                      <span class="follow">
                        Follow
                      </span>
                      <!-- <span>
                        <i class="far fa-bell"></i>
                      </span>-->
                    </div>
                    <div :class="`full__video__desctiption ${theme}`">
                      Presenting Bekhayali full video song, In the voice of Arijit Singh, a song that evokes the emotion of heartbreak & love at once.
                      The upcoming Bollywood movie Kabir Singh is starring Shahid Kapoor and Kiara Advani.
                      The film is directed by Sandeep Reddy Vanga. The film is produced by Bhushan Kumar, Murad Khetani,
                      Krishan Kumar & Ashwin Varde.
                    </div>
                    <p class="show__more">Show More</p>
                  </div>
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
                <div class="v-auto-play">
                  <p>Auto Play</p>
                  <label class="switch">
                    <input type="checkbox" v-model="autoPlay" />
                    <div></div>
                  </label>
                </div>
                <video-suggestions
                  v-for="item in videoSuggestions"
                  :src="'/' + item.thumbImage"
                  :key="item.id"
                  :lazySrc="lazySrc"
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
import * as types from "./../../../store/mutation-types";
export default {
  name: "media-settings",
  data: () => ({
    autoPlay: false,
    src: "/public/qq.webp",
    lazySrc: "/public/icons/music.svg",
    videoSource: "",
    videoId: "",
    analytic:"",
    videoUnavaliable: false
  }),
  watch: {
    $route() {
      this.init();
    }
  },
  computed: {
    videoSuggestions() {
      return this.$store.state.content.video.filter(
        item => item.id !== this.$route.query.v
      );
    },
    theme()
    {
      return this.$store.state.theme;
    }
  },
  components: {
    videoSuggestions
  },
  methods: {
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
        this.$store.commit(types.SET_IS_LOADING, true);

        const currentVideo = await this.$api
          .axios()
          .get(`/api/actions/getVideo/${this.$route.query.v}`);
        this.$store.commit(types.SET_IS_LOADING, false);

        if (!currentVideo.data.video) {
          this.videoUnavaliable = true;
        }
        if (currentVideo.data.video.videoFile.includes("https")) {
          this.videoSource = currentVideo.data.video.videoFile;
        } else {
          this.videoSource = "/" + currentVideo.data.video.videoFile;
        }
        this.analytic = currentVideo.data.analytic;
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
