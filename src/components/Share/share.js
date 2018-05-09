import {
    mapState,
    mapGetters,
} from 'vuex';
import shareTip from './shareTip';

export default {
    name: 'shareComponent',
    props: {
        title: { required: true, type: String },
        desc : { required: true, type: String },
        icon : { required: true, type: String },
        url  : { required: true, type: String },
    },
    computed: {
        ...mapState({
            isWeixin: ({ appInfo }) => appInfo.isWeixin,
        }),
        ...mapGetters([
            'isApp'
        ]),
    },
    methods: {
        shareWX() {
            if (this.isWeixin) {
                shareTip();
            } else if (this.isApp) {
                this.$bridge.openShare({
                    title: this.title,
                    desc: this.desc,
                    img_url: this.icon,
                    link: this.url,
                });
            }
        }
    }
};
