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
import { useState } from "react";

const ProductCardWrapper = styled.div`
  position: relative;
  width: 100%;
  .discount-badge {
    position: absolute;
    top: -4%;
    left: -2%;
    background-color: #e92828;
    color: #fff;
    padding: 10px;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    z-index: 10;
    border: 2px solid #d5acac;
    width: 70px;
    text-align: center;

     @media(max-width: ${breakpoints.sm}) {
      top: -2%;
      padding:6px;
      font-size: 16px;
      width: 54px;
    }
  }

  .product-options {
      padding: 0 10px;

      @media(max-width: ${breakpoints.sm}) {
        padding: 0px;
      }
    }    

`;

const ProductCard = styled(Link)`
  position: relative;
  width: 100%;
  display: inline-block;
    ${commonCardStyles}
    @media(max-width: ${breakpoints.sm}) {
      padding-left: 0;
      padding-right: 0;
    }

    .product-img {
      height: 393px;
      // max-width:300px;
      width:100%;
      position: relative;
      margin-bottom: 8px;

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
      z-index : 10;
      &:hover {
        background-color: ${defaultTheme.color_yellow};
        color: ${defaultTheme.color_white};
      }
  }
`

const ProductItem = ({ product }) => {
  const productId = product._id ? product._id : product.id;

  const [srcImgPreview, setSrcImgPreview] = useState(product?.productItems?.[0].image);

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
    <ProductCardWrapper >
      {
        Boolean(product?.discount) &&
        <div className="discount-badge">-{product?.discount}%</div>
      }
      <ProductCard key={productId} to={`/product/details/${productId}`}>
        <div className="product-img">
          <FashionImageLoader src={srcImgPreview} />
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
        <div style={{ marginBottom: "8px" }}>
          <p className="font-bold">{product?.name}</p>
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-outerspace text-black font-bold">{calculateDiscountedPrice({ price: product?.price, discount: product?.discount })}</span>
            <span className="text-gray" style={{ textDecoration: "line-through" }}>{
              product?.discount ? formatPriceVND(product?.price) : ""}</span>
          </div>
        </div>
      </ProductCard>

      <div className="product-options">
        <ProductOptions
          options={product?.productItems.map(variant => [
            { type: 'image', value: variant.image, text: variant.color }
          ]).flat()}
          onClick={(e) => {
            setSrcImgPreview(e)
          }} />
      </div>

    </ProductCardWrapper>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
};
