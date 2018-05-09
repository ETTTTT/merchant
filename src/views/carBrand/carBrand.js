import {
    mapState,
    mapActions,
} from 'vuex';
import Vue from 'vue';
import _ from 'lodash';
import VueScroller from 'vue-scroller';
import viewName from '../constant';

Vue.use(VueScroller);

export default {
    name: viewName.carBrand,
    components: {

    },
    data() {
        return {
            brandInput : '',
            searchBrand: [],
            firstChar  : [],
            query      : {},
        };
    },
    computed: {
        ...mapState({
            brandData: ({ carInfo }) => carInfo.brand,
        })
    },
    created() {
        this.$emit('setHeader', {
            title: '选择品牌',
        });

        if (_.isEmpty(this.brandData)) {
            this.getCarBrand().then(() => {
                this.setAlphabetList(this.brandData);
            });
        } else {
            this.setAlphabetList(this.brandData);
        }

        this.query = this.$route.query;
    },
    mounted() {
        this.$refs.brand_scroller.$el.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                this.$refs.brand_scroller.scrollBy(0, 100, false);
            } else if (e.deltaY < 0) {
                this.$refs.brand_scroller.scrollBy(0, -100, false);
            }
        });
    },
    methods: {
        ...mapActions([
            'getCarBrand',
            'setChosenInfo',
        ]),
        inputChange(inputVal) {
            if (_.isEmpty(inputVal)) {
                return;
            }
            const brandArr = [];

            const matchNames = (inputText, brandName) => {
                const reg = new RegExp(inputText);
                return reg.test(brandName);
            };

            _.forEach(this.brandData, (value) => {
                _.forEach(value, (brand) => {
                    if (matchNames(inputVal, brand.name)) {
                        brandArr.push(brand);
                    }
                });
            });

            this.searchBrand = brandArr;
        },
        // set侧边字母列表数据
        setAlphabetList(data) {
            // 提取首字母
            const charArr = Object.keys(data);

            this.firstChar = _.map(charArr, item => ({
                char: item,
                scrollTop: 0,
            })
            );
        },
        transforms(eleScrollTop) {
            this.$refs.brand_scroller.scrollTo(0, eleScrollTop, false);
            // console.log(this.$refs.brand_scroller.getPosition(), eleScrollTop);
        },
        jumpChar(data, key) {
            const { scrollTop, char } = data;
            const doc                 = document;
            const carTitle            = doc.querySelectorAll('.car-title');

            let scrollValue = 0;

            // 有scrollTop缓存即直接用
            if (scrollTop) {
                scrollValue = scrollTop;
            } else {
                _.forEach(carTitle, (value) => {
                    if (value.innerText === char) {
                        scrollValue = value.offsetTop;
                        // set scrollTop值
                        this.firstChar[key].scrollTop = scrollValue;
                    }
                });
            }
            this.transforms(scrollValue);
        },
        selectBrand(brandName, brandCode) {
            this.setChosenInfo({
                brandName, brandCode
            });
        }
    },
};
