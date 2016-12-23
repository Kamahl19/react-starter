import yup from 'yup';

export const updateProductSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
});
