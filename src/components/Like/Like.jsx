import React from "react";
import "./Like.css";
import heartIcon from "../../assets/category-icons/heart.svg";
import { useTranslation } from "react-i18next";

function Like() {
  const {t} = useTranslation()
  return (
    <div className="likes">
      <div className="container">
        <div className="likes__page">
          <img src={heartIcon} alt="" className="likes-icon" />
          <h2>{t("hello13")}</h2>
        </div>
      </div>
    </div>
  );
}

export default Like;
