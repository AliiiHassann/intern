// import React, { useState } from "react";
// import "../styles/Checkout.css";
// import SigninAndUp from "./SigninAndUp";
// import CustomerData from "../components/CustomerData";
// import PaymentInformation from "../components/PaymentInformation";
// import OrderReview from "../components/OrderReview";
// import { FaRegCircle } from "react-icons/fa";
// import { FaRegCheckCircle } from "react-icons/fa";

// const Checkout = () => {
//   const [step, setStep] = useState(1);

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <SigninAndUp nextStep={nextStep} />;
//       case 2:
//         return <CustomerData nextStep={nextStep} prevStep={prevStep} />;
//       case 3:
//         return <PaymentInformation nextStep={nextStep} prevStep={prevStep} />;
//       case 4:
//         return <OrderReview prevStep={prevStep} />;
//       default:
//         return null;
//     }
//   };

//   const renderIcon = (currentStep) => {
//     if (step > currentStep) return <FaRegCheckCircle size={26} color='green' />;
//     return <FaRegCircle size={26} color='gray' />;
//   };

//   const getStepClass = (currentStep) => {
//     if (step > currentStep) return "completed-step";
//     if (step === currentStep) return "active-step";
//     return "upcoming-step";
//   };

//   return (
//     <div className='pt-4 checkout-container'>
//       <div className='container pt-4 d-flex justify-content-center'>
//         <div className='d-flex text-center pb-5'>
//           <div className='d-flex align-items-center justify-content-center'>
//             <div className={`${getStepClass(1)} d-flex gap-2`}>
//               {renderIcon(1)}
//               <span>REGISTIR</span>
//             </div>
//             <div className='checkout-line'></div>
//           </div>
//           <div className='d-flex align-items-center justify-content-center'>
//             <div className={`${getStepClass(2)} d-flex gap-2`}>
//               {renderIcon(2)}
//               <span>DATA</span>
//             </div>
//             <div className='checkout-line'></div>
//           </div>
//           <div className='d-flex align-items-center justify-content-center'>
//             <div className={`${getStepClass(3)} d-flex gap-2`}>
//               {renderIcon(3)}
//               <span>PAYMENT</span>
//             </div>
//             <div className='checkout-line'></div>
//           </div>
//           <div className='d-flex align-items-center justify-content-center'>
//             <div className={`${getStepClass(4)} d-flex gap-2`}>
//               {renderIcon(4)}
//               <span>REVIEW</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       {renderStep()}
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import ProgressIndicator from "../components/ProgressIndicator";
import SigninAndUp from "../pages/SigninAndUp";
import CustomerData from "../components/CustomerData";
import PaymentInformation from "../components/PaymentInformation";
import OrderReview from "../components/OrderReview";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import "../styles/Checkout.css";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderData, setOrderData] = useState({});

  // Check Authentication Status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!token);
  }, [step]);

  const nextStep = (data) => {
    setOrderData({ ...orderData, ...data });
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SigninAndUp nextStep={nextStep} />;
      case 2:
        return <CustomerData nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <PaymentInformation nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <OrderReview prevStep={prevStep} />;
      default:
        return null;
    }
  };

  const renderIcon = (currentStep) => {
    if (step > currentStep)
      return <FaRegCheckCircle className='checkout-cirlce' color='green' />;
    return <FaRegCircle className='checkout-cirlce' color='gray' />;
  };

  const getStepClass = (currentStep) => {
    if (step > currentStep) return "completed-step";
    if (step === currentStep) return "active-step";
    return "upcoming-step";
  };

  return (
    <div className='pt-4 checkout-container'>
      <div className='container'>
        <div className='pt-4 d-flex justify-content-center'>
          <div className='d-flex text-center pb-5'>
            <div className='d-flex align-items-center justify-content-center checkout-progress'>
              <div
                className={`${getStepClass(1)} d-flex align-items-center gap-2`}
              >
                {renderIcon(1)}
                <span>REGISTIR</span>
              </div>
              <div className='checkout-line'></div>
            </div>
            <div className='d-flex align-items-center justify-content-center checkout-progress'>
              <div
                className={`${getStepClass(2)} d-flex align-items-center gap-2`}
              >
                {renderIcon(2)}
                <span>DATA</span>
              </div>
              <div className='checkout-line'></div>
            </div>
            <div className='d-flex align-items-center justify-content-center checkout-progress'>
              <div
                className={`${getStepClass(3)} d-flex align-items-center gap-2`}
              >
                {renderIcon(3)}
                <span>PAYMENT</span>
              </div>
              <div className='checkout-line'></div>
            </div>
            <div className='d-flex align-items-center justify-content-center checkout-progress'>
              <div
                className={`${getStepClass(4)} d-flex align-items-center gap-2`}
              >
                {renderIcon(4)}
                <span>REVIEW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default Checkout;
