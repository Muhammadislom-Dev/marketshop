import React, { useEffect, useState } from "react";
import location from "../../assets/location.svg";
import clock from "../../assets/clock.svg";
import eye from "../../assets/eye.svg";
import children from "../../assets/children.svg";
import "./AboutProduct.css";
import Card from "../../components/Card/Card";
import { useParams } from "react-router-dom";
import {
  getByIdCategoryData,
  getByIdProductData,
  getByIdProductDataAbout,
  getPhoneProductData,
  getProductData,
} from "../../api";
import { useQuery } from "react-query";
import { Box, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { AvatarIcon } from "../../assets/icon";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import CallModal from "./components/Modal/Modal";
import { t } from "i18next";

function AboutProduct() {
  const i18next = localStorage.getItem("i18nextLng");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(["product", id], () =>
    getByIdProductDataAbout(id)
  );
  const { data: getPhone } = useQuery(["get-phone", id], () =>
    getPhoneProductData(id)
  );

  const category = data?.category?.id;
  const { data: product } = useQuery("productData", getProductData);
  const { data: categoryData } = useQuery(["category", category], () =>
    getByIdCategoryData(category)
  );

  function formatSecondsToDateString(seconds) {
    const date = new Date(seconds * 1000);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const seconds = data?.user?.lastOnline / 1000;
  const formattedDate = formatSecondsToDateString(seconds);

  const secondDate = data?.uploadedAt / 1000;
  const formatUpdateDate = formatSecondsToDateString(secondDate);

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
    <>
      {!!data && (
        <div className="container">
          <div className="blok">
            <div className="blok__left">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2">
                {data?.photos?.map((evt, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="aboutproduct-img"
                      alt={evt?.name}
                      src={evt?.filePath}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={50}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                style={{ paddingLeft: "10px", paddingRight: "0" }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper">
                {data?.photos?.map((evt, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="aboutproduct-imgs"
                      alt={evt?.name}
                      src={evt?.filePath}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="blok__right">
              <h1 className="blok__right_title">{data?.name}</h1>
              <p className="blok__right_subTitle">{data?.description}</p>

              <div className="blok__right_icons">
                {data?.quality === "NEW" ? (
                  <span className="icons__link card__new">{t("hello4")}</span>
                ) : data?.quality === "TOP" ? (
                  <span className="icons__link card__medium">
                    {t("hello5")}
                  </span>
                ) : data?.quality === "AVERAGE" ? (
                  <span className="icons__link">{t("hello6")}</span>
                ) : (
                  ""
                )}
                <div className="icons__oblast">
                  <img
                    src={location}
                    alt="location"
                    className="icons__oblast_location"
                  />
                  <p className="icons__oblast_subTitle">
                    {i18next === "ru" ? data.region.nameRu : data.region.name},{" "}
                    {i18next === "ru"
                      ? data.district.nameRu
                      : data.district.name}{" "}
                  </p>
                </div>
                <div className="icons__oblast">
                  <img
                    src={clock}
                    alt="clock"
                    className="icons__oblast_location"
                  />
                  <p className="icons__oblast_subTitle">{formatUpdateDate}</p>
                </div>
                <div className="icons__oblast">
                  <img src={eye} alt="eye" className="icons__oblast_location" />
                  <p className="icons__oblast_subTitle">{data?.see} +</p>
                </div>
              </div>
              <div className="blok__right_call">
                <CallModal getPhone={getPhone} />

                <div className="call__children">
                  <img
                    src={
                      data?.user?.photo === null
                        ? AvatarIcon
                        : data?.user?.photo
                    }
                    alt="children"
                    className="call__icon-img"
                  />
                  <div className="call__children_orderer">
                    <h4 className="orderer_title">{data?.user?.firstName}</h4>
                    <p className="orderer_subTitle">
                      {t("hello33")} {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
              <p className="blok__right_note">
                <b className="note__span">{t("hello89")}:</b> {t("hello88")}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="about">
        <div className="container">
          <div className="about-top">
            <button className="about-button">{t("hello36")}</button>
          </div>
          <div className="products">
            {product?.content?.map((evt, index) => (
              <Card data={evt} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="about">
        <div className="container">
          <div className="about-top">
            <button className="about-button">{t("hello37")}</button>
          </div>
          <div className="products">
            {categoryData?.content?.map((evt, index) => (
              <Card data={evt} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutProduct;
