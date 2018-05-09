<template>
    <div class="shareComponent" v-show="isWeixin || isApp">
        <div class="share-btn" @click="shareWX">点击分享</div>
    </div>
</template>
<script src="./share.js" lang="babel"></script>
<style lang="stylus" scoped>
@import '../../assets/styles/variables';

.shareComponent
    width 100%
    height auto
    padding 82px 0
    // @media screen and (min-width: 750px ) {
    //     width 750px
    // }
.share-btn
    width 600px
    height 82px
    border-radius 12px
    text-align center
    margin 0 auto
    color $fcWhite
    font-size 32px
    line-height 82px
    background-color $fcAcaBtn
    background-image url('../../assets/images/icon/share_icon.png')
    background-size 30px 30px
    background-position 190px center
    background-repeat no-repeat
</style>
