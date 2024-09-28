import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { calculateDiscountedPrice, formatPriceVND } from "../../utils/helper";
import { tokenUtils } from "../../utils/token";
import showToast from "../../utils/toast";
import useDebounce from "../../utils/debounce";
import ProductOptions from "./ProductionOption";
import FashionImageLoader from "../common/ImageLoading";

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
  const productId = product._id ? product._id : product.id;

  const handleAddToWishList = useDebounce(() => {
    const wishlist = tokenUtils.getInfoLocal('wishlists') || [];
    const index = wishlist.findIndex((item) => item.code === product.code);
    if (index !== -1) {
      showToast({ message: "Đã có trong sản phẩm yêu thích", type: "info" });
    } else {
      wishlist.push(product);
      tokenUtils.setInfoLocal('wishlists', wishlist);
      showToast({ message: "Đã thêm vào sản phẩm yêu thích", type: "success" });
    }
  }, 200)

  return (
    <ProductCardWrapper key={productId} to={`/product/details/${productId}`}>
      {
        Boolean(product?.discount) &&
        <div className="discount-badge">-{product?.discount}%</div>
      }
      <div className="product-img">
        {/* <img className="object-fit-cover" src={product?.productItems?.[0].image} /> */}
        <FashionImageLoader src={product?.productItems?.[0].image} />
        <button
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
          onClick={(e) => {
            e.preventDefault();
            handleAddToWishList();
          }}
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>
      <div className="product-option">
        <ProductOptions
          options={product?.productItems.map(variant => [
            { type: 'image', value: variant.image, text: variant.color }
          ]).flat()}
          onSelect={(e) => {
            e.preventDefault()
            console.log("er :;", e);
          }} />
      </div>
      <div className="product-info">
        <p className="font-bold">{product?.name}</p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-outerspace text-black font-bold">{calculateDiscountedPrice({ price: product?.price, discount: product?.discount })}</span>
          <span className="text-gray" style={{ textDecoration: "line-through" }}>{
            product?.discount ? formatPriceVND(product?.price) : ""}</span>
        </div>
      </div>
    </ProductCardWrapper>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
};
