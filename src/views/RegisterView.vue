<template>
  <div class="p-3">
    <div class="row justify-content-center align-items-center overflow-hidden mt-5 pt-5">
      <div class="col-lg-4">
        <h3>Register Form</h3>
        <hr>
        <form @submit.prevent="register" ref="registerForm">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" name="name" placeholder="Your Name" />
            <label for="floatingInput">Your Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" name="email" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" name="password" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" name="password_confirmation" placeholder="Confirm Password" />
            <label for="floatingPassword">Confirm Password</label>
          </div>
          <div class="float float-end">
            <button class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getUrl'
    ])
  },
  methods: {
    register() {
      const formData = new FormData(this.$refs.registerForm);
      fetch(this.getUrl("/register"), {
        method: "POST",
        body: formData
      }).then(resp => resp.json())
        .then(json => {
          if (json.success) {
            this.$router.push("/login")
          }
        })
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
