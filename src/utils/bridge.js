/*

调用原生分享组件
{
    type:'openShare',
    data:{}
}

interface CarisokConfig {
    app_platform?: 'android' | 'ios';
    app_name?: string;
    app_version?: string;
    api_version?: string;
    token?: string;
    token_type?: TokenType;
    upload_auth?: string;
    user_info?: UserInfo;
    __utm_channel?: string;
    __utm_source?: string;
}

shareConfig {
    // 标题
    title: string;
    // 描述
    desc: string;
    // 图片
    img_url: string;
    // 链接
    link: string;
}

*/
/* eslint
    class-methods-use-this: [
        "error", {
            "exceptMethods": ["invokeJS", "android", "ios", "iosUp"]
        }
    ]
*/
import _ from 'lodash';

// import toast from '../components/ToastMtd';

class NativeBridge {
    static ACTION = {
        OPEN_SHARE: 'openShare',
        GOBACK: 'goBack',
    };

    static APP = {
        STORE: 'store'
    };

    static PLATFORM = {
        ANDROID: 'android',
        IOS: 'IOS'
    };

    info = {};

    constructor(nativeInfo) {
        this.info = nativeInfo;
        window.invokeJS = this.invokeJS;
    }
    invokeJS(actionJSON) {
        try {
            if (_.isString(actionJSON)) {
                const {
                    type,
                    data
                } = JSON.parse(actionJSON);

                // eventBus.$emit(type, data);
                console.log(type, data);
            } else {
                const {
                    type,
                    data
                } = actionJSON;
                // eventBus.$emit(type, data);
                console.log(type, data);
            }
        } catch (err) {
            // 发生错误之后，不发送事件，让上层业务逻辑获取到 reject 请情况。
            console.error(`${err.name}:${err.message}`);
        }
    }

    /**
     * 当前环境是否是门店
     */
    isStore() {
        return this.info.app_name === NativeBridge.APP.STORE;
    }
    /**
     *  统一区分platform
     * @param data 略
     */
    callNative(data) {
        if (!this.info.app_platform) {
            throw new Error('your env isn\'t in fengche app');
        }
        const platform = this.info.app_platform.toLowerCase();
        const JsonData = JSON.stringify(data);

        if (platform === 'android') {
            this.android(JsonData);
        } else if (platform === 'ios') {
            // ios v3.3 以上使用新方法调用原生
            if (Number(this.info.app_version) > 3.3) {
                this.iosUp(JsonData);
            } else {
                this.ios(JsonData);
            }
        } else {
            throw new Error(`platform:${platform} is not support. current only support android and ios`);
        }
    }
    /**
     * 调用安卓暴露的方法
     * @param data 略
     */
    android(data) {
        window.carisok.globalEventNavigate(data);
    }
    /**
     * 调用 ios 暴露的方法
     * @param data 略
     */
    ios(data) {
        window.callNative(data);
    }
    /**
     * v3.3 以上ios换方法
     * @param data 略
     */
    iosUp(data) {
        window.webkit.messageHandlers.callNative.postMessage(data);
    }
    /**
     * 调用app分享
     * @param data: {title: '', link: '', desc: '', img_url: ''}
     */
    openShare(data) {
        data.img_url = data.img_url || 'https://image.carisok.com/filesrv/release/uploads/files/20171111/1510383373LlyvOu.jpeg';
        this.callNative({
            type: NativeBridge.ACTION.OPEN_SHARE,
            data
        });
    }
    /**
     * 调用原生返回
     */
    goBack() {
        this.callNative({
            type: NativeBridge.ACTION.GOBACK,
        });
    }

}

export default NativeBridge;
