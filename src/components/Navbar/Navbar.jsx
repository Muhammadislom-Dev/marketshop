import React, { useState } from "react";
import "./Navbar.css";
import {
  CategoryIcon,
  DocumentIcon,
  HeartIcon,
  LogoIcon,
} from "../../assets/icon";
import { Link } from "react-router-dom";
import { BiCategory, BiHomeAlt2, BiUser } from "react-icons/bi";
import { BsHeart, BsPlusCircleFill } from "react-icons/bs";
import LoginModal from "../Modal/Modal";
import Language from "../Language/Language";
import Category from "../Category/Category";

function Navbar() {
  const [isCategory, setisCategory] = useState(false);
  return (
    <div className="navbar">
      <div className="responsiveNavbar">
        <div className="container fixedContainer">
          <div className="fixedNav">
            <div className="fixedNavIconBox">
              <Link to="/" className="fixed-navbar-Ic">
                <BiHomeAlt2 className="fixNavIconL" />
                <h4>Bosh sahifa</h4>
              </Link>
            </div>
            <div className="fixedNavIconBox">
              <Link to="/" className="fixed-navbar-Ic">
                <BiCategory className="fixNavIconL" />
                <h4>Kategoriya</h4>
              </Link>
            </div>
            <div className="fixedNavIconBox plus">
              <Link to="/" className="fixed-navbar-Ic">
                <BsPlusCircleFill className="plusIconFixNAv" />
              </Link>
            </div>
            <div className="fixedNavIconBox">
              <Link to="/" className="fixed-navbar-Ic">
                <BsHeart className="fixNavIconL" />
                <h4>Tanlanganlar</h4>
              </Link>
            </div>
            <div className="fixedNavIconBox">
              <Link to="/" className="fixed-navbar-Ic">
                <BiUser className="fixNavIconL" />
                <h4>Profile</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isCategory ? <Category setisCategory={setisCategory} /> : null}
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
            <img src={LogoIcon} alt="" className="navbar-icon navbar__icon" />
          </Link>
          <button
            className="navbar-category"
            onClick={() => setisCategory((state) => !state)}
          >
            <img src={CategoryIcon} alt="" className="navbar-icons" />
            Barcha bo‘limlar
          </button>
        </div>
        <div className="navbar-right">
          <Link to="/blog" className="navbar-link">
            <img src={DocumentIcon} alt="" className="navbar-icon" />
            Blog
          </Link>
          <Link to="/like" className="navbar-link">
            <img src={HeartIcon} alt="" className="navbar-icon" />
            Sevimlilar
          </Link>
          <Language />
          <LoginModal />
          <Link to="/profile" className="navbar-submit">
            <span>+</span>
            E’lon berish
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
