import yup from 'yup';

yup.addMethod(yup.mixed, 'sameAs', function(ref, message) {
    return this.test('sameAs', message, function(value) {
        const other = this.resolve(ref);

        return !other || !value || value === other;
    });
});

export default {
    loginCredentials: yup.object().shape({
        email: yup.string().max(255).email().required(),
        password: yup.string().min(6).required(),
    }),

    signUpData: yup.object().shape({
        name: yup.string().required(),
        email: yup.string().max(255).email().required(),
        password: yup.string().min(6).required(),
        repeatPassword: yup.string().sameAs(yup.ref('password'), 'Passwords don\'t match').required(),
    }),

    updateUserData: yup.object().shape({
        name: yup.string().required(),
        password: yup.string().nullable().transform((value) => value === '' ? null : value).min(6),
        repeatPassword: yup.string().sameAs(yup.ref('password'), 'Passwords don\'t match'),
    }),

    updateProductData: yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
    }),
};
