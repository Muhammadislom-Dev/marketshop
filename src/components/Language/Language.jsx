import React, { useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import i18next from "i18next";
import "./Language.css";
import { useTranslation } from "react-i18next";

function Language() {
  const { t } = useTranslation();
  const [activeLang, setactiveLang] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng")
  );

  const handleChangeLng = (lng) => {
    localStorage.setItem("i18nextLng", lng);
    i18next.changeLanguage(lng);
    setactiveLang((el) => !el);
    setSelectedLanguage(lng);
  };

  const languageList = [
    { id: 1, label: t("hello97"), type: "uz" },
    { id: 2, label: t("hello96"), type: "ru" },
  ];

  return (
    <div>
      <div className="navbarvictorina_language">
        <div
          className="navbarvictorina_language-wrapper"
          onClick={() => setactiveLang((el) => !el)}>
          <CiGlobe className="navbarvictorina_language-icon" />
          <span>{selectedLanguage === "ru" ? t("hello96") : t("hello97")}</span>
          <IoMdArrowDropdown className="navbarvictorina_language-iconArrow" />
        </div>
        <div
          className="navbarvictorina_language-bar"
          style={activeLang ? { display: "flex" } : null}>
          <div className="navbar-language-card">
            {languageList.map((el, index) => (
              <p
                key={index}
                onClick={() => {
                  handleChangeLng(el.type);
                }}>
                {el.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Language;
