import React from "react";
import styles from "./FollowProfileLink.module.css";

export default function SuggestedProfile({ profilePicture, username }) {
  return (
    <div className={styles.suggestedProfile}>
      <div>
        <img
          src={profilePicture}
          alt={`${username}'s profile`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      </div>
      <div>
        <p>
          <strong>{username}</strong>
        </p>
      </div>
    </div>
  );
}
