import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="standard-size-container">
      <div className="standard-size-form">
        <h1>THANK YOU!</h1>
        <div>We've sent password reset instructions to your email address.</div>
        <Link to="/sign-in">Back to Sign In</Link>
      </div>
    </div>
  );
}

export default ThankYou;
