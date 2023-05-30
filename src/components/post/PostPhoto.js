// PostPhoto.js
import React from "react";
import styles from "./Post.module.css";

export default function PostPhoto({ post, showModal }) {
  if (!post.image || !post.image.signed_image_url) {
    return null;
  }

  return (
    <>
      <img
        className={styles.postImgSmall}
        src={post.image.signed_image_url}
        alt={post.caption}
        onClick={showModal}
      />
    </>
  );
}
