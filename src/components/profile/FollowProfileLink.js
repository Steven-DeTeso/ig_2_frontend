import React from "react";
import Link from "next/link";
import styles from "./FollowProfileLink.module.css";
import globalStyles from "../../../globalStyles.module.css";
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
      className={globalStyles.textFont}
    >
      <div className={styles.profileLink}>
        <div className={styles.image}>
          <ProfileImage
            imageUrl={profilePicture}
            alt={`${username}'s profile`}
          />
        </div>
        <div>
          <p>{username}</p>
        </div>
      </div>
    </Link>
  );
}
