import React, { useEffect, useState } from "react";
import "./Products.css";
import Card from "../../../../components/Card/Card";
import { getProductNewsData, getProductTrueData } from "../../../../api";
import { useQuery } from "react-query";
import { Box, CircularProgress } from "@mui/material";

function Products({ code, product, paramsData }) {
  const [popular, setPopular] = useState("YANGILARI");
  const { data, isLoading } = useQuery("productData", getProductNewsData);
  const { data: trueData } = useQuery("dataLoading", getProductTrueData);

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={"80vh"}
      >
        <CircularProgress
          color="success"
          style={{ width: "100px", height: "100px" }}
        />
      </Box>
    );
  }

  return (
    <div className="product-all-div">
      <div className="container">
        <div className="product-list">
          <button
            value="YANGILARI"
            onClick={(e) => setPopular(e.target.value)}
            style={{
              color: popular === "YANGILARI" ? "#000" : null,
              borderBottom: popular === "YANGILARI" ? "2px solid #000" : null,
            }}
            className="product-name"
          >
            YANGILARI
          </button>
          <button
            value="OMMABOP"
            onClick={(e) => setPopular(e.target.value)}
            style={{
              color: popular === "OMMABOP" ? "#000" : null,
              borderBottom: popular === "OMMABOP" ? "2px solid #000" : null,
            }}
            className="product-name"
          >
            OMMABOP
          </button>
        </div>
      </div>
      {/* <div className="product-box"> */}
        <div className="container">
          {popular === "YANGILARI" ? (
            <div className="products">
              {code === null
                ? data?.content?.map((evt, index) => (
                    <Card data={evt} key={index} />
                  ))
                : paramsData?.content?.map((evt, index) => (
                    <Card data={evt} key={index} />
                  ))}
            </div>
          ) : (
            <div className="products">
              {code === null
                ? trueData?.content?.map((evt, index) => (
                    <Card data={evt} key={index} />
                  ))
                : product?.content?.map((evt, index) => (
                    <Card data={evt} key={index} />
                  ))}
            </div>
          )}
        </div>
      {/* </div> */}
    </div>
  );
}

export default Products;
