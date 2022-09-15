import React from "react";
import "./Navbar.css";
import ApplTitle from "./ApplTitle";
import { Link } from "react-router-dom";

function PublicAppl() {
  return (
    <>
      <nav className="navbar">
        <ApplTitle linkto="/" />
        <Link to="/" className="nav-item px-3">
          <i className="fa fa-fw fa-home"></i>
          Home
        </Link>
        <Link to="/sign-in" className="nav-item-signup px-3">
          <i className="fa fa-fw fa-user"></i>
          Login
        </Link>
      </nav>
    </>
  );
}

export default PublicAppl;
