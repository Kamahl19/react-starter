import yup from 'yup';

export default {
    loginCredentials: yup.object().shape({
        email: yup.string().max(255).email().required(),
        password: yup.string().min(6).required(),
    }),
};
