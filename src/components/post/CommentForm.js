// components/CommentForm.js

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the onCommentSubmit function to handle the form submission
    await onCommentSubmit(postId, commentText);

    // Clear the input field after submitting the comment
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-comment"></label>
      <textarea
        id="new-comment"
        rows={1}
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        style={{
          width: "100%",
          outline: "none",
          border: "none",
          resize: "none",
        }}
      />
    </form>
  );
};

export default CommentForm;
