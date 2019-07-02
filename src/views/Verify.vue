<template>
  <div class="lazy_main_home">
    <creator-header></creator-header>
    <div class="home__body">
      <section>
        <div class="background-shapes-wrapper">
          <div class="background-shapes-container">
            <div class="background-shape square-one"></div>
            <div class="background-shape square-two"></div>
            <div class="background-shape square-three"></div>
            <div class="background-shape square-four"></div>
          </div>
        </div>
        <div class="home__container">
          <div class="home__inner" v-if="type == 'verified'">
            <h1>Verified</h1>
            <p>Congratulations your account is now verified.</p>
            <img src="/public/icons/checkmark.svg" width="200" height="200" />
          </div>
          <div class="home__inner" v-if="type == 'confirm'">
            <h1>Verifying</h1>
            <p>Please wait we are verifying your email.</p>
            <div class="loader-6 center" style="position:relative;">
              <span></span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="home__container" v-if="!type">
          <div class="home__inner">
            <a href="/login">
              <button class="btn-hover color">Get Started</button>
            </a>
          </div>
        </div>
      </section>
    </div>
    <creator-footer></creator-footer>
  </div>
</template>

<script>
import creatorFooter from "./../components/Landing/Footer";
import creatorHeader from "./../components/Landing/Header";

export default {
  name: "media-home",
  data() {
    return {
      veified: 0
    };
  },
  components: {
    creatorFooter,
    creatorHeader
  },
  computed: {
    type() {
      return this.$route.params.type;
    }
  },
  methods: {
    async verify() {
      const { token } = this.$route.query;
      const { uid } = this.$route.query;
      const { redirect } = this.$route.query;

      try {
        const res = await this.$store.dispatch("verify", {
          token,
          uid,
          redirect
        });

        if (res.status == 200) {
          this.$router.push("/verify/users/verified");
        }
      } catch (err) {
        this.$router.push("/@error");
      }
    }
  },
  mounted() {
    this.verify();
  }
};
</script>
