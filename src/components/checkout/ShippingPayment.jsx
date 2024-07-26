import React, {useState} from 'react';
import styled from "styled-components";
import { defaultTheme, breakpoints } from "../../styles/themes/default";
import {BaseButtonGreen} from "../../styles/button.js";

const ShippingPaymentWrapper = styled.div`
  .shipping-method,
  .payment-method {
    margin: 20px 0;

    &-title {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: bold;
    }

    .list-group {
      padding: 16px;
      background-color: ${defaultTheme.color_whitesmoke};
      max-width: 818px;
      margin-top: 24px;
      border-radius: 12px;

      @media (max-width: ${breakpoints.sm}) {
        padding: 10px ;
        border-radius: 8px;
        margin-top: 16px;
      }
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      column-gap: 20px;
    }

    .horiz-line-separator {
      margin: 20px 0;
      border: none;
      border-top: 1px solid ${defaultTheme.color_platinum};

      @media (max-width: ${breakpoints.sm}) {
        margin: 12px 0;
      }
    }
  }

  .payment-method {
    .payment-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
      .list-group-item {
          cursor: pointer;
      }
  }
   
    }
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;

const Label = styled.label`
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: 10px ;
    cursor: pointer;
`;

const Price = styled.span`
  font-weight: bold;
`;

const RadioInput = styled.input`
  appearance: none;
  min-width: 20px;
  height: 20px;
  border: 1px solid ${defaultTheme.color_sea_green};
  border-radius: 50%;
  outline: none;
  margin-right: 10px;
    cursor: pointer;
  
  &:checked {
    background-color: ${defaultTheme.color_sea_green};
    box-shadow: inset 0 0 0 4px white;
  }
    
`;

const ShippingPayment = () => {
    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };
    return (
        <ShippingPaymentWrapper>
            <div className="shipping-method">
                <h3 className="shipping-method-title">Phương thức vận chuyển</h3>
                <div className="list-group">
                    <div className="list-group-item">
                        <Icon src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6"
                              alt="Freeship"/>
                        <Label>Freeship (3-5 ngày)</Label>
                        <Price>0đ</Price>
                    </div>
                </div>
            </div>

            <div className="payment-method">
                <h3 className="payment-method-title">Phương thức thanh toán</h3>
                <div className="list-group">
                    <div className="payment-options">
                        <div className="list-group-item">
                            <Label>
                                <RadioInput
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={selectedPayment === 'cod'}
                                    onChange={handlePaymentChange}
                                />
                                <Icon src="https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6" alt="COD"/>
                                Thanh toán khi giao hàng (COD)
                            </Label>
                        </div>
                        <div className="list-group-item">
                            <Label>
                                <RadioInput
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank"
                                    checked={selectedPayment === 'bank'}
                                    onChange={handlePaymentChange}
                                />
                                <Icon src="https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6" alt="Bank transfer"/>
                                Chuyển khoản ngân hàng - Vietcombank 0181003489340
                            </Label>
                        </div>
                        <div className="list-group-item">
                            <Label>
                                <RadioInput
                                    type="radio"
                                    name="paymentMethod"
                                    value="vnpay"
                                    checked={selectedPayment === 'vnpay'}
                                    onChange={handlePaymentChange}
                                />
                                <Icon src="https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6" alt="VNPay"/>
                                TT VNPay (ATM/Visa/MasterCard/JCB/QR Pay)
                            </Label>
                        </div>
                        <div className="list-group-item">
                            <Label>
                                <RadioInput
                                    type="radio"
                                    name="paymentMethod"
                                    value="momo"
                                    checked={selectedPayment === 'momo'}
                                    onChange={handlePaymentChange}
                                />
                                <Icon src="https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6" alt="MoMo"/>
                                TT qua ví MoMo
                            </Label>
                        </div>
                    </div>
                </div>
            </div>


            <BaseButtonGreen type="submit" className="contd-delivery-btn">
                Hoàn tất đơn hàng
            </BaseButtonGreen>
        </ShippingPaymentWrapper>
    );
};

export default ShippingPayment;