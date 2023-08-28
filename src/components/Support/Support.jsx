import React from "react";
import SuppotrImage from "../../assets/support.svg";
import "./Support.css";
import { useTranslation } from "react-i18next";

function Support() {
  const { t } = useTranslation();
  return (
    <div className="support">
      <div className="container">
        <div className="support-top">
          <img src={SuppotrImage} alt="" className="support-img" />
        </div>
        <h3 className="support-name">{t("hello84")}</h3>
        <p className="support-text">{t("hello85")}</p>
        <p className="support-text">{t("hello86")}</p>
        <p className="support-text">{t("hello87")}</p>
      </div>
    </div>
  );
}

export default Support;
