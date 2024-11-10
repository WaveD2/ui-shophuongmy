import styled from "styled-components";
import Hero from "../../components/home/Hero";
import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";
import { useEffect, useState } from "react";
import ENDPOINTS from "../../api/endpoins";
import { apiClient } from "../../api/apiService";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   async function fetchCategory() {
  //     try {

  //       const data = await apiClient.get(`${ENDPOINTS.CATEGORY}/?filter[level]=1`);

  //       if (!data?.items.length) setCategories([]);

  //       setCategories(data.items);

  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   }
  //   fetchCategory();
  // }, []);

  // console.log("categories", categories);

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
