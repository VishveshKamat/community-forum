import React from "react";
import { useNavigate } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import "../../App.css";
import { IconButton } from "@mui/material";

const Comments = ({ numberOfComments, threadId }) => {
  const navigate = useNavigate();

  const handleAddComment = () => {
    navigate(`/${threadId}/replies`);
  };

  return (
    <div className="likes__container">
      <IconButton onClick={handleAddComment}>
        <CommentIcon />
      </IconButton>
      <p style={{ color: "#434242" }}>
        {numberOfComments === 0 ? "" : numberOfComments}
      </p>
    </div>
  );
};

export default Comments;
