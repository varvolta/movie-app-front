export const debounce = (callback, timeout = 300) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, timeout);
    };
};

export const onChangeBody = (value, name, isValid, oldValue) => {
    const bodyCopy = { ...oldValue };

    if (value === '') {
        delete bodyCopy[name];
        return bodyCopy;
    }
    if (isValid !== undefined) {
        if (isValid) {
            bodyCopy[name] = value;
        } else {
            delete bodyCopy[name];
        }
    } else {
        bodyCopy[name] = value;
    }

    return bodyCopy;
};
