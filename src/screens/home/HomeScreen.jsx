import styled from "styled-components";
import Hero from "../../components/home/Hero";
import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
import { limelightCatalog, mensCatalog, womensCatalog } from "../../data/data";
import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {
  return (
    <HomeScreenWrapper>
      <Hero />
      <Featured />
      <NewArrival />
      <SavingZone />
      <Catalog catalogTitle={"Bộ Sưu Tập Bé Trai"} slug="set-be-trai" />
      <Catalog catalogTitle={"Bộ Sưu Tập Bé Gái"} slug="set-be-gai" />
      <Brands />
      <Catalog catalogTitle={"Siêu Phẩm Bán Chạy"} slug="quan-ao-be-sale" />
      <Feedback />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
