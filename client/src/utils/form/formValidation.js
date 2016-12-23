import formSchemas from './formSchemas';

const documentOffsetTop = (elem) => elem && elem.offsetTop + (elem.offsetParent ? documentOffsetTop(elem.offsetParent) : 0);

function scrollToTheFirstError(errorPaths, formId) {
    const parentElem = (typeof formId !== 'undefined') ? document.querySelector(`#${formId}`) : document;

    let scrollTo = 0;

    if (parentElem) {
        const offsets = errorPaths.map((path) =>
            documentOffsetTop(parentElem.querySelector(`#input_${path}`))
        );

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

export default function formValidation(schemaData, skipScroll = false, formId) {
    const schema = Object.keys(schemaData)[0];

    return formSchemas[schema].validate(schemaData[schema], { abortEarly: false })
        .catch(({ inner }) => {
            const errorsObj = getErrorMessages(inner);

            if (!skipScroll) {
                scrollToTheFirstError(Object.keys(errorsObj), formId);
            }

            return Promise.reject({ [schema]: errorsObj });
        });
}
