import {
    mapState,
    mapActions,
} from 'vuex';
import router from '../../router';

export default {
    name: 'ChooseModel',
    props: {
        cate: {
            type: String,
            required: true
        },
        carId: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState({
            chosenInfo: ({ carInfo }) => carInfo.chosenInfo,
            baseInfo: ({ carInfo }) => carInfo.baseInfo,
        })
    },
    created() {
        if (!this.baseInfo.commonName) {
            this.getBaseInfoAct({ vehicle_id: this.carId });
        }
    },
    methods: {
        ...mapActions([
            'getBaseInfoAct',
        ]),
        toogleModel() {
            router.push({
                path: `/car-brand?from=${this.cate}`
            });
        },
    }
};
