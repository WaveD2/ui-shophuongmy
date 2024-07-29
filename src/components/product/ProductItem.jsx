import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { calculateDiscountedPrice, formatPriceVND } from "../../utils/helper";

const ProductCardWrapper = styled(Link)`
position: relative;

  .discount-badge {
    position: absolute;
    top: 12px;
    left: 22px;
    background-color: #5b9ce2; /* Màu xanh đậm */
    color: #fff;
    padding: 8px;
    border-radius: 50%;
    font-size: 14px;
    font-weight: bold;
    z-index :10;
  }

  ${commonCardStyles}
  @media(max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-img {
    height: 393px;
    position: relative;

    @media (max-width: ${breakpoints.sm}) {
      height: 320px;
    }
  }

  .product-wishlist-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 100%;

    &:hover {
      background-color: ${defaultTheme.color_yellow};
      color: ${defaultTheme.color_white};
    }
  }
`;

const ProductItem = ({ product }) => {

  return (
    <ProductCardWrapper key={product.id} to={`/product/details/${product.id}`}>
      {
        Boolean(product?.discount) &&
        <div className="discount-badge">-{product?.discount}%</div>
      }
      <div className="product-img">
        <img className="object-fit-cover" src={product?.images?.[0]} />
        <button
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>
      <div className="product-info">
        <p className="font-bold">{product?.name}</p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-gray" style={{ textDecoration: "line-through" }}>{formatPriceVND(product?.price)}</span>
          <span className="text-outerspace font-bold">{calculateDiscountedPrice({ price: product?.price, discount: product?.discount })}</span>
        </div>
      </div>
    </ProductCardWrapper>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
};
