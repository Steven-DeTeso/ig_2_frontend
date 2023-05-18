import React, { useState } from "react";
import { followOrUnfollowUser } from "../../api";

export default function FollowUnfollowButton({
  currentUserId,
  profileUserId,
  initialFollowStatus,
}) {
  const [isFollowing, setIsFollowing] = useState(initialFollowStatus);

  const handleClick = async () => {
    // Toggle the following state
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);

    // Send the follow/unfollow request to the API
    const action = newFollowingState ? "follow" : "unfollow";
    const success = await followOrUnfollowUser(profileUserId, action);
    if (!success) {
      // If the request failed, revert the following state
      setIsFollowing(!newFollowingState);
    }
  };

  return (
    <button onClick={handleClick}>{isFollowing ? "Unfollow" : "Follow"}</button>
  );
}
