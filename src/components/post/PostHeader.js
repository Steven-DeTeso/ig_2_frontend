import React, { useState, useEffect } from "react";
import styles from "../post/Post.module.css";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ButtonBase from "@mui/material/ButtonBase";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/router";
import { deletePost, followOrUnfollowUser } from "../../api";

export default function PostHeader({ post, currentUserId, updatePost }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFollowing, setIsFollowing] = useState();
  const [currentUsername, setCurrentUsername] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl(post.author.profile_pic.signed_image_url);
    // extract follower id numbers and store in new array under followerIds
    const followerIds = post.author.followers.map((follower) => follower.id);
    // checking to see if currentUserid is in new array, if so, isFollowing set to true
    setIsFollowing(followerIds.includes(currentUserId));
  }, [post, currentUserId]);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    const isDeleted = await deletePost(post.id);
    if (isDeleted) {
      handleClose();
      updatePost({ ...post, isDeleted: true });
    } else {
      // Handle the error case
    }
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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.topPost}>
      <div className={styles.profileWrapper}>
        <ProfileImage imageUrl={imageUrl} />
        <h3>{post.author.username}</h3>
      </div>
      <div className={styles.optionsButton}>
        <IconButton onClick={handleOptionsClick}>
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

            {post.author.id === currentUserId && (
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
  );
}
