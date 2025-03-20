import React from "react";
import { Link } from "react-router-dom";
import thanks from "../assets/Thanks.png";
import "../styles/Thanks.css";

const Thanks: React.FC = () => {
  return (
    <div className='container thanks-container'>
      <div className='text-center'>
        <div className='pt-4 pb-4'>
          <h2>Thank You For Your Purchase!</h2>
          <p>We're doing a little happy dance over here</p>
        </div>
        <div className='pb-5'>
          <img src={thanks} alt='Thank You' />
        </div>
        <div className='form-buttons'>
          <Link to='/home' className='thanks-go-to-home'>
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
