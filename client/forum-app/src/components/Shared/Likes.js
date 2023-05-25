import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../../App.css";
import { IconButton } from "@mui/material";

const Likes = ({ numberOfLikes, threadId }) => {
  const handleLike = () => {
    alert("You just liked the post!");
    fetch("http://localhost:4000/api/thread/like", {
      method: "POST",
      body: JSON.stringify({
        threadId,
        userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="likes__container">
      <IconButton onClick={handleLike}>
        <FavoriteIcon />
      </IconButton>
      <p style={{ color: "#434242" }}>
        {numberOfLikes === 0 ? "" : numberOfLikes}
      </p>
    </div>
  );
};

export default Likes;
