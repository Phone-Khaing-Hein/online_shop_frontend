<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" v-for="link in links" :class="{ 'active': link.active, 'disabled': !link.url }">
                <a class="page-link" style="cursor: pointer;" @click.prevent="go(link.url)">{{ link.label }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        links: {
            type: Array
        },
    },
    methods: {
        go(url) {
            this.$emit('paginate', url);
        },
        paginationFix() {
            this.links[0].label = "Prev"
            this.links[this.links.length - 1].label = "Next"
        }
    },
    mounted() {
        this.paginationFix();
    },
    updated() {
        this.paginationFix();
    },
}
</script>

<style lang="scss" scoped>

</style>