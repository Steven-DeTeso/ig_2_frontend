import React from "react";
import styles from "../post/Post.module.css";

export default function Post({ post }) {
  if (!post.images || !post.images[0] || !post.images[0].signed_image_url) {
    return null;
  }
  return (
    <>
      <div className={styles.postImageContainer}>
        <p>profile img</p>
        <h3>{post.author.username}</h3>
        <img
          className={styles.postImage}
          src={post.images[0].signed_image_url}
          alt={post.caption}
        />
        <p>
          {post.author.username}: {post.caption}
        </p>
        <p>
          Liked by:{" "}
          {post.likes.map((like, index) => (
            <React.Fragment key={like.id}>
              {like.username}
              {index !== post.likes.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </>
  );
}
