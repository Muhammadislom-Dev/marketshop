import React from "react";
import Like from "../../components/Like/Like";
import Card from "../../components/Card/Card";
import "./LikePage.css";
import { useQuery } from "react-query";
import { getLikeProductData } from "../../api";
import FindResultIcon from "../../assets/notFindIcon.svg";
import { useTranslation } from "react-i18next";
import LikeCard from "../../components/LikeCard/LikeCard";
import { Box, CircularProgress } from "@mui/material";

function LikePage() {
  const { data, isLoading, refetch } = useQuery("likeData", getLikeProductData);
  const token = localStorage.getItem("accessToken");
  const { t } = useTranslation();

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
            <h2 className="product-name">{t("hello13")}</h2>
          </div>
          {token ? (
            <div className="products">
              {data?.objectKoinot?.content?.length > 0 ? (
                data?.objectKoinot?.content?.map((evt, index) => (
                  <LikeCard refetch={refetch} data={evt} key={index} />
                ))
              ) : (
                <div className="notfindComp">
                  <div className="container">
                    <div className="not_find_flex">
                      <div className="div_icon">
                        <img src={FindResultIcon} alt="" />
                        <h3 className="not_find_result_text">{t("hello79")}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="notfindComp">
              <div className="container">
                <div className="not_find_flex">
                  <div className="div_icon">
                    <img src={FindResultIcon} alt="" />
                    <h3 className="not_find_result_text">{t("hello79")}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LikePage;
