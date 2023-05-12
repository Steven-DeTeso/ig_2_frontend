import React, { useState } from "react";
import { refreshAuthToken } from "../../api";

const CommentForm = ({ postId, handleCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the onCommentSubmit function to handle the form submission
    const response = await handleCommentSubmit(postId, commentText);
    console.log(response);
    if (!response || response.status !== "success") {
      await refreshAuthToken();
      const newResponse = await handleCommentSubmit(postId, commentText);
    }
    // Clear the input field after submitting the comment
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
        }}
      />
    </form>
  );
};

export default CommentForm;
