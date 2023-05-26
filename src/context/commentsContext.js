import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import API_BASE_URL, { apiCall } from "../api";

const CommentsContext = createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children, posts }) => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchCommentsForPosts = async () => {
      const comments = {};
      for (let post of posts) {
        try {
          const response = await apiCall(`posts/${post.id}/post_comments/`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            comments[post.id] = data;
          }
        } catch (error) {
          console.error(`Error fetching comments for post ${post.id}:`, error);
        }
      }
      setComments(comments);
    };

    fetchCommentsForPosts();
  }, [posts]);

  const updateComments = (postId, updatedComments) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: updatedComments,
    }));
  };

  const handleCommentSubmit = useCallback(
    async (postId, commentText, currentUserId) => {
      try {
        const response = await apiCall(`comments/${postId}/`, {
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
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: [...(prevComments[postId] || []), newComment],
        }));

        return { status: "success" };
      } catch (error) {
        throw error;
      }
    },
    [updateComments]
  );

  const handleCommentEdit = useCallback(
    async (commentId, postId, updatedText) => {
      try {
        const response = await apiCall(
          `comments/${commentId}/update_comment/`,
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

        const updatedComments = comments[postId].map((comment) =>
          comment.id === commentId ? { ...comment, text: updatedText } : comment
        );

        setComments((prevComments) => ({
          ...prevComments,
          [postId]: updatedComments,
        }));
      } catch (error) {
        throw error;
      }
    },
    [comments, setComments]
  );

  const handleCommentDelete = useCallback(
    async (commentId, postId) => {
      try {
        const response = await apiCall(
          `comments/${commentId}/delete_comment/`,
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

        const updatedComments = comments[postId].filter(
          (comment) => comment.id !== commentId
        );

        setComments((prevComments) => ({
          ...prevComments,
          [postId]: updatedComments,
        }));
      } catch (error) {
        throw error;
      }
    },
    [comments, setComments]
  );

  const value = {
    comments,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
  };
  console.log(value);

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
