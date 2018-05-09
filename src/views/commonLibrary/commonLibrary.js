import {
    mapActions,
    mapState,
} from 'vuex';
import viewsName from '../constant';
import TopMenu from '../../components/TopMenu';
import { debounced } from '../../utils/input';
// import { setLibDetail } from '../../utils/storage';

export default {
    name: viewsName.commonLibrary,
    data() {
        return {
            searchInput: '',
            cateId: '',
        };
    },
    computed: {
        ...mapState({
            libList: ({ commonLib }) => commonLib.list,
            hasMore: ({ commonLib }) => commonLib.hasMore,
            page   : ({ commonLib }) => commonLib.page,
            loading: ({ commonLib }) => commonLib.loading,
        }),
    },
    watch: {
        searchInput(newValue, oldValue) {
            if (newValue === oldValue) return;
            this.searchList(newValue);
        },
        $route: {
            handler(newValue, oldValue) {
                if (newValue.params.cateId !== oldValue.params.cateId) {
                    const { cateTitle, cateId } = newValue.params;

                    this.cateId = cateId;
                    this.resetCommonLibList();

                    this.$emit('setHeader', {
                        title: cateTitle || '汽修资料',
                        showRight: true,
                        headerRightBtn: TopMenu,
                    });
                    this.getCommonLibList({
                        cate_id: cateId,
                        page_no: 1,
                    });
                }
            },
            deep: true,
        }
    },
    mounted() {
        const { cateTitle, cateId } = this.$route.params;
        this.$emit('setHeader', {
            title: cateTitle || '汽修资料',
            showRight: true,
            headerRightBtn: TopMenu,
        });

        if (cateId) {
            this.cateId = cateId;
            this.getCommonLibList({
                cate_id: cateId,
                page_no: 1,
            });
        }
    },
    methods: {
        ...mapActions([
            'getCommonLibList',
            'resetCommonLibList',
        ]),
        goLibDetail(detail) {
            const { title, id } = detail;
            // setLibDetail(detail);

            this.$router.push({
                path: '/lib-detail',
                query: {
                    title,
                    id,
                    fromCate: this.$route.params.cateId,
                    fromTitle: this.$route.params.title,
                },
            });
        },
        searchList: debounced(function handler(fileName) {
            this.resetCommonLibList();
            this.getCommonLibList({
                cate_id: this.cateId,
                file_name: fileName,
                page_no: 1,
            });
        }),
        loadMore() {
            this.getCommonLibList({
                cate_id: this.cateId,
                file_name: this.searchInput,
                page_no: this.page,
            });
        }
    },
    beforeDestroy() {
        this.resetCommonLibList();
    },
};
