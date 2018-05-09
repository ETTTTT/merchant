<template lang="html">
    <div class="brandWrap">
        <scroller ref="brand_scroller">
            <div class="search-brand">
                <router-link
                    :to="{ path: 'model-search', query: query }">
                    <!-- <input type="text" placeholder="输入车型品牌" v-model='brandInput' @input="inputChange(brandInput)"> -->
                    <input type="text" placeholder="输入vin码/公告号">
                </router-link>
                <div class="search-result" v-if="brandInput && searchBrand.length">
                    <ul>
                        <router-link
                            v-for="brand, index in searchBrand"
                            :key="index"
                            class="brand-item"
                            :to="{ path: 'car-line/' + brand.id, query: query }"
                            tag="li">
                            <div @click="selectBrand(brand.name, brand.code)">
                                {{ brand.name }}
                            </div>
                        </router-link>
                    </ul>
                </div>
            </div>
            <div class="cars-brand">
                <div v-for="(value, key) in brandData" :key="key" class="cars-brand-list">
                    <div class="car-title">{{ key }}</div>
                    <ul>
                        <router-link
                            v-for="brand, index in value"
                            :key="index"
                            class="brand-item"
                            :to="{ path: '/car-line/' + brand.id, query: query }"
                            tag="li">
                            <div @click="selectBrand(brand.name, brand.code)">
                                {{ brand.name }}
                            </div>
                        </router-link>
                    </ul>
                </div>
            </div>
        </scroller>
        <div class="first-char">
            <ul>
                <li v-for="(value, key) in firstChar"
                    :key="key"
                    @click="jumpChar(value, key)">
                    {{ value.char }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script src="./carBrand.js" lang="babel"></script>
<style lang="stylus" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.cars-brand
    .cars-brand-list
        text-indent 18px

        .car-title
            line-height 72px

        .brand-item
            line-height 96px
            background-color $fcWhite
            position relative
            retinaBorder(false, false, false, true)
            // border-bottom 1px solid $fcGreyer
            // &::before
            //     content ''
            //     display block
            //     position absolute
            //     bottom 0
            //     z-index 0
            //     width 100%
            //     height 2px
            //     background-color $fcGreyer

.search-brand
    position relative
    text-align center

    input
        width 90%
        height 64px
        box-sizing border-box
        margin-top 24px
        padding-left 80px
        border-radius 30px
        border 1px solid $fcGreyer
        background-image url('../../assets/images/icon/search.png')
        background-position 25px 14px
        background-repeat no-repeat
        background-size 32px
        -webkit-appearance none
        outline none
        font-size 24px

    .search-result
        position absolute
        top 100px
        left 0
        z-index 1
        width 100%
        opacity 1
        transition 600ms all

        &.active
            opacity 0

        li
            width 100%
            line-height 80px
            text-align left
            text-indent 60px
            background-color $fcWhite
            retinaBorder(false, false, false, true)

.first-char
    position fixed
    top 180px
    right 0
    bottom auto
    z-index 1
    width 60px
    min-height 40px
    line-height 40px
    text-align center
    li
        cursor pointer
        color #0073f1
        -webkit-tap-highlight-color rgba(0,0,0,0)
</style>
