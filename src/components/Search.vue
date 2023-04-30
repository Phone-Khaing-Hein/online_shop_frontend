<template>
  <div class="input-group">
    <input type="text" class="form-control" v-model="keyword">
    <button class="btn btn-primary" @click="search">
      <i class="bi bi-search"></i>
    </button>
  </div>
</template>

<script>
import { throttle } from 'lodash';

export default {
  data() {
    return {
      keyword: ""
    }
  },
  methods: {
    search: throttle(function () {
      this.$emit('search', this.keyword);
    }, 500)
  },
  watch: {
    keyword: throttle(function (x, y) {
      this.$emit('search', x);
    }, 500)
  }
}
</script>

<style scoped>

</style>