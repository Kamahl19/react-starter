import yup from 'yup';

/**
 * Schemas for forms
 */
const schemas = {
    loginCredentials: yup.object().shape({
        email: yup.string().max(255).email().required(),
        password: yup.string().min(6).required(),
    }),
};

const formatError = (err) => {
    const arr = err.split(' ');

    arr[0] = arr[0].replace(/([A-Z][a-z])/g, ' $1');
    arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);

    return arr.join(' ');
};

const validateObject = (obj, schema) =>
    new Promise((resolve) => {
        const opts = {
            abortEarly: false,
        };

        schema.validate(obj, opts)
        .then(() => {
            resolve([]);
        })
        .catch((res) => {
            const paths = [];

            const uniqueErrors = res.inner.filter((err) => {
                if (!paths.includes(err.path)) {
                    paths.push(err.path);
                    return true;
                }
                return false;
            });

            const formatedErrors = {};

            for (const err of uniqueErrors) {
                formatedErrors[err.path] = formatError(err.message);
            }

            resolve(formatedErrors);
        });
    });

const documentOffsetTop = (elem) => elem && elem.offsetTop + (elem.offsetParent ? documentOffsetTop(elem.offsetParent) : 0);

export default (data, skipScroll = false) => new Promise((resolve, reject) => {
    const promises = [];

    Object.keys(data).forEach((key) => {
        if (schemas[key]) {
            promises.push(validateObject(data[key], schemas[key]));
        }
    });

    let formErrors = {};

    Promise.all(promises).then((results) => {
        for (const result of results) {
            formErrors = { ...formErrors, ...result };
        }

        // Scroll to first error
        if (!skipScroll) {
            const offsets = Object.keys(formErrors).map((path) => {
                const elem = document.getElementById(`input_${path}`);
                return documentOffsetTop(elem);
            });

            const elem = document.querySelector('.screen-content');
            const style = window.getComputedStyle(elem);
            const topOffset = parseInt(style.getPropertyValue('padding'), 10);

            window.scrollTo(0, Math.min(...offsets) - topOffset);
        }

        formErrors.hasErrors = !!Object.keys(formErrors).length;

        resolve(formErrors);
    })
    .catch(() => reject(formErrors));
});
