import React from "react";
import Link from "next/link";
import styles from "./FollowProfileLink.module.css";
import ProfileImage from "../post/ProfileImage";

export default function FollowProfileLink({
  userId,
  username,
  profilePicture,
  handleClose,
}) {
  const onLinkClick = () => {
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <Link
      href={`/users/${userId}`}
      onClick={onLinkClick}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.profileLink}>
        <div className={styles.image}>
          <ProfileImage
            imageUrl={profilePicture}
            alt={`${username}'s profile`}
          />
        </div>
        <div className={styles.username}>
          <p>
            <strong>{username}</strong>
          </p>
        </div>
      </div>
    </Link>
  );
}
