import React, { useState } from "react";
import styles from "../post/Post.module.css";
import LikeButton from "./LikeButton";
import PostHeader from "./PostHeader";
import PostModal from "../Home/PostModal";
import LikesInfo from "./LikesInfo";
import CommentSection from "./CommentSection";
import useCommentFunctions from "../../hooks/useCommentFunctions";
import { useUser } from "../../context/userContext";
import API_BASE_URL from "../../api";

async function toggleLike(postId, currentUsername, like = true) {
  try {
    const endpoint = like ? "like" : "unlike";
    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/${endpoint}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: currentUsername }),
      }
    );
    const data = await response.json();
  } catch (error) {
    console.error(`Error ${like ? "liking" : "unliking"} post:`, error);
  }
}

export default function Post({
  post,
  comments,
  updatePost,
  showPostModal,
  setSelectedPost,
  handleCommentSubmit,
  handleCommentEdit,
  handleCommentDelete,
}) {
  if (!post.images || !post.images[0].signed_image_url) {
    return null;
  }
  const { currentUserId, currentUsername } = useUser();
  const [showModal, setShowModal] = useState(showPostModal);
  const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
  const [totalLikes, setTotalLikes] = useState(post.total_likes);
  const [likedUsers, setLikedUsers] = useState(post.likes);

  const handleImageClick = () => {
    if (setSelectedPost) setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
    <>
      {showPostModal && (
        <PostModal
          post={post}
          show={showModal}
          onClose={handleCloseModal}
          currentUserId={currentUserId}
          handleCommentSubmit={handleCommentSubmit}
          handleCommentEdit={handleCommentEdit}
          handleCommentDelete={handleCommentDelete}
        />
      )}
      <div className={styles.postImageContainer}>
        <PostHeader
          post={post}
          currentUserId={currentUserId}
          updatePost={updatePost}
        />
        <img
          className={styles.postImage}
          src={post.images[0].signed_image_url}
          alt={post.caption}
          onClick={handleImageClick}
        />
        <br />
        <LikeButton isLiked={isLiked} handleLike={handleLike} />
        <LikesInfo totalLikes={totalLikes} likedUsers={likedUsers} />
        <p>
          {post.author.username}: {post.caption}
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
    </>
  );
}
