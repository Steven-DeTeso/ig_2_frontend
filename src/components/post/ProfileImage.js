import React from "react";

export default function ProfileImage({ imageUrl }) {
  return (
    <>
      {imageUrl !== null ? (
        <img
          src={imageUrl}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ) : (
        <p>upload a profile image</p>
      )}
    </>
  );
}
