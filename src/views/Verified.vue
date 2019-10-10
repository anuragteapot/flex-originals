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
            <h1>Verified</h1>
            <p>Congratulations your account is now verified.</p>
            <img src="/public/icons/checkmark.svg" width="200" height="200" alt="checkmark" />
          </div>
        </div>
      </section>
      <section>
        <div class="home__container">
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
import creatorFooter from './../components/Landing/Footer';
import creatorHeader from './../components/Landing/Header';

export default {
  name: 'fo-verified',
  data() {
    return {};
  },
  components: {
    creatorFooter,
    creatorHeader,
  },
};
</script>
