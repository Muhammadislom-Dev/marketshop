import React from "react";
import "./Privacy.css";
import { useTranslation } from "react-i18next";

function Privacy() {
  const { t } = useTranslation();
  return (
    <div className="privacy">
      <div className="container">
        <h3 className="privacy-name">{t("privacy1")}</h3>
        <p className="privacy-text">{t("privacy2")}</p>
        <ul className="privacy-list">
          <li className="privacy-item">{t("privacy3")}</li>
          <li className="privacy-item">{t("privacy4")}</li>
          <li className="privacy-item">{t("privacy5")}</li>
        </ul>
        <h5>{t("privacy6")}</h5>
        <p className="privacy-text">{t("privacy7")}</p>
        <p className="privacy-text">{t("privacy8")}</p>
        <h5>{t("privacy9")}</h5>
        <p className="privacy-text">{t("privacy10")}</p>
        <h5>{t("privacy11")}</h5>
        <p className="privacy-text">{t("privacy12")}</p>
      </div>
    </div>
  );
}

export default Privacy;
