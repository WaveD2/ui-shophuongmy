import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { PropTypes } from "prop-types";
import ProductList from "../product/ProductList";
import { useEffect, useState } from "react";
import { apiClient } from "../../api/apiService";
import ENDPOINTS from "../../api/endpoins";

const Catalog = ({ catalogTitle, slugs }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      try {

        const filterSlugParams = slugs.map(slug => `filterCustom[slug]=${encodeURIComponent(slug)}`).join('&');

        const data = await apiClient.get(`${ENDPOINTS.PRODUCTS}/?${filterSlugParams}`);

        if (!data?.items.length) setProducts([]);

        setProducts(data.items);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategory();
  }, []);

  console.log("products", products);

  return (
    <Section>
      <Container>
        <div className="categories-content">
          <Title titleText={catalogTitle} />
          {products?.length && <ProductList products={products} />}
        </div>
      </Container>
    </Section>
  );
};

export default Catalog;

Catalog.propTypes = {
  catalogTitle: PropTypes.string,
  products: PropTypes.array,
};
