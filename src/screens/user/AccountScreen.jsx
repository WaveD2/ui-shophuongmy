import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { FormElement, Input } from "../../styles/form";
import { BaseLinkGreen } from "../../styles/button";
import { Link } from "react-router-dom";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { INFO_USER, LABEL_ACCOUNT } from "../../validate/const";
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";



const AccountScreenWrapper = styled.main`
  .address-list {
    margin-top: 20px;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;

    @media (max-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .address-item {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px;
    row-gap: 8px;
  }

  .address-tags {
    gap: 12px;

    li {
      height: 28px;
      border-radius: 8px;
      padding: 2px 12px;
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  .address-btns {
    margin-top: 12px;
    .btn-separator {
      width: 1px;
      border-radius: 50px;
      background: ${defaultTheme.color_platinum};
      margin: 0 10px;
    }
  }
`;

const breadcrumbItems = [
  {
    label: "Home",
    link: "/",
  },
  { label: "Account", link: "/account" },
];




const AccountScreen = () => {

  const user = useSelector((state) => state?.user.info_user);
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState(user);
  const [typeChangeValueInput, setTypeChangeValueInput] = useState(null);
  const inputRefs = useRef({});

  const handleChangeInfoUser = (inputType) => {
    if (typeChangeValueInput === inputType) {
      // Save the changes
      setTypeChangeValueInput(null);

      console.log("inputValues", inputValues);
    } else {
      // Allow changes
      setTypeChangeValueInput(inputType);
      inputRefs.current[inputType]?.focus();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUser({ type: name, value }))
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  return (
    <AccountScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"Tài khoản"} />
            <h4 className="title-sm">Thông tin chi tiết</h4>
            <form>
              <div className="form-wrapper">
                {LABEL_ACCOUNT.map((item, index) => (
                  <FormElement className="form-elem" key={index}>
                    <label
                      htmlFor={item.forInput}
                      className="form-label font-semibold text-base"
                    >
                      {item.label}
                    </label>
                    <div className="form-input-wrapper flex">
                      <Input
                        ref={el => (inputRefs.current[item.forInput] = el)}
                        type={item.forInput === "password" ? "password" : "text"}
                        className="form-elem-control text-outerspace font-semibold"
                        value={inputValues[item.forInput] || ""}
                        onChange={handleInputChange}
                        name={item.forInput}
                        readOnly={typeChangeValueInput !== item.forInput}
                      />
                      <button
                        type="button"
                        className="form-control-change-btn"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => handleChangeInfoUser(item.forInput)}
                      >
                        {typeChangeValueInput === item.forInput ? "Lưu" : "Thay đổi"}
                      </button>
                    </div>
                  </FormElement>
                ))}
              </div>
            </form>
            <div className="dis">
              <h4 className="title-sm">Địa chỉ</h4>
              <BaseLinkGreen to="/account/add">Thêm Địa chỉ</BaseLinkGreen>
              <div className="address-list grid">

                {/* info address user*/}
                {
                  INFO_USER.dressInfo.map((item, index) => {
                    return <div className="address-item grid" key={index}>
                      <p className="text-outerspace text-lg font-semibold address-title">
                        {item.receiverName}
                      </p>
                      <p className="text-gray text-base font-medium address-description">
                        {item.dress}
                      </p>
                      <p className="text-gray text-base font-medium address-description">
                        {item.phone}
                      </p>
                      <ul className="address-tags flex flex-wrap">

                        {
                          item.typeDress.map((typeDressItem, index) => {
                            <li className="text-gray text-base font-medium inline-flex items-center justify-center">
                              {typeDressItem}
                            </li>
                          })
                        }
                      </ul>

                      <div className="address-btns flex">
                        <Link
                          to="/"
                          className="text-base text-outerspace font-semibold"
                        >
                          Xóa
                        </Link>
                        <div className="btn-separator"></div>
                        <Link
                          to="/"
                          className="text-base text-outerspace font-semibold"
                        >
                          Chỉnh sửa
                        </Link>
                      </div>
                    </div>
                  })
                }


              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>
  );
};

export default AccountScreen;
