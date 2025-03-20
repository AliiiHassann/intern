import React, { useEffect, useState } from "react";
import "../styles/OrderReview.css";
import card from "../assets/card-payment.png";
import paypal from "../assets/paypal.png";
import {
  clearCart,
  selectCartItems,
  selectTotalQTY,
  setGetTotals,
} from "../rtk/slices/cartSlice";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../rtk/slices/cartSlice";

// Define Props Type
interface OrderReviewProps {
  prevStep: () => void;
}

// Define Order Data Type
interface OrderData {
  city: string;
  streetName: string;
  buildingNumber: string;
}
const OrderReview: React.FC<OrderReviewProps> = ({ prevStep }) => {
  const cartItems: CartItem[] = useSelector(selectCartItems);
  const totalQTY: number = useSelector(selectTotalQTY);
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const customerData = localStorage.getItem("customerData");
    const paymentMethod = localStorage.getItem("paymentMethod");

    if (customerData) {
      setOrderData(JSON.parse(customerData));
    }
    if (paymentMethod) {
      setPaymentMethod(paymentMethod);
    }

    dispatch(setGetTotals());
  }, [cartItems, dispatch]);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    const customerData = localStorage.getItem("customerData");
    const paymentMethod = localStorage.getItem("paymentMethod");

    if (!customerData || !paymentMethod || !token) {
      alert("Missing order details. Please complete all steps.");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        ...JSON.parse(customerData),
        paymentMethod,
      };

      const response = await Axios.post<{ payment_url?: string }>(
        "https://test-ecomerce.xn--hrt-w-ova.de/api/order/create",
        orderPayload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        navigate("/thanks");
        dispatch(clearCart());
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
          <h5>Your Shopping Cart ({totalQTY})</h5>
          {cartItems.length > 0 ? (
            cartItems.map((item, i) => (
              <div key={item.id}>
                <div className='d-flex gap-5 order-product-holder p-4 m-2'>
                  <div className='order-image-holder'>
                    {item.productimage && item.productimage.length > 0 ? (
                      <img
                        className='order-image'
                        src={`https://test-ecomerce.xn--hrt-w-ova.de/${item.productimage[0].link}`}
                        alt={item.title}
                      />
                    ) : (
                      <p>No Image</p>
                    )}
                  </div>
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.information}</p>
                    <h5 className='pt-4'>Quantity : {item.quantity}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className='col-lg-6 pt-5'>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
              <h5>DELIVERY ADDRESS</h5>
              <div className='order-delivery d-flex flex-column justify-content-between'>
                <div className=''>
                  <p>{orderData?.city}</p>
                  <p>{orderData?.streetName}</p>
                  <p>{orderData?.buildingNumber}</p>
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
