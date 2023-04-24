import React from "react";

const Comment = ({ username, commentText }) => {
  return (
    <div style={{ display: "flex" }}>
      <p>{username}</p>
      <p>{commentText}</p>
    </div>
  );
};

export default Comment;
