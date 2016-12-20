import formSchemas from '@src/utils/form/formSchemas';

function formatError(err) {
    const arr = err.split(' ');

    arr[0] = arr[0].replace(/([A-Z][a-z])/g, ' $1');
    arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);

    return arr.join(' ');
}

function validateObject(obj, schema) {
    return new Promise((resolve) => {
        schema.validate(obj, { abortEarly: false })
        .then(() => {
            resolve({});
        })
        .catch((res) => {
            const errors = res.inner.reduce((obj, err) => {
                if (!obj[err.path]) {
                    obj[err.path] = formatError(err.message);
                }

                return obj;
            }, {});

            resolve(errors);
        });
    });
}

const documentOffsetTop = (elem) => elem && elem.offsetTop + (elem.offsetParent ? documentOffsetTop(elem.offsetParent) : 0);

export default function formValidation(data, skipScroll = false) {
    return new Promise((resolve, reject) => {
        const promises = [];

        Object.keys(data).forEach((schemaName) => {
            if (formSchemas[schemaName]) {
                promises.push(validateObject(data[schemaName], formSchemas[schemaName]));
            }
        });

        Promise.all(promises).then((results) => {
            const formErrors = results.reduce((prev, curr) => ({ ...prev, ...curr }), {});

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
}
