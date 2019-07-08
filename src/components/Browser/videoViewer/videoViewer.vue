<template>
  <div class="video-viewer content">
    <div class="inner">
      <div class="video-viewer__wrapper">
        <div class="card">
          <div class="card__body">
            <div class="container">
              <div class="grid grid--half left">
                <lazy-video-player
                  src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
                ></lazy-video-player>
                <div class="video_actions">
                  <p class="video__name">Anurag</p>
                  <div class="video__analytics__info">
                    <div class="left">
                      <span class="video__views">11111 views</span>
                    </div>
                    <div class="right">
                      <span>
                        11111
                        <i class="far fa-heart"></i>
                        Like
                      </span>
                      <span>
                        <i class="fa fa-list" aria-hidden="true"></i>
                        Save
                      </span>
                      <span>
                        <i class="fas fa-share-alt"></i>
                        Share
                      </span>
                      <span>
                        <i class="far fa-flag"></i>
                        Report
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
                        <i class="far fa-star"></i>
                        Follow
                      </span>
                      <!-- <span>
                        <i class="far fa-bell"></i>
                      </span>-->
                    </div>
                    <div class="full__video__desctiption">
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
                    </div>

                    <!-- Contenedor Principal -->
                    <div class="comments-container">
                      <ul id="comments-list" class="comments-list">
                        <li>
                          <div class="comment-main-level">
                            <!-- Avatar -->
                            <div class="comment-avatar">
                              <img
                                src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg"
                                alt
                              />
                            </div>
                            <!-- Contenedor del Comentario -->
                            <div class="comment-box">
                              <div class="comment-head">
                                <h6 class="comment-name by-author">
                                  <a href="http://creaticode.com/blog">Agustin Ortiz</a>
                                </h6>
                                <span>hace 20 minutos</span>
                                <i class="fa fa-reply"></i>
                                <i class="fa fa-heart"></i>
                              </div>
                              <div
                                class="comment-content"
                              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?</div>
                            </div>
                          </div>
                          <!-- Respuestas de los comentarios -->
                          <ul class="comments-list reply-list">
                            <li>
                              <!-- Avatar -->
                              <div class="comment-avatar">
                                <img
                                  src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg"
                                  alt
                                />
                              </div>
                              <!-- Contenedor del Comentario -->
                              <div class="comment-box">
                                <div class="comment-head">
                                  <h6 class="comment-name">
                                    <a href="http://creaticode.com/blog">Lorena Rojero</a>
                                  </h6>
                                  <span>hace 10 minutos</span>
                                  <i class="fa fa-reply"></i>
                                  <i class="fa fa-heart"></i>
                                </div>
                                <div
                                  class="comment-content"
                                >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?</div>
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
                              <!-- Contenedor del Comentario -->
                              <div class="comment-box">
                                <div class="comment-head">
                                  <h6 class="comment-name by-author">
                                    <a href="http://creaticode.com/blog">Agustin Ortiz</a>
                                  </h6>
                                  <span>hace 10 minutos</span>
                                  <i class="fa fa-reply"></i>
                                  <i class="fa fa-heart"></i>
                                </div>
                                <div
                                  class="comment-content"
                                >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?</div>
                              </div>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <div class="comment-main-level">
                            <!-- Avatar -->
                            <div class="comment-avatar">
                              <img
                                src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg"
                                alt
                              />
                            </div>
                            <!-- Contenedor del Comentario -->
                            <div class="comment-box">
                              <div class="comment-head">
                                <h6 class="comment-name">
                                  <a href="http://creaticode.com/blog">Lorena Rojero</a>
                                </h6>
                                <span>hace 10 minutos</span>
                                <i class="fa fa-reply"></i>
                                <i class="fa fa-heart"></i>
                              </div>
                              <div
                                class="comment-content"
                              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="load__more">
                      <button>Load More</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid--half right">
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>

                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
                <video-suggestions :src="src" :lazySrc="lazySrc"></video-suggestions>
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

export default {
  name: "media-settings",
  data: () => ({
    src: "/public/qq.webp",
    lazySrc: "/public/icons/music.svg"
  }),
  components: {
    videoSuggestions
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      } catch (err) {
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      }
    }
  }
};
</script>
