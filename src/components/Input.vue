<template>
    <label :for="name" class="form-label">{{ label }}</label>
    <input :type="type" :id="name" :value="value" :name="name" class="form-control" :class="{ 'is-invalid': errors[name] }">
    <div class="invalid-feedback" v-if="errors[name]">{{ errors[name][0] }}</div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "Input Label"
        },
        name: {
            type: String,
            default: "Input name"
        },
        type: {
            type: String,
            default: "text"
        },
        errors: {
            type: Object
        },
        value: {
          default: null
        }
    },
}
</script>

<style lang="scss" scoped>

</style>