<template lang="html">
    <transition name="fade" mode="in-out">
        <div class="loading-wrapper mask">
            <div class="loading">
                <div class="spinner"></div>
                <div class="text">{{ text }}</div>
            </div>
        </div>
    </transition>
</template>

<script lang="babel">
    export default {
        name: 'Loading',
        props: {
            text: {
                type: String,
                default: '正在加载'
            }
        },
    };
</script>

<style lang="stylus" scoped>
    .loading-wrapper
        position fixed
        left 0
        top 0
        .loading
            position absolute
            top 35%
            left 50%
            transform translateX(-50%)
            padding 0 10px
            width 140px
            height @width
            color white
            background-color rgba(0, 0, 0, 50%)
            border-radius 5px
            box-sizing border-box
        .spinner
            width 60px
            height @width
            margin 12px auto
            box-sizing border-box
            background-image url('../assets/images/loading.svg')
            background-size contain
            background-position center center
            background-repeat no-repeat
        .text
            text-align center
</style>
