import React, { useState, useEffect } from "react";
import globalStyles from "../../../globalStyles.module.css";
import styles from "./FollowProfileLink.module.css";
import Link from "next/link";
import FollowUnfollowButton from "../Home/FollowUnfollowButton";
import { useUser } from "../../context/userContext";

// recieving its props from Homepage component
export default function SuggestedProfile({ profilePicture, username, userId }) {
  const {
    isFollowing,
    setIsFollowing,
    currentUserFollowing,
    followOrUnfollowFunction,
  } = useUser();

  // Check if the user is following on component mount or user following list change
  useEffect(() => {
    setIsFollowing(currentUserFollowing.includes(userId));
  }, [currentUserFollowing, userId]);

  const handleFollowOrUnfollow = () => {
    followOrUnfollowFunction(userId, isFollowing);
    setIsFollowing(!isFollowing); // Update isFollowing state immediately after click
  };

  console.log(`SuggestedProfile: isFollowing: ${isFollowing}`);

  return (
    <div className={styles.suggestedProfileContainer}>
      <Link href={`/users/${userId}/`} className={styles.noDecoration}>
        <div className={styles.suggestedProfile}>
          <img
            src={profilePicture}
            alt={`${username}'s profile`}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <p className={globalStyles.textFont}>{username}</p>
        </div>
      </Link>
      <FollowUnfollowButton
        isFollowing={isFollowing}
        onButtonClick={handleFollowOrUnfollow}
      />
    </div>
  );
}
