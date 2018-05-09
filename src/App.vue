<template lang="html">
    <div id="app" :class="appLoadedClass">
        <aca-header>
            <span v-show="showLeft" slot="left">
                <component :is="headerLeftBackBtn"></component>
            </span>
            <span v-show="!hastitle" slot="title">{{ title }}</span>
            <span v-show="showRight" slot="right">
                <component :is="headerRightBtn"></component>
            </span>
        </aca-header>
        <div class="mainBox">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" class="academyContent" @setHeader="setHeader"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" class="academyContent" @setHeader="setHeader"></router-view>
        </div>
    </div>
</template>

<script lang="babel">
import _ from 'lodash';
import router from './router';

const headerLeftPlaceholder = {
    template: '<span v-on:click="back" class="backBtn">&nbsp;</span>',
    methods: {
        back() {
            router.back();
        }
    }
};

export default {
    name: 'academy',
    data() {
        return {
            title: '',
            headerLeftBackBtn: headerLeftPlaceholder,
            showLeft: false,
            hastitle: false,
            showRight: false,
            headerRightBtn: null,
            appLoadedClass: '',
        };
    },
    components: {
        acaHeader: require('./components/Header'),
    },
    mounted() {
        this.appLoadedClass = 'appLoaded';
    },
    methods: {
        setHeader(config) {
            _.extend(this, {
                title: '',
                headerLeftBackBtn: headerLeftPlaceholder,
                showLeft: true,
                hastitle: false,
                showRight: false,
                headerRightBtn: null,
            }, config);
        },
    }
};
</script>

<style src="@/assets/styles/app.styl" lang="stylus"></style>
