import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ApplTitle from "./ApplTitle";

function AuthAppl() {
  return (
    <>
      <nav className="navbar">
        <ApplTitle linkto="/" />

        <Link to="/" className="nav-item px-3">
          <i className="fa fa-fw fa-home"></i>
          Home
        </Link>
        <Link to="/dashboard" className="nav-item px-3">
          Dashboard
        </Link>
        <Link to="/products" className="nav-item px-3">
          Products
        </Link>
        <Link to="/order" className="nav-item px-3">
          Order
        </Link>
        <Link to="/checkout" className="nav-item px-3">
          Checkout
        </Link>
        <Link to="/sign-out" className="nav-item-signup px-3">
          <i className="fa fa-fw fa-user"></i>
          Logout
        </Link>
      </nav>
    </>
  );
}

export default AuthAppl;
