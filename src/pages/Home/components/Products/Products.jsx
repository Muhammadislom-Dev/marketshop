import React, { useEffect, useState } from "react";
import "./Products.css";
import Card from "../../../../components/Card/Card";
import { getProductNewsData, getProductTrueData } from "../../../../api";
import { useQuery } from "react-query";
import { Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import NotfindInfo from "../../../../components/NotfindInfo/NotfindInfo";

function Products({ paramsData, popular, setPopular, refetch, setPage }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="product-all-div">
        <div className="container">
          <div className="product-list">
            <button
              onClick={() => setPopular(false)}
              style={{
                color: popular === false ? "#000" : null,
                borderBottom: popular === false ? "2px solid #000" : null,
              }}
              className="product-name">
              {t("hello43")}
            </button>
            <button
              onClick={() => setPopular(true)}
              style={{
                color: popular === true ? "#000" : null,
                borderBottom: popular === true ? "2px solid #000" : null,
              }}
              className="product-name">
              {t("hello44")}
            </button>
          </div>
        </div>
      </div>
      <div className="products-all-home">
        <div className="container">
          <div className="products">
            {paramsData?.content?.length > 0 ? (
              paramsData?.content?.map((evt, index) => (
                <Card refetch={refetch} data={evt} key={index} />
              ))
            ) : (
              <NotfindInfo />
            )}
          </div>
          <button onClick={() => setPage(100)} className="products-all-button">
            {t("hello82")}
          </button>
        </div>
      </div>
    </>
  );
}

export default Products;
