import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import MainNavbar from "./components/MainNavbar";
import SigninAndUp from "./pages/SigninAndUp";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    <div className='App'>
      <MainNavbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<SigninAndUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/category' element={<Category />} />
        <Route path='/search' element={<Search />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/thanks' element={<Thanks />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
