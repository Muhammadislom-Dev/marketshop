import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className="loading-market">
      <CircularProgress size={60} />
    </div>
  );
}

export default Loading;
