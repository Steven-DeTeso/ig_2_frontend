import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import { useComments } from "../../context/commentsContext";
// import useCommentFunctions from "../../hooks/useCommentFunctions";
// import API_BASE_URL from "../../api";

export default function Feed({ posts, updatePost }) {
  const {
    comments,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
  } = useComments();

  console.log(comments);
  return (
    <>
      {posts &&
        posts.map((post) => {
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
