import React from "react";
import SuppotrImage from "../../assets/click.svg";
import "./Support.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function Support() {
  const { t } = useTranslation();

  const handleClick = () => {
    navigator.clipboard.writeText("8600 0610 5637 0785");
    toast.success(t("hello118"));
  };
  return (
    <div className="support">
      <div className="container">
        <div className="support-top">
          <img src={SuppotrImage} alt="" className="support-img" />
        </div>
        <h3 className="support-name">{t("hello84")}</h3>
        <p className="support-text">{t("hello85")}</p>
        <p className="support-text">
          {t("hello86")} {"   "}{" "}
          <button className="support-button" onClick={handleClick}>
            8600 0610 5637 0785
          </button>{" "}
          {t("hello867")}{" "}
        </p>
        <p className="support-text">{t("hello87")}</p>
      </div>
    </div>
  );
}

export default Support;
