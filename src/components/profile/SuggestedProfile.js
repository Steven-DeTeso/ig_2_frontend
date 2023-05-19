import React from "react";
import styles from "./FollowProfileLink.module.css";
import Link from "next/link";
import FollowUnfollowButton from "../Home/FollowUnfollowButton";

// recieving its props from Homepage component
export default function SuggestedProfile({
  profilePicture,
  username,
  userId,
  currentUserId,
  isFollowing,
}) {
  return (
    <>
      <Link href={`/users/${userId}/`} className={styles.noDecoration}>
        <div className={styles.suggestedProfile}>
          <img
            src={profilePicture}
            alt={`${username}'s profile`}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <p>
            <strong>{username}</strong>
          </p>
        </div>
      </Link>
      <FollowUnfollowButton
        currentUserId={currentUserId}
        profileUserId={userId}
        initialFollowStatus={isFollowing}
      />
    </>
  );
}
