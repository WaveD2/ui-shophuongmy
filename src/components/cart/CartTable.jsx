import styled from "styled-components";
import CartItem from "./CartItem";
import { PropTypes } from "prop-types";
import { breakpoints } from "../../styles/themes/default";

const ScrollbarXWrapper = styled.div`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: grey;
  }
`;

const CartTableWrapper = styled.table`
  border-collapse: collapse;
  min-width: 680px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  thead {
    th {
      height: 48px;
      padding-left: 16px;
      padding-right: 16px;
      letter-spacing: 0.03em;

      @media (max-width: ${breakpoints.lg}) {
        padding: 16px 12px;
      }

      @media (max-width: ${breakpoints.xs}) {
        padding: 10px;
      }
    }
  }

  tbody {
    td {
      padding: 24px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      @media (max-width: ${breakpoints.lg}) {
        padding: 16px 12px;
      }

      @media (max-width: ${breakpoints.xs}) {
        padding: 10px 6px;
      }
    }
  }
`;

const CartTable = ({ cartItems }) => {
  console.log("cartItems::", cartItems);

  const CART_TABLE_HEADS = [
    {
      label: "Mã sản phẩm",
      key: "code",
      style: "text-center",

    },
    {
      label: "Sản phẩm",
      key: "name",
      style: "text-left",

    },
    {
      label: "Giảm giá",
      key: "discount",
      style: "text-center",

    },
    {
      label: "Số lượng",
      key: "quantity",
      style: "text-center",

    },
    {
      label: "Giá tiền",
      key: "price",
      style: "text-center",

    },
    {
      label: "Tổng tiền",
      key: "total",
      style: "text-center",
    }, {
      label: "",
      key: "action",
      style: "text-center",
    }
  ];

  return (
    <ScrollbarXWrapper>
      <CartTableWrapper className="w-full">
        <thead>
          <tr className="text-start">
            {CART_TABLE_HEADS?.map((column, index) => (
              <th
                key={index}
                className={`bg-outerspace text-white font-semibold capitalize text-sm text-nowrap ${column.style}
                  }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} cartItem={cartItem} />;
          })}
        </tbody>
      </CartTableWrapper>
    </ScrollbarXWrapper>
  );
};

export default CartTable;

CartTable.propTypes = {
  cartItems: PropTypes.array,
};
