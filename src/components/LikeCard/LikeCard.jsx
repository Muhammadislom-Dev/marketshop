import React, { useEffect, useState } from "react";
import heart from "../../assets/heart.svg";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { likeProductDelete } from "../../api";
import ArrowIcon from "../../assets/img/arrowIcon.svg";
import { useTranslation } from "react-i18next";
import UploadImage from "../../assets/announcement-placeholder.png";

const LikeCard = ({ data, key, refetch }) => {
  const i18next = localStorage.getItem("i18nextLng");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { t } = useTranslation();
  const { mutate: likeDeleteMutate } = useMutation((productId) =>
    likeProductDelete(productId)
  );

  const [hoverEffect, setHoverEffect] = useState(false);
  const handleHover = (id) => {
    if (id == data.id) {
      setHoverEffect(true);
    }
  };

  const handleLikeDelete = () => {
    likeDeleteMutate(data.id);
    refetch();
  };

  function formatSecondsToDateString(seconds) {
    const date = new Date(seconds * 1000);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const seconds = data?.uploadedAt / 1000;
  const formattedDate = formatSecondsToDateString(seconds);
  useEffect(() => {
    const img = new Image();
    img.src = data.photos[0].filePath;

    img.onload = () => {
      setIsImageLoaded(true);
    };

    img.onerror = () => {
      setIsImageLoaded(false);
    };
  }, [data.photos[0].filePath]);
  return (
    <>
      <div
        key={key}
        onMouseEnter={() => handleHover(data.id)}
        onMouseLeave={() => setHoverEffect(false)}
        className="card">
        <button onClick={handleLikeDelete} className="card-heart">
          <img src={heart} alt="heart" className="card__heart" />
        </button>
        <Link className="card-link" to={`/products/about/${data?.id}`}>
          {data.photos ? (
            <img
              style={{
                width: "291px",
                height: "164px",
                borderRadius: "15px",
                marginTop: "10px",
                objectFit: "cover",
              }}
              loading={isImageLoaded ? "eager" : "lazy"}
              src={isImageLoaded ? data.photos[0].filePath : UploadImage}
              alt={data?.name}
            />
          ) : (
            <img
              styles={{
                width: "291px",
                height: "164px",
                borderRadius: "15px",
                marginTop: "10px",
                objectFit: "cover",
              }}
              src={UploadImage}
              alt={data?.name}
            />
          )}

          <h2 className="card__title">{data?.name}</h2>
          <p className="card__subTitle">
            {i18next === "uz" ? data?.region?.name : data?.region?.nameRu}{" "}
            {i18next === "uz" ? data?.district?.name : data?.district?.nameRu}{" "}
            {t("hello3")} {"  "}
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

export default LikeCard;
