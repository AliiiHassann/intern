import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoShareAndroid } from "react-icons/go";
import vector2 from "../assets/Vector-2.svg";
import vector3 from "../assets/Vector-3.svg";
import vector22 from "../assets/Vector-2.1.svg";
import vector33 from "../assets/Vector-3.1.svg";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseAmount,
  increaseAmount,
} from "../rtk/slices/cartSlice";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await api.get(`/product/find/${id}`, {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`,
            "Accept-Language": "en",
          },
          cancelToken: source.token,
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          setError("Failed to fetch category data.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => source.cancel("Request canceled");
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className='text-danger'>{error}</div>;
  console.log(data);
  return (
    <div className='product-details-container'>
      <div className='left-vector'>
        <img className='vector-11' src={vector3} alt='' />
        <img className='vector-1111' src={vector33} alt='' />
      </div>
      <div className='right-vector'>
        <img className='vector-12' src={vector2} alt='' />
        <img className='vector-1212' src={vector22} alt='' />
      </div>
      <div className='container'>
        <Link to={"/home"} className='product-arrow'>
          <FaArrowLeft size={26} />
        </Link>
        <div className='products-title d-flex '>
          <h6>
            Categories <MdKeyboardArrowRight size={20} />
          </h6>
          <h6>
            {data.categories?.[0].title} <MdKeyboardArrowRight size={20} />
          </h6>
          <h6>{data.title}</h6>
        </div>
        <div className='row pt-5'>
          <div className='col-lg-6 text-center'>
            <img
              src={`https://test-ecomerce.xn--hrt-w-ova.de/${data.productimage?.[0].link}`}
              alt=''
            />
          </div>
          <div className='col-lg-6'>
            <div className='d-flex justify-content-between align-items-center'>
              <h1>{data.title}</h1>
              <h4>&euro;{data.price}</h4>
            </div>
            <p>{data.description}</p>
            <div className='details-buttons-holder'>
              <div className='details-line'></div>
              <div className='d-flex justify-content-between pt-4 pb-4'>
                <div className='d-flex gap-3 align-items-center'>
                  <h4>Quantity: {data.quantity}</h4>
                </div>
                <div className='text-center d-flex align-items-center'>
                  <Link className='go-to-cart' to='/cart'>
                    Go To Cart
                  </Link>
                </div>
                <div className='product-details-share-holder'>
                  <button className='product-details-share'>
                    <GoShareAndroid size={24} />
                  </button>
                  <p>Share</p>
                </div>
              </div>
              <button
                disabled={data.quantity == 0}
                className='add-to-cart'
                onClick={() => {
                  dispatch(addToCart(data));
                  toast.success(`${data.title} Added To Cart`);
                  console.log(data);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
