import { products } from "../../data/data";
import { Section } from "../../styles/styles";
import Title from "../common/Title";
import ProductList from "./ProductList";

const ProductSimilar = () => {
  return (
    <Section>
      <Title titleText={"Sản phẩm quan tâm"} />
      <ProductList products={products.slice(0, 4)} />
    </Section>
  );
};

export default ProductSimilar;
