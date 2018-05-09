function bdHtml() {
    const _hmt = window._hmt || []; // eslint-disable-line
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?42b132d494010ca7587f31ff1a77f250';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
}


export default bdHtml;
