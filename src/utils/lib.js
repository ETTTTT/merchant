import _ from 'lodash';

export const groupBy = (srcArray, iteratee) => {
    if (!_.isArray(srcArray)) {
        throw new Error('groupBy: must be array');
    }

    if (srcArray.length === 0) {
        return [[]];
    }

    if (iteratee === 0 || iteratee === 1) {
        throw new Error('iteratee must be a number that greater than 1');
    }
    const matrix = [];
    const len = srcArray.length;
    let i = 0;
    let start = 0;
    let end = iteratee;
    while (i < len) {
        matrix.push(srcArray.slice(start, end));
        i += iteratee;
        start += iteratee;
        end += iteratee;
    }
    return matrix;
};

export const resolveImgUrl = (url, targetSizeConfig) => {
    if (!_.isString(url)) {
        throw new Error('url must be string');
    }

    // 160h_160w_0e_1l
    const {width, height, e = 0, l = 1} = targetSizeConfig;
    if (!width || !height) {
        throw new Error('width and height must both specify');
    }

    const targetSizeStr = `${height}h_${width}w_${e}e_${l}l`;

    // 处理内测环境的非标准 url 转成普通 url
    const imgType = url.split('.').pop();
    if (!imgType.match(/jpg|jpeg|png/g)) {
        return url;
    }

    const paths = url.split('/');
    let fileName = paths.pop();
    if (fileName.indexOf('_') > -1) {
        fileName = `${fileName.split('_').shift()}.${imgType}`;
    }
    const fileFolder = paths.join('/');
    const normalizeUrl = [fileFolder, fileName].join('/');

    // 加上尺寸信息
    return normalizeUrl.replace(/.jpg|.jpeg|.png/, match => `${match}@${targetSizeStr}${match}`);
};
