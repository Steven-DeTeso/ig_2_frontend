import React, { useState, useEffect } from "react";
import styles from "../post/Post.module.css";
import LikeButton from "./LikeButton";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import PostHeader from "./PostHeader";
import LikesInfo from "./LikesInfo";
import useFetch from "../../hooks/useFetch";

const API_BASE_URL = "http://localhost:8000";

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

export default function Post({ post, updatePost }) {
  if (!post.images || !post.images[0].signed_image_url) {
    return null;
  }
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUsername, setCurrentUsername] = useState("");
  const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
  const [totalLikes, setTotalLikes] = useState(post.total_likes);
  const [likedUsers, setLikedUsers] = useState(post.likes);

  const [comments, setComments] = useState(post.comments || []);

  const { data: userData } = useFetch(`${API_BASE_URL}/users/`);
  const loggedInUser = userData?.find((user) => user.is_current);
  const loggedInUserID = loggedInUser?.id;

  useEffect(() => {
    if (loggedInUser) {
      setCurrentUserId(loggedInUser.id);
      setCurrentUsername(loggedInUser.username);
    }
  }, [loggedInUserID]);

  const handleCommentSubmit = async (postId, commentText) => {
    const response = await fetch(`${API_BASE_URL}/comments/${postId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        text: commentText,
        post: postId,
        author: currentUserId,
      }),
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      return { status: "success" };
    } else {
      // Handle error, display a message or update error state
      return response;
    }
  };

  const handleCommentEdit = (commentId, updatedText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, text: updatedText } : comment
      )
    );
  };

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
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
        />
        <br />
        <LikeButton isLiked={isLiked} handleLike={handleLike} />
        <LikesInfo totalLikes={totalLikes} likedUsers={likedUsers} />
        <p>
          {post.author.username}: {post.caption}
        </p>
        <div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              username={comment.author.username}
              commentText={comment.text}
              authorId={comment.author.id}
              currentUserId={currentUserId}
              onDelete={handleCommentDelete}
              onEdit={handleCommentEdit}
            />
          ))}
          <CommentForm postId={post.id} onCommentSubmit={handleCommentSubmit} />
        </div>
      </div>
    </>
  );
}
