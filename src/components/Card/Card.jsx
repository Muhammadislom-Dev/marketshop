import React from "react";
import circle from "../../assets/cricle.png";
import headerLike from "../../assets/img/heart.svg";
import heart from "../../assets/heart.svg";
import "./Card.css";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { likeProductPost } from "../../api";
import { Box, CircularProgress } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card = ({ data, key, like }) => {
  const { isLoading, isError, mutate } = useMutation((productId) =>
    likeProductPost(productId)
  );

  const handleLike = () => {
    mutate(data.id);
  };

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
      <div key={key} className="card">
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
          <h2 className="card__title">{data?.name}</h2>
          <p className="card__subTitle">
            {data?.region?.name}, {data?.district?.name} tumani Bugun 13:11
          </p>
        </Link>
        {data?.quality === "NEW" ? (
          <span className="card__link card__new">Yangi</span>
        ) : data?.quality === "TOP" ? (
          <span className="card__link card__medium">O'rtacha</span>
        ) : data?.quality === "AVERAGE" ? (
          <span className="card__link">Eski</span>
        ) : (
          ""
        )}
        <img src={circle} alt="cricle" className="card__cricle" />
      </div>
    </>
  );
};

export default Card;
