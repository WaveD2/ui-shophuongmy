import * as yup from 'yup';


export const loginSchema = yup.object().shape({
    username: yup.string().required('Vui lòng nhập tài khoản'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có độ dài tối đa 8 ký tự'),
});

export const signUpSchema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tài khoản'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có độ dài tối đa 8 ký tự'),
    email: yup.string().required('Vui lòng nhập email'),
    phone: yup.string().required('Vui lòng nhập số điện thoại'),
});


export const validateData = async (data, schema) => {
    try {
        await schema.validate(data, { abortEarly: false });
        return {}; // No validation errors
    } catch (error) {
        const validationErrors = {};

        error.inner.forEach(err => {
            validationErrors[err.path] = err.message;
        });

        return validationErrors; // Return object with one error per field
    }
};