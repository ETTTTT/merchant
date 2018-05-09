import {
    mapActions,
    mapState,
} from 'vuex';
import viewsName from '../constant';

export default {
    name: viewsName.carLine,
    data() {
        return {
            query   : {},
        };
    },
    computed: {
        ...mapState({
            carLines  : ({ carInfo }) => carInfo.carLines,
            chosenInfo: ({ carInfo }) => carInfo.chosenInfo,
        })
    },
    created() {
        this.$emit('setHeader', {
            title: '选择车系',
        });

        const { brandId } = this.$route.params;
        if (brandId) {
            this.getCarLine({
                brand_id: brandId
            });
        }
        this.query = this.$route.query;
    },
    methods: {
        ...mapActions([
            'getCarLine',
            'setChosenInfo',
        ]),
        getUrl(item) {
            // :to="{ path: '/car-model/' + item.line_id, query: query }"
            const query = this.$route.query;

            this.setChosenInfo({
                carLine: item.line,
                lineId: item.line_id,
            });

            if (query.cateId) {
                this.$router.push({
                    path: `/major-lib/${query.cateId}/${query.cateTitle}`
                });
            } else {
                this.$router.push({
                    path: `/car-model/${item.line_id}`,
                    query
                });
            }
        }
    }
};
