<template>
  <div>
    <lazy-video-player
      src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
    ></lazy-video-player>
    <label class="switch">
      <input type="checkbox">
      <div></div>
    </label>
    <div class="radio">
      <input id="1" type="radio" name="b" checked>
      <label for="1">Option 1</label>
    </div>
    <div class="radio">
      <input id="2" type="radio" name="b">
      <label for="2">Option 2</label>
    </div>
    <div class="checkbox">
      <input id="one" type="checkbox">
      <span class="check"></span>
      <label for="one">Check me!</label>
    </div>
  </div>
</template>
<script>
import { api } from "./../../app/Api";

export default {
  name: "lazy-login",
  data() {
    return {
      password: "",
      loading: false,
      email: ""
    };
  },
  methods: {
    submit() {
      const data = {
        email: this.email,
        password: this.password
      };
      this.loading = true;
      this.$store
        .dispatch("login", data)
        .then(result => {
          this.finalize(result);
        })
        .catch(err => {
          this.loading = false;
          api._handleError(err);
        });
    },
    finalize(response) {
      api.mediastorage.cookies.set("name", response.data.userData.name, 5000);
      api.mediastorage.cookies.set("email", response.data.userData.email, 5000);
      api.mediastorage.cookies.set("token", response.data.token, 5000);
      api.mediastorage.session.set("name", response.data.userData.name);
      api.mediastorage.session.set("email", response.data.userData.email);
      api.mediastorage.session.set("token", response.data.token);
      this.$store.state.token = response.data.token;
      this.$store.state.isUserLoggedIn = true;

      var timer = setInterval(
        function() {
          if (api.auth.loggedIn()) {
            clearInterval(timer);
            if (response.status == 200) {
              const payload = {};

              payload.action = "get";
              payload.settings = response.data.userData;

              this.$store
                .dispatch("settings", payload)
                .then(() => {
                  this.$router.push("/drive/u/0/my-drive");
                })
                .catch(err => {
                  api._handleError(err);
                });
              this.loading = false;
            }
          }
        }.bind(this),
        500
      );
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
