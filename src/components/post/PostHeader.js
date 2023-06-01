import React, { useState, useEffect } from "react";
import globalStyles from "../../../globalStyles.module.css";
import styles from "../post/Post.module.css";
import Link from "next/link";
import OptionsButton from "./OptionsButton";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/router";
import { deletePost } from "../../api";
import { useUser } from "../../context/userContext";

export default function PostHeader({ post, currentUserId, updatePost }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);

  const { currentUserFollowing } = useUser();

  useEffect(() => {
    setImageUrl(post.author.profile_pic.signed_image_url);
  }, [post, currentUserFollowing]);

  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <div className={styles.topPost}>
      <div className={styles.profileWrapper}>
        <Link href={`/users/${post.author.id}/`}>
          <ProfileImage imageUrl={imageUrl} />
          <h3 className={(styles.linkUsername, globalStyles.textFont)}>
            {post.author.username}
          </h3>
        </Link>
      </div>
      <OptionsButton
        post={post}
        currentUserId={currentUserId}
        handleDeletePost={handleDeletePost}
        router={router}
      />
    </div>
  );
}
