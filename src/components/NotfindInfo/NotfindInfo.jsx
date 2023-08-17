import React from "react";
import FindResultIcon from "../../assets/notFindIcon.svg";
import "./NotfindInfo.css";
import { t } from "i18next";

function NotfindInfo() {
  return (
    <>
      <div className="notfindComp">
        <div className="container">
          <div className="not_find_flex">
            <div className="div_icon">
              <img src={FindResultIcon} alt="" />
              <h3 className="not_find_result_text">{t("hello80")}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotfindInfo;
