// CommentsSection.js
import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import useCommentFunctions from "../../hooks/useCommentFunctions";

function CommentsSection({ currentUserId, postId }) {
  const {
    comments,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
  } = useCommentFunctions(postId);

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
