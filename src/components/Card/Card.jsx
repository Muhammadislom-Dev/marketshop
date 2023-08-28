import React, { useState } from "react";
import headerLike from "../../assets/img/heart.svg";
import heart from "../../assets/heart.svg";
import "./Card.css";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { likeProductPost } from "../../api";
import ArrowIcon from "../../assets/img/arrowIcon.svg";
import { useTranslation } from "react-i18next";
import PlaceholderImage from "../LazyLoadImage/LazyLoadImage";
import UploadImage from "../../assets/announcement-placeholder.png";
import { useInView } from "react-intersection-observer";

const Card = ({ data, key, refetch }) => {
  const [likeTrue, setLikeTrue] = useState(false);
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const { mutate } = useMutation((productId) => likeProductPost(productId));

  const [hoverEffect, setHoverEffect] = useState(false);
  const handleHover = (id) => {
    if (id == data.id) {
      setHoverEffect(true);
    }
  };

  const handleLike = () => {
    mutate(data.id);
    setLikeTrue(true);
    refetch();
  };

  function formatSecondsToDateString(seconds) {
    const date = new Date(seconds * 1000);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const seconds = data?.uploadedAt / 1000;
  const formattedDate = formatSecondsToDateString(seconds);
  return (
    <>
      <div
        key={key}
        onMouseEnter={() => handleHover(data.id)}
        onMouseLeave={() => setHoverEffect(false)}
        className="card">
        {likeTrue === false ? (
          <button onClick={handleLike} className="card-heart">
            <img src={headerLike} alt="heart" className="card__heart" />
          </button>
        ) : likeTrue === true ? (
          <button className="card-heart">
            <img src={heart} alt="heart" className="card__heart" />
          </button>
        ) : (
          ""
        )}
        <Link className="card-link" to={`/products/about/${data?.id}`}>
          {data.photos ? (
            <img
              style={{
                width: "291px",
                height: "164px",
                borderRadius: "15px",
                marginTop: "10px",
              }}
              loading="lazy"
              src={data.photos[0].filePath}
              alt={data?.name}
            />
          ) : (
            <img
              styles={{
                width: "291px",
                height: "164px",
                borderRadius: "15px",
                marginTop: "10px",
              }}
              src={UploadImage}
              alt={data?.name}
            />
          )}

          <h2 className="card__title">{data?.name}</h2>
          <p className="card__subTitle">
            {data?.region?.name}, {data?.district?.name} {t("hello3")} {"  "}
            {formattedDate}
          </p>
          {data?.quality === "NEW" ? (
            <span className="card__link card__new">{t("hello4")}</span>
          ) : data?.quality === "TOP" ? (
            <span className="card__link card__medium">{t("hello5")}</span>
          ) : data?.quality === "AVERAGE" ? (
            <span className="card__link">{t("hello6")}</span>
          ) : (
            ""
          )}
          <img
            src={ArrowIcon}
            alt="cricle"
            className={`${hoverEffect ? "showArrowIcon" : null} card__cricle`}
          />
        </Link>
      </div>
    </>
  );
};

export default Card;
