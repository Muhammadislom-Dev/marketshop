import React from "react";
import "./Like.css";
import heartIcon from "../../assets/category-icons/heart.svg";

function Like() {
  return (
    <div className="likes">
      <div className="container">
        <div className="likes__page">
          <img src={heartIcon} alt="" className="likes-icon" />
          <h2>Tanlanganlar</h2>
        </div>
      </div>
    </div>
  );
}

export default Like;
