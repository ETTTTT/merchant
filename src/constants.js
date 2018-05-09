import { name, apiVersion } from '../package.json';

export const ENV = process.env.NODE_ENV;
export const API_ENV = process.env.API_ENV;

export const APP_NAME = name;
// 版本号每个版本记得在package.json中修改
export const API_VERSION = apiVersion;

export const API_HOST = {
    alpha  : '//192.168.1.206/fengche/college.php',
    beta   : '//test.carisok.com/college.php',
    abtest : '//api.carisok.com/college.php',
    release: '//api.carisok.com/college.php',
};
