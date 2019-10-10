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
          <div class="home__inner">
            <h1>Verifying</h1>
            <p>Please wait we are verifying your email.</p>
            <div class="loader-6 center" style="position:relative;">
              <span></span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <creator-footer></creator-footer>
  </div>
</template>

<script>
import creatorFooter from './../components/Landing/Footer';
import creatorHeader from './../components/Landing/Header';

export default {
  name: 'fo-verify',
  data() {
    return {
      veified: 0,
    };
  },
  components: {
    creatorFooter,
    creatorHeader,
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
  },
  methods: {
    async verify() {
      const { token } = this.$route.query;
      const { uid } = this.$route.query;
      const { redirect } = this.$route.query;

      try {
        const res = await this.$store.dispatch('VERIFY', {
          token,
          uid,
          redirect,
        });

        if (res.status == 200) {
          this.$router.push('/verify/users/verified');
        }
      } catch (err) {
        this.$router.push('/@error');
      }
    },
  },
  mounted() {
    this.verify();
  },
};
</script>
