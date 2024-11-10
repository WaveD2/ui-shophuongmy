import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { PropTypes } from "prop-types";
import ProductList from "../product/ProductList";
import { useEffect, useState } from "react";
import LoadingComponent from "../common/Loading";

const Catalog = ({ title = "", products = [], isLoading = false }) => {

  // console.log("products::", products);


  return (
    <Section>
      <Container>
        <LoadingComponent isLoading={isLoading} />
        <div className="categories-content">
          <Title titleText={title} />
          <ProductList products={products} />
        </div>
      </Container>
    </Section>
  );
};

export default Catalog;
