import React, { useState } from "react";
import { refreshAuthToken } from "../../api";

const CommentForm = ({ postId, handleCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await handleCommentSubmit(postId, commentText);
    if (!response || response.status !== "success") {
      await refreshAuthToken();
      const newResponse = await handleCommentSubmit(postId, commentText);
    }
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-comment"></label>
      <input
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
          marginBottom: "5px",
        }}
      />
    </form>
  );
};

export default CommentForm;
