// PostPhoto.js
import React from "react";
import styles from "./Post.module.css";
import PostModal from "../Home/PostModal";

export default function PostPhoto({ post, showPostModal }) {
  if (!post.images || !post.images[0].signed_image_url) {
    return null;
  }

  return (
    <>
      {showPostModal && (
        <PostModal
          post={post}
          showPostModal={showModal}
          onClose={handleCloseModal}
        />
      )}
      <img
        className={styles.postImgSmall}
        src={post.images[0].signed_image_url}
        alt={post.caption}
      />
    </>
  );
}
