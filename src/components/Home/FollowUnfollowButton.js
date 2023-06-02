import React from "react";
import styles from "./FollowUnfollowButton.module.css";

export default function FollowUnfollowButton({ isFollowing, onButtonClick }) {
  return (
    <button className={styles.FollowUnfollowButton} onClick={onButtonClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
