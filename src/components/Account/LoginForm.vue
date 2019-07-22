<template>
  <div class="login">
    <div class="header">
      <h1>Welcome back!</h1>
      <div class="social">
        <div class="box">
          <i class="fab fa-facebook-f" aria-hidden="true"></i>
        </div>
        <div class="box">
          <i class="fab fa-google" aria-hidden="true"></i>
        </div>
        <div class="box">
          <i class="fab fa-twitter" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="body">
      <p>We're so excited to see you again!</p>
      <form @submit.prevent="submit">
        <div class="email">
          <input
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            autofocus="autofocus"
            name="email"
            v-model="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div class="password">
          <input
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            autofocus="autofocus"
            name="password"
            v-model="password"
            type="password"
            placeholder="Password"
          />
          <span>Forget Password ?</span>
        </div>
        <button class="btn-hover color" :disabled="loading">
          <span v-show="!loading">Login</span>
          <div v-show="loading" class="loading-dots">
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
          </div>
        </button>
      </form>
    </div>
    <div class="footer">
      <p>
        Don't have an account?
        <a href="/signup">Sign up</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "lazy-login",
  data() {
    return {
      loading: false,
      password: "",
      email: ""
    };
  },
  computed: {
    Vname: function() {
      if (!this.name) return true;
      return this.$api.regName.test(this.name);
    },
    Vemail: function() {
      if (!this.email) return true;
      return this.$api.regEmail.test(this.email);
    },
    VmobileNumber: function() {
      if (!this.mobileNumber) return true;
      return this.$api.regMobile.test(this.mobileNumber);
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      const data = {
        email: this.email,
        password: this.password
      };
      try {
        const user = await this.$store.dispatch("login", data);
        this.finalize(user);
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    async finalize(response) {
      await this.$api.webStorage.local.set("created", response.data.created);
      await this.$api.webStorage.local.set("$accessToken", response.data.id);
      await this.$api.webStorage.local.set("ttl", response.data.ttl);
      await this.$api.webStorage.local.set("$userId", response.data.userId);
      await this.$api.webStorage.local.set(
        "user",
        JSON.stringify(response.data)
      );
      this.$nextTick(() => {
        this.$router.push(this.$route.query.redirect || "/app/@home");
      });
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
