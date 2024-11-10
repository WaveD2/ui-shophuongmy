import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import ProductPreview from "../../components/product/ProductPreview";
import { Link, useParams } from "react-router-dom";
import { BaseButtonGreen, BaseLinkGreen } from "../../styles/button";
import { calculateDiscountedPrice, formatPriceVND } from "../../utils/helper";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import ProductDescriptionTab from "../../components/product/ProductDescriptionTab";
import ProductSimilar from "../../components/product/ProductSimilar";
import ProductServices from "../../components/product/ProductServices";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/apiService";
import ENDPOINTS from "../../api/endpoins";
import { useDispatch } from "react-redux";
import { addOrderProduct } from "../../redux/slices/orderSlice";
import Tooltip from "../../components/tooltip/Tooltip";
import useDebounce from "../../utils/debounce";
import ProductOptions from "../../components/product/ProductionOption";
import Promotions from "../../components/product/ProductPromotions";
import Coupon from "../../components/product/ProductDiscount";

const DetailsScreenWrapper = styled.main`
    padding: 32px 45px;
    @media (max-width: ${breakpoints.md}) {
      padding: 15px 0px;
    }
`;

const DetailsContent = styled.div`
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

    @media (max-width: ${breakpoints.xl}) {
    gap: 24px;
    grid-template-columns: repeat(, 1fr);
  }

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 100%;
    } 
  }
`;

const ProductDetailsWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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
    width: 100%;
   height: 40px;
   display: flex;
   gap: 12px; 

    &-text {
      margin-top: 2px;
    }

    @media (max-width: ${breakpoints.sm}) {
      max-width: 100%;
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

const ProductColorWrapper = styled.div`
  .prod-size-top {
    gap: 20px;
  }
  .prod-discount {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    margin-left: 16px;
    padding: 2px 4px;
    background: red;
    width: max-content;
    text-align: center;
    border-radius: 30px;
  }
  .prod-size-list {
    gap: 12px;
    margin-top: 4px;
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

const ProductSizeWrapper = styled.div`
  margin-top: 32px;

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 24px;
  }

  .prod-colors-list {
    column-gap: 12px;
  }
 `


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
  const [imgPrevew, setImgPrevew] = useState();

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

  const promotions = [
    '[Độc quyền Online] Voucher siêu hot 50K - 100K. Áp dụng cho cả hàng Sale và đồng thời CTKM khác',
    'Sale up to 70% hàng loạt siêu phẩm mùa thu',
    'Freeship toàn quốc HD từ 499K',
    '[Độc quyền Online] Ưu đãi sinh nhật bé tháng 9 - Giảm 20% tối đa 100K với HD nguyên giá từ 449K. Inbox Fanpage áp dụng CTKM (Không áp dụng đồng thời CTKM khác)',
    'Lưu ý: Đối với hàng sale, SP áp dụng CTKM: Đổi size (nếu còn size). Không đổi qua sản phẩm khác.',
  ];


  return (
    Object.keys(product).length > 0 &&
    <DetailsScreenWrapper>
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <DetailsContent className="grid">
          <ProductPreview
            images={product?.productItems.map(variant => {
              return { type: 'image', image: variant.image, text: variant.color }
            })}
            previewImage={imgPrevew}
          />
          <ProductDetailsWrapper>
            <h2 className="prod-title">{product?.name}</h2>
            <ProductColorWrapper>
              <div className="prod-price text-3xl font-bold text-outerspace">
                <span> {calculateDiscountedPrice({ price: product?.price, discount: product?.discount })}</span>
                {
                  !!(product?.discount) &&
                  <span className="text-gray text-xl" style={{ textDecoration: "line-through", display: "inline-block", marginLeft: "8px" }}>{formatPriceVND(product?.price)}</span>
                }

                {product?.discount && <span className="prod-discount">
                  <span>-{product?.discount}%</span >
                </span>}
              </div>
              <div className="prod-size flex items-center flex-wrap">
                <p className="text-lg font-semibold text-outerspace">
                  Màu sắc
                  <span className="text-gray text-sm capitalize" >: {"mau do"}</span>
                </p>

                {/* <Link to="/" className="text-lg text-gray font-medium">
                  bảng size chi tiết &nbsp; <i className="bi bi-arrow-right"></i>
                </Link> */}
              </div>
              <div className="prod-size-list flex items-center">
                <div className="product-options">
                  <ProductOptions
                    options={product?.productItems.map(variant => [
                      { type: 'image', value: variant.image, text: variant.color }
                    ]).flat()}
                    onClick={(e) => {
                      console.log("Err", e);
                      setImgPrevew(e)
                    }} />
                </div>
              </div>
            </ProductColorWrapper>
            <ProductSizeWrapper>
              {/* hien thi size */}
              <div className="prod-size-list flex items-center">
                <div className="product-options">
                  <ProductOptions
                    options={product?.productItems.map(variant => [
                      { type: 'texc', value: variant.image, text: variant.color }
                    ]).flat()}
                    onClick={(e) => {
                      console.log("Err", e);
                      setImgPrevew(e)
                    }} />
                </div>
              </div>
            </ProductSizeWrapper>
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

            <div style={{ marginTop: "20px" }}>
              <h3>Mã giảm giá:</h3>
              <Coupon />
            </div>

            <Promotions promotions={promotions} />

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
