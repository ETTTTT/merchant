<template lang="html">
    <div class="headerRightBtn">
        <div class="menu-btn" @click="toggleMenu"></div>
        <div class="drop-down-menu" v-show="showMenu">
            <div class="menu-mask" @click="toggleMenu"></div>
            <div class="menu-head">专业分类</div>
            <div class="menu-group">
                <div class="menu-item"
                    v-for="mItem,index in major"
                    @click="toggleCate(mItem, true)"
                    :key="index">
                    {{ mItem.title }}
                </div>
            </div>
            <div class="menu-head" v-if="nonMajor.length">通用分类</div>
            <div class="menu-group"  v-if="nonMajor.length">
                <div class="menu-item"
                    v-for="mItem,index in nonMajor"
                    @click="toggleCate(mItem, false)"
                    :key="index">
                    {{ mItem.title }}
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./topMenu.js" lang="babel"></script>
<style lang="stylus" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.menu-btn
    width 56px
    height 88px
    background-image url('../../assets/images/icon/menu_icon.png')
    background-position center
    background-size 46px 46px
    background-repeat no-repeat

.drop-down-menu
    position fixed
    // left 0
    top 89px
    bottom 0
    right 0
    z-index 100
    width 100%
    max-width 1500px
    left 50%
    transform translateX(-50%)
    -webkit-overflow-scrolling touch
    overflow auto
    box-sizing border-box
    overflow-x hidden
    .menu-mask
        position absolute
        width 100%
        height 100%
        background rgba(0,0,0,.3)
        z-index -1


.menu-head
    line-height 60px
    background $fcBody
.menu-group
    background $fcWhite
    .menu-item
        padding 0 32px
        text-align left
        retinaBorder(false, false, false, true)

</style>
