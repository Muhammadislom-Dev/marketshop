import React, { useState } from "react";
import "./Announcement.css";
import edit from "../../../../assets/edit.svg";
import cricle from "../../../../assets/cricle.svg";
import { deleteProduct, getProfileProductData } from "../../../../api";
import { useMutation, useQuery } from "react-query";
import { Box, CircularProgress } from "@mui/material";
import DeleteProduct from "../../../../components/DeleteProduct/DeleteProduct";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Announcement() {
  const { data, isLoading, isError } = useQuery(
    "profileData",
    getProfileProductData
  );
  const { mutate } = useMutation((productId) => deleteProduct(productId));
  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={"80vh"}>
        <CircularProgress
          color="success"
          style={{ width: "100px", height: "100px" }}
        />
      </Box>
    );
  }
  return (
    <div className="announcement">
      <div className="container">
        <div className="announcement-list">
          {data?.content?.map((evt, index) => (
            <div key={index} className="announcement-card">
              <div className="card__left">
                <LazyLoadImage
                  src={evt?.photos[0]?.filePath}
                  placeholderSrc={evt?.photos[0]?.filePath}
                  alt="Image"
                  draggable={false}
                  effect="blur"
                  className="announcement-picture"
                  onError={(e) => {
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="card__right">
                <h2 className="card__right_title">{evt.name}</h2>
                <div className="card__right_subTitle">
                  {evt?.region?.name}, {evt?.district?.name} tumani Bugun 13:11
                </div>
                <div className="card__right_blok">
                  {evt.quality === "NEW" ? (
                    <span className="blok__old card__new">Yangi</span>
                  ) : evt.quality === "TOP" ? (
                    <span className="blok__old card__medium">O'rtacha</span>
                  ) : evt.quality === "AVERAGE" ? (
                    <span className="blok__old">Eski</span>
                  ) : (
                    ""
                  )}
                  <p className="blok__edit">
                    <span>
                      <img src={edit} alt="edit" />
                    </span>
                    Tahrirlash
                  </p>
                  <DeleteProduct mutate={mutate} data={evt.id} />
                  {/* <img src={backet} alt="backet" className="blok__backet" /> */}
                </div>
                {/* <label className="switch">
                  <input
                    type="checkbox"
                    checked={isToggled}
                    onChange={handleToggle}
                  />
                  <span className="slider round"></span>
                </label> */}
              </div>

              <img src={cricle} alt="cricle" className="card__cricle" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
