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
import { useTranslation } from "react-i18next";
import { getLikeProductData } from "../../api";
import { useQuery } from "react-query";

function Navbar() {
  const [isCategory, setisCategory] = useState(false);
  const { data } = useQuery("likeData", getLikeProductData);
  const { t } = useTranslation();

  return (
    <div className="navbar">
      <div className="responsiveNavbar">
        <div className="container fixedContainer">
          <div className="fixedNav">
            <div className="fixedNavIconBox">
              <Link to="/" className="fixed-navbar-Ic">
                <BiHomeAlt2 className="fixNavIconL" />
                <h4>{t("hello16")}</h4>
              </Link>
            </div>
            <div className="fixedNavIconBox">
              <Link to="/" className="fixed-navbar-Ic">
                <BiCategory className="fixNavIconL" />
                <h4>{t("hello58")}</h4>
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
                <h4>{t("hello13")}</h4>
              </Link>
            </div>
            <div className="fixedNavIconBox">
              <Link to="/profile" className="fixed-navbar-Ic">
                <BiUser className="fixNavIconL" />
                <h4>{t("profile")}</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isCategory ? (
        <Category setisCategory={setisCategory} isCategory={isCategory} />
      ) : null}
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
            <img src={LogoIcon} alt="" className="navbar-icon navbar__icon" />
          </Link>
          <button
            className="navbar-category"
            onMouseEnter={() => setisCategory(true)}
            onMouseLeave={() => setisCategory(false)}>
            <img src={CategoryIcon} alt="" className="navbar-icons" />
            {t("barcha")}
          </button>
        </div>
        <div className="navbar-right">
          <Link to="/blog" className="navbar-link">
            <img src={DocumentIcon} alt="" className="navbar-icon" />
            {t("blog")}
          </Link>
          <Link to="/like" className="navbar-link">
            <img src={HeartIcon} alt="" className="navbar-icon" />
            {t("like")}
            <span className="navbar-count">
              {data ? data?.objectKoinot?.content?.length : "0"}
            </span>
          </Link>
          <Language />
          <LoginModal />
          <Link to="/support" className="navbar-support">
            {t("hello83")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
