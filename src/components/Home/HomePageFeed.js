import React from "react";
import Post from "../post/Post";
import { useComments } from "../../context/commentsContext";

export default function HomePageFeed({ posts, updatePost }) {
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
                likes={post.likes}
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
