export const INFO_USER = {
    userName: "nguyen dang tung",
    email: "tungdev@gmail.com",
    phone: "0999999999",
    dressInfo: [
        {
            receiverName: "nguyen dang tung1",
            dress: "12 tran phu, ha dong, ha noi",
            phone: "0999999999",
            typeDress: ["Nhận hàng tại nhà", "Nhận hàng tại cong ty"],
        },
        {
            receiverName: "nguyen dang tung2",
            dress: "12 da son, do luong, ha noi",
            phone: "0999999999",
            typeDress: ["Nhận hàng tại nhà"],
        },
    ],
    indexActiveDress: 0,
    password: "123123123",
    accessToken: "123456789accessTokenUser",
    isAdmin: false,
    refreshToken: "123456789refreshTokenUser"
};

export const LABEL_ACCOUNT = [
    {
        label: "Họ và tên",
        forInput: "name",
    },
    {
        label: "Email",
        forInput: "email",
    },
    {
        label: "Số điện thoại",
        forInput: "phone",
    },
]

export const LABEL_LOGIN = [

    {
        label: "Email hoặc Số điện thoại",
        forInput: "userName",
    },
    {
        label: "Mật khẩu",
        forInput: "password",
    },
]