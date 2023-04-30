<template>
  <div class="container my-5">
    <h1>Product Edit</h1>
    <hr>
    <form @submit.prevent="editProduct" ref="productEdit">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <Input label="Product Name" name="name" :value="product.name" :errors="errors" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <Input label="Product Price" name="price" :value="product.price" type="number" :errors="errors" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <Input label="Product Stock" name="stock" :value="product.stock" type="number" :errors="errors" />
          </div>
        </div>
        <div class="col-12 text-center">
          <button :disabled="isLoading" class="btn btn-primary">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                              aria-hidden="true"></span>
            Product Update
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input.vue';
import axios from "axios";
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2'

export default {
  components: { Input },
  data() {
    return {
      errors: {},
      isLoading: false,
      product: {}
    }
  },
  computed: {
    ...mapGetters([
      'getUrl'
    ])
  },
  methods: {
    editProduct() {
      const formData = new FormData(this.$refs.productEdit);
      this.isLoading = true
      axios.put(this.getUrl("/products/" + this.$route.params.id), new URLSearchParams(formData).toString())
          .then(resp => {
            this.errors = {}
            if (resp.data.success) {
              this.showToast('success', resp.data.message)
              this.product = resp.data.product
              this.$router.push("/products")
            }
          })
          .catch(e => {
            this.errors = e.response.data.errors
          })
          .finally(_ => {
            this.isLoading = false
          })
    },
    fetchProduct(id){
      axios.get(this.getUrl("/products/" + id))
          .then(resp => this.product = resp.data.data)
    },
    showToast(icon, message) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: icon,
        title: message
      })
    }
  },
  mounted() {
    this.fetchProduct(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>

</style>