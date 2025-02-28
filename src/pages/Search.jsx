import React from "react";
import "../styles/Search.css";
import livingRoom from "../assets/living-room.png";
import bedroom from "../assets/bedroom.png";
import vector7 from "../assets/Vector-7.2.svg";
import vector77 from "../assets/Vector-7.1.svg";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <div className='search-container'>
      <div className='container-fluid'>
        <div className='search-holder'>
          <div className='row position-relative text-center align-items-center search-row'>
            <div className='col-lg-3 col-md-3'>
              <img src={livingRoom} alt='' />
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='search-vector-holder'>
                <img className='vector-7' src={vector7} alt='' />
                <img className='vector-77' src={vector77} alt='' />
              </div>
              <h1>Chic Furnishings Online</h1>
              <h1>Furniture Store</h1>
              <p>Discover Elegant Comfort for Every Room</p>
            </div>
            <div className='col-lg-3 col-md-3'>
              <img src={bedroom} alt='' />
            </div>
          </div>
          <div className='input-icon-container'>
            <IoSearchOutline className='input-icon' />
            <input
              type='text'
              placeholder='Search...'
              className='input-with-icon'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
