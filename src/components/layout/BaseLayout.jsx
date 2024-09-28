import { PageWrapper } from "../../styles/styles";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <PageWrapper>
      <Header />
      <Sidebar />
      <div
        style={{
          marginTop: "72px",
          minHeight: "calc(100vh - 462px)",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default BaseLayout;
