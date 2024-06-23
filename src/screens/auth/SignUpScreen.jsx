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
import { Link } from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import { useState } from "react";
import { loginSchema, validateData } from "../../validate/validater";


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

    if (Object.keys(validationErrors).length === 0) {
      console.log(infoUser);
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

                {/* <CheckboxGroup>
                  <li className="flex items-center">
                    <input type="checkbox" />
                    <span className="text-sm">
                      Agree to our
                      <Link to="/" className="text-underline">
                        Terms of use
                      </Link>
                      <span className="text-space">and</span>
                      <Link to="/" className="text-underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" />
                    <span className="text-sm">
                      Subscribe to our monthly newsletter
                    </span>
                  </li>
                </CheckboxGroup> */}



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