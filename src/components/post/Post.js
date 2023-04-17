import React, { useState, useEffect } from "react";
import styles from "../post/Post.module.css";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const API_BASE_URL = "http://localhost:8000";

async function likePost(postId, currentUsername) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    data.username = currentUsername;
    return data;
  } catch (error) {
    console.error("Error liking post:", error);
  }
}

async function unlikePost(postId, currentUsername) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/unlike/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    data.username = currentUsername;
    return data;
  } catch (error) {
    console.error("Error unliking post:", error);
  }
}

export default function Post({ post }) {
  if (!post.images || !post.images[0] || !post.images[0].signed_image_url) {
    return null;
  }

  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(post.total_likes);
  const [currentUsername, setCurrentUsername] = useState("");
  const [likedUsers, setLikedUsers] = useState(post.likes);

  useEffect(() => {
    setIsLiked(post.is_liked_by_user);
  }, [post]);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setCurrentUsername(data.username);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleLike = async () => {
    if (isLiked) {
      const result = await unlikePost(post.id, currentUsername);
      if (result) {
        setIsLiked(false);
        setTotalLikes(totalLikes - 1);
        setLikedUsers(likedUsers.filter((user) => user.id !== result.id));
      }
    } else {
      const result = await likePost(post.id, currentUsername);
      if (result) {
        setIsLiked(true);
        setTotalLikes(totalLikes + 1);
        setLikedUsers([...likedUsers, result]);
      }
    }
  };

  return (
    <>
      <div className={styles.postImageContainer}>
        <p>profile img</p>
        <h3>{post.author.username}</h3>
        <img
          className={styles.postImage}
          src={post.images[0].signed_image_url}
          alt={post.caption}
        />
        <p>
          {post.author.username}: {post.caption}
        </p>
        <IconButton onClick={handleLike}>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        {totalLikes ? (
          <p>
            Likes {totalLikes} by:{" "}
            {likedUsers.map((user, index) => (
              <React.Fragment key={user.id}>
                {user.username}
                {index !== likedUsers.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
        ) : (
          " "
        )}
      </div>
    </>
  );
}
