import formValidation from '@utils/formValidation';

export default () => (next) => (action) => {
    const { validate, payload } = action;

    if (!validate || !payload) {
        return next(action);
    }

    return new Promise((resolve, reject) => {
        formValidation({ [validate]: payload })
        .then((formErrors) => {
            if (formErrors.hasErrors) {
                return reject(formErrors);
            }

            return resolve(next(action));
        });
    });
};
