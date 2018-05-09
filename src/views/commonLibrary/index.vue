<template lang="html">
    <div class="commonLibraryWrap">
        <div class="filter-box">
            <div class="input-wrap">
                <input v-model="searchInput" type="text" placeholder="请输入名称">
            </div>
        </div>
        <div class="list-box" v-if="libList.length">
            <div class="list-item"
                v-for="item, index in libList"
                :key="index"
                @click="goLibDetail(item)">
                {{ item.title }}
            </div>
            <div class="spinner" v-if="loading"></div>
            <div class="load-more" @click="loadMore" v-else-if="hasMore">加载更多</div>
            <div class="no-more" v-else>没有更多</div>
        </div>
        <div class="spinner" v-else-if="loading"></div>
        <div class="empty-global list-empty" v-else>Oops~ 资料库还在外太空呢！</div>
    </div>
</template>
<script src="./commonLibrary.js" lang="babel"></script>
<style lang="stylus" scoped>
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.commonLibraryWrap
    background $fcWhite

.filter-box
    height 60px
    padding 20px 32px
    background $fcBody
    .input-wrap
        height 58px
        border 1px solid $fcGreyer
        border-radius 30px
        padding 0 30px 0 68px
        background-color $fcWhite
        background-image url('../../assets/images/icon/search_icon.png')
        background-size 30px 30px
        background-position 20px center
        background-repeat no-repeat
        input
            appearance none
            border none
            display block
            outline none
            width 100%
            height 54px
            line-height 54px
            font-size 26px
            margin-top 1px

.list-box
    padding-left 20px
    .list-item
        height 86px
        line-height 86px
        padding-right 52px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        position relative
        retinaBorder(false, false, false, true)
        &::after
            content ''
            width 16px
            height 32px
            position absolute
            right 30px
            top 50%
            transform translateY(-50%)
            background-image url('../../assets/images/common/arrow_right_gray.png')
            background-size 16px 32px
.no-more
    padding-right 20px

.list-empty
    line-height 72px
    text-align center
    color $fcGreyish

</style>
