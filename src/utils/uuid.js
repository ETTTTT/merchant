// 关于 UUID 的生成，这里有个讨论，尽量避免重复的可能性
// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
const generateUUID = (suffix) => {
    let currentTime = new Date().getTime();

    if (window.performance &&
        typeof window.performance.now === 'function') {
        // use high-precision timer if available
        currentTime += performance.now();
    }

    /* eslint-disable */
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    const uuid = pattern.replace(/[xy]/g, (char) => {
        const randomNum = (currentTime + Math.random() * 16) % 16 | 0;

        currentTime = Math.floor(currentTime / 16);

        const value = char === 'x'
                    ? randomNum
                    : (randomNum & 0x3 | 0x8);

        return value.toString(16);
    });
    /* eslint-enable */

    return suffix ? `${uuid}-${suffix}` : uuid;
};

export default generateUUID;
