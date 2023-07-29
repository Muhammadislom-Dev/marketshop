import React, { useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import i18next from "i18next";
import "./Language.css";

const languageList = [
  { id: 1, label: "O‘zbekcha", type: "uz" },
  { id: 2, label: "Russian", type: "ru" },
];

function Language() {
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

  console.log(selectedLanguage);
  return (
    <div>
      <div className="navbarvictorina_language">
        <div
          className="navbarvictorina_language-wrapper"
          onClick={() => setactiveLang((el) => !el)}>
          <CiGlobe className="navbarvictorina_language-icon" />
          <span>{selectedLanguage === "ru" ? "Russian" : "O'zbekcha"}</span>
          <IoMdArrowDropdown className="navbarvictorina_language-iconArrow" />
        </div>
        <div
          className="navbarvictorina_language-bar"
          style={activeLang ? { display: "flex" } : null}>
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
  );
}
export default Language;
