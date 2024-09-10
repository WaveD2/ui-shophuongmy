import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { FormElement, Input, Textarea } from "../../styles/form";
import { BaseButtonGreen, BaseButtonWhitesmoke } from "../../styles/button";
import { defaultTheme } from "../../styles/themes/default";

const AddressScreenWrapper = styled.main`
  .form-elem-control {
    padding-left: 16px;
    border: 1px solid ${defaultTheme.color_platinum};

    &:focus {
      border-color: ${defaultTheme.color_silver};
    }
  }

  .form-check-elem {
    display: flex;
    align-items: center;
    justify-content: left;
    flex-flow: row-reverse;
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Account", link: "/account" },
  { label: "Add Address", link: "/account/add" },
];

const AddressScreen = () => {

  const labels = [
    { label: "Tên*", placeholder: "Tên", type: 'text' },
    { label: "Họ*", placeholder: "Họ", type: 'text' },
    { label: "Địa chỉ*", placeholder: "Số nhà và tên đường", type: 'text' },
    { label: "Thành phố*", placeholder: "Thành phố", type: 'text' },
    { label: "Tỉnh*", placeholder: "Chọn Tỉnh/Thành phố", type: 'text' },
    { label: "Số điện thoại*", placeholder: "Số điện thoại", type: 'text' },
    { label: "Đặt làm địa chỉ giao hàng mặc định", type: 'checkbox' },
  ];


  return (
    <AddressScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"Tài khoản"} />
            <h4 className="title-sm">Thêm địa chỉ</h4>
            <form>
              <div className="form-wrapper">
                {labels.map((title, index) => (
                  <FormElement key={index} className={`${title.type === 'checkbox' ? 'form-check-elem' : ''}`}>
                    <label
                      htmlFor={`${title.label}-${index}`}
                      className="form-label font-semibold text-base"
                    >
                      {title.label}
                    </label>
                    <Input
                      style={{
                        width: title.type === 'checkbox' && '18px',
                        height: title.type === 'checkbox' && '18px'
                      }}
                      id={`${title.label}-${index}`}
                      type={title.type}
                      className="form-elem-control"
                      placeholder={title.placeholder || ""}
                    />
                  </FormElement>
                ))}
              </div>
              <div className="form-btns flex">
                <BaseButtonGreen type="submit">Lưu</BaseButtonGreen>
                <BaseButtonWhitesmoke type="button">
                  Hủy
                </BaseButtonWhitesmoke>
              </div>
            </form>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AddressScreenWrapper>
  );
};

export default AddressScreen;
