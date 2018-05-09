<template>
    <router-link tag="div" class="car-model" :to="routerPath">
        <div class="info" v-if="carInfo">{{ carInfo}}</div>
        <div class="tip" v-else>请先设置车型信息</div>
        <span class="arrow"></span>
    </router-link>
</template>
<script lang="babel">
export default {
    name: 'carModelSelect',
    props: {
        carInfo: String,
        query: {
            type: Object,
            required: true,
        },
    },
    computed: {
        routerPath() {
            return {
                path: '/car-brand',
                query: this.query,
            };
        },
    },
};
</script>
<style lang="stylus" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.car-model
    height auto
    line-height 38px
    padding 16px 48px 16px 32px
    font-size 28px
    position relative
    retinaBorder(false, false, false, true)

    .info
        color $fcAcaBlue

    .tip
        color $fcBlack

    .arrow
        width 16px
        height 32px
        position absolute
        right 30px
        top 50%
        transform translateY(-50%);
        background-image url('../assets/images/common/arrow_right_gray.png')
        background-size 16px 32px
        background-position center
        background-repeat no-repeat
</style>

