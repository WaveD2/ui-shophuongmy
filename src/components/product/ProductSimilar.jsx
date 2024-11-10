import { useEffect, useState } from "react";
import { Section } from "../../styles/styles";
import Title from "../common/Title";
import ProductList from "./ProductList";
// import { apiClient } from "../../api/apiService";
import ENDPOINTS from "../../api/endpoins";

const ProductSimilar = ({ slug = "", name = "" }) => {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    // async function fetchProduct() {
    //   try {
    //     const data = await apiClient.get(`${ENDPOINTS.PRODUCTS}?filter[slug]=${slug}&filter[name][$ne]=${name}`);
    //     if (!data?.data?.items) setProducts({});

    //     setProducts(data?.data?.items);
    //   } catch (error) {
    //     console.error('Error fetching categories:', error);
    //   }
    // }
    // fetchProduct();
  }, []);


  return (
    <Section>
      <Title titleText={"Sản phẩm quan tâm"} />
      <ProductList products={products && products.slice(0, 4)} />
    </Section>
  );
};

export default ProductSimilar;
