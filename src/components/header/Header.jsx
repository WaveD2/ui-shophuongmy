import styled from "styled-components";
import { HeaderMainWrapper, SiteBrandWrapper } from "../../styles/header";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { navMenuData } from "../../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, InputGroupWrapper } from "../../styles/form";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";
import SearchComponent from "../common/Search";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../api/axios";
import ENDPOINTS from "../../api/endpoins";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handlerSearch = async (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setShowResults(true);
      const response = await apiClient.get(`${ENDPOINTS.PRODUCTS}?search=${encodeURIComponent(e.target.value)}`);
      if (response?.record && response?.record?.items.length > 0) setSearchResults(response?.record?.items)
    } else {
      setShowResults(false);
    }

  }
  const handleProductClick = (product) => {
    setShowResults(false);
    setSearchResults([]);
    setSearchQuery("");
    return navigate(`/product/details/${product._id}`)
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
                  value={searchQuery}
                  className="input-control w-full"
                  placeholder="Tìm kiếm"
                  onChange={handlerSearch}
                  onKeyDown={handlerSearch}
                  onFocus={() => setShowResults(true)} // Hiển thị kết quả khi focus vào input
                  onBlur={() => {
                    let timeoutId = setTimeout(() => {
                      setShowResults(false);
                    }, 100);

                    // Cancel the timeout
                    clearTimeout(timeoutId);
                  }}
                />
              </InputGroupWrapper>
              {searchQuery && searchResults.length > 0 && showResults && (
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
