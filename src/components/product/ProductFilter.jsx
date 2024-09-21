import { useEffect, useState } from "react";
import {
  ColorsFilter,
  FilterTitle,
  FilterWrap,
  PriceFilter,
  ProductCategoryFilter,
  SizesFilter,
} from "../../styles/filter";
import { staticImages } from "../../utils/images";

const ProductFilter = ({ productsType }) => {
  const [filters, setFilters] = useState({
    category: [],
    priceRange: { min: 0, max: 900000 },
    sizes: [],
  });

  const [isProductFilterOpen, setProductFilterOpen] = useState(true);
  const [isPriceFilterOpen, setPriceFilterOpen] = useState(true);
  const [isSizeFilterOpen, setSizeFilterOpen] = useState(true);

  const [productFilterList, setProductFilterList] = useState([{
    id: "product-filter-1",
    name: "CO loi xay ra!! "
  }]);

  useEffect(() => {
    setProductFilterList(productsType);
  }, [productsType]);

  // Hàm cập nhật filter khi người dùng chọn
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const handlePriceChange = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }));
  };

  // Hàm gọi API khi filter thay đổi
  const applyFilters = async () => {
    const query = new URLSearchParams();
    console.log("filters", filters);

    if (filters.priceRange.min || filters.priceRange.max) {
      query.append("price[$lt]", filters.priceRange.max);
      query.append("price[$gt]", filters.priceRange.min);
    }
    if (filters.sizes.length) {
      query.append("variants.size", JSON.stringify(filters.sizes));
    }

    if (filters.category.length) {
      query.append("category.slug", JSON.stringify(filters.category));
    }

    // const response = await fetch(`{{api_shop_huongmy}}/products?${query.toString()}`);
    // const data = await response.json();
    // console.log(data); // Cập nhật danh sách sản phẩm với dữ liệu mới
  };

  // Mỗi khi filters thay đổi, tự động gọi API
  useEffect(() => {
    applyFilters();
  }, [filters]);

  const toggleFilter = (filter) => {
    switch (filter) {
      case "product":
        setProductFilterOpen(!isProductFilterOpen);
        break;
      case "price":
        setPriceFilterOpen(!isPriceFilterOpen);
        break;
      case "size":
        setSizeFilterOpen(!isSizeFilterOpen);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ProductCategoryFilter>
        <FilterTitle
          className="filter-title flex items-center justify-between"
          onClick={() => toggleFilter("product")}
        >
          <p className="filter-title-text text-gray text-base font-semibold text-lg">Loại</p>
          <span className={`text-gray text-xxl filter-title-icon ${!isProductFilterOpen ? "rotate" : ""}`}>
            <i className="bi bi-filter"></i>
          </span>
        </FilterTitle>
        <FilterWrap className={`${!isProductFilterOpen ? "hide" : "show"}`}>
          {productFilterList?.map((productFilter, index) => (
            <div className="product-filter-item" key={index}>
              <div className="filter-item-head w-full flex items-center justify-between cursor-pointer">
                <label htmlFor={productFilter.id} className="filter-head-title text-base text-gray font-semibold">
                  {productFilter.name}
                </label>
                <input
                  type="checkbox"
                  id={productFilter.id}
                  name={productFilter.id}
                  onChange={() => handleFilterChange("category", productFilter.name)}
                />
              </div>
            </div>
          ))}
        </FilterWrap>
      </ProductCategoryFilter>

      <PriceFilter>
        <FilterTitle
          className="filter-title flex items-center justify-between"
          onClick={() => toggleFilter("price")}
        >
          <p className="filter-title-text text-gray text-base font-semibold text-lg">Mức giá</p>
          <span className={`text-gray text-xl filter-title-icon ${!isPriceFilterOpen ? "rotate" : ""}`}>
            <i className="bi bi-chevron-up"></i>
          </span>
        </FilterTitle>
        <FilterWrap className={`range filter-wrap ${!isPriceFilterOpen ? "hide" : "show"}`}>
          {
            [{
              name: "Giá dưới 100,000₫",
              min: 0,
              max: 100000
            },
            {
              name: "100,000₫ - 200,000₫",
              min: 100000,
              max: 200000
            }
            ]?.map((productFilter, index) => {
              return (
                <div className="product-filter-item" key={index}>
                  <div className="filter-item-head w-full flex items-center justify-between cursor-pointer"
                  >
                    <label htmlFor={index} className="filter-head-title text-base text-gray font-semibold">
                      {productFilter.name}
                    </label>
                    <input type="checkbox" id={index} name={index}
                      onChange={() => handlePriceChange(productFilter.min, productFilter.max)}
                    />
                  </div>
                </div>
              );
            })}
        </FilterWrap>
      </PriceFilter>

      <SizesFilter>
        <FilterTitle className="flex items-center justify-between" onClick={() => toggleFilter("size")}>
          <p className="filter-title-text text-gray text-base font-semibold text-lg">Size</p>
          <span className={`text-gray text-xl filter-title-icon ${!isSizeFilterOpen ? "rotate" : ""}`}>
            <i className="bi bi-chevron-up"></i>
          </span>
        </FilterTitle>
        <FilterWrap className={`${!isSizeFilterOpen ? "hide" : "show"}`}>
          <div className="sizes-list grid text-center justify-center">
            {["xxs", "xs", "s", "m", "l", "xxl", "3xl", "4xl"].map((size, index) => (
              <div className="sizes-item text-sm font-semibold text-outerspace w-full" key={index}>
                <input type="checkbox" onChange={() => handleFilterChange("sizes", size)} />
                <span className="flex items-center justify-center uppercase">{size}</span>
              </div>
            ))}
          </div>
        </FilterWrap>
      </SizesFilter>
    </>
  );
};

export default ProductFilter;
