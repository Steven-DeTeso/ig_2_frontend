import React, { useRef } from "react";
import styles from "./PostModal.module.css";
import CommentSection from "../post/CommentSection";

// TODO: reorder styling so comments appear on left side.
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

  const handleOutsideModalClick = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={handleOutsideModalClick}>
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
          key={id}
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
