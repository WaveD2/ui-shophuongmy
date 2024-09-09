import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import ProductPreview from "../../components/product/ProductPreview";
import { Link, useParams } from "react-router-dom";
import { BaseButtonGreen, BaseLinkGreen } from "../../styles/button";
import { formatPriceVND } from "../../utils/helper";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import ProductDescriptionTab from "../../components/product/ProductDescriptionTab";
import ProductSimilar from "../../components/product/ProductSimilar";
import ProductServices from "../../components/product/ProductServices";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/axios";
import ENDPOINTS from "../../api/endpoins";
import { useDispatch } from "react-redux";
import { addOrderProduct } from "../../redux/slices/orderSlice";
import Tooltip from "../../components/tooltip/Tooltip";
import useDebounce from "../../utils/debounce";

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
    min-width: 600px;
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

    .prod-size-box {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500; 
      color: #1f2937; 
      font-size: 0.875rem;  
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


      &:checked + label .prod-size-box{
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
    }

    .prod-colorbox {
      border-radius: 100%;
      width: 22px;
      height: 22px;
      display: inline-block;
      transition: ${defaultTheme.default_transition};
    }

    input:checked + label .prod-colorbox{
      outline: 1px solid ${defaultTheme.color_gray};
      outline-offset: 3px;
    }
  }
`;



const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${breakpoints.sm}) {
     justify-content: space-between;
      width: 100%;
  }
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 20px;
@media (max-width: ${breakpoints.sm}) {
  flex-wrap: wrap;
  }

`;

const QuantityDisplay = styled.span`
  padding: 0 20px;
  font-size: 18px;
`;

const ProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({
    quantity: 1,
    size: "",
    color: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProduct() {
      try {
        const data = await apiClient.get(`${ENDPOINTS.PRODUCTS}/${id}`);
        if (!data?.record?.length) setProduct({});

        setProduct(data?.record);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchProduct();
  }, [id]);

  const incrementQuantity = () => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      quantity: prevProduct.quantity + 1,
    }));
  };

  const decrementQuantity = () => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      quantity: prevProduct.quantity > 1 ? prevProduct.quantity - 1 : 1,
    }));
  };

  const breadcrumbItems = [
    { label: "Shop", link: "/" },
    { label: "Thời trang bé gái", link: "/product/:thoi-trang-be-gai" },
    // { label: "Trend", link: "/product/:thoi-trang-be-gai" },
  ];


  const handlerAddProductToCart = useDebounce((product) => {
    dispatch(addOrderProduct({ product, ...selectedProduct }))
  }, 300)

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
                  !!(product?.discount) &&
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
                {product?.variants?.length && product?.variants.map((product) => (
                  <div className="prod-size-item" key={product._id}
                    onClick={() => setSelectedProduct({ ...selectedProduct, size: product.size })}>
                    <input id={`size-${product._id}`} type="radio" name="size" />
                    <label htmlFor={`size-${product._id}`}>
                      <Tooltip text={product.size}>
                        <span className="prod-size-box" key={product._id}>
                          {product.size}
                        </span>
                      </Tooltip>
                    </label>
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
                {product?.variants?.length && product?.variants?.map((product) => (
                  <div className="prod-colors-item" key={product._id}
                    onClick={() => setSelectedProduct({ ...selectedProduct, color: product.color })}>
                    <input
                      type="radio"
                      id={`color-${product._id}`}
                      name="colors"
                      disabled={product.stock === 0}
                    />

                    <label htmlFor={`color-${product._id}`}>
                      <Tooltip text={product.color}>
                        <span
                          className="prod-colorbox"
                          key={product._id}
                          style={{ background: `${product.color}` }}
                        >
                        </span>
                      </Tooltip>
                    </label>
                  </div>
                ))}
              </div>
            </ProductColorWrapper>
            <CartContainer>
              <QuantityContainer>
                <BaseButtonGreen onClick={decrementQuantity}>
                  <span style={{ fontSize: "20px" }}>-</span>
                </BaseButtonGreen>
                <QuantityDisplay>{selectedProduct?.quantity}</QuantityDisplay>
                <BaseButtonGreen onClick={incrementQuantity}>
                  <span style={{ fontSize: "20px" }}>+</span>
                </BaseButtonGreen>
              </QuantityContainer>
              <BaseButtonGreen style={{ width: "100%" }} onClick={() => handlerAddProductToCart(product)}>THÊM VÀO GIỎ</BaseButtonGreen>
            </CartContainer>
            <div className="btn-and-price flex items-center flex-wrap">
              <Tooltip text={`${!selectedProduct?.color || !selectedProduct?.size ? "Vui lý chọn màu sắc và hoặc kích cỡ" : ""}`}>
                <BaseLinkGreen
                  onClick={() => handlerAddProductToCart(product)}
                  to="/cart"
                  as={BaseLinkGreen}
                  className="prod-add-btn"
                  style={{
                    width: "100%", height: "40px", display: "flex", gap: "12px",
                    pointerEvents: !selectedProduct?.color || !selectedProduct?.size ? "none" : "auto",
                    opacity: !selectedProduct?.color || !selectedProduct?.size ? 0.8 : 1
                  }}
                >
                  <span className="prod-add-btn-icon">
                    <i className="bi bi-cart2"></i>
                  </span>

                  <span className="prod-add-btn-text" >Mua ngay</span>
                </BaseLinkGreen>
              </Tooltip>
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
