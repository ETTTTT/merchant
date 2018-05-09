import store from '../store';
// import toast from '../components/ToastMtd';

const isWeixin = () => {
    const appInfo = store.state.appInfo;
    if (appInfo.checked) {
        return appInfo.isWeixin;
    }
    const ua = navigator.userAgent.toLowerCase();
    const isWx = !!ua.match(/MicroMessenger/i);

    store.dispatch('checkIsWeixin', isWx);

    return isWx;
};

const initWx = (shareData) => {
    const defaultImg = 'https://image.carisok.com/filesrv/release/uploads/files/20171111/1510383373LlyvOu.jpeg';
    /**
     * 分享到朋友圈
     */
    wx.onMenuShareTimeline({
        title: `${shareData.title}，${shareData.desc}`,
        link: shareData.link,
        imgUrl: shareData.icon || defaultImg,
        success: () => {
            console.log('分享到朋友圈');
        },
        fail: () => {},
        complete: () => {},
        cancel: () => {},
        trigger: () => {}
    });
     /**
     * 分享给朋友
     */
    wx.onMenuShareAppMessage({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.icon || defaultImg,
    });
    /**
     * 分享到QQ
     */
    wx.onMenuShareQQ({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.icon || defaultImg,
    });
    /**
     * 分享到QQ空间
     */
    wx.onMenuShareQZone({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.icon || defaultImg,
    });
};

export const addWeixinSdk = () => {
    if (!isWeixin()) {
        return;
    }
    const WxDom = document.createElement('script');
    WxDom.src = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(WxDom, s);
};

export const configWeixin = async (shareData) => {
    if (!store.state.appInfo.isWeixin) {
        return;
    }
    const apiList = [
        'checkJsApi',
        // 'chooseWXPay',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareQZone',
        // 'onMenuShareWeibo',
        // 'closeWindow'
    ];
    try {
        store.dispatch('getWeixinConfig', {
            url: encodeURIComponent(location.href),
        }).then((data) => {
            wx.config({
                // debug: true,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: apiList
            });
            wx.ready(() => {
                initWx(shareData);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

