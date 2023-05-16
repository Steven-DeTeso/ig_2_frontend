import { useState, useCallback } from "react";
import API_BASE_URL from "../api";

function useCommentFunctions(postId, initialComments) {
  const [comments, setComments] = useState(initialComments || []);
  const [commentsCache, setCommentsCache] = useState({});

  const updateCache = (postId, updatedComments) => {
    setCommentsCache((prevCache) => ({
      ...prevCache,
      [postId]: updatedComments,
    }));
  };

  const handleCommentSubmit = useCallback(
    async (postId, commentText, currentUserId) => {
      try {
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

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Request failed: ${errorData.detail}`);
        }

        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment]);
        updateCache(postId, [...comments, newComment]);

        return { status: "success" };
      } catch (error) {
        throw error;
      }
    },
    [comments, updateCache]
  );

  const handleCommentEdit = useCallback(
    async (commentId, updatedText) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/comments/${commentId}/update_comment/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              text: updatedText,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Request failed: ${errorData.detail}`);
        }

        const updatedComments = comments.map((comment) =>
          comment.id === commentId ? { ...comment, text: updatedText } : comment
        );

        setComments(updatedComments);
        updateCache(postId, updatedComments);
      } catch (error) {
        throw error;
      }
    },
    [comments, updateCache]
  );

  const handleCommentDelete = useCallback(
    async (commentId) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/comments/${commentId}/delete_comment/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Request failed: ${errorData.detail}`);
        }

        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );

        setComments(updatedComments);
        updateCache(postId, updatedComments);
      } catch (error) {
        throw error;
      }
    },
    [comments, updateCache]
  );

  return {
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
  };
}

export default useCommentFunctions;
