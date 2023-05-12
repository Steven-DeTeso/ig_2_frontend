import React, { useState, useEffect, useRef } from "react";
import styles from "./PostModal.module.css";
import CommentSection from "../post/CommentSection";
import API_BASE_URL from "../../api";

const PostModal = ({
  post,
  show,
  onClose,
  currentUserId,
  handleCommentSubmit,
  handleCommentEdit,
  handleCommentDelete,
  comments,
}) => {
  if (!show) {
    return null;
  }
  const modalContentRef = useRef();
  const { images, author, caption, id } = post;
  const imageUrl = images && images[0] && images[0].signed_image_url;

  const handleOutsideClick = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <div ref={modalContentRef} className={styles.modalContent}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={caption}
            className={styles.postImage}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <p>
          {author.username}: {caption}
        </p>
        <CommentSection
          comments={comments}
          currentUserId={currentUserId}
          postId={post.id}
          handleCommentSubmit={handleCommentSubmit}
          handleCommentEdit={handleCommentEdit}
          handleCommentDelete={handleCommentDelete}
        />
      </div>
    </div>
  );
};

export default PostModal;
