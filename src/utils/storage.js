const HOME_MENU = 'HOME_MENU';
const LIB_DETAIL = 'LIB_DETAIL';
const CARISOK_CONFIG = 'CARISOK_CONFIG';


/**
 * 菜单存储
 * @param [] config
 * 首页 `/menu` 接口返回数据
 */
export const setMenu = (config) => {
    try {
        localStorage.setItem(HOME_MENU, JSON.stringify(config));
    } catch (err) {
        localStorage.setItem(HOME_MENU, '[]');
        console.error(err);
    }
};

export const getMenu = () => {
    try {
        return JSON.parse(localStorage.getItem(HOME_MENU)) || [];
    } catch (err) {
        return [];
    }
};
/**
 * 存储资料详情
 * @param config 略
 */
export const setLibDetail = (config) => {
    try {
        sessionStorage.setItem(LIB_DETAIL, JSON.stringify(config));
    } catch (err) {
        sessionStorage.setItem(LIB_DETAIL, '{}');
    }
};

export const getLibDetail = () => {
    try {
        return JSON.parse(sessionStorage.getItem(LIB_DETAIL)) || {};
    } catch (err) {
        return {};
    }
};

export const clearLibDetail = () => {
    sessionStorage.removeItem(LIB_DETAIL);
};

/**
 * CARISOK_CONFIG
 */
export const getLocalConfig = () => {
    try {
        return JSON.parse(sessionStorage.getItem(CARISOK_CONFIG)) || {};
    } catch (err) {
        return {};
    }
};

export const setLocalConfig = (config) => {
    try {
        sessionStorage.setItem(CARISOK_CONFIG, JSON.stringify(config));
    } catch (err) {
        sessionStorage.setItem(CARISOK_CONFIG, '{}');
    }
};
