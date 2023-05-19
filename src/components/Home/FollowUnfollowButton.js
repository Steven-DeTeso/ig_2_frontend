import React, { useState, useEffect } from "react";
import { followOrUnfollowUser } from "../../api";
import { useUser } from "../../context/userContext";

export default function FollowUnfollowButton({
  currentUserId,
  profileUserId,
  initialFollowStatus,
}) {
  const [isFollowing, setIsFollowing] = useState(initialFollowStatus);

  const { followOrUnfollow } = useUser();

  useEffect(() => {
    setIsFollowing(initialFollowStatus);
  }, [initialFollowStatus]);

  const handleClick = async () => {
    // Toggle the following state
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);

    // Send the follow/unfollow request to the API
    const action = newFollowingState ? "follow" : "unfollow";
    const success = await followOrUnfollowUser(profileUserId, action);

    if (success) {
      followOrUnfollow(profileUserId, !newFollowingState);
      setIsFollowing(newFollowingState);
    } else {
      // If the request failed, revert the following state
      setIsFollowing(!newFollowingState);
    }
  };
  return (
    <button onClick={handleClick}>{isFollowing ? "Unfollow" : "Follow"}</button>
  );
}
