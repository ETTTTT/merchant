<template>
    <div class="share-mask" @click="hide" v-if="show">
        <div class="tip">请点击右上角，<br/> 点击【分享到朋友圈】 <br/>传递给好友吧！</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
        };
    },
    methods: {
        hide() {
            this.show = false;
        }
    }
};
</script>
<style lang="stylus" scoped>
.share-mask
    width 100%
    height 100%
    position fixed
    z-index 100
    left 0
    top 0
    background-image url('../../assets/images/common/wx_share_tip.png')
    background-color rgba(0,0,0, .6)
    background-position 95% 20px
    background-size 198px 260px
    background-repeat no-repeat

.tip
    margin-top 260px
    color #fff
    text-align center
    line-height 64px

</style>

