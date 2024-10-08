import styled from "styled-components";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useDispatch } from "react-redux";
import { decreaseAmount, increaseAmount, removeOrderProduct } from "../../redux/slices/orderSlice";
import { useState } from "react";

const CartTableRowWrapper = styled.tr`
  .cart-tbl {
    &-prod {
      grid-template-columns: 80px auto;
      column-gap: 12px;

      @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: 60px auto;
      }
    }

    &-qty {
      .qty-inc-btn,
      .qty-dec-btn {
        width: 24px;
        height: 24px;
        border: 1px solid ${defaultTheme.color_platinum};
        border-radius: 2px;

        &:hover {
          border-color: ${defaultTheme.color_sea_green};
          background-color: ${defaultTheme.color_sea_green};
          color: ${defaultTheme.color_white};
        }
      }

      .qty-value {
        width: 40px;
        height: 24px;
      }
    }
  }

  .cart-prod-info {
    p {
      margin-right: 8px;
      span {
        margin-right: 4px;
      }
    }
  }

  .cart-prod-img {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 8px;

    @media (max-width: ${breakpoints.xl}) {
      width: 60px;
      height: 60px;
    }
  }
`;

const CartItem = ({ cartItem }) => {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(cartItem.quantity);

  return (
    <CartTableRowWrapper key={cartItem.id}>
      <td>
        <span className="text-lg font-bold text-outerspace">
          {cartItem.code}
        </span>
      </td>

      <td>
        <div className="cart-tbl-prod grid">
          <div className="cart-prod-img">
            <img src={cartItem.imgSource} className="object-fit-cover" alt="" />
          </div>
          <div className="cart-prod-info">
            <h4 className="text-base">{cartItem.name}</h4>
            <p className="text-sm text-gray inline-flex">
              <span className="font-semibold">Màu: </span> {cartItem.color}
            </p>
            <p className="text-sm text-gray inline-flex">
              <span className="font-semibold">Size:</span>
              {cartItem.size}
            </p>
          </div>
        </div>
      </td>
      <td>
        <span className="text-lg font-bold text-outerspace">
          {cartItem.discount || 0}
        </span>
      </td>
      <td>
        <div className="cart-tbl-qty flex items-center">
          <button className="qty-dec-btn" onClick={() => {
            dispatch(decreaseAmount({ _id: cartItem.id, size: cartItem.size, color: cartItem.color }));
            if (quantity > 1) setQuantity(quantity - 1);
          }}>
            <i className="bi bi-dash-lg"></i>
          </button>
          <span className="qty-value inline-flex items-center justify-center font-medium text-outerspace">
            {quantity}
          </span>
          <button className="qty-dec-btn" onClick={() => {
            dispatch(increaseAmount({ _id: cartItem.id, size: cartItem.size, color: cartItem.color }));
            if (quantity > 1) setQuantity(quantity + 1);
          }}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </td>
      <td>
        <span className="text-lg font-bold text-outerspace">
          {cartItem.price || 0}
        </span>
      </td>
      <td>
        <span className="text-lg font-bold text-outerspace">
          {cartItem.price * quantity * (1 - cartItem.discount / 100)}
        </span>
      </td>
      <td>
        <div className="cart-tbl-actions flex justify-center">
          <div className="tbl-del-action text-red"
            onClick={() => {
              dispatch(removeOrderProduct({ _id: cartItem.id, size: cartItem.size, color: cartItem.color }));
            }}
          >
            <i className="bi bi-trash3"></i>
          </div>
        </div>
      </td>
    </CartTableRowWrapper>
  );
};

export default CartItem;

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
