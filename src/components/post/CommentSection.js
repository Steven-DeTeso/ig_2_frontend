import React, { memo } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import styles from "../Home/PostModal.module.css";

const CommentsSection = memo(function CommentsSection({
  comments,
  currentUserId,
  postId,
  handleCommentSubmit,
  handleCommentEdit,
  handleCommentDelete,
}) {
  return (
    <div className={styles.commentsMapped}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          postId={postId}
          commentId={comment.id}
          username={comment.author.username}
          commentText={comment.text}
          authorId={comment.author.id}
          currentUserId={currentUserId}
          handleCommentDelete={handleCommentDelete}
          handleCommentEdit={handleCommentEdit}
        />
      ))}
      <CommentForm postId={postId} handleCommentSubmit={handleCommentSubmit} />
    </div>
  );
});

export default CommentsSection;
