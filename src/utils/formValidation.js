import yup from 'yup';

// TODO - move to redux middleware

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

export default (data, noScroll = false) =>
    new Promise((resolve) => {
        const promises = [];

        Object.keys(data).forEach((key) => {
            promises.push(validateObject(data[key], schemas[key]));
        });

        let formErrors = {};

        Promise.all(promises)
        .then((results) => {
            for (const result of results) {
                formErrors = { ...formErrors, ...result };
            }

            // Scroll to first error
            if (!noScroll) {
                const offsets = Object.keys(formErrors).map((path) => {
                    const elem = document.getElementById(`input_${path}`);
                    return documentOffsetTop(elem);
                });

                window.scrollTo(0, Math.min(...offsets) - 96);
            }

            formErrors.hasErrors = !!Object.keys(formErrors).length;

            resolve(formErrors);
        });
    });
