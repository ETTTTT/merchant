<template>
    <div class="panel">
        <div class="panel-head" @click="tooglePanel">
            {{ title }}
            <span class="arrow" :class="{down: !showContent}"></span>
        </div>
        <div class="panel-body" v-show="showContent">
            <slot name="panelBody" />
        </div>
    </div>
</template>
<script lang="babel">
export default {
    name: 'panel',
    props: {
        title: { required: true, type: String },
    },
    data() {
        return {
            showContent: true,
        };
    },
    methods: {
        tooglePanel() {
            this.showContent = !this.showContent;
        }
    },
};
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.panel
    background $fcWhite
    margin-top 18px

.panel-head
    height 88px
    line-height 88px
    padding 0 32px
    retinaBorder(false, true, false, true)

.panel-body
    height auto
    padding 32px
    line-height 52px
    transition 300ms all ease-in-out
    retinaBorder(false, false, false, true)

.arrow
    display inline-block
    float right
    width 32px
    height 18px
    margin-top 35px
    background-image url('../../assets/images/common/arrow_top.png')
    background-size 32px 18px
    background-position center
    background-repeat no-repeat
    transition 300ms all ease-in-out
    &.down
        transform rotate(180deg)
</style>

