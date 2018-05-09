import Vue from 'vue';

const toastVue = require('./toast.vue');

const Toast = Vue.extend(toastVue);

export default (msg) => {
    const toast = new Toast({
        el: document.createElement('div'),
        propsData: {
            msg
        }
    });
    document.body.appendChild(toast.$el);
    return toast;
};

