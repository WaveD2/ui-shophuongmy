import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { BaseLinkOutlineWhite } from "../../styles/button";
import { breakpoints } from "../../styles/themes/default";
import { useEffect, useState } from "react";
// import { apiClient } from "../../api/apiService";
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

const SavingZone = ({ slug = "", images, title = "" }) => {

  return (
    <Section>
      <Container>
        <Title className="uppercase" titleText={title} />
        <ProductGridWrapper className="grid">
          <ProductCardOverlayWrapper
            className="product-card-overlay text-white"
            key={`/product/${slug}`}
            to={`/product/${slug}`}
          >
            <div className="product-info text-end w-full h-full">
              <img
                src={images}
                className="object-fit-cover"
                alt=""
              />
            </div>
          </ProductCardOverlayWrapper>
        </ProductGridWrapper>
      </Container>
    </Section>
  );
};

export default SavingZone;
