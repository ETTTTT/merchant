import { addWeixinSdk } from '../../utils/weixin';
import bdHtml from './bdHtml';
import usePlugins from './usePlugins';

export default (Vue) => {
    usePlugins(Vue);
    addWeixinSdk();
    bdHtml();
};
