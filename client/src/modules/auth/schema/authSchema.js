import yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().max(255).email().required().label('E-mail'),
    password: yup.string().min(6).required(),
});

export const signUpSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().max(255).email().required().label('E-mail'),
    password: yup.string().min(6).required(),
    repeatPassword: yup.string().sameAs(yup.ref('password'), 'Passwords don\'t match').required(),
});

export const updateUserSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().nullable().transform((value) => value === '' ? null : value).min(6),
    repeatPassword: yup.string().sameAs(yup.ref('password'), 'Passwords don\'t match'),
});
