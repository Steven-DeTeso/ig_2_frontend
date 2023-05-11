import { useState } from "react";

function useCommentFunctions() {
  const API_BASE_URL = "http://localhost:8000";
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = async (postId, commentText, currentUserId) => {
    const response = await fetch(`${API_BASE_URL}/comments/${postId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        text: commentText,
        post: postId,
        author: currentUserId,
      }),
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      return { status: "success" };
    } else {
      // Handle error, display a message or update error state
      return response;
    }
  };

  const handleCommentEdit = (commentId, updatedText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, text: updatedText } : comment
      )
    );
  };

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  return {
    comments,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
  };
}

export default useCommentFunctions;
