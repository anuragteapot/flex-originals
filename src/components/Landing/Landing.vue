<template>
  <div class="lazy_main_home">
    <div class="home__header">
      <div class="home__navbar">
        <a v-show="!loggedIn" href="/signup">Sign Up</a>
        <a v-show="!loggedIn" href="/login">Login</a>
        <a href @click.prevent="logout()" v-show="loggedIn">Logout</a>
        <a href="/">Home</a>
      </div>
    </div>
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
            <h1>Built for developers</h1>
            <p>
              GitHub is a development platform inspired by the way you work. From
              <a
                href="/open-source"
                class="text-white jumbotron-link"
              >open source</a> to
              <a href="/business" class="text-white jumbotron-link">business</a>, you can host and review code, manage projects, and build software alongside 36 million&nbsp;developers.
            </p>
          </div>
        </div>
      </section>
      <section>
        <slot></slot>
        <div class="home__container">
          <div class="home__inner">
            <button class="btn-hover color">Get Started</button>
          </div>
        </div>
      </section>
    </div>
    <div class="home_footer">
      <div class="contain">
        <div class="col">
          <h1>Company</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div class="col">
          <h1>Products</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div class="col">
          <h1>Support</h1>
          <ul>
            <li>Contact us</li>
            <li>Web chat</li>
            <li>Open ticket</li>
          </ul>
        </div>
        <div class="col social">
          <h1>Social</h1>
          <ul>
            <li>
              <i class="fab fa-facebook-f"></i>
            </li>
            <li>
              <i class="fab fa-instagram"></i>
            </li>
            <li>
              <i class="fab fa-twitter"></i>
            </li>
            <li>
              <i class="fab fa-google"></i>
            </li>
            <li>
              <i class="fab fa-github"></i>
            </li>
          </ul>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "media-home",
  computed: {
    loggedIn() {
      return this.$api.auth.loggedIn();
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$api.auth.logout();
        window.location.href = "";
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
