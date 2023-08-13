import React from "react";
import "./Blog.css";
import { getBlogData } from "../../../../api";
import { useQuery } from "react-query";
import { Box, CircularProgress } from "@mui/material";
import BlogData from "./BlogData";
import { useTranslation } from "react-i18next";

function Blog() {
  const { data, isLoading } = useQuery("blogData", getBlogData);
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
    <div className="blog">
      <div className="container">
        <h2 className="blog-name">{t("hello38")}</h2>
        <div className="blog-list">
          {data?.objectKoinot?.content?.map((blog) => (
            <BlogData blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
