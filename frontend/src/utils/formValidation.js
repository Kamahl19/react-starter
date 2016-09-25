import formSchemas from './formSchemas';

const formatError = (err) => {
    const arr = err.split(' ');

    arr[0] = arr[0].replace(/([A-Z][a-z])/g, ' $1');
    arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);

    return arr.join(' ');
};

const validateObject = (obj, schema) =>
    new Promise((resolve) => {
        schema.validate(obj, { abortEarly: false })
        .then(() => {
            resolve({});
        })
        .catch((res) => {
            const formatedErrors = {};
            const paths = [];

            const uniqueErrors = res.inner.filter((err) => {
                if (!paths.includes(err.path)) {
                    paths.push(err.path);
                    return true;
                }
                return false;
            });

            for (const err of uniqueErrors) {
                formatedErrors[err.path] = formatError(err.message);
            }

            resolve(formatedErrors);
        });
    });

const documentOffsetTop = (elem) => elem && elem.offsetTop + (elem.offsetParent ? documentOffsetTop(elem.offsetParent) : 0);

export default (data, skipScroll = false) =>
    new Promise((resolve, reject) => {
        const promises = [];

        Object.keys(data).forEach((schemaName) => {
            if (formSchemas[schemaName]) {
                promises.push(validateObject(data[schemaName], formSchemas[schemaName]));
            }
        });

        let formErrors = {};

        Promise.all(promises).then((results) => {
            for (const result of results) {
                formErrors = { ...formErrors, ...result };
            }

            const errorKeys = Object.keys(formErrors);

            // Scroll to first error
            if (!skipScroll && errorKeys.length) {
                const offsets = errorKeys.map((path) =>
                    documentOffsetTop(document.getElementById(`input_${path}`))
                );

                const elem = document.querySelector('.screen-content');
                const topOffset = parseInt(window.getComputedStyle(elem).getPropertyValue('padding'), 10);

                window.scrollTo(0, Math.min(...offsets) - topOffset);
            }

            if (errorKeys.length) {
                reject(formErrors);
            }
            else {
                resolve();
            }
        })
        .catch(() => resolve());
    });
