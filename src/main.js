import 'es6-promise/auto';
import Vue from 'vue';
import VuexRouterSync from 'vuex-router-sync';

import App from './App';
import router from './router';
import store from './store';
import ajax from './http/ajax';
// import prepare from './components/Prepare';

Vue.config.productionTip = false;

VuexRouterSync.sync(store, router);

// 注入 router 和 store
Vue.$router = router;
Vue.$store = store;
// 注入 ajax
Vue.$ajax = ajax;

// prepare(Vue);

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
}).$mount('#app');
