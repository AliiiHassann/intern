import React, { useEffect, useState } from "react";
import "../styles/SigninAndUp.css";
import { FaAt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import vector2 from "../assets/Vector-2.svg";
import vector22 from "../assets/Vector-2.1.svg";
import vector3 from "../assets/Vector-3.svg";
import vector33 from "../assets/Vector-3.1.svg";
import api from "../api/api"; // Import Axios
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";

const SigninAndUp = ({ nextStep }) => {
  const [error, setError] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [layer, setLayer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isActive, setIsActive] = useState("item1");
  const handleActive = (val) => {
    if (val !== isActive) {
      setIsActive(val);
    } else {
      setIsActive("item1");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && location.pathname === "/checkout") {
      nextStep(); // If token exists, skip sign-in and go to the next step
    }
  }, [nextStep]);

  // Formik for Sign In
  const formikSignIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      setLayer(true);
      setTimeout(async () => {
        try {
          const response = await api.post(
            "https://test-ecomerce.xn--hrt-w-ova.de/api/login",
            values,
            {
              headers: {
                Accept: "application/json",
                "User-Type": "personal",
              },
            }
          );
          console.log("Sign In Success:", response);
          // Check if token is returned
          if (location.pathname === "/checkout") {
            localStorage.setItem("token", response.data.data.token);
            nextStep();
          } else if (response.data.data.token) {
            localStorage.setItem("token", response.data.data.token);
            navigate("/home");
          } else {
            setError("Login failed. Please try again.");
          }
        } catch (err) {
          console.error("Sign In Error:", err);
          setError("Invalid email or password");
        } finally {
          setLoading(false);
          setLayer(false);
        }
      }, 2000);
    },
  });
  // Google Sign In
  // const handleGoogleSignIn = async () => {
  //   window.open(
  //     `http://test-ecomerce.xn--hrt-w-ova.de/api/user/social-login?account_type=google`,
  //     "_self"
  //   );
  // };
  // Formik for Sign Up
  const formikSignUp = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      setLayer(true);
      setTimeout(async () => {
        try {
          const response = await api.post(
            "https://test-ecomerce.xn--hrt-w-ova.de/api/register",
            values,
            {
              headers: {
                Accept: "application/json",
                "User-Type": "personal",
              },
            }
          );
          localStorage.setItem("token", response.data.data.token);
          if (location.pathname === "/checkout") {
            nextStep();
          } else if (response.data.data.token) {
            localStorage.setItem("token", response.data.data.token);
            navigate("/home");
          } else {
            setErrorSignUp("Sign Up failed. Please try again.");
          }
        } catch (err) {
          console.error("Sign Up Error:", err);
          setErrorSignUp("Sign Up failed. Please try again.");
        } finally {
          setLoading(false);
          setLayer(false);
        }
      }, 2000);
    },
  });
  return (
    <div className='signin-holder'>
      {layer && (
        <div className='layer'>{loading && <div className='loader'></div>}</div>
      )}
      <div className='vector-2-holder'>
        <img className='vector-3' src={vector3} alt='' />
        <img className='vector-33' src={vector33} alt='' />
      </div>
      <div className='vector-3-holder'>
        <img className='vector-2' src={vector2} alt='' />
        <img className='vector-22' src={vector22} alt='' />
      </div>
      <div className='container'>
        <div className='welcome-text'>
          <h1 className='fw-semibold'>Welcome To Our Store</h1>
          <p>Bringing Your Style Home</p>
        </div>
        <ul className='mb-4 mt-4 nav nav-tabs nav-fill about-ul'>
          <li role='presentation' className='nav-item'>
            <button
              onClick={() => handleActive("item1")}
              type='button'
              id='for-history'
              className={isActive === "item1" ? "nav-link active" : "nav-link"}
              role='tab'
            >
              Sign In Form
            </button>
          </li>
          <li role='presentation' className='nav-item'>
            <button
              onClick={() => handleActive("item2")}
              type='button'
              id='for-mission'
              className={isActive === "item2" ? "nav-link active" : "nav-link"}
              role='tab'
            >
              Sign Up Form
            </button>
          </li>
        </ul>
        <div className='tab-content'>
          <div className='signin-flex '>
            <div
              role='tabpanel'
              className={
                isActive === "item1"
                  ? "tab-pane fade show active sign-up-form"
                  : "tab-pane fade sign-in-form"
              }
            >
              <h5>I AM ALREADY A CUSTOMER</h5>
              <div className='w-100'>
                <form onSubmit={formikSignIn.handleSubmit}>
                  <div className='py-2'>
                    <div className='d-flex gap-2 align-items-center'>
                      <FaAt />
                      <input
                        type='email'
                        name='email'
                        id='email'
                        value={formikSignIn.values.email}
                        onChange={formikSignIn.handleChange}
                        onBlur={formikSignIn.handleBlur}
                        required
                        placeholder='E-mail Address'
                      />
                    </div>
                    {formikSignIn.touched.email &&
                      formikSignIn.errors.email && (
                        <p style={{ color: "red" }}>
                          {formikSignIn.errors.email}
                        </p>
                      )}
                  </div>
                  <div className='py-2'>
                    <div className='d-flex gap-2 align-items-center'>
                      <FaLock />
                      <input
                        type='password'
                        name='password'
                        id='password'
                        value={formikSignIn.values.password}
                        onChange={formikSignIn.handleChange}
                        onBlur={formikSignIn.handleBlur}
                        required
                        placeholder='Password'
                      />
                    </div>
                    {formikSignIn.touched.password &&
                      formikSignIn.errors.password && (
                        <p style={{ color: "red" }}>
                          {formikSignIn.errors.password}
                        </p>
                      )}
                  </div>
                  {error && <p className='text-danger'>{error}</p>}
                  <button className='sign-in-button' type='submit'>
                    Sign In
                  </button>
                </form>
              </div>
            </div>
            <div
              role='tabpanel'
              className={
                isActive === "item2"
                  ? "tab-pane fade show active sign-up-form"
                  : "tab-pane fade sign-up-form"
              }
            >
              <div>
                <h5>I AM NEW TO THIS STORE</h5>
                <p>Enjoy exclusive discounts & offers</p>
              </div>
              <div className='w-100'>
                <form onSubmit={formikSignUp.handleSubmit}>
                  <div>
                    <div className='py-2'>
                      <div className='d-flex gap-2 align-items-center'>
                        <FaUserCircle />
                        <input
                          type='text'
                          name='name'
                          onChange={formikSignUp.handleChange}
                          onBlur={formikSignIn.handleBlur}
                          value={formikSignUp.values.name}
                          placeholder='First name'
                        />
                      </div>
                      {formikSignUp.touched.name &&
                        formikSignUp.errors.name && (
                          <p style={{ color: "red" }}>
                            {formikSignUp.errors.name}
                          </p>
                        )}
                    </div>
                    <div className='py-2'>
                      <div className='d-flex gap-2 align-items-center'>
                        <FaLock />
                        <input
                          type='text'
                          name='lastname'
                          onChange={formikSignUp.handleChange}
                          onBlur={formikSignIn.handleBlur}
                          value={formikSignUp.values.lastname}
                          placeholder='Last name'
                        />
                      </div>
                      {formikSignUp.touched.lastname &&
                        formikSignUp.errors.lastname && (
                          <p style={{ color: "red" }}>
                            {formikSignUp.errors.lastname}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className='pt-2'>
                    <div className='py-2'>
                      <div className='d-flex gap-2 align-items-center'>
                        <FaAt />
                        <input
                          type='email'
                          name='email'
                          onChange={formikSignUp.handleChange}
                          onBlur={formikSignUp.handleBlur}
                          value={formikSignUp.values.email}
                          placeholder='E-mail Address'
                        />
                      </div>
                      {formikSignUp.touched.email &&
                        formikSignUp.errors.email && (
                          <p style={{ color: "red" }}>
                            {formikSignUp.errors.email}
                          </p>
                        )}
                    </div>
                    <div className='py-2'>
                      <div className='d-flex gap-2 align-items-center'>
                        <FaLock />
                        <input
                          type='password'
                          name='password'
                          onChange={formikSignUp.handleChange}
                          onBlur={formikSignUp.handleBlur}
                          value={formikSignUp.values.password}
                          placeholder='Password'
                        />
                      </div>
                      {formikSignIn.touched.password &&
                        formikSignUp.errors.password && (
                          <p style={{ color: "red" }}>
                            {formikSignUp.errors.password}
                          </p>
                        )}
                      {errorSignUp && (
                        <p className='text-danger'>{errorSignUp}</p>
                      )}
                    </div>
                  </div>
                  <div className='d-flex gap-3 pt-3'>
                    <div className='checkbox-wrapper-18'>
                      <div className='round'>
                        <input type='checkbox' id='checkbox-18' />
                        <label htmlFor='checkbox-18'></label>
                      </div>
                    </div>
                    <div className='d-flex gap-2 flex-column'>
                      <p>
                        Yes, I would like to receive personalized offers, tips
                        and tricks, and other information from Store.
                      </p>
                      <p>
                        The terms and conditions for Dubai Perfumes apply. Here
                        you can find our{" "}
                        <a href='' className='link-underline-secondary'>
                          privacy information.
                        </a>
                      </p>
                    </div>
                  </div>
                  <button className='sign-up-button' type='submit'>
                    Sign Up
                  </button>
                  <div className='pt-4 d-flex align-items-center flex-column sign-up-holder'>
                    <span className='or-text'>Or</span>
                    <p className='fw-light'>Sign In With Google</p>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      onClick={handleGoogleSignIn}
                    >
                      <FcGoogle size={49} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninAndUp;
