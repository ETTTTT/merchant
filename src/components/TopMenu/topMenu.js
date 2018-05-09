import {
    mapState,
    mapActions,
} from 'vuex';
import _ from 'lodash';

export default {
    name: 'TopMenu',
    data() {
        return {
            showMenu: false,
        };
    },
    computed: {
        ...mapState({
            major     : ({ home })    => home.originMenu.major,
            nonMajor  : ({ home })    => home.originMenu.non_major,
            chosenInfo: ({ carInfo }) => carInfo.chosenInfo,
        })
    },
    mounted() {
        if (!this.major.length) {
            this.getDropMenu();
        }
    },
    methods: {
        ...mapActions([
            'getDropMenu'
        ]),
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        toggleCate(item, isMajor) {
            this.goCate(item, isMajor);
            this.toggleMenu();
        },
        goCate(cate, isMajor) {
            // TODO: 判断是否需要选择车型, router.query 加上from
            if (!_.isEmpty(cate.url)) {
                if (!cate.url.match(/http|https$/)) {
                    // 这边提供的路由节点
                    const fromPage = cate.url.substr(1);

                    if (_.isEmpty(this.chosenInfo.lineId)) {
                        // 车系为空去品牌选
                        if (fromPage === 'model-info' || fromPage === 'car-model-detail') {
                            this.$router.push({
                                path: '/car-brand'
                            });
                        } else {
                            this.$router.push({
                                path: '/car-brand',
                                query: {
                                    from: fromPage,
                                }
                            });
                        }
                    } else if (_.isEmpty(this.chosenInfo.carId) && this.chosenInfo.lineId !== '0') {
                        // lineId有且不为0(预留标准文章), 无carId
                        if (fromPage === 'model-info' || fromPage === 'car-model-detail') {
                            this.$router.push({
                                path: `/car-model/${this.chosenInfo.lineId}`
                            });
                        } else {
                            this.$router.push({
                                path: `/car-model/${this.chosenInfo.lineId}`,
                                query: {
                                    from: fromPage,
                                }
                            });
                        }
                        // 剩下情况都有lineId, carId
                    } else if (fromPage === 'model-info' || fromPage === 'car-model-detail') {
                        this.$router.push({
                            path: `/model-info?car_id=${this.chosenInfo.carId}`,
                        });
                    } else {
                        this.$router.push({
                            path: cate.url,
                            query: {
                                car_id: this.chosenInfo.carId
                            }
                        });
                    }
                } else {
                    window.location.href = cate.url;
                }
            } else if (isMajor) {
                if (_.isEmpty(this.chosenInfo.lineId)) {
                    this.$router.push({
                        path: '/car-brand',
                        query: {
                            cateId: cate.cate_id,
                            cateTitle: cate.title,
                        },
                    });
                } else {
                    this.$router.push({
                        path: `/major-lib/${cate.cate_id}/${cate.title}`,
                    });
                }
            } else {
                this.$router.push({
                    path: `/common-lib/${cate.cate_id}/${cate.title}`,
                });
            }
        },
    },
};
