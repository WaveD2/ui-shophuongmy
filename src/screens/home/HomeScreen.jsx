import styled from "styled-components";
import Hero from "../../components/home/Hero";
import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";
import React, { useEffect, useState } from "react";
import ENDPOINTS from "../../api/endpoins";
// import {
//   apiService
// } from "../../api/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getData } from "../../api/apiService";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {

  const [categories, setCategories] = useState([]);

  const { data, isLoading, error } = useQuery(
    ['categories', { filter: { level: 1, isPriority: true } }],
    () => getData('/category', { 'filter[level]': 1, 'filter[isPriority]': true, 'limit': 2 }),
  );
  //useSeartchParam

  useEffect(() => {
    if (data) {
      setCategories(data.data.items);
    }
  }, [data]);

  return (
    <HomeScreenWrapper>
      <Hero />
      <Featured />
      <NewArrival />
      {
        categories.length && categories.map(item =>
          <React.Fragment key={item.id}>
            <SavingZone slug={item.slug} images={item.image} title={item.name} />
            <Catalog title={item.name} products={item.products} isLoading={isLoading} />
          </React.Fragment>
        )
      }
      <Brands />
      <Feedback />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
