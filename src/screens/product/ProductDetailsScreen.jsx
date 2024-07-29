import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { product_one } from "../../data/data";
import ProductPreview from "../../components/product/ProductPreview";
import { Link, useParams } from "react-router-dom";
import { BaseLinkGreen } from "../../styles/button";
import { formatPriceVND } from "../../utils/helper";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import ProductDescriptionTab from "../../components/product/ProductDescriptionTab";
import ProductSimilar from "../../components/product/ProductSimilar";
import ProductServices from "../../components/product/ProductServices";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/axios";
import ENDPOINTS from "../../api/endpoins";

const DetailsScreenWrapper = styled.main`
  margin: 40px 0;
`;

const DetailsContent = styled.div`
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: ${breakpoints.xl}) {
    gap: 24px;
    grid-template-columns: 3fr 2fr;
  }

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 100%;
  }
`;

const ProductDetailsWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
  }

  @media (max-width: ${breakpoints.xs}) {
    padding: 12px;
  }

  .prod-title , .prod-price , .prod-size {
    margin-bottom: 10px;
   }

  .rating-and-comments {
    column-gap: 16px;
    margin-bottom: 20px;
  }
  .prod-rating {
    column-gap: 10px;
  }
  .prod-comments {
    column-gap: 10px;
  }
  .prod-add-btn {
    min-width: 160px;
    column-gap: 8px;
    &-text {
      margin-top: 2px;
    }
  }

  .btn-and-price {
    margin-top: 36px;
    column-gap: 16px;
    row-gap: 10px;

    @media (max-width: ${breakpoints.sm}) {
      margin-top: 24px;
    }
  }
`;

const ProductSizeWrapper = styled.div`
  .prod-size-top {
    gap: 20px;
  }
  .prod-size-list {
    gap: 12px;
    margin-top: 16px;
    @media (max-width: ${breakpoints.sm}) {
      gap: 8px;
    }
  }

  .prod-size-item {
    position: relative;
    height: 38px;
    width: 38px;
    cursor: pointer;

    @media (max-width: ${breakpoints.sm}) {
      width: 32px;
      height: 32px;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 38px;
      height: 38px;
      opacity: 0;
      cursor: pointer;

      @media (max-width: ${breakpoints.sm}) {
        width: 32px;
        height: 32px;
      }

      &:checked + span {
        color: ${defaultTheme.color_white};
        background-color: ${defaultTheme.color_outerspace};
        border-color: ${defaultTheme.color_outerspace};
      }
    }

    span {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      border: 1.5px solid ${defaultTheme.color_silver};
      text-transform: uppercase;

      @media (max-width: ${breakpoints.sm}) {
        width: 32px;
        height: 32px;
      }
    }
  }
`;

const ProductColorWrapper = styled.div`
  margin-top: 32px;

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 24px;
  }

  .prod-colors-top {
    margin-bottom: 16px;
  }

  .prod-colors-list {
    column-gap: 12px;
  }

  .prod-colors-item {
    position: relative;
    width: 22px;
    height: 22px;
    transition: ${defaultTheme.default_transition};

    &:hover {
      scale: 0.9;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 22px;
      height: 22px;
      opacity: 0;
      cursor: pointer;

      &:checked + span {
        outline: 1px solid ${defaultTheme.color_gray};
        outline-offset: 3px;
      }
    }

    .prod-colorbox {
      border-radius: 100%;
      width: 22px;
      height: 22px;
      display: inline-block;
    }
  }
`;

const ProductDetailsScreen = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});


  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProduct() {
      try {
        const data = await apiClient.get(`${ENDPOINTS.PRODUCTS}/${id}`);
        if (!data?.data?.record) setProduct({});

        setProduct(data?.data?.record);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchProduct();
  }, []);

  // const stars = Array.from({ length: 5 }, (_, index) => (
  //   <span
  //     key={index}
  //     className={`text-yellow ${index < Math.floor(product_one.rating)
  //       ? "bi bi-star-fill"
  //       : index + 0.5 === product_one.rating
  //         ? "bi bi-star-half"
  //         : "bi bi-star"
  //       }`}
  //   ></span>
  // ));

  const breadcrumbItems = [
    { label: "Shop", link: "/" },
    { label: "Thời trang bé gái", link: "/product/:thoi-trang-be-gai" },
    // { label: "Trend", link: "/product/:thoi-trang-be-gai" },
  ];
  console.log("product", product);
  return (
    Object.keys(product).length > 0 &&
    <DetailsScreenWrapper>
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <DetailsContent className="grid">
          <ProductPreview previewImages={product?.images} />
          <ProductDetailsWrapper>
            <h2 className="prod-title">{product?.name}</h2>
            <ProductSizeWrapper>
              <p className="prod-price text-3xl font-bold text-outerspace">
                {product?.price && formatPriceVND(product?.price, product?.discount)}
                {
                  Boolean(product?.discount) &&
                  <span className="text-gray text-xl" style={{ textDecoration: "line-through", display: "inline-block", marginLeft: "8px" }}>{formatPriceVND(product?.price)}</span>
                }
              </p>
              <div className="prod-size flex items-center flex-wrap">
                <p className="text-lg font-semibold text-outerspace">
                  Chọn size
                </p>
                {/* <Link to="/" className="text-lg text-gray font-medium">
                  bảng size chi tiết &nbsp; <i className="bi bi-arrow-right"></i>
                </Link> */}
              </div>
              <div className="prod-size-list flex items-center">
                {product?.productItems?.length && product?.productItems.map((product) => (
                  <div className="prod-size-item" key={product.productId}>
                    <input type="radio" name="size" />
                    <span className="flex items-center justify-center font-medium text-outerspace text-sm" key={product.id}>
                      {product.size}
                    </span>
                  </div>
                ))}
              </div>
            </ProductSizeWrapper>
            <ProductColorWrapper>
              <div className="prod-colors-top flex items-center flex-wrap">
                <p className="text-lg font-semibold text-outerspace">
                  Màu sắc
                </p>
              </div>
              <div className="prod-colors-list flex items-center">
                {product?.productItems?.length && product?.productItems?.map((product) => (
                  <div className="prod-colors-item" key={product.productId}>
                    <input type="radio" name="colors" />
                    <span
                      className="prod-colorbox"
                      key={product.id}
                      style={{ background: `${product.color}` }}
                    ></span>
                  </div>
                ))}
              </div>
            </ProductColorWrapper>
            <div className="btn-and-price flex items-center flex-wrap">
              <BaseLinkGreen
                to="/cart"
                as={BaseLinkGreen}
                className="prod-add-btn"
              >
                <span className="prod-add-btn-icon">
                  <i className="bi bi-cart2"></i>
                </span>
                <span className="prod-add-btn-text">Mua ngay</span>
              </BaseLinkGreen>
            </div>
            <ProductServices />
          </ProductDetailsWrapper>
        </DetailsContent>
        <ProductDescriptionTab des={product?.description} />
        <ProductSimilar slug={product?.category?.slug} name={product?.name} />
      </Container>
    </DetailsScreenWrapper >
  )

};

export default ProductDetailsScreen;
