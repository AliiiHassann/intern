import React from "react";
import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <>
      <MainNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
