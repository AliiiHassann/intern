import React from "react";
import "../styles/Footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='footer-div'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-sm-6 col-6 px-2 py-md-4 py-sm-4 footer-text'>
            <h3 className='pb-3'>LOGO</h3>
            <p>
              The advantage of hiring a workspace with us is that givees you
              comfortable service and all-around facilities.
            </p>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6 col-6 px-5 py-md-4 py-sm-4 footer-text'>
            <div className='pb-3 main-text-footer'>Services</div>
            <div className='pb-3'>Email Marketing</div>
            <div className='pb-3'>Campaignes</div>
            <div>Branding</div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6 col-6 px-5 py-md-4 py-sm-4 footer-text'>
            <div className='pb-3 main-text-footer'>Furniture</div>
            <div className='pb-3'>Beds</div>
            <div className='pb-3'>Chair</div>
            <div>All</div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6 col-6 px-5 py-md-4 py-sm-4 footer-text'>
            <div className='pb-3 main-text-footer'>Follow Us</div>
            <div className='pb-3 d-flex align-items-center gap-2'>
              <FaFacebookF size={20} />
              <div>Facebook</div>
            </div>
            <div className='pb-3 d-flex align-items-center gap-2'>
              <FaTwitter size={20} />
              <div>Twitter</div>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <FaInstagram size={20} />
              <div>Instagram</div>
            </div>
          </div>
        </div>
        <div className='row pt-5 align-items-center'>
          <div className=' col-lg-4 col-md-4 col-sm-4 col-6 copyright'>
            Copyright &copy; 2021
          </div>
          <div className=' col-lg-4 col-md-4 col-sm-4 col-6 text-end terms-conditions'>
            Terms & Conditions
          </div>
          <div className=' col-lg-4 col-md-4 col-sm-4 col-12 text-center privacy-policy'>
            Privacy Policy
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
