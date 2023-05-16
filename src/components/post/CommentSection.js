import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function CommentsSection({
  comments,
  currentUserId,
  postId,
  handleCommentSubmit,
  handleCommentEdit,
  handleCommentDelete,
}) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
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
}

export default CommentsSection;
