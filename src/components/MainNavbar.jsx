import React, { useContext, useEffect, useState } from "react";
import "../styles/MainNavbar.css";
import { FaShoppingBag } from "react-icons/fa";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import english from "../assets/USA-flag.png";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalQTY,
  setGetTotals,
} from "../rtk/slices/cartSlice";

const MainNavbar = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [navState, setNavState] = useState(false);
  const totalQTY = useSelector(selectTotalQTY);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    dispatch(setGetTotals());
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, [cartItems, dispatch]);

  // Function to close the navbar menu
  const closeMenu = () => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <header className={`fixed-top header navbar-header pt-3`}>
      <nav className='navbar navbar-expand-lg align-items-start'>
        <div className='container'>
          <Link to={"/"}>
            <h5>LOGO</h5>
          </Link>
          <div className='d-flex align-items-center gap-3 ms-auto me-3 d-lg-none'>
            <Link className='nav-link' to={"/search"}>
              <FiSearch color='#e58411' size={24} />
            </Link>
            <div className='position-relative'>
              <Link className='nav-link' to={"/cart"}>
                <FaShoppingBag size={24} />
                <div className='nav-number'>{totalQTY}</div>
              </Link>
            </div>
          </div>
          <button
            className='navbar-toggler'
            type='button'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => {
              const navbarCollapse = document.getElementById(
                "navbarSupportedContent"
              );
              const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: true,
              });
            }}
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse gap-4'
            id='navbarSupportedContent'
          >
            <div className='navbar-nav mx-auto'>
              <h3 className='menu'>Menu</h3>
              <div className='d-flex nav-item home-shop-holder'>
                <Link className='nav-link' to={"/home"} onClick={closeMenu}>
                  Home
                </Link>
                <Link className='nav-link' to={"/products"} onClick={closeMenu}>
                  Shop
                </Link>
              </div>
            </div>
            <Link className='nav-link d-none d-lg-flex' to={"/search"}>
              <FiSearch color='#e58411' size={24} />
            </Link>
            <div className='position-relative d-none d-lg-flex'>
              <Link className='nav-link' to={"/cart"}>
                <FaShoppingBag size={24} />
                <div className='nav-number'>{totalQTY}</div>
              </Link>
            </div>
            <h3 className='theme'>Theme</h3>
            <div className='d-flex gap-4 nav-item nav-item-holder'>
              <a
                className='nav-link light-dark-holder'
                onClick={toggleDarkMode}
              >
                <div className='dark-mode-collapse'>
                  <img src={sun} />
                  <span>Light Mode</span>
                </div>
                <div className='dark-mode-collapse'>
                  <img src={moon} />
                  <span>Dark Mode</span>
                </div>
                {isDarkMode ? (
                  <img className='dark-mode-button' src={sun} />
                ) : (
                  <img className='dark-mode-button' src={moon} />
                )}
              </a>
              <h3 className='languages'>Languages</h3>
              <div className='d-flex gap-1 languages-holder align-items-center'>
                <img className='lang' src={english} alt='' />
                <span className='fw-semibold'>En</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNavbar;
