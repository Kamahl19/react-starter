import yup from 'yup';

yup.addMethod(yup.mixed, 'sameAs', function(ref, message) {
    return this.test('sameAs', message, function(value) {
        const other = this.resolve(ref);

        return !other || !value || value === other;
    });
});

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

export default function formValidation(schema, data, skipScroll = false, formId) {
    return schema.validate(data, { abortEarly: false })
        .catch(({ inner }) => {
            const errorsObj = getErrorMessages(inner);

            if (!skipScroll) {
                scrollToTheFirstError(Object.keys(errorsObj), formId);
            }

            return Promise.reject(
                formId ? { [formId]: errorsObj } : errorsObj
            );
        });
}
