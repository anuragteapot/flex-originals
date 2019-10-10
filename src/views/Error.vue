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
            <h1>Whoops, looks like we lost one!</h1>
            <p>We cant find the page you were looking for.</p>
            <!-- <img src="/public/icons/404.svg" width="200" height="200" alt="logo" /> -->
            <router-link to="/">
              <button class="btn-hover color">Get Back To Home</button>
            </router-link>
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
  name: 'fo-error',
  components: {
    creatorFooter,
    creatorHeader,
  },
};
</script>
