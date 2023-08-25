import React from "react";
import SuppotrImage from "../../assets/support.svg";
import "./Support.css";

function Support() {
  return (
    <div className="support">
      <div className="container">
        <div className="support-top">
          <img src={SuppotrImage} alt="" className="support-img" />
        </div>
        <h3 className="support-name">
          Tekin Marekt loyihamizni qo’llab quvvatlang!
        </h3>
        <p className="support-text">
          Tekin-Market loyihasi ehson va savob maqsadida qilingan proekt.
        </p>
        <p className="support-text">
          Shu proektni moliyaviy qo’llab quvvatlash niyatingiz bo’lsa iltimos
          xxxx xxxx xxxx xxxx Falonchiev Falonchi kartasiga ehsoningizni
          o’tqazing. Sizning yordamingiz bu savobli proektni yana ham
          ommalashishiga turtki bo’ladi.
        </p>
        <p className="support-text">Hurmat bilan sayt mamauryati!</p>
      </div>
    </div>
  );
}

export default Support;
