import styled from "styled-components";
import { BaseButtonGreen } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useNavigate } from "react-router-dom";

const CartSummaryWrapper = styled.div`
  background-color: ${defaultTheme.color_flash_white};
  padding: 16px;

  .checkout-btn {
    min-width: 100%;
  }

  .summary-list {
    padding: 20px;

    @media (max-width: ${breakpoints.xs}) {
      padding-top: 0;
      padding-right: 0;
      padding-left: 0;
    }

    .summary-item {
      margin: 6px 0;

      &:last-child {
        margin-top: 20px;
        border-top: 1px dashed ${defaultTheme.color_sea_green};
        padding-top: 10px;
      }
    }
  }
`;

const CartSummary = () => {
  const navigate = useNavigate();
  return (
    <CartSummaryWrapper>
      <ul className="summary-list">
        <li className="summary-item flex justify-between">
          <span className="font-medium text-outerspace">Tạm tính</span>
          <span className="font-medium text-outerspace">$513.00</span>
        </li>
        <li className="summary-item flex justify-between">
          <span className="font-medium text-outerspace">Giảm giá</span>
          <span className="font-medium text-outerspace">$5.00</span>
        </li>
        <li className="summary-item flex justify-between">
          <span className="font-medium text-outerspace">Tổng cộng</span>
          <span className="summary-item-value font-bold text-outerspace">
            $518.00
          </span>
        </li>
      </ul>
      <BaseButtonGreen type="submit" className="checkout-btn" onClick={() => navigate('/checkout')}>
        Tiếp tục đến phương thức thanh toán
      </BaseButtonGreen>
    </CartSummaryWrapper>
  );
};

export default CartSummary;
