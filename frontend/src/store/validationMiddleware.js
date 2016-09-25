import formValidation from '@utils/formValidation';

export default () => (next) => (action) => {
    const { validate, payload } = action;

    if (!validate || !payload) {
        return next(action);
    }

    return formValidation({ [validate]: payload })
            .then(() => next(action));
};
