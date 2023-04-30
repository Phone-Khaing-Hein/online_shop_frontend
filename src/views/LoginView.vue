<template>
  <div class="p-3">
    <div class="row justify-content-center align-items-center overflow-hidden mt-5 pt-5">
      <div class="col-lg-4">
        <h3>Login Form</h3>
        <hr>
        <form @submit.prevent="login" ref="loginForm">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" name="email" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" name="password" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="float float-end">
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getUrl'
    ]),
    ...mapActions([
      'setAuth',
      'setToken'
    ])
  },
  methods: {
    login() {
      const formData = new FormData(this.$refs.loginForm);

      fetch(this.getUrl("/login"), {
        method: "POST",
        body: formData
      }).then(resp => resp.json())
        .then(json => {
          if (json.success) {
            localStorage.setItem("auth", JSON.stringify(json.auth));
            localStorage.setItem("token", json.token);
            this.$store.dispatch('setAuth', json.auth);
            this.$store.dispatch('setToken', json.token);
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
            this.$router.push("/dashboard");
          } else {
            this.$router.push("/login");
          }
        })
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
