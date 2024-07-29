import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
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
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await apiClient.get(ENDPOINTS.BANNER);

        if (!data?.length) setBanners([]);

        setBanners(data.data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    }
    fetchBanners();
  }, []);


  return (
    <Section>
      <Container>
        <Title titleText={"Flash Sale"} />
        <ProductGridWrapper className="grid">
          {banners?.map((banner) => {
            return (
              <ProductCardOverlayWrapper
                className="product-card-overlay text-white"
                key={banner.id}
              >
                <img
                  src={banner?.bannerImg}
                  className="object-fit-cover"
                  alt=""
                />
                <div className="product-info text-end w-full h-full">
                  <h4 className="info-title font-semibold">
                    {banner?.title}
                  </h4>

                  <BaseLinkOutlineWhite
                    as={BaseLinkOutlineWhite}
                    to={`/product/${banner?.slug}`}
                    className="uppercase"
                  >
                    Xem ngay
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
