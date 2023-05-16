import { useState, useEffect } from "react";
import API_BASE_URL from "../api";

function useCommentFunctions(postId) {
  console.log(`Running useCommentFunctions for postId: ${postId}`);
  const [comments, setComments] = useState([]);
  const [commentsCache, setCommentsCache] = useState({});

  const fetchComments = async () => {
    if (!postId) {
      console.error("No postId provided to fetch comments");
      return;
    }

    try {
      if (commentsCache[postId]) {
        setComments(commentsCache[postId]);
      } else {
        const response = await fetch(
          `${API_BASE_URL}/posts/${postId}/post_comments/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setComments(data);
        setCommentsCache((prevCache) => ({
          ...prevCache,
          [postId]: data,
        }));
      }
    } catch (error) {
      if (error.message.includes("404")) {
        // If the error was a 404 (Not Found), ignore it
        console.log(`No comments found for this post: ${postId}`);
      } else {
        // For any other errors, re-throw them
        throw error;
      }
    }
  };

  useEffect(() => {
    if (postId !== null && postId !== undefined) {
      fetchComments();
    }
  }, [postId]);

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
      setComments((prevComments) => {
        const updatedComments = [...prevComments, newComment];
        setCommentsCache((prevCache) => ({
          ...prevCache,
          [postId]: updatedComments,
        }));
        return updatedComments;
      });
      return { status: "success" };
    } else {
      const errorData = await response.json();
      throw new Error(`Request failed: ${errorData.detail}`);
    }
  };

  const handleCommentEdit = async (commentId, updatedText) => {
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

    if (response.ok) {
      const updatedComment = await response.json();
      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, text: updatedText } : comment
        );
        setCommentsCache((prevCache) => ({
          ...prevCache,
          [postId]: updatedComments,
        }));
        return updatedComments;
      });
    } else {
      // Handle error, display a message or update error state
      return response;
    }
  };

  const handleCommentDelete = async (commentId) => {
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

    if (response.ok) {
      setComments((prevComments) => {
        const updatedComments = prevComments.filter(
          (comment) => comment.id !== commentId
        );
        setCommentsCache((prevCache) => ({
          ...prevCache,
          [postId]: updatedComments,
        }));
        return updatedComments;
      });
    } else {
      const errorData = await response.json();
      throw new Error(`Request failed: ${errorData.detail}`);
    }
  };

  return {
    comments,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
  };
}

export default useCommentFunctions;
