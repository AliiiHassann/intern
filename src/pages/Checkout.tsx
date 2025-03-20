import React, { useState, useEffect } from "react";
import ProgressIndicator from "../components/ProgressIndicator";
import SigninAndUp from "../pages/SigninAndUp";
import CustomerData from "../components/CustomerData";
import PaymentInformation from "../components/PaymentInformation";
import OrderReview from "../components/OrderReview";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import "../styles/Checkout.css";

// Define Order Data Type
interface OrderData {
  [key: string]: any;
}

const Checkout: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData>({});

  // Check Authentication Status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!token);
  }, [step]);

  // Function to Move to Next Step
  const nextStep = (data?: Partial<OrderData>) => {
    setOrderData({ ...orderData, ...data });
    setStep(step + 1);
  };

  // Function to Move to Previous Step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Render Step Based on Current Step
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

  // Render Progress Icons
  const renderIcon = (currentStep: number) => {
    if (step > currentStep)
      return <FaRegCheckCircle className='checkout-cirlce' color='green' />;
    return <FaRegCircle className='checkout-cirlce' color='gray' />;
  };

  // Get Step Class for Styling
  const getStepClass = (currentStep: number): string => {
    if (step > currentStep) return "completed-step";
    if (step === currentStep) return "active-step";
    return "upcoming-step";
  };

  return (
    <div className='checkout-container'>
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
