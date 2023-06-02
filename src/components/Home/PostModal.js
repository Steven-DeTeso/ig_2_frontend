import React, { useRef, useState } from "react";
import styles from "./PostModal.module.css";
import globalStyles from "../../../globalStyles.module.css";
import CommentSection from "../post/CommentSection";
import LikeButton from "../post/LikeButton";
import { useUser } from "../../context/userContext";
import { toggleLike } from "../post/Post";
import LikesInfo from "../post/LikesInfo";
import PostHeader from "../post/PostHeader";

const PostModal = ({
  post,
  show,
  onClose,
  handleCommentSubmit,
  handleCommentEdit,
  handleCommentDelete,
  comments,
  updatePost,
}) => {
  if (!show) {
    return null;
  }
  const modalContentRef = useRef();
  const { image, author, caption, id } = post;
  const imageUrl = image && image.signed_image_url;

  const { currentUserId, currentUsername } = useUser();

  const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
  const [totalLikes, setTotalLikes] = useState(post.total_likes);
  const [likedUsers, setLikedUsers] = useState(post.likes);

  const handleOutsideModalClick = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  const handleLike = async () => {
    let updatedPost = { ...post };
    if (isLiked) {
      await toggleLike(post.id, currentUsername, false);
      updatedPost.is_liked_by_user = false;
      updatedPost.total_likes = totalLikes - 1;
      updatedPost.likes = likedUsers.filter(
        (user) => user.username !== currentUsername
      );
    } else {
      await toggleLike(post.id, currentUsername);
      updatedPost.is_liked_by_user = true;
      updatedPost.total_likes = totalLikes + 1;
      if (!likedUsers.some((user) => user.username === currentUsername)) {
        updatedPost.likes = [...likedUsers, { username: currentUsername }];
      }
    }
    updatePost(updatedPost);
    setIsLiked(updatedPost.is_liked_by_user);
    setTotalLikes(updatedPost.total_likes);
    setLikedUsers(updatedPost.likes);
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
        <div className={styles.commentsOnModal}>
          <PostHeader
            post={post}
            currentUserId={currentUserId}
            updatePost={updatePost}
          />
          <p className={globalStyles.textFont}>
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
          <div className={styles.modalLikes}>
            <LikeButton isLiked={isLiked} handleLike={handleLike} />
            <LikesInfo totalLikes={totalLikes} likedUsers={likedUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
