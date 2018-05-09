const fullTime = () => {
    const date    = new Date();
    const dateObj = {};

    dateObj.getFullYear = date.getFullYear();
    dateObj.getMonth    = date.getMonth() + 1;
    dateObj.getDate     = date.getDate();
    dateObj.getHours    = date.getHours();
    dateObj.getMinutes  = date.getMinutes();
    dateObj.getSeconds  = date.getSeconds();
    dateObj.getTime     = date.getTime();

    return dateObj;
};

export const fullDate = fullTime();

export const isValidYear = (year) => {
    if (year < 1970) {
        return false;
    }

    return true;
};

export const isValidMonth = (month) => {
    if (month < 1 || month > 12) {
        return false;
    }

    return true;
};

export const isValidDate = (date) => {
    if (date < 1 || date > 31) {
        return false;
    }

    return true;
};

export const isValidTimes = (time) => {
    const currentTime = new Date().getTime();

    if (time > currentTime) {
        return false;
    }

    return true;
};
