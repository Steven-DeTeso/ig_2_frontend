import React from "react";
import { followOrUnfollowUser } from "../../api";
import { useUser } from "../../context/userContext";
import styles from "./FollowUnfollowButton.module.css";

export default function FollowUnfollowButton({ profileUserId }) {
  const { isFollowing, setIsFollowing, followOrUnfollow } = useUser();

  const handleClick = async () => {
    // Toggle the following state
    const newFollowingState = !isFollowing;
    console.log(`${newFollowingState}`);
    setIsFollowing(newFollowingState);

    // Send the follow/unfollow request to the API
    const action = newFollowingState ? "follow" : "unfollow";
    console.log(`Action: ${action}`);
    const success = await followOrUnfollowUser(profileUserId, action);
    console.log(`Success: ${success}`);

    if (success) {
      followOrUnfollow(profileUserId, !newFollowingState);
      setIsFollowing(newFollowingState);
    } else {
      // If the request failed, revert the following state
      setIsFollowing(!newFollowingState);
    }
  };
  return (
    <button className={styles.FollowUnfollowButton} onClick={handleClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
