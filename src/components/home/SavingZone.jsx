import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { savingZoneData } from "../../data/data";
import { BaseLinkOutlineWhite } from "../../styles/button";
import { breakpoints } from "../../styles/themes/default";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/axios";
import ENDPOINTS from "../../api/endpoins";

const ProductGridWrapper = styled.div`
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const ProductCardOverlayWrapper = styled.div`
  position: relative;
  height: 390px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: ${breakpoints.sm}) {
    height: 360px;
  }

  &:nth-child(1) {
    grid-column: 1/3;
    @media (max-width: ${breakpoints.lg}) {
      grid-column: 1/4;
    }
    @media (max-width: ${breakpoints.md}) {
      grid-column: 1/7;
    }
  }

  &:nth-child(2) {
    grid-column: 3/5;
    @media (max-width: ${breakpoints.lg}) {
      grid-column: 4/7;
    }
    @media (max-width: ${breakpoints.md}) {
      grid-column: 1/7;
    }
  }

  &:nth-child(3) {
    grid-column: 5/7;
    @media (max-width: ${breakpoints.lg}) {
      grid-column: 1/4;
    }
    @media (max-width: ${breakpoints.md}) {
      grid-column: 1/7;
    }
  }

  &:nth-child(4) {
    grid-column: 1/4;
    @media (max-width: ${breakpoints.lg}) {
      grid-column: 4/7;
    }
    @media (max-width: ${breakpoints.md}) {
      grid-column: 1/7;
    }
  }

  &:nth-child(5) {
    grid-column: 4/7;
    @media (max-width: ${breakpoints.lg}) {
      grid-column: 1/7;
    }
  }

  &::after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .product-info{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 32px 24px;
    width: 230px;

    .info-badge{
        min-width: 100px;
        height: 34px;
    }
    .info-title{
        font-size: 28px;
        margin: 14px 0;
    }
    .discount-text{
        margin-top: 4px;
    }
    .info-arrow{
        margin: 16px 0 16px auto;
        width: 110px;
    }

    @media(max-width: ${breakpoints.xl}){
        padding: 16px;
    }
  }
`;

const SavingZone = () => {


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const data = await apiClient.get(ENDPOINTS.CATEGORY);

        if (!data?.length) setCategories([]);

        setCategories(data.data.items);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategory();
  }, []);

  console.log("categories :", categories);

  return (
    <Section>
      <Container>
        <Title titleText={"Flash Sale"} />
        <ProductGridWrapper className="grid">
          {categories?.map((categorie) => {
            return (
              <ProductCardOverlayWrapper
                className="product-card-overlay text-white"
                key={categorie.id}
              >
                <img
                  src={categorie?.bannerImg}
                  className="object-fit-cover"
                  alt=""
                />
                <div className="product-info text-end w-full h-full">
                  {/* {categorie.isLimited && (
                    <div className="info-badge text-white text-xs bg-outerspace inline-flex items-center justify-center">
                      Limited Stock
                    </div>
                  )} */}
                  <h4 className="info-title font-semibold">
                    {categorie?.name}
                  </h4>
                  {/* <p className="info-text text-base">
                    {categorie.description}
                  </p> */}
                  {/* <p className="discount-text text-bold text-xxl uppercase">
                    upto {categorie.discount}% off
                  </p> */}
                  <div className="info-arrow flex items-center justify-center text-xxl">
                    <i className="bi bi-arrow-down">
                      {/* {categorie?.slug} */}
                    </i>
                  </div>
                  <BaseLinkOutlineWhite
                    as={BaseLinkOutlineWhite}
                    to="/"
                    className="uppercase"
                  >
                    shop now
                  </BaseLinkOutlineWhite>
                </div>
              </ProductCardOverlayWrapper>
            );
          })}
        </ProductGridWrapper>
      </Container>
    </Section>
  );
};

export default SavingZone;
