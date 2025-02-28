import React from "react";
import "../styles/Products.css";
import livingRoom from "../assets/living-room.png";
import { useEffect, useState } from "react";
import api from "../api/api";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Products = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await api.get("/product/get", {
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

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <div className='products-container'>
      <div className='vector-8-holder'>
        <div className='vector-8'></div>
        <div className='vector-88'></div>
      </div>
      <div className='vector-9-holder'>
        <div className='vector-9' alt=''></div>
        <div className='vector-99' alt=''></div>
      </div>
      <div className='vector-10-holder'>
        <div className='vector-10'></div>
        <div className='vector-1010'></div>
      </div>
      <div className='container'>
        <Link to={"/home"} className='product-arrow'>
          <FaArrowLeft size={26} />
        </Link>
        <div className='products-title d-flex gap-5 pt-5'>
          <h6>Categories</h6>
          <h6>Living Room</h6>
        </div>
        <div className='row products-row align-items-center'>
          <div className='col-lg-6 col-md-6 pt-5'>
            <h1>All Living Room</h1>
            <p className='pt-3'>
              Sofas, loveseats, armchairs, coffee tables, end tables,
              entertainment centers, bookshelves.
            </p>
          </div>
          <div className='col-lg-6 col-md-6 text-center'>
            <img className='products-main-img' src={livingRoom} alt='' />
          </div>
        </div>
        <div>
          <div className='products-holder'>
            <div className='row text-center'>
              {data.map((e, i) => {
                return (
                  <div
                    key={i}
                    className='col-lg-4 col-md-6 col-sm-6 col-12 pt-3 pb-3'
                  >
                    <img
                      src={`https://test-ecomerce.xn--hrt-w-ova.de/${e.productimage[0].link}`}
                      alt=''
                    />
                    <div className='products-text pt-3'>
                      <p>Chair</p>
                      <h4 className='fw-semibold'>{e.title}</h4>
                    </div>
                    <div className='products-add-holder d-flex justify-content-around align-items-center pt-4 pb-4'>
                      <p className='products-price'>&euro;{e.price}</p>
                      <button
                        className='products-add'
                        onClick={() => handleProductClick(e.id)}
                      >
                        <GoPlus size={24} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
