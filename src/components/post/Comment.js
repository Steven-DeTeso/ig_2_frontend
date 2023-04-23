import React from "react";

const Comment = ({ username, commentText }) => {
  return (
    <div>
      <p>{username}</p>
      <p>{commentText}</p>
    </div>
  );
};

export default Comment;
