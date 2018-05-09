// const view = name => (resolve) => {
//     require([`@/views/${name}/index.vue`], resolve); // eslint-disable-line
// };

const view = name => () => import(`@/views/${name}/index.vue`);

const pageNotFound = view('pageNotFound');

const home              = view('home');
const carBrand          = view('carBrand');
const carLine           = view('carLine');
const commonLibrary     = view('commonLibrary');

export default [
    {
        path: '*',
        name: 'pageNotFound',
        component: pageNotFound
    },
    {
        path: '/',
        name: 'home',
        meta: {
            keepAlive: true,
        },
        component: home
    },
    {
        path: '/car-brand',
        name: 'carBrand',
        component: carBrand,
    },
    {
        path: '/car-line/:brandId',
        name: 'carLine',
        component: carLine,
    },
    {
        path: '/common-lib/:cateId/:cateTitle',
        name: 'commonLibrary',
        component: commonLibrary
    }
];
