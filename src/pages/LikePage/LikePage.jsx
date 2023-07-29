import React from "react";
import Like from "../../components/Like/Like";
import Card from "../../components/Card/Card";
import "./LikePage.css";
import { useQuery } from "react-query";
import { getLikeProductData } from "../../api";
import { Box, CircularProgress } from "@mui/material";

function LikePage() {
  const { data, isLoading } = useQuery("likeData", getLikeProductData);

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
    <div>
      <Like />
      <div className="like">
        <div className="container">
          <div className="product-list">
            <h2 className="product-name">TANLANGANLAR</h2>
          </div>
          <div className="products">
            {data?.objectKoinot?.content?.map((evt, index) => (
              <Card like="like" data={evt} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikePage;
