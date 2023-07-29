import React from "react";
import { LikeBanner } from "../../assets/img";
import "./Like.css";

function Like() {
  return (
    <div className="like">
      <div className="container">
        <img src={LikeBanner} alt="" className="like-img" />
      </div>
    </div>
  );
}

export default Like;
