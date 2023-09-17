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
import Login from "../../pages/Login/Login";
import Modal from "@mui/material/Modal";
import Register from "../../pages/Register/Register";
import { ObjectIcon } from "../../assets/icon";
import { Box } from "@mui/material";
import CategoryModal from "../CategoryModal/CategoryModal";
import CreditCard from "../../assets/credit-card.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1230,
  height: 550,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  p: 4,
  borderRadius: "24px",
};

function Navbar() {
  const [isCategory, setisCategory] = useState(false);
  const { data } = useQuery("likeData", getLikeProductData);
  const { t } = useTranslation();
  const token = localStorage.getItem("accessToken");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [login, setLogin] = React.useState("Kirish");


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
              <CategoryModal />
            </div>
            {/* <div className="fixedNavIconBox plus">
              {token ? (
                <Link to="/profile" className="fixed-navbar-Ic">
                  <BsPlusCircleFill className="plusIconFixNAv" />
                </Link>
              ) : (
                <div onClick={handleOpen} className="fixed-navbar-Ic">
                  <BsPlusCircleFill className="plusIconFixNAv" />
                </div>
              )}
            </div> */}
            <div className="fixedNavIconBox">
              <Link to="/like" className="fixed-navbar-Ic">
                <BsHeart className="fixNavIconL" />
                <h4>{t("hello13")}</h4>
              </Link>
            </div>
            <div className="fixedNavIconBox">
              {token ? (
                <Link to="/profile" className="fixed-navbar-Ic">
                  <BiUser className="fixNavIconL" />
                  <h4>{t("profile")}</h4>
                </Link>
              ) : (
                <div onClick={handleOpen} className="fixed-navbar-Ic">
                  <BiUser className="fixNavIconL" />
                  <h4>{t("profile")}</h4>
                </div>
              )}
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
            <span className={`${token ? "navbar-count" : "navbar-counts"}`}>
              {data ? data?.objectKoinot?.content?.length : "0"}
            </span>
          </Link>
          <Language />
          <LoginModal />
          {token ? (
            <Link to="/profile" className="navbar-profiles">
              <span>+</span> {t("give")}
            </Link>
          ) : (
            ""
          )}
          <Link to="/support" className="navbar-support">
            <div class="in_btn">{t("hello83")}</div>
          </Link>
        </div>
      </div>
      <Modal
        open={open}
        className="modal-login-body"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="modal-page">
            <div className="modal-left">
              <div className="login-list">
                <button
                  value="Kirish"
                  onClick={(e) => setLogin(e.target.value)}
                  style={{
                    backgroundColor: login === "Kirish" ? "#232323" : null,
                    color: login === "Kirish" ? "#fff" : null,
                  }}
                  className="login-button">
                  {t("hello15")}
                </button>
                <button
                  value="Ro‘yhatdan o‘tish"
                  onClick={(e) => setLogin(e.target.value)}
                  style={{
                    backgroundColor:
                      login === "Ro‘yhatdan o‘tish" ? "#232323" : null,
                    color: login === "Ro‘yhatdan o‘tish" ? "#fff" : null,
                  }}
                  className="login-button">
                  {t("hello14")}
                </button>
              </div>

              {login === "Kirish" ? (
                <Login handleClose={handleClose} />
              ) : (
                <Register handleClose={handleClose} />
              )}
            </div>
            <div className="modal-right">
              <img src={ObjectIcon} className="modal-img" alt="" />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Navbar;
