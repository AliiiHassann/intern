import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import "../styles/CustomerData.css";

const CustomerData = ({ nextStep, prevStep }) => {
  const customerFormik = useFormik({
    initialValues: {
      city: "",
      streetName: "",
      buildingNumber: "",
    },

    validationSchema: Yup.object({
      city: Yup.string().required("City is required"),
      streetName: Yup.string().required("Street Name is required"),
      buildingNumber: Yup.string().required("Building Number is required"),
    }),

    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");

        localStorage.setItem("customerData", JSON.stringify(values));

        await Axios.post(
          `https://test-ecomerce.xn--hrt-w-ova.de/api/order/create`,
          values,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Save customer data locally
        localStorage.setItem("customerData", JSON.stringify(values));

        nextStep(); // Go to next step on success
      } catch (error) {
        console.error("Error submitting shipping details:", error);
        alert("Failed to create order. Please try again.");
      }
    },
  });

  return (
    <div className='container customer-container pt-4'>
      <div className=' text-center'>
        <div className='pt-4'>
          <h2>Your Customer Data For The Order</h2>
          <p>Bringing Your Style Home</p>
        </div>
      </div>
      <div className='pt-5'>
        <h5>DELIVERY ADDRESS</h5>
        <form onSubmit={customerFormik.handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='city'
              placeholder='City'
              className='customer-data-form'
              onChange={customerFormik.handleChange}
              onBlur={customerFormik.handleBlur}
              value={customerFormik.values.city}
            />
            {customerFormik.touched.city && customerFormik.errors.city && (
              <div className='error' style={{ color: "red" }}>
                {customerFormik.errors.city}
              </div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='streetName'
              placeholder='Street Name'
              className='customer-data-form'
              onChange={customerFormik.handleChange}
              onBlur={customerFormik.handleBlur}
              value={customerFormik.values.streetName}
            />
            {customerFormik.touched.streetName &&
              customerFormik.errors.streetName && (
                <div className='error' style={{ color: "red" }}>
                  {customerFormik.errors.streetName}
                </div>
              )}
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='buildingNumber'
              placeholder='Building Number'
              className='customer-data-form'
              onChange={customerFormik.handleChange}
              onBlur={customerFormik.handleBlur}
              value={customerFormik.values.buildingNumber}
            />
            {customerFormik.touched.buildingNumber &&
              customerFormik.errors.buildingNumber && (
                <div className='error' style={{ color: "red" }}>
                  {customerFormik.errors.buildingNumber}
                </div>
              )}
          </div>
          <div className='form-buttons'>
            <button type='submit'>Next</button>
            <button type='button' onClick={prevStep}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerData;
