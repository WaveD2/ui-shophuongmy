import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { BaseLinkOutlineWhite } from "../../styles/button";
import { breakpoints } from "../../styles/themes/default";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/axios";
import ENDPOINTS from "../../api/endpoins";

const ProductGridWrapper = styled.div`
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

const ProductCardOverlayWrapper = styled.div`
  position: relative;
  height: 420px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: ${breakpoints.sm}) {
    height: 360px;
  }


  .product-info{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 32px 24px;
    width: 230px;
    text-wrap: nowrap;

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

const SavingZone = ({ slug, banner }) => {
  const [banners, setBanners] = useState({});

  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await apiClient.get(`${ENDPOINTS.BANNER}/${slug}`);

        if (!data?.record) setBanners({});

        setBanners(data.record);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    }
    if (slug) {
      fetchBanners();
    }
  }, [slug]);

  useEffect(() => {
    if (banner) {
      setBanners(banner);
    }
  }, [banner]);

  return (
    <Section>
      <Container>
        <Title titleText={banners.title} />
        <ProductGridWrapper className="grid">
          {Object.keys(banners).length &&
            (
              <ProductCardOverlayWrapper
                className="product-card-overlay text-white"
                key={banners.id}
              >
                <img
                  src={banners?.bannerImg || bannerImg}
                  className="object-fit-cover"
                  alt=""
                />
                <div className="product-info text-end w-full h-full">
                  {/* <h4 className="info-title font-semibold">
                    {banners?.title}
                  </h4> */}

                  <BaseLinkOutlineWhite
                    as={BaseLinkOutlineWhite}
                    to={`/product/${banners?.slug}`}
                    className="uppercase"
                  >
                    Xem ngay
                  </BaseLinkOutlineWhite>
                </div>
              </ProductCardOverlayWrapper>
            )
          }
        </ProductGridWrapper>
      </Container>
    </Section>
  );
};

export default SavingZone;
