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
import { setUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { apiClient } from "../../api/axios";
import ENDPOINTS from "../../api/endpoins";
import { debounce } from 'lodash';
import { tokenUtils } from "../../utils/token";


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
    username: "",
    password: ""
  })

  const [validationErrors, setValidationErrors] = useState({})


  async function fetchUser() {
    try {
      const response = await apiClient.post(`${ENDPOINTS.AUTH}/login`, infoUser);

      if (!response?.data) return;

      dispatch(setUser(response.data.user))
      tokenUtils.setToken(response.data.tokens);
      tokenUtils.setInfoLocal('user_info', response.data.user);

      return navigate('/');
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = await validateData(infoUser, loginSchema);


    if (validationError) {
      setValidationErrors(validationError)
    }

    if (!Object.keys(validationErrors).length && !validationError) {
      fetchUser();
    }
  }
  const debouncedHandleSubmit = debounce(handleSubmit, 300);

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
                  <label htmlFor="username" className="form-elem-label">
                    Email hoặc Số điện thoại
                  </label>
                  <Input
                    value={infoUser.username}
                    type="text"
                    onChange={(e) => handlerChangeValue({
                      typeF: "username",
                      valueF: e.target.value
                    })}
                    placeholder=""
                    name="username"
                    className="form-elem-control"
                  />
                  <div style={{ height: "14px" }}> <span className="form-elem-error text-end font-medium">{validationErrors?.username && validationErrors?.username}</span></div>
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
                <BaseButtonBlack type="submit" className="form-submit-btn" onClick={debouncedHandleSubmit}>
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
