import Joi from 'joi-browser';

const documentOffsetTop = (elem) => elem && elem.offsetTop + (elem.offsetParent ? documentOffsetTop(elem.offsetParent) : 0);

function scrollToTheFirstError(errorPaths, formId) {
    const parentElem = (typeof formId !== 'undefined') ? document.querySelector(`#${formId}`) : document;
    let scrollTo = 0;

    if (parentElem) {
        const offsets = errorPaths.map((path) => documentOffsetTop(parentElem.querySelector(`#input_${path}`)));

        scrollTo = Math.min(...offsets);

        const screenContent = document.querySelector('#screen-content');

        if (screenContent) {
            const screenContentPadding = parseInt(window.getComputedStyle(screenContent).getPropertyValue('padding'), 10);
            scrollTo -= screenContentPadding;
        }
    }

    window.scrollTo(0, scrollTo);
}

const splitCamelCase = (camelCase) => camelCase.replace(/([A-Z][a-z])/g, ' $1');
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function formatError(message) {
    const msgArr = message.split('"');

    if (!msgArr[1].includes(' ')) {
        msgArr[1] = capitalize(splitCamelCase(msgArr[1]));
    }

    return msgArr.join('"');
}

function getErrorMessages(errors) {
    return errors.reduce((obj, err) => {
        if (!obj[err.path]) {
            obj[err.path] = formatError(err.message);
        }
        return obj;
    }, {});
}

export default function formValidation(schema, data, { skipScroll = false, formId } = {}) {
    return new Promise((resolve, reject) => {
        Joi.validate(data, schema, { abortEarly: false }, (err) => {
            if (err) {
                const errorsObj = getErrorMessages(err.details);

                if (!skipScroll) {
                    scrollToTheFirstError(Object.keys(errorsObj), formId);
                }

                return reject(formId ? { [formId]: errorsObj } : errorsObj);
            }

            resolve();
        });
    });
}
