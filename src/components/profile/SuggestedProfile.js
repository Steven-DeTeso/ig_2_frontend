import React from "react";

export default function SuggestedProfile({ profilePicture, username }) {
  return (
    <div>
      <div>
        <img
          src={profilePicture}
          alt={`${username}'s profile`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      </div>
      <div>
        <p>{username}</p>
      </div>
    </div>
  );
}
