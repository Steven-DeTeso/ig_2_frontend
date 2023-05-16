import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import useCommentFunctions from "../../hooks/useCommentFunctions";
import API_BASE_URL from "../../api";

export default function Feed({ posts, updatePost }) {
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchCommentsForPosts = async () => {
      const comments = {};
      for (let post of posts) {
        const response = await fetch(`${API_BASE_URL}/posts/${post.id}/post_comments/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          comments[post.id] = data;
        }
      }
      setComments(comments);
    };

    fetchCommentsForPosts();
  }, [posts]);

  return (
    <>
      {posts &&
        posts.map((post) => {
          const {
            handleCommentSubmit,
            handleCommentEdit,
            handleCommentDelete,
          } = useCommentFunctions(post.id, comments[post.id] || []);
          return (
            <article key={post.id}>
              <Post
                post={post}
                comments={comments[post.id] || []}
                updatePost={updatePost}
                showPostModal={false}
                handleCommentSubmit={handleCommentSubmit}
                handleCommentEdit={handleCommentEdit}
                handleCommentDelete={handleCommentDelete}
              />
            </article>
          );
        })}
    </>
  );
}
