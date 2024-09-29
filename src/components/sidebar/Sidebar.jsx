import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { SiteBrandWrapper } from "../../styles/header";
import { staticImages } from "../../utils/images";
import { Input, InputGroupWrapper } from "../../styles/form";
import { sideMenuData } from "../../data/data";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSidebarOpen,
  toggleSidebar,
} from "../../redux/slices/sidebarSlice";
import React, { useEffect, useRef } from 'react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 9;
`;


const SideNavigationWrapper = styled.div`
  position: fixed;
  margin-top: 72px;
  top: 0;
  left: 0;
  width: 280px;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  padding: 16px;
  transform: translateX(-100%);
  transition: ${defaultTheme.default_transition};
  @media (min-width: 570px) {
    transform: translateX(-100%); // Đóng sidebar khi màn hình lớn hơn 570px
  }
  &.show {
    transform: translateX(0); // Hiện sidebar khi được mở
  }

  .sidebar-close-btn {
    position: absolute;
    right: 16px;
    top: 16px;
    &:hover {
      color: ${defaultTheme.color_sea_green};
    }
  }

  .sidenav-search-form {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    .input-group {
      min-width: 100%;
      column-gap: 0;
    }
  }

  .sidenav-menu-list {
    gap: 14px;
    margin: 20px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 24px 0;

    li {
      padding: 5px 5px 5px 12px;
      border-radius: 4px;
      transition: ${defaultTheme.default_transition};

      &:hover {
        background: rgba(0, 0, 0, 0.05);

        a {
          span {
            color: ${defaultTheme.color_sea_green};
          }
        }
      }
    }

    a {
      column-gap: 16px;
      &.active {
        color: ${defaultTheme.color_sea_green};
      }
    }
  }

  @media (max-width: ${breakpoints.xs}) {
    width: 70%;
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        dispatch(toggleSidebar());
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 570 && isSidebarOpen) {
        dispatch(toggleSidebar());
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen, dispatch]);

  return (
    <>
      <Overlay
        isVisible={isSidebarOpen}
      />
      <SideNavigationWrapper
        ref={sidebarRef}
        className={`bg-white h-full ${isSidebarOpen ? 'show' : ''}`}
      >
        <div className="sidenav-head">
          <form className="sidenav-search-form">
            <InputGroupWrapper className="input-group">
              <span className="input-icon flex items-center justify-center text-xl text-gray">
                <i className="bi bi-search"></i>
              </span>
              <Input
                type="text"
                className="input-control w-full"
                placeholder="Search"
              />
            </InputGroupWrapper>
          </form>
          <ul className="sidenav-menu-list grid">
            {sideMenuData?.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.menuLink}
                  className={`flex items-center text-gray ${location.pathname === menu.menuLink ? 'active' : ''
                    }`}
                >
                  <span className="text-xxl">
                    <i className={`bi bi-${menu.iconName}`}></i>
                  </span>
                  <span className="text-lg font-medium">{menu.menuText}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SideNavigationWrapper>
    </>
  );
};

export default Sidebar;
