import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikeButton = ({ isLiked, handleLike }) => {
  return (
    <IconButton onClick={handleLike}>
      {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default LikeButton;
