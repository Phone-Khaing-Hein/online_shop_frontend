<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-12">
                <h1>Product List</h1>
                <hr>
                <table class="table table-hover table-striped align-middle text-end">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th class="text-start">Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in rows.data">
                            <td>{{ row.id }}</td>
                            <td class="text-start">{{ row.name }}</td>
                            <td>{{ row.price }}</td>
                            <td>{{ row.stock }}</td>
                            <td>{{ row.date }}</td>
                            <td>{{ row.time }}</td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-outline-primary">
                                        <i class="bi bi-info-circle"></i>
                                    </button>
                                    <button @click="editProduct(row.id)" class="btn btn-outline-primary">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button @click="deleteProduct(row.id)" class="btn btn-outline-primary">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-between">
                    <Pagination v-if="rows.meta" :links="rows.meta.links" @paginate="fetchProducts" />
                    <div class="w-25">
                        <Search @search="search" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import axios from 'axios';
import { mapGetters } from 'vuex';
import Swal from "sweetalert2";
import Search from '@/components/Search.vue';

export default {
    data() {
        return {
            rows: {}
        };
    },
    computed: {
        ...mapGetters([
            "getUrl"
        ])
    },
    methods: {
        search(keyword) {
            this.fetchProducts(this.getUrl("/products?keyword=" + keyword));
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
        },
        fetchProducts(url) {
            axios.get(url)
                .then(resp => this.rows = resp.data);
        },
        deleteProduct(id) {
            axios.delete(this.getUrl("/products/") + id)
                .then(resp => {
                    this.fetchProducts(this.rows.meta.links.find(link => link.active === true).url);
                    this.showToast('success', resp.data.message)
                });
        },
        editProduct(id) {
            this.$router.push("/products/edit/" + id)
        }
    },
    mounted() {
        this.fetchProducts(this.getUrl("/products"));
    },
    components: { Pagination, Search }
}
</script>

<style lang="scss" scoped>

</style>