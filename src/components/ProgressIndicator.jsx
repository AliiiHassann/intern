import React from "react";

const ProgressIndicator = ({ step }) => (
  <div className='progress-indicator'>
    <span className={step >= 1 ? "active" : ""}>Cart</span>
    <span className={step >= 2 ? "active" : ""}>Shipping</span>
    <span className={step >= 3 ? "active" : ""}>Payment</span>
    <span className={step >= 4 ? "active" : ""}>Review</span>
  </div>
);

export default ProgressIndicator;
