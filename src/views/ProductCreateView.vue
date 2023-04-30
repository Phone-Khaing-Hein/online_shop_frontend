<template>
    <div class="container my-5">
        <h1>Product Create</h1>
        <hr>
        <form @submit.prevent="addProduct" ref="productCreate">
            <div class="row">
                <div class="col">
                    <div class="mb-3">
                        <Input label="Product Name" name="name" :errors="errors" />
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                        <Input label="Product Price" name="price" type="number" :errors="errors" />
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                        <Input label="Product Stock" name="stock" type="number" :errors="errors" />
                    </div>
                </div>
                <div class="col-12 mb-4">
                    <label for="photos">Product Photos</label>
                    <input type="file" class="form-control" name="photos[]" id="photos"
                        :class="{ 'is-invalid': errors.photos }" multiple>
                    <div class="invalid-feedback" v-if="errors.photos">{{ errors.photos[0] }}</div>
                </div>
                <div class="col-12 text-center">
                    <button :disabled="isLoading" class="btn btn-primary">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        Product Add
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
import { throttle } from 'loadsh';

export default {
    components: { Input },
    data() {
        return {
            errors: {},
            isLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'getUrl'
        ])
    },
    methods: {
        addProduct: throttle(function () {
            const formData = new FormData(this.$refs.productCreate);
            this.isLoading = true
            axios.post(this.getUrl("/products"), formData)
                .then(resp => {
                    this.errors = {}
                    if (resp.data.success) {
                        this.$refs.productCreate.reset();
                        this.showToast('success', resp.data.message)
                    }
                })
                .catch(e => {
                    this.errors = e.response.data.errors
                })
                .finally(_ => {
                    this.isLoading = false
                })
        }, 500),
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
}
</script>

<style lang="scss" scoped>

</style>