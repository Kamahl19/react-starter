import yup from 'yup';

export const productSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
});
