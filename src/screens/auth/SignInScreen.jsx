import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import AuthOptions from "../../components/auth/AuthOptions";
import { FormElement, Input } from "../../styles/form";
import PasswordInput from "../../components/auth/PasswordInput";
import { Link } from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useState } from "react";
import { loginSchema, validateData } from "../../validate/validater";
import { INFO_USER } from "../../validate/const";
import { setUser } from "../../redux/slices/userSlice";
// import showToast from "../../utils/toast";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


const SignInScreenWrapper = styled.section`
  .form-separator {
    margin: 32px 0;
    column-gap: 18px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 24px 0;
    }

    .separator-text {
      border-radius: 50%;
      min-width: 36px;
      height: 36px;
      background-color: ${defaultTheme.color_purple};
      position: relative;
    }

    .separator-line {
      width: 100%;
      height: 1px;
      background-color: ${defaultTheme.color_platinum};
    }
  }

  .form-elem-text {
    margin-top: -16px;
    display: block;
  }
`;

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [infoUser, setInfoUser] = useState({
    userName: "",
    password: ""
  })

  const [validationErrors, setValidationErrors] = useState({
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = await validateData(infoUser, loginSchema);

    setValidationErrors(validationError)

    if (Object.keys(validationErrors).length === 0 && !validationError) {
      Object.keys(infoUser).map((key) => {

        if (infoUser.key !== INFO_USER[key]) {
          setValidationErrors({
            password: `Thông tin tài khoản chưa chính xác`
          })
        }
        return
      })


      navigate('/');
      return dispatch(setUser(INFO_USER))
    }
  }

  const handlerChangeValue = ({ typeF, valueF }) => {

    const updatedErrors = { ...validationErrors };

    if (updatedErrors.hasOwnProperty(typeF)) {
      delete updatedErrors[typeF];
      setValidationErrors(updatedErrors);
    }
    setInfoUser({ ...infoUser, [typeF]: valueF })
  }

  return (
    <SignInScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img src={staticImages.form_img1} className="object-fit-cover" />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Đăng nhập</h3>
              </FormTitle>
              <AuthOptions />
              <div className="form-separator flex items-center justify-center">
                <span className="separator-line"></span>
                <span className="separator-text inline-flex items-center justify-center text-white">
                  Hoặc
                </span>
                <span className="separator-line"></span>
              </div>

              <div>
                <FormElement>
                  <label htmlFor="userName" className="form-elem-label">
                    Email hoặc Số điện thoại
                  </label>
                  <Input
                    value={infoUser.userName}
                    type="text"
                    onChange={(e) => handlerChangeValue({
                      typeF: "userName",
                      valueF: e.target.value
                    })}
                    placeholder=""
                    name="userName"
                    className="form-elem-control"
                  />
                  <div style={{ height: "14px" }}> <span className="form-elem-error text-end font-medium">{validationErrors?.userName && validationErrors?.userName}</span></div>
                </FormElement>


                <PasswordInput fieldName="Mật khẩu" name="password"
                  value={infoUser.password}
                  onChange={(e) => handlerChangeValue({
                    typeF: "password",
                    valueF: e.target.value
                  })}
                  errorMsg={validationErrors?.password && validationErrors?.password}
                />
                <Link
                  to="/reset"
                  className="form-elem-text text-end font-medium"
                >
                  Quên mật khẩu?
                </Link>
                <BaseButtonBlack type="submit" className="form-submit-btn" onClick={handleSubmit}>
                  Đăng nhập
                </BaseButtonBlack>
              </div>
              <p className="flex flex-wrap account-rel-text">
                Bạn chưa có tài khoản?
                <Link to="/sign_up" className="font-medium">
                  Đăng ký
                </Link>
                `
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignInScreenWrapper>
  );
};

export default SignInScreen;
