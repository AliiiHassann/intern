import React, { useState } from "react";
import Axios from "axios";
import "../styles/PaymentInformation.css";
import cardPayment from "../assets/card-payment.png";
import paypal from "../assets/paypal.png";

const PaymentInformation = ({ nextStep, prevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Save payment method locally
    localStorage.setItem("paymentMethod", paymentMethod);

    nextStep(); // Go to next step on success
  };

  return (
    <div className='container pt-4'>
      <div className='text-center'>
        <div className='pt-4'>
          <h2>Your Customer Data For The Order</h2>
          <p>Bringing Your Style Home</p>
        </div>
      </div>
      <div className='pt-5'>
        <h5>PAYMENT METHOD</h5>

        <div>
          <div className='d-flex justify-content-between pt-4 pb-4'>
            <div className='d-flex align-items-center gap-4'>
              <div className='checkbox-wrapper-18'>
                <div className='round'>
                  <input
                    type='checkbox'
                    id='checkbox-18'
                    checked={paymentMethod === "Card Payment"}
                    onChange={() => setPaymentMethod("Card Payment")}
                  />
                  <label htmlFor='checkbox-18'></label>
                </div>
              </div>
              <p>Card Payment</p>
            </div>
            <div>
              <img src={cardPayment} alt='' />
            </div>
          </div>
          <div className='d-flex justify-content-between pt-4 pb-4'>
            <div className='d-flex align-items-center gap-4'>
              <div className='checkbox-wrapper-18'>
                <div className='round'>
                  <input
                    type='checkbox'
                    id='checkbox-19'
                    checked={paymentMethod === "PayPal"}
                    onChange={() => setPaymentMethod("PayPal")}
                  />
                  <label htmlFor='checkbox-19'></label>
                </div>
              </div>
              <p>PayPal</p>
            </div>
            <div>
              <img src={paypal} alt='' />
            </div>
          </div>
        </div>
        <div className='form-buttons'>
          <button type='submit' onClick={handlePayment}>
            Next
          </button>
          <button type='button' onClick={prevStep}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
