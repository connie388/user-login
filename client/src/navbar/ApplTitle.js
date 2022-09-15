import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function ApplTitle(props) {
  const { linkto } = props;
  return (
    <>
      <Link to={linkto} className="nav-item">
        THE ZONE
        {/* <img
          className="company-logo"
          src="./logo/company_logo.png"
          alt="not found"
        /> */}
      </Link>
    </>
  );
}

export default ApplTitle;
