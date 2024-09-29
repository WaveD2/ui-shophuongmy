import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import Slider from "react-slick";
import CustomNextArrow from "../common/CustomNextArrow";
import CustomPrevArrow from "../common/CustomPrevArrow";
import { newArrivalData } from "../../data/data";
import { commonCardStyles } from "../../styles/card";
import { breakpoints } from "../../styles/themes/default";

const ProductCardBoxWrapper = styled.div`
  ${commonCardStyles}
  .product-img {
    height: 262px;
    width: 262px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding-left: 6px;
    padding-right: 6px;
  }
`;

const ArrivalSliderWrapper = styled.div`
  max-height:300px;
  overflow: hidden;
  .custom-prev-arrow {
    top: 43%;
    left: -18px;
   
    @media (max-width: ${breakpoints.xxl}) and (max-width: ${breakpoints.lg}) {
      top: 42%;
      left : 0
    }

    @media (min-width: 360px) and (max-width: 680px) {
      top: 22%;
      left : 0
    }
    @media (min-width: 410px) {
      top: 42%;
      left : 0
    }
  }

  .custom-next-arrow {
    top: 43%;
    right: -18px;

    // @media (max-width: ${breakpoints.xxl}) and (max-width: ${breakpoints.lg}) {
    //   top: 42%;
    //   right: 0;
    // }

    @media (min-width: 360px) and (max-width: 680px) {
      top: 22%;
      right: 0;
    }
    @media (min-width: 410px) {
      top: 42%;
      right: 0;
    }
  }
`;

const NewArrival = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth: true,
    centerMode: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };

  return (
    <Section>
      <Container>
        <Title titleText={"Hàng mới về"} />
        <ArrivalSliderWrapper>
          <Slider
            nextArrow={<CustomNextArrow />}
            prevArrow={<CustomPrevArrow />}
            {...settings}
          >
            {newArrivalData?.map((newArrival) => {
              return (
                <ProductCardBoxWrapper key={newArrival.id}>
                  <div className="product-img">
                    <img
                      className="object-fit-cover"
                      src={newArrival.imgSource}
                    />
                  </div>
                  <div className="product-info">
                    <p className="font-semibold text-xl">{newArrival.title}</p>
                  </div>
                </ProductCardBoxWrapper>
              );
            })}
          </Slider>
        </ArrivalSliderWrapper>
      </Container>
    </Section>
  );
};

export default NewArrival;
