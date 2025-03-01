import React, { useEffect, useState } from "react";
import "../styles/OrderReview.css";
import card from "../assets/card-payment.png";
import paypal from "../assets/paypal.png";
import {
  selectCartItems,
  selectTotalQTY,
  setGetTotals,
} from "../rtk/slices/cartSlice";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

const OrderReview = ({ prevStep }) => {
  const cartItems = useSelector(selectCartItems);
  const totalQTY = useSelector(selectTotalQTY);
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("customerData"));
    const paymentMethod = localStorage.getItem("paymentMethod");

    setOrderData(customerData);
    setPaymentMethod(paymentMethod);
    setLoading(false);

    dispatch(setGetTotals());
  }, [cartItems, dispatch]);
  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    const customerData = JSON.parse(localStorage.getItem("customerData"));
    const paymentMethod = localStorage.getItem("paymentMethod");

    setLoading(true);

    try {
      const orderData = {
        ...customerData,
        paymentMethod,
      };

      const response = await Axios.post(
        "https://test-ecomerce.xn--hrt-w-ova.de/api/order/create",
        orderData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to payment URL if present
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        navigate("/thanks");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='order-container container pt-4'>
      <div className='text-center'>
        <div className='pt-4'>
          <h2>Your Customer Data For The Order</h2>
          <p>Bringing Your Style Home</p>
        </div>
      </div>
      <div className='pt-5'>
        <h5>REVIEW ORDER</h5>
        <p>Dear Customer, Please Check Your Information For Accuracy</p>
      </div>
      <div className='row order-row'>
        <div className='col-lg-6 pt-5'>
          {cartItems.map((e, i) => {
            return (
              <div key={i}>
                <h5>Your Shopping Cart {totalQTY}</h5>
                <div className='d-flex gap-5 order-product-holder p-4'>
                  <div className='order-image-holder'>
                    <img
                      className='order-image'
                      src={`https://test-ecomerce.xn--hrt-w-ova.de/${e.productimage?.[0].link}`}
                      alt=''
                    />
                  </div>
                  <div className=''>
                    <h5>{e.title}</h5>
                    <p>{e.information}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='col-lg-6 pt-5'>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
              <h5>DELIVERY ADDRESS</h5>
              <div className='order-delivery d-flex flex-column justify-content-between'>
                <div className=''>
                  <p>{orderData.city}</p>
                  <p>{orderData.streetName}</p>
                  <p>{orderData.buildingNumber}</p>
                </div>
                <div>
                  <span style={{ color: "#E58411", cursor: "pointer" }}>
                    Edit
                  </span>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
              <h5>PAYMENT</h5>
              <div className='order-payment d-flex justify-content-between flex-column'>
                <div className='d-flex flex-column gap-3'>
                  <p>{paymentMethod}</p>
                  <div>
                    <img
                      src={paymentMethod === "Card Payment" ? card : paypal}
                      alt=''
                    />
                  </div>
                </div>
                <span style={{ color: "#E58411", cursor: "pointer" }}>
                  Edit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='form-buttons'>
        <button
          type='button'
          onClick={placeOrder}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#ccc" : "#e58411",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
        <button type='button' onClick={prevStep}>
          Back
        </button>
      </div>
    </div>
  );
};

export default OrderReview;
