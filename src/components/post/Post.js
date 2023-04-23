import React, { useState, useEffect } from "react";
import styles from "../post/Post.module.css";
import LikeButton from "./LikeButton";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ButtonBase from "@mui/material/ButtonBase";
import { useRouter } from "next/router";
import { deletePost, followOrUnfollowUser } from "../../api";

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
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
  const [totalLikes, setTotalLikes] = useState(post.total_likes);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserId, setCurrentUserId] = useState(0);
  const [likedUsers, setLikedUsers] = useState(post.likes);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState([]);

  const handleDeletePost = async () => {
    const isDeleted = await deletePost(post.id);
    if (isDeleted) {
      handleClose();
      updatePost({ ...post, isDeleted: true });
    } else {
      // Handle the error case
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFollowOrUnfollowUser = async () => {
    const authorId = post.author.id;

    if (!isFollowing) {
      const isFollowed = await followOrUnfollowUser(authorId, "follow");
      if (isFollowed) {
        setIsFollowing(true);
        // Handle the success case, e.g., update the UI, show a notification, etc.
      } else {
        // Handle the error case
      }
    } else {
      const isUnfollowed = await followOrUnfollowUser(authorId, "unfollow");
      if (isUnfollowed) {
        setIsFollowing(false);
        // Handle the success case, e.g., update the UI, show a notification, etc.
      } else {
        // Handle the error case
      }
    }
  };

  const handleCommentSubmit = async (postId, commentText) => {
    const response = await fetch(`${API_BASE_URL}/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentText,
        // Add other required fields, like user information, if necessary
      }),
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        setCurrentUserId(currentUserData.id);
        setIsFollowing(
          post.author.followers.some(
            (follower) => follower.id === currentUserData.id
          )
        );
        setComments(post.comments);
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
        <div className={styles.topPost}>
          <div className={styles.profileWrapper}>
            <p>profile img</p>
            <h3>{post.author.username}</h3>
          </div>
          <div className={styles.optionsButton}>
            <IconButton onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <List component="nav">
                <ListItem>
                  <ButtonBase
                    onClick={() => {
                      router.push(`/users/${post.author.id}`);
                    }}
                  >
                    <ListItemText primary="Go to Profile" />
                  </ButtonBase>
                </ListItem>

                {post.author.id !== currentUserId && (
                  <ListItem>
                    <ButtonBase onClick={handleFollowOrUnfollowUser}>
                      <ListItemText
                        primary={
                          isFollowing
                            ? `Unfollow ${post.author.username}`
                            : `Follow ${post.author.username}`
                        }
                      />
                    </ButtonBase>
                  </ListItem>
                )}

                {post.author.username === currentUsername && (
                  <ListItem>
                    <ButtonBase onClick={handleDeletePost}>
                      <ListItemText primary="Delete post" />
                    </ButtonBase>
                  </ListItem>
                )}
              </List>
            </Popover>
          </div>
        </div>
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
        <div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              username={comment.author.username}
              commentText={comment.text}
            />
          ))}
          <CommentForm postId={post.id} onCommentSubmit={handleCommentSubmit} />
        </div>
      </div>
    </>
  );
}
