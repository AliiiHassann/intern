import React from "react";
import "../styles/Footer.css";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className='footer-div'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-sm-6 col-12 px-2 py-md-4 py-sm-4 footer-text'>
            <h3 className='pb-3'>LOGO</h3>
            <p>
              The advantage of hiring a workspace with us is that it gives you
              comfortable service and all-around facilities.
            </p>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6 col-6 px-lg-5 ps-2 py-md-4 py-sm-4 footer-text'>
            <div className='pb-3 main-text-footer'>Services</div>
            <div className='pb-3'>Email Marketing</div>
            <div className='pb-3'>Campaigns</div>
            <div>Branding</div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6 col-6 px-lg-5 ps-2 py-md-4 py-sm-4 footer-text'>
            <div className='pb-3 main-text-footer'>Furniture</div>
            <div className='pb-3'>Beds</div>
            <div className='pb-3'>Chairs</div>
            <div>All</div>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-6 col-6 px-lg-5 ps-2 py-md-4 py-sm-4 footer-text'>
            <div className='pb-3 main-text-footer'>Follow Us</div>
            <div className='pb-3 d-flex align-items-center gap-2'>
              <span>
                <FaFacebookF size={20} />
              </span>
              <div>Facebook</div>
            </div>
            <div className='pb-3 d-flex align-items-center gap-2'>
              <span>
                <FaTwitter size={20} />
              </span>
              <div>Twitter</div>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <span>
                <FaInstagram size={20} />
              </span>
              <div>Instagram</div>
            </div>
          </div>
        </div>
        <div className='row pt-5 align-items-center'>
          <div className='col-lg-4 col-md-4 col-sm-4 col-6 copyright'>
            Copyright &copy; 2021
          </div>
          <div className='col-lg-4 col-md-4 col-sm-4 col-6 terms-conditions'>
            Terms & Conditions
          </div>
          <div className='col-lg-4 col-md-4 col-sm-4 col-12 text-center privacy-policy'>
            Privacy Policy
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
