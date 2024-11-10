import styled from "styled-components";
import {
  CheckboxGroup,
  FormGridWrapper,
  FormTitle,
} from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import AuthOptions from "../../components/auth/AuthOptions";
import { FormElement, Input } from "../../styles/form";
import PasswordInput from "../../components/auth/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import { useState } from "react";
import { validateSignUp, validateData } from "../../validate/validater";
import { tokenUtils } from "../../utils/token";
import { useDispatch } from "react-redux";
// import { apiClient } from "../../api/apiService";
import ENDPOINTS from "../../api/endpoins";
import showToast from "../../utils/toast";


const SignUpScreenWrapper = styled.section`
  form {
    margin-top: 40px;
    .form-elem-text {
      margin-top: -16px;
      display: block;
    }
  }

  .text-space {
    margin: 0 4px;
  }
`;

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [infoUser, setInfoUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  })

  const [validationErrors, setValidationErrors] = useState({
  })

  async function fetchUser() {
    try {
      // const data = { record: infoUser };
      // // const response = await apiClient.post(`${ENDPOINTS.AUTH}/register`, data);

      // if (!response || !response?.data) {
      //   return setValidationErrors(response);
      // }
      // showToast({ message: "Đăng ký tài khoản thành công!", type: 'success' });

      // return navigate('/sign_in');
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = await validateData(infoUser, validateSignUp);

    setValidationErrors(validationError)

    if (Object.keys(validationError).length === 0 && Object.keys(validationErrors).length === 0) {
      fetchUser();
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
    <SignUpScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img
                src={staticImages.form_img2}
                className="object-fit-cover"
                alt=""
              />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Đăng ký</h3>
                <p className="text-base">
                  Tạo một tài khoản mới
                </p>
              </FormTitle>
              <AuthOptions />
              <div>
                <FormElement>
                  <label htmlFor="userName" className="form-elem-label">
                    Họ Tên *
                  </label>
                  <Input
                    value={infoUser.name}
                    type="text"
                    onChange={(e) => handlerChangeValue({
                      typeF: "name",
                      valueF: e.target.value
                    })}
                    placeholder=""
                    name="name"
                    className="form-elem-control"
                  />
                  <div style={{ height: "14px" }}> <span className="form-elem-error text-end font-medium">{validationErrors?.name && validationErrors?.name}</span></div>
                </FormElement>

                <FormElement>
                  <label htmlFor="phone" className="form-elem-label">
                    Số điện thoại *
                  </label>
                  <Input
                    value={infoUser.phone}
                    type="text"
                    onChange={(e) => handlerChangeValue({
                      typeF: "phone",
                      valueF: e.target.value
                    })}
                    placeholder=""
                    name="phone"
                    className="form-elem-control"
                  />
                  <div style={{ height: "14px" }}> <span className="form-elem-error text-end font-medium">{validationErrors?.phone && validationErrors?.phone}</span></div>
                </FormElement>

                <FormElement>
                  <label htmlFor="email" className="form-elem-label">
                    Email *
                  </label>
                  <Input
                    value={infoUser.email}
                    type="text"
                    onChange={(e) => handlerChangeValue({
                      typeF: "email",
                      valueF: e.target.value
                    })}
                    placeholder=""
                    name="email"
                    className="form-elem-control"
                  />
                  <div style={{ height: "14px" }}> <span className="form-elem-error text-end font-medium">{validationErrors?.email && validationErrors?.email}</span></div>
                </FormElement>


                <PasswordInput fieldName="Mật khẩu" name="password"
                  value={infoUser.password}
                  onChange={(e) => handlerChangeValue({
                    typeF: "password",
                    valueF: e.target.value
                  })}
                  errorMsg={validationErrors?.password && validationErrors?.password}
                />


                <BaseButtonBlack onClick={handleSubmit} className="form-submit-btn">
                  Đăng ký
                </BaseButtonBlack>
              </div>


              <p className="flex flex-wrap account-rel-text">
                Bạn đã có tài khoản?
                <Link to="/sign_in" className="font-medium">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignUpScreenWrapper>
  );
};

export default SignUpScreen;
