import * as yup from 'yup';


export const loginSchema = yup.object().shape({
    userName: yup.string().required('Vui lòng nhập tài khoản'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có độ dài tối đa 8 ký tự'),
});



export const validateData = async (data, schema) => {
    try {
        await schema.validate(data, { abortEarly: false });
        return null; // No validation errors
    } catch (error) {
        const validationErrors = {};

        error.inner.forEach(err => {
            validationErrors[err.path] = err.message;
        });

        return validationErrors; // Return object with one error per field
    }
};