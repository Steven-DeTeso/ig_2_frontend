import React, { useState, useEffect } from "react";
import styles from "../post/Post.module.css";
import LikeButton from "./LikeButton";

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
      let currentUserData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].is_current) {
          currentUserData = data[i];
          break;
        }
      }
      if (currentUserData) {
        setCurrentUsername(currentUserData.username);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

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

  const likedUsersString = () => {
    return likedUsers.reduce((accumulator, user, index) => {
      const separator = index !== likedUsers.length - 1 ? ", " : "";
      return accumulator + user.username + separator;
    }, "");
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
              {totalLikes >= 2 && <span>by </span>}
              {totalLikes < 8 ? likedUsersString() : null}
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
