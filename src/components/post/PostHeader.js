import React, { useState, useEffect } from "react";
import styles from "../post/Post.module.css";
import OptionsButton from "./OptionsButton";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/router";
import { deletePost, followOrUnfollowUser } from "../../api";

export default function PostHeader({ post, currentUserId, updatePost }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFollowing, setIsFollowing] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl(post.author.profile_pic.signed_image_url);
    // extract follower id numbers and store in new array under followerIds
    const followerIds = post.author.followers.map((follower) => follower.id);
    // checking to see if currentUserid is in new array, if so, isFollowing set to true
    setIsFollowing(followerIds.includes(currentUserId));
  }, [post, currentUserId]);

  // const handleOptionsClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

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
    const postAuthorId = post.author.id;

    if (!isFollowing) {
      const isFollowed = await followOrUnfollowUser(postAuthorId, "follow");
      if (isFollowed) {
        setIsFollowing(true);
        // Handle the success case, e.g., update the UI, show a notification, etc.
      } else {
        // Handle the error case
      }
    } else {
      const isUnfollowed = await followOrUnfollowUser(postAuthorId, "unfollow");
      if (isUnfollowed) {
        setIsFollowing(false);
        // Handle the success case, e.g., update the UI, show a notification, etc.
      } else {
        // Handle the error case
      }
    }
  };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.topPost}>
      <div className={styles.profileWrapper}>
        <ProfileImage imageUrl={imageUrl} />
        <h3>{post.author.username}</h3>
      </div>
      <OptionsButton
        post={post}
        currentUserId={currentUserId}
        isFollowing={isFollowing}
        handleFollowOrUnfollowUser={handleFollowOrUnfollowUser}
        handleDeletePost={handleDeletePost}
        router={router}
      />
    </div>
  );
}
