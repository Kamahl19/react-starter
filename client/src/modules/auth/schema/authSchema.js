import yup from 'yup';

const stringRequired = yup.string().required();
const emailRequired = yup.string().max(255).email().required().label('E-mail');
const password = yup.string().min(6);
const optionalPassword = yup.string().nullable().transform((value) => value === '' ? null : value).min(6);
const repeatPassword = yup.string().sameAs(yup.ref('password'), 'Passwords don\'t match');

export const loginSchema = yup.object().shape({
    email: emailRequired,
    password: stringRequired,
});

export const forgottenPasswordSchema = yup.object().shape({
    email: emailRequired,
});

export const resetPasswordSchema = yup.object().shape({
    password,
    repeatPassword,
});

export const signUpSchema = yup.object().shape({
    name: stringRequired,
    email: emailRequired,
    password,
    repeatPassword,
});

export const updateUserSchema = yup.object().shape({
    name: stringRequired,
    password: optionalPassword,
    repeatPassword,
});
