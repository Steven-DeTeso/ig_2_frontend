// PostPhoto.js
import React from "react";
import styles from "./Post.module.css";

export default function PostPhoto({ post }) {
  if (!post.images || !post.images[0].signed_image_url) {
    return null;
  }

  return (
    <img
      className={styles.postImgSmall}
      src={post.images[0].signed_image_url}
      alt={post.caption}
    />
  );
}
