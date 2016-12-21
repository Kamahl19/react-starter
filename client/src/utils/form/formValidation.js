import formSchemas from '@src/utils/form/formSchemas';

const splitCamelCase = (camelCase) => camelCase.replace(/([A-Z][a-z])/g, ' $1');
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function formatError(message) {
    const msgArr = message.split(' ');

    msgArr[0] = capitalize(splitCamelCase(msgArr[0]));

    return msgArr.join(' ');
}

function getErrorMessages(errors) {
    return errors.reduce((obj, err) => {
        if (!obj[err.path]) {
            obj[err.path] = err.params.label ? err.message : formatError(err.message);
        }

        return obj;
    }, {});
}

function validateObject(obj, schema) {
    return new Promise((resolve) => {
        schema.validate(obj, { abortEarly: false })
            .then(() => resolve({}))
            .catch((res) => resolve(getErrorMessages(res.inner)));
    });
}

const documentOffsetTop = (elem) => elem && elem.offsetTop + (elem.offsetParent ? documentOffsetTop(elem.offsetParent) : 0);

export default function formValidation(formObjects, skipScroll = false) {
    const promises = Object.keys(formObjects).reduce((arr, schema) =>
        (formSchemas[schema] ? arr.concat(validateObject(formObjects[schema], formSchemas[schema])) : arr
    ), []);

    return new Promise((resolve, reject) => {
        Promise.all(promises).then((results) => {
            const formErrors = results.reduce((prev, curr) => ({ ...prev, ...curr }), {});

            const errorKeys = Object.keys(formErrors);

            if (errorKeys.length) {
                // Scroll to first error
                if (!skipScroll) {
                    const offsets = errorKeys.map((path) =>
                        documentOffsetTop(document.getElementById(`input_${path}`))
                    );

                    const screenContent = document.querySelector('.screen-content');
                    const topOffset = parseInt(window.getComputedStyle(screenContent).getPropertyValue('padding'), 10);

                    window.scrollTo(0, Math.min(...offsets) - topOffset);
                }

                reject(formErrors);
            }
            else {
                resolve();
            }
        })
    });
}
