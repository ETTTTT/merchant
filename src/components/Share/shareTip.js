import Vue from 'vue';

const shareMaskVue = require('./shareTip.vue');

const ShareTip = Vue.extend(shareMaskVue);

export default () => {
    const shareTip = new ShareTip({
        el: document.createElement('div'),
    });

    document.body.appendChild(shareTip.$el);

    return shareTip;
};
