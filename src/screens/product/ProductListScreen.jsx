import styled from "styled-components";
import { Container, ContentStylings, Section } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductList from "../../components/product/ProductList";
// import { products } from "../../data/data";
import Title from "../../components/common/Title";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import ProductFilter from "../../components/product/ProductFilter";
import { useEffect, useState } from "react";
import ENDPOINTS from "../../api/endpoins";
import { apiClient } from "../../api/axios";
import SavingZone from "../../components/home/SavingZone";
import Pagination from "../../components/common/Pagination";
import SelectOption from "../../components/common/SelectOption";

const ProductsContent = styled.div`
  grid-template-columns: 320px auto;
  margin: 20px 0;

  @media (max-width: ${breakpoints.xl}) {
    grid-template-columns: 260px auto;
  }

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 100%;
    row-gap: 24px;
  }
`;

const ProductsContentLeft = styled.div`
  border: 1px solid rgba(190, 188, 189, 0.4);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 50px;
  overflow: hidden;

  @media (max-width: ${breakpoints.lg}) {
    display: grid;
  }
`;

const ProductsContentRight = styled.div`
  padding: 16px 40px;

  .products-right-top {
    margin-bottom: 40px;
    @media (max-width: ${breakpoints.lg}) {
      margin-bottom: 24px;
    }
    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      row-gap: 16px;
      align-items: flex-start;
    }
  }

  .products-right-nav {
    column-gap: 16px;
    li {
      a.active {
        color: ${defaultTheme.color_purple};
      }
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-card-list {
    grid-template-columns: repeat(auto-fill, repeat(290px, auto));
  }

  .product-card {
    padding-left: 0;
    padding-right: 0;
  }
`;

const DescriptionContent = styled.div`
  .content-stylings {
    margin-left: 32px;
    @media (max-width: ${breakpoints.sm}) {
      margin-left: 0;
    }
  }
`;

const ProductListScreen = () => {

  const { slug } = useParams();
  const { state, pathname } = useLocation();

  const [breadcrumbItems, setBreadcrumbItems] = useState(
    [
      { label: "Trang chủ", link: "/" },
      { label: "Tất cả", link: "prodcut/:all", disabled: true },
    ]
  )

  const [products, setProducts] = useState([]);
  const [optionNames, setOptionNames] = useState([]);
  const [banner, setBaner] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    console.log("page:::", page);

    setCurrentPage(page);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { label: 'Mặc định', value: 'default' },
    { label: 'Tên A → Z', value: 'name_asc' },
    { label: 'Tên Z → A', value: 'name_desc' },
    { label: 'Giá tăng dần', value: 'price_asc' },
    { label: 'Giá giảm dần', value: 'price_desc' },
    { label: 'Hàng mới', value: 'newest' },
  ];

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    console.log("Selected:", value);
  };

  useEffect(() => {

    if (!state || !pathname) {
      breadcrumbItems[1] = { label: "Tất cả", link: "prodcut/:all", disabled: true }
    }

    breadcrumbItems[1] = { label: state, link: pathname, disabled: true }

    setBreadcrumbItems([...breadcrumbItems]);

  }, [pathname && state])

  useEffect(() => {
    async function fetchCategory() {
      try {
        const data = await apiClient.get(`${ENDPOINTS.CATEGORY}/?slug=${slug}`);

        if (!data?.record && !data?.record?.items.length) {
          setProducts([]);
          setOptionNames([]);
        }

        setProducts(data?.record?.items[0].products.slice(0, 20) || []);
        setBaner(data?.record?.items[0].banner || {})
        setOptionNames(data?.record?.items[0].subCategoryType || [])

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategory();
  }, [slug]);

  return (
    <main className="page-py-spacing">
      <SavingZone banner={banner} />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <ProductsContent className="grid items-start">
          <ProductsContentLeft>
            <ProductFilter productsType={optionNames} />
          </ProductsContentLeft>
          <ProductsContentRight>
            <div className="products-right-top flex items-center" style={{ "justifyContent": "right" }} >
              <SelectOption label="Sắp xếp:" options={options} onChange={handleOptionChange} styleWrapper={{ "justifyContent": "right" }} />
            </div>
            <ProductList products={products} />
          </ProductsContentRight>

        </ProductsContent>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>

      <Section>
        <Container>
          <DescriptionContent>
            <Title titleText={"Clothing for Everyone Online"} />
            <ContentStylings className="text-base content-stylings">
              <h4>Reexplore Clothing Collection Online at Achats.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed,
                molestiae ex atque similique consequuntur ipsum sapiente
                inventore magni ducimus sequi nemo id, numquam officiis fugit
                pariatur esse, totam facere ullam?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur nam magnam placeat nesciunt ipsa amet, vel illo
                veritatis eligendi voluptatem!
              </p>
              <h4>
                One-stop Destination to Shop Every Clothing for Everyone:
                Achats.
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                iure doloribus optio aliquid id. Quos quod delectus, dolor est
                ab exercitationem odio quae quas qui doloremque. Esse natus
                minima ratione reiciendis nostrum, quam, quisquam modi aut,
                neque hic provident dolorem.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
                laborum dolorem deserunt aperiam voluptate mollitia.
              </p>
              {/* <Link />See More</Link> */}
              <p>See more</p>
            </ContentStylings>
          </DescriptionContent>
        </Container>
      </Section>
    </main>
  );
};

export default ProductListScreen;
