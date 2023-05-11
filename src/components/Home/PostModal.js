import React, { useRef } from "react";
import styles from "./PostModal.module.css";
import Comment from "../post/Comment";
import CommentForm from "../post/CommentForm";

const PostModal = ({ post, show, onClose }) => {
  if (!show) {
    return null;
  }
  const modalContentRef = useRef();
  const { images, author, caption, comments, id } = post;
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
        <div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              username={comment.author.username}
              commentText={comment.text}
              authorId={comment.author.id}
              // You will need to implement onDelete and onEdit functionality for comments within the modal
              onDelete={() => {}}
              onEdit={() => {}}
            />
          ))}
          <CommentForm postId={id} onCommentSubmit={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
