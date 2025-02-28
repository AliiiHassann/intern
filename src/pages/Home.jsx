import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import "../styles/Home.css";
import fog from "../assets/FOG.png";
import fogDark from "../assets/FOG-dark.png";
import axios from "axios";
import { FaLongArrowAltRight } from "react-icons/fa";
import interior from "../assets/interior-light-room1.jpg";
import feature1 from "../assets/feature-1.png";
import feature2 from "../assets/feature-2.png";
import feature3 from "../assets/feature-3.png";
import vector4 from "../assets/Vector-4.svg";
import vector44 from "../assets/Vector-4.1.svg";
import vector5 from "../assets/Vector-5.svg";
import vector55 from "../assets/Vector-5.1.svg";
import vector6 from "../assets/Vector-6.svg";
import vector66 from "../assets/Vector-6.1.svg";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeContext";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await api.get("/category/get", {
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

  return (
    <div className='home-container'>
      <section className='home-background'>
        <div className='fog-overlay'>
          {isDarkMode === false ? (
            <img src={fog} alt='' />
          ) : (
            <img src={fogDark} alt='' />
          )}
          <div className='arrow-holder'>
            <FaArrowDown size={30} />
          </div>
        </div>
        <div className='text-overlay'>
          <div className='home-text-holder'>
            <div className='pb-4'>
              <h1>Make Your Interior More Minimalistic & Modern</h1>
            </div>
            <div>
              <h6>Turn your room with panto into a lot more minimalistic</h6>
              <h6>and modern with ease and speed</h6>
            </div>
          </div>
        </div>
      </section>
      <section className='w-100 our-category'>
        <div className='container'>
          <div className='row first-row'>
            <div className='col-lg-3 col-md-6 our-category-holder d-flex flex-column justify-content-end'>
              <h1 className='fw-bold'>Our</h1>
              <h1 className='fw-bold'>Categories</h1>
            </div>
            {data.map((category, index) => (
              <div key={index} className='col-lg-3 col-md-6'>
                <div className='home-image-holder'>
                  <img
                    className='category-image'
                    src={`https://test-ecomerce.xn--hrt-w-ova.de/${category.image}`}
                    alt=''
                  />
                </div>
                <div className='pt-3'>
                  <h1 className='fw-bold'>{category.title}</h1>
                  <div className='pt-3'>
                    {category.title === "Living Room" ? (
                      <p className='category-p'>
                        Sofas, loveseats, armchairs, coffee tables, end tables,
                        entertainment centers, bookshelves.
                      </p>
                    ) : category.title === "Bed Room" ? (
                      <p className='category-p'>
                        Beds, nightstands, dressers, chests of drawers,
                        wardrobes, vanities.
                      </p>
                    ) : (
                      <p className='category-p'>
                        Beds, nightstands, dressers, chests of drawers,
                        wardrobes, vanities.
                      </p>
                    )}
                    <Link to='/products' className='pt-3'>
                      <p className='learn-more'>
                        Learn More <FaLongArrowAltRight />
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='vector-4-holder'>
          <img className='vector-4' src={vector4} alt='' />
          <img className='vector-44' src={vector44} alt='' />
        </div>
        <div className='container py-4'>
          <div className='row justify-content-between align-items-center'>
            <div className='col-lg-5 col-md-5'>
              <div className='interior-image-holder'>
                <img src={interior} alt='' className='w-100 h-100' />
              </div>
            </div>
            <div className='col-lg-5 col-md-5'>
              <div className='interior-text-holder'>
                <h1 className='fw-bold'>Furnish Your Dreams,</h1>
                <h1 className='fw-bold'>Choose Wisely</h1>
                <p>
                  Discover quality furniture, curated styles, and exceptional
                  service at Our Store. We make furnishing your home easy and
                  enjoyable.
                </p>
              </div>
              <Link to={"/products"}>
                <p className='learn-more'>
                  Learn More <FaLongArrowAltRight />
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className='vector-5-holder'>
          <img className='vector-5' src={vector5} alt='' />
          <img className='vector-55' src={vector55} alt='' />
        </div>
        <div className='container-fluid'>
          <div className='row text-center home-feature-holder'>
            <div className='mb-5'>
              <h5>SOME OF OUR</h5>
              <h1>Features We Offer To You</h1>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4'>
              <div className='feature-item'>
                <img className='feature-image' src={feature1} alt='' />
                <div className='feature-text'>
                  <h4>Extensive Catalog</h4>
                  <p>
                    A wide selection of furniture styles, categories, and price
                    points.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4'>
              <div className='feature-item'>
                <img className='feature-image' src={feature2} alt='' />
                <div className='feature-text'>
                  <h4>Detailed Product Descriptions</h4>
                  <p>
                    Comprehensive information including dimensions, materials,
                    care instructions, and warranty details.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4'>
              <div className='feature-item'>
                <img className='feature-image' src={feature3} alt='' />
                <div className='feature-text'>
                  <h4>Room Planner/Visualizer</h4>
                  <p>
                    Tools to help customers visualize furniture in their own
                    spaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='vector-6-holder'>
          <img className='vector-6' src={vector6} alt='' />
          <img className='vector-66' src={vector66} alt='' />
        </div>
      </section>
    </div>
  );
};

export default Home;
