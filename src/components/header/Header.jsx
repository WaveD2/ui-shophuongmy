import styled from "styled-components";
import { HeaderMainWrapper, SiteBrandWrapper } from "../../styles/header";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { navMenuData } from "../../data/data";
import { Link, useLocation } from "react-router-dom";
import { Input, InputGroupWrapper } from "../../styles/form";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";
import SearchComponent from "../common/Search";
import { useState } from "react";

const NavigationAndSearchWrapper = styled.div`
  column-gap: 20px;
  .search-form {
    @media (max-width: ${breakpoints.lg}) {
      width: 100%;
      max-width: 500px;
    }
    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  }

  .input-group {
    min-width: 320px;

    .input-control {
      @media (max-width: ${breakpoints.sm}) {
        display: none;
      }
    }

    @media (max-width: ${breakpoints.xl}) {
      min-width: 160px;
    }

    @media (max-width: ${breakpoints.sm}) {
      min-width: auto;
      grid-template-columns: 100%;
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const NavigationMenuWrapper = styled.nav`
  .nav-menu-list {
    margin-left: 20px;

    @media (max-width: ${breakpoints.lg}) {
      flex-direction: column;
    }
  }

  .nav-menu-item {
    margin-right: 20px;
    margin-left: 20px;

    @media (max-width: ${breakpoints.xl}) {
      margin-left: 16px;
      margin-right: 16px;
    }
  }

  .nav-menu-link {
    &.active {
      color: ${defaultTheme.color_outerspace};
      font-weight: 700;
    }

    &:hover {
      color: ${defaultTheme.color_outerspace};
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    position: absolute;
    top: 0;
    right: 0;
    width: 260px;
    background: ${defaultTheme.color_white};
    height: 100%;
    z-index: 999;
    display: none;
  }
`;

const IconLinksWrapper = styled.div`
  column-gap: 18px;
  .icon-link {
    width: 36px;
    height: 36px;
    border-radius: 6px;

    &.active {
      background-color: ${defaultTheme.color_sea_green};
      img {
        filter: brightness(100);
      }
    }

    &:hover {
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  @media (max-width: ${breakpoints.xl}) {
    column-gap: 8px;
  }

  @media (max-width: ${breakpoints.xl}) {
    column-gap: 6px;
  }
`;

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const handlerSearch = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      console.log(e.target.value);
      const query = e.target.value;
      setSearchQuery(query);




      setSearchResults([
        {
          id: 1,
          name: 'Quần short kaki bé trai Rabity 930.008',
          price: '249,000₫',
          image: 'https://product.hstatic.net/1000290074/product/4_0_f43e32f452fc4766860fa0f8f4e3b683_medium.jpg', // Đường dẫn đến ảnh giả lập
        },
        {
          id: 2,
          name: 'Quần short kaki bé gái Rabity 930.010',
          price: '199,000₫',
          image: 'https://product.hstatic.net/1000290074/product/4_1_dbcd2ed0cc18475e9c4be0d8f31d47c2_medium.jpg',
        },
        {
          id: 3,
          name: 'Quần short jean bé gái Rabity 931.003',
          price: '259,000₫',
          image: 'https://shophuongmy.s3.ap-southeast-1.amazonaws.com/77fdcf07__quan+ao2.jpg',
        },
        {
          id: 4,
          name: 'Quần short kaki bé gái Rabity 930.009',
          price: '229,000₫',
          image: '"https://shophuongmy.s3.ap-southeast-1.amazonaws.com/2b3fb046__quan+ao1.jpg',
        },
        {
          id: 1,
          name: 'Quần short kaki bé trai Rabity 930.008',
          price: '249,000₫',
          image: 'https://product.hstatic.net/1000290074/product/4_0_f43e32f452fc4766860fa0f8f4e3b683_medium.jpg', // Đường dẫn đến ảnh giả lập
        },
        {
          id: 2,
          name: 'Quần short kaki bé gái Rabity 930.010',
          price: '199,000₫',
          image: 'https://product.hstatic.net/1000290074/product/4_1_dbcd2ed0cc18475e9c4be0d8f31d47c2_medium.jpg',
        },
        {
          id: 3,
          name: 'Quần short jean bé gái Rabity 931.003',
          price: '259,000₫',
          image: 'https://shophuongmy.s3.ap-southeast-1.amazonaws.com/77fdcf07__quan+ao2.jpg',
        },
        {
          id: 4,
          name: 'Quần short kaki bé gái Rabity 930.009',
          price: '229,000₫',
          image: '"https://shophuongmy.s3.ap-southeast-1.amazonaws.com/2b3fb046__quan+ao1.jpg',
        },
        {
          id: 1,
          name: 'Quần short kaki bé trai Rabity 930.008',
          price: '249,000₫',
          image: 'https://product.hstatic.net/1000290074/product/4_0_f43e32f452fc4766860fa0f8f4e3b683_medium.jpg', // Đường dẫn đến ảnh giả lập
        },
        {
          id: 2,
          name: 'Quần short kaki bé gái Rabity 930.010',
          price: '199,000₫',
          image: 'https://product.hstatic.net/1000290074/product/4_1_dbcd2ed0cc18475e9c4be0d8f31d47c2_medium.jpg',
        },
        {
          id: 3,
          name: 'Quần short jean bé gái Rabity 931.003',
          price: '259,000₫',
          image: 'https://shophuongmy.s3.ap-southeast-1.amazonaws.com/77fdcf07__quan+ao2.jpg',
        },
        {
          id: 4,
          name: 'Quần short kaki bé gái Rabity 930.009',
          price: '229,000₫',
          image: '"https://shophuongmy.s3.ap-southeast-1.amazonaws.com/2b3fb046__quan+ao1.jpg',
        },
      ]
      )
      // Thực hiện tìm kiếm tại đây
    }
  }

  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    // Điều hướng đến trang chi tiết sản phẩm hoặc thực hiện hành động khác
  };

  return (
    <HeaderMainWrapper className="header flex items-center">
      <Container className="container">
        <div className="header-wrap flex items-center justify-between">
          <div className="flex items-center w">
            <button
              type="button"
              className="sidebar-toggler"
              onClick={() => dispatch(toggleSidebar())}
            >
              <i className="bi bi-list"></i>
            </button>
            <SiteBrandWrapper to="/" className="inline-flex">
              <div className="brand-img-wrap flex items-center justify-center">
                <img
                  className="site-brand-img"
                  src={staticImages.logo}
                  alt="site logo"
                />
              </div>
              <span className="site-brand-text text-outerspace">Hường Mỹ</span>
            </SiteBrandWrapper>
          </div>
          <NavigationAndSearchWrapper className="flex items-center">
            <NavigationMenuWrapper>
              <ul className="nav-menu-list flex items-center">
                {navMenuData?.map((menu) => {
                  return (
                    <li className="nav-menu-item" key={menu.id}>
                      <Link
                        state={menu.menuText}
                        to={menu.menuLink}
                        className="nav-menu-link text-base font-medium text-gray"
                      >
                        {menu.menuText}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </NavigationMenuWrapper>
            <div className="search-form">
              <InputGroupWrapper className="input-group">
                <span className="input-icon flex items-center justify-center text-xl text-gray">
                  <i className="bi bi-search"></i>
                </span>
                <Input
                  type="text"
                  className="input-control w-full"
                  placeholder="Tìm kiếm"
                  onChange={handlerSearch}
                  onKeyDown={handlerSearch}
                />
              </InputGroupWrapper>
              {searchQuery && (
                <SearchComponent
                  products={searchResults}
                  onProductClick={handleProductClick}
                />
              )}
            </div>

          </NavigationAndSearchWrapper>

          <IconLinksWrapper className="flex items-center">
            <Link
              to="/wishlist"
              className={`icon-link ${location.pathname === "/wishlist" ? "active" : ""
                } inline-flex items-center justify-center`}
            >
              <img src={staticImages.heart} alt="" />
            </Link>

            <Link
              to="/cart"
              className={`icon-link ${location.pathname === "/cart" ? "active" : ""
                } inline-flex items-center justify-center`}
            >
              <img src={staticImages.cart} alt="" />
            </Link>

            <Link
              to="/account"
              className={`icon-link ${location.pathname === "/account" ||
                location.pathname == "/account/add" || location.pathname == "/sign_in" || location.pathname == "/sign_up"
                ? "active"
                : ""
                } inline-flex items-center justify-center`}
            >
              <img src={staticImages.user} alt="" />
            </Link>

          </IconLinksWrapper>
        </div>
      </Container>
    </HeaderMainWrapper>
  );
};

export default Header;
