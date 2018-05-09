<template lang="html">
    <div class="carLineWrap">
        <div class="selected-info">
            已选择: {{ chosenInfo.brandName }}
        </div>
        <ul class="lineList">
            <li
                v-for="item, index in carLines"
                :key="index"
                class="cars-item"
                >
                <div @click="getUrl(item)">{{ item.line }}</div>
            </li>
        </ul>
    </div>
</template>
<script src="./carLine.js" lang="babel"></script>
<style lang="stylus" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.selected-info
    padding 0 18px
    line-height 96px
    font-size 28px
    color $fcAcaBlue
    margin-bottom 10px
    background $fcWhite
    retinaBorder(false, false, false, true)

.lineList
    li
        line-height 100px
        text-indent 18px
        background-color $fcWhite
        retinaBorder(false, false, false, true)
        div
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
</style>
