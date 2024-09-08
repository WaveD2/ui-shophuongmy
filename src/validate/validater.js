import * as yup from "yup";


export const
    validateLogin = yup.object().shape({
        email: yup.string()
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Email chưa chính xác"
            )
            .optional(),
        phone: yup.string()
            .matches(
                /((0[3|5|7|8|9]|01[2|6|8|9]|\+?84[3|5|7|8|9|12|16|18|19])+([0-9]{8}))|([1-9][0-9]{7,14})/,
                "Số điện thoại chưa chính xác"
            )
            .min(9, "Số điện thoại tối thiểu 9 chữ số")
            .optional(),
        password: yup.string()
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.*\s)(?=.*?[~!#$@%^&*_\-+='|\\(){}[\];:”"<>,.?\/]).{8,}$/,
                "Mật khẩu không hợp lệ"
            )
            .min(8, "Mật khẩu tối thiểu 8 kí tự."),
    });

export const validateSignUp = yup.object().shape({
    email: yup.string()
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email chưa chính xác"
        )
        .required("Vui lòng nhập email"),
    phone: yup.string()
        .matches(
            /((0[3|5|7|8|9]|01[2|6|8|9]|\+?84[3|5|7|8|9|12|16|18|19])+([0-9]{8}))|([1-9][0-9]{7,14})/,
            "Số điện thoại chưa chính xác"
        )
        .min(9, "Số điện thoại tối thiểu 9 chữ số")
        .required("Vui lòng nhập số điện thoại"),
    password: yup.string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.*\s)(?=.*?[~!#$@%^&*_\-+='|\\(){}[\];:”"<>,.?\/]).{8,}$/,
            "Mật khẩu phải bao gồm: \n + Ít nhất một số.\n + Ít nhất một kí tự hoa.\n + Ít nhất một kí tự thường \n + Ít nhất một kí tự đặc biệt \n + >= 8 kí tự."
        )
        .min(8, "Mật khẩu tối thiểu 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    name: yup.string()
        .required('Vui lòng nhập họ và tên'),
});



export const validateData = async (data, schema) => {
    try {
        await schema.validate(data, { abortEarly: false });
        return {};
    } catch (error) {
        const validationErrors = {};

        error.inner.forEach(err => {
            if (!validationErrors[err.path]) {
                validationErrors[err.path] = err.message;
            }
            validationErrors['error'] = "error"
        });

        return validationErrors;
    }
};
