import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Link } from "react-router-dom";
import { cartItems } from "../../data/data";
import CartTable from "../../components/cart/CartTable";
import { breakpoints } from "../../styles/themes/default";
import CartDiscount from "../../components/cart/CartDiscount";
import CartSummary from "../../components/cart/CartSummary";
import { useSelector } from "react-redux";
import EmptyCart from "../../components/cart/EmptyCart";

const CartPageWrapper = styled.main`
  padding: 48px 0;

  .breadcrumb-nav {
    margin-bottom: 20px;
  }
`;

const CartContent = styled.div`
  margin-top: 40px;
  grid-template-columns: 2fr 1fr;
  gap: 40px;

  @media (max-width: ${breakpoints.xl}) {
    grid-template-columns: 100%;
  }

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 24px;
  }

  .cart-list {
    @media (max-width: ${breakpoints.lg}) {
      overflow-x: scroll;
    }
  }

  .cart-content-right {
    gap: 24px;

    @media (max-width: ${breakpoints.xl}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${breakpoints.md}) {
      grid-template-columns: 100%;
    }
  }
`;


const CartScreen = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/cart" },
    { label: "Giỏ hàng", link: "" },
  ];
  const orders = useSelector((state) => state?.order.orderList);
  console.log("orders:::", orders);

  const carts = orders?.length ? orders.map(cart => {
    return {
      code: cart?.code,
      id: cart?._id || cart.id,
      name: cart?.name,
      color: cart?.color,
      size: cart?.size,
      price: cart?.price,
      quantity: cart?.quantity,
      discount: cart?.discount,
      imgSource: cart?.images[0],
    }
  }) : [];

  return (
    <CartPageWrapper>
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <CartContent className="grid items-start">
          <div className="cart-content-left">

            {carts.length ? <CartTable cartItems={carts} /> : <EmptyCart />}

          </div>
          <div className="grid cart-content-right">
            <CartDiscount />
            <CartSummary />
          </div>
        </CartContent>
      </Container>
    </CartPageWrapper>
  );
};

export default CartScreen;
