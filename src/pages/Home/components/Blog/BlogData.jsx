import React from "react";
import { Link } from "react-router-dom";

function BlogData({ blog }) {
  function formatSecondsToDateString(seconds) {
    const date = new Date(seconds * 1000);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const seconds = blog?.createdAt / 1000;
  const formattedDate = formatSecondsToDateString(seconds);
  return (
    <div className="blog-item" key={blog.id}>
      <Link to={`/blog/about/${blog.id}`}>
        <img src={blog.photo?.filePath} alt="" className="blog-img" />
        <h4 className="blog-names">{blog.name}</h4>
        <p className="blog-text">{blog.description}</p>
        <p className="blog-time">{formattedDate}</p>
      </Link>
    </div>
  );
}

export default BlogData;
