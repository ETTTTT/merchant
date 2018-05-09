import Lazyload from 'vue-lazyload';
import defaultImg from '../../assets/images/common/default.png';

export default (Vue) => {
    Vue.use(Lazyload, {
        preLoad: 1.3,
        attempt: 1,
        error: defaultImg,
        loading: defaultImg,
    });
};
