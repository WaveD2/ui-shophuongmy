import styled from "styled-components";
import Hero from "../../components/home/Hero";
import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {
  return (
    <HomeScreenWrapper>
      <Hero />
      <Featured />
      <NewArrival />
      <SavingZone slug={"sale-he-ruc-ro"} />
      <Catalog catalogTitle={"Bộ Sưu Tập Bé Trai"} slugs={["phu-kien-thoi-trang"]} />
      <Catalog catalogTitle={"Bộ Sưu Tập Bé Gái"} slugs={["thoi-trang-nu"]} />
      <Brands />
      {/* <Catalog catalogTitle={"Siêu Phẩm Bán Chạy"} slugs={["phu-kien-be-trai", "phu-kien-be-gai"]} /> */}
      <Feedback />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
