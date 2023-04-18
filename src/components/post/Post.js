import React, { useState, useEffect } from "react";
import styles from "../post/Post.module.css";
import LikeButton from "./LikeButton";

const API_BASE_URL = "http://localhost:8000";

async function likePost(postId, currentUsername) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username: currentUsername }),
    });
    const data = await response.json();
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
      body: JSON.stringify({ username: currentUsername }),
    });
    const data = await response.json();
  } catch (error) {
    console.error("Error unliking post:", error);
  }
}

export default function Post({ post, updatePost }) {
  if (!post.images || !post.images[0] || !post.images[0].signed_image_url) {
    return null;
  }

  const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
  const [totalLikes, setTotalLikes] = useState(post.total_likes);
  const [currentUsername, setCurrentUsername] = useState("");
  const [likedUsers, setLikedUsers] = useState(post.likes);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("data:", data);
      let currentUserData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].is_current) {
          currentUserData = data[i];
          break;
        }
      }
      console.log("currentUserData:", currentUserData);
      if (currentUserData) {
        setCurrentUsername(currentUserData.username);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleLike = async () => {
    if (isLiked) {
      await unlikePost(post.id, currentUsername);
      setIsLiked(false);
      setTotalLikes(totalLikes - 1);
      setLikedUsers(
        likedUsers.filter((user) => user.username !== currentUsername)
      );
    } else {
      await likePost(post.id, currentUsername);
      setIsLiked(true);
      setTotalLikes(totalLikes + 1);
      if (!likedUsers.some((user) => user.username === currentUsername)) {
        setLikedUsers([...likedUsers, { username: currentUsername }]);
      }
    }
  };

  const likedUsersString = () => {
    return likedUsers
      .map((user, index) => {
        return user.username + (index !== likedUsers.length - 1 ? ", " : "");
      })
      .join("");
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
        <br />
        <LikeButton isLiked={isLiked} handleLike={handleLike} />
        <div>
          {totalLikes ? (
            <>
              <strong>
                {totalLikes} like{totalLikes !== 1 && "s"}
              </strong>{" "}
              {totalLikes < 8 ? likedUsersString() : null}
              {totalLikes >= 8 && <span>by </span>}
            </>
          ) : (
            " "
          )}
        </div>
        <p>
          {post.author.username}: {post.caption}
        </p>
      </div>
    </>
  );
}
