import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { BaseLinkOutlineWhite } from "../../styles/button";
import { breakpoints } from "../../styles/themes/default";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/apiService";
import ENDPOINTS from "../../api/endpoins";
import { Link, useLocation, useParams } from "react-router-dom";

const ProductGridWrapper = styled.div`
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

const ProductCardOverlayWrapper = styled.a`
  position: relative;
  height: 420px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: ${breakpoints.sm}) {
    height: 360px;
  }

    // @media(max-width: ${breakpoints.xl}){
    //     padding: 16px;
    // }
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
        <Title className="uppercase" titleText={banners.title} />
        <ProductGridWrapper className="grid">
          {Object.keys(banners).length &&
            (
              <ProductCardOverlayWrapper
                className="product-card-overlay text-white"
                key={banners.id}
                to={`/product/${banners?.slug}`}
              >
                <div className="product-info text-end w-full h-full">
                  <img
                    src={banners?.image || image}
                    className="object-fit-cover"
                    alt=""
                  />
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
