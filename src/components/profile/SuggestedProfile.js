import React from "react";
import Link from "next/link";
import styles from "./SuggestedProfile.module.css";

export default function SuggestedProfile({
  profilePicture,
  username,
  userId,
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
          <img
            src={profilePicture}
            alt={`${username}'s profile`}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
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
