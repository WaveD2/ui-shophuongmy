import styled from "styled-components";
import { FormElement, Input } from "../../styles/form";
import { PropTypes } from "prop-types";
import { useState } from "react";

const PasswordToggleButton = styled.button`
  position: absolute;
  bottom: 33%;
  right: 3%;
`;

const PasswordInput = ({ fieldName, name, errorMsg = "", ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormElement>
      <label htmlFor={name} className="form-elem-label">
        {fieldName}
      </label>
      <div className="form-elem-block">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder=""
          name={name}
          className="form-elem-control"
          {...rest}
        />

        <PasswordToggleButton
          type="button"
          className="pwd-value-toggle flex items-center"
          onClick={togglePassword}
        >
          {showPassword ? (
            <>
              <i className="bi bi-eye-fill"></i>
            </>
          ) : (
            <>
              <i className="bi bi-eye-slash-fill"></i>
            </>
          )}
        </PasswordToggleButton>
      </div>
      <div style={{ height: "14px" }}><span className="form-elem-error text-end font-medium">{errorMsg}</span></div>
    </FormElement>
  );
};

export default PasswordInput;

PasswordInput.propTypes = {
  fieldName: PropTypes.string,
  name: PropTypes.string,
  errorMsg: PropTypes.string,
};
