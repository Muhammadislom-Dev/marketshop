import React from "react";
import clock from "../../assets/clock.svg";
import eye from "../../assets/eye.svg";
import share from "../../assets/share.svg";
import "./Blog.css";
import { useParams } from "react-router-dom";
import { getByIdBlogContent, getByIdBlogData } from "../../api";
import { useQuery } from "react-query";
import { Box, CircularProgress } from "@mui/material";

function Blog() {
  const { id } = useParams();
  const {
    data: blog,
    isError,
    isLoading,
  } = useQuery(["blog", id], () => getByIdBlogData(id));
  const { data: content } = useQuery(["content", id], () =>
    getByIdBlogContent(id)
  );
  function formatSecondsToDateString(seconds) {
    const date = new Date(seconds * 1000);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const seconds = blog?.objectKoinot?.createdAt / 1000;
  const formattedDate = formatSecondsToDateString(seconds);

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
    <div className="container">
      <div className="bloks">
        <img
          className="blog-about-img"
          src={blog?.objectKoinot?.photo?.filePath}
          alt="images1"
        />
        <div className="blok__section">
          <div className="blok__section_left">
            <h2 className="blok__section_title">Blog</h2>
            <div className="blok__section_timer">
              <img src={clock} alt="clock" />
              <h2 className="timer__title">{formattedDate}</h2>
            </div>
            <div className="blok__section_eye">
              <img src={eye} alt="eye" />
              <h2 className="eye__title">{blog.objectKoinot.see} +</h2>
            </div>
          </div>
          <div className="blok__section_right">
            <img src={share} alt="share" />
            <p>Ulashish</p>
          </div>
        </div>
        <div className="blok__titels">
          <h2 className="titels_donation">{blog.objectKoinot.name}</h2>
          <p
            className="titels__light"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />

          <div className="titles__heshteg">
            {blog.objectKoinot.tags.map((tags, index) => (
              <p key={index} className="heshteg__left">
                {tags.tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
