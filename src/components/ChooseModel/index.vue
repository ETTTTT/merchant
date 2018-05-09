<template>
    <div class="chooseModel flex-box">
        <div class="car-img">
            <img v-lazy="baseInfo.car_model_img_url || ''" alt="">
        </div>
        <div class="side-info flex-item">
            <div class="common-name">{{ baseInfo
                .loading ? '加载中...' : baseInfo.commonName || '请选择车型' }}</div>
            <div class="flex-box bottom-align">
                <div class="desc flex-item">
                    <div class="price">厂商指导价（元）: ￥{{ baseInfo.listPrice || 0}}</div>
                    <div class="car-constructor">车身结构: {{ baseInfo.bodyType || '-'}}</div>
                </div>
                <div class="toogle-btn" @click="toogleModel">切换</div>
            </div>

        </div>
    </div>
</template>
<script src="./choose.js" lang="babel"></script>
<style lang="stylus" scoped>
@import '../../assets/styles/variables'
@import '../../assets/styles/mixins'

.flex-box
    display flex
    &.bottom-align
        align-items flex-end
    .flex-item
        flex 1
    .flex-item-auto
        flex auto

.chooseModel
    padding 30px
    border-bottom 1px solid $fcGreyer
    background $fcWhite
    .car-img img
        width 156px
        height 156px
    .side-info
        padding-left 22px

    .common-name
        line-height 48px
        height 96px
        font-size 30px
        // font-weight 600
        color $fcBlack
        overflow hidden

    .desc
        line-height 40px
        font-size 24px
        color $fcGreyish

    .toogle-btn
        width 134px
        height 58px
        box-sizing border-box
        padding-right 42px
        line-height 58px
        text-align center
        background-color $fcWhite
        border 1px solid $fcAcaBtn
        color $fcAcaBtn
        border-radius 28px
        background-image url('../../assets/images/icon/toggle_ico.png')
        background-repeat no-repeat
        background-size 28px 28px
        background-position 86px center

</style>
