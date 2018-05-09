import Vue from 'vue';
import _ from 'lodash';
import {
    GET_HOME_MENU_INIT,
    GET_HOME_MENU_REQUEST,
    GET_HOME_MENU_SUCCESS,
    GET_HOME_MENU_FAILURE,
    GET_ARTICLE_CATES_REQUEST,
    GET_ARTICLE_CATES_SUCCESS,
    GET_ARTICLE_CATES_FAILURE,
    GET_ARTICLE_LIST_REQUEST,
    GET_ARTICLE_LIST_SUCCESS,
    GET_ARTICLE_LIST_FAILURE,
    GET_DROP_MENU_REQUEST,
    GET_DROP_MENU_SUCCESS,
    GET_DROP_MENU_FAILURE,
} from '../mutationTypes';
import {
    groupBy,
} from '../../utils/lib';
import {
    getMenu,
    setMenu,
} from '../../utils/storage';

const initListData = {
    page: 1,
    hasMore: true,
    list: [],
};

const state = {
    menu: [],
    originMenu: {
        major: [],
        non_major: [],
    },
    cates: [],

    loading: false,
    articleListLoading: false,
    error: {
        type: '',
        msg: '',
    }
};

const mutations = {
    [GET_HOME_MENU_INIT](state, storageMenu) {
        if (_.isEmpty(storageMenu)) return;
        state.menu = groupBy(storageMenu, 8);
    },
    [GET_HOME_MENU_REQUEST](state) {
        state.loading = true;
    },
    [GET_HOME_MENU_SUCCESS](state, res) {
        state.loading = false;
        state.menu = groupBy(res.list, 8);
    },
    [GET_HOME_MENU_FAILURE](state, res) {
        state.loading = false;
        state.menu = [];

        _.extend(state.error, {
            type: res.errorType,
            msg: res.errmsg,
        });
    },
    [GET_ARTICLE_CATES_REQUEST](state) {
        state.loading = true;
    },
    [GET_ARTICLE_CATES_SUCCESS](state, res) {
        state.loading = false;

        state.cates = res;
        _.forEach(res, (cate) => {
            state[`cate${cate.cate_id}`] = _.cloneDeep(initListData);
        });
    },
    [GET_ARTICLE_CATES_FAILURE](state) {
        state.loading = false;
        state.cates = [];
    },
    [GET_ARTICLE_LIST_REQUEST](state) {
        state.articleListLoading = true;
    },
    [GET_ARTICLE_LIST_SUCCESS](state, res) {
        state.articleListLoading = false;
        const cateKey = `cate${res.type}`;

        if (res.page >= res.page_count) {
            state[cateKey].hasMore = false;
        } else {
            state[cateKey].page += 1;
        }
        _.forEach(res.list, (item) => {
            state[cateKey].list.push(item);
        });
        // state[res.type].list.concat(state[res.type].list, res.list);
    },
    [GET_ARTICLE_LIST_FAILURE](state, res) {
        state.articleListLoading = false;

        _.extend(state.error, {
            type: res.errorType,
            msg: res.errmsg,
        });
    },
    [GET_DROP_MENU_REQUEST](state) {
        state.loading = true;
    },
    [GET_DROP_MENU_SUCCESS](state, res) {
        state.loading = false;
        state.originMenu = {
            ...res
        };
    },
    [GET_DROP_MENU_FAILURE](state, res) {
        state.loading = false;

        state.error = {
            type: res.errorType,
            msg: res.errmsg
        };
    }
};

export const actions = {
    initHomeMenu({ commit }) {
        const menuList = getMenu();
        commit(GET_HOME_MENU_INIT, menuList);
    },
    async getHomeMenu({ commit }) {
        commit(GET_HOME_MENU_REQUEST);

        const res = await Vue.$ajax.post('menu');

        if (!res.errorType) {
            commit(GET_HOME_MENU_SUCCESS, res);
            setMenu(res.list);
        } else {
            commit(GET_HOME_MENU_FAILURE, res);
        }
    },
    async getArticleList({ commit }, params) {
        commit(GET_ARTICLE_LIST_REQUEST);

        const res = await Vue.$ajax.get('articleList', params);

        const formatRes = _.extend(res, _.pick(params, ['type', 'page']));

        if (!res.errorType) {
            commit(GET_ARTICLE_LIST_SUCCESS, formatRes);
        } else {
            commit(GET_ARTICLE_LIST_FAILURE, formatRes);
        }
    },
    async getArticleCates({ commit }) {
        commit(GET_ARTICLE_CATES_REQUEST);

        const res = await Vue.$ajax.get('articleCates');

        if (!res.errorType) {
            commit(GET_ARTICLE_CATES_SUCCESS, res);
        } else {
            commit(GET_ARTICLE_CATES_FAILURE);
        }
    },
    async getDropMenu({ commit }) {
        commit(GET_DROP_MENU_REQUEST);

        const res = await Vue.$ajax.post('dropMenu');

        if (!res.errorType) {
            commit(GET_DROP_MENU_SUCCESS, res);
        } else {
            commit(GET_DROP_MENU_FAILURE, res);
        }
    },
};

export default {
    state,
    mutations
};
