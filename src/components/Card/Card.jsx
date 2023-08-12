import React, { useState } from "react";
import headerLike from "../../assets/img/heart.svg";
import heart from "../../assets/heart.svg";
import "./Card.css";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { likeProductPost } from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ArrowIcon from "../../assets/img/arrowIcon.svg";

const Card = ({ data, key, like }) => {
  const { mutate } = useMutation((productId) => likeProductPost(productId));

  const [hoverEffect, setHoverEffect] = useState(false);
  const handleHover = (id) => {
    if (id == data.id) {
      setHoverEffect(true);
    }
  };

  const handleLike = () => {
    mutate(data.id);
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
        {like ? (
          <button className="card-heart">
            <img src={heart} alt="heart" className="card__heart" />
          </button>
        ) : (
          <button onClick={handleLike} className="card-heart">
            <img src={headerLike} alt="heart" className="card__heart" />
          </button>
        )}
        <Link className="card-link" to={`/products/about/${data?.id}`}>
          {data.photos ? (
            <LazyLoadImage
              src={data.photos[0].filePath}
              placeholderSrc={data.photos[0].filePath}
              alt="Image"
              draggable={false}
              effect="blur"
              className="card__img"
              style={{
                objectFit: "cover",
                borderRadius: "15px",
              }}
              onError={(e) => {
                e.target.onerror = null;
              }}
            />
          ) : null}

          <h2 className="card__title">{data?.name}</h2>
          <p className="card__subTitle">
            {data?.region?.name}, {data?.district?.name} tumani {"  "}
            {formattedDate}
          </p>
          {/* </Link> */}
          {data?.quality === "NEW" ? (
            <span className="card__link card__new">Yangi</span>
          ) : data?.quality === "TOP" ? (
            <span className="card__link card__medium">O'rtacha</span>
          ) : data?.quality === "AVERAGE" ? (
            <span className="card__link">Eski</span>
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
