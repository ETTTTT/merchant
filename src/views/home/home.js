import {
    mapActions,
    mapState,
} from 'vuex';
import viewsName from '../constant';
// import toast from '../../components/ToastMtd';

export default {
    name: viewsName.home,
    components: {
    },
    data() {
        return {
            name:'et_wl',
        };
    },
    computed: {
        ...mapState({
            menuGroup         : ({ home })    => home.menu,
        }),
    },
    activated() {
        this.$emit('setHeader', {
            title: '商家入驻',
        });
    },
    created() {
    },
    methods: {
        ...mapActions([
            'initHomeMenu',
        ]),
    }
};
