import React from "react";
import styles from "./ProfileImage.module.css";

export default function ProfileImage({ imageUrl }) {
  return (
    <>
      {imageUrl !== null ? (
        <img
          src={imageUrl}
          className={styles.profileImage}
          alt="Profile photo"
        />
      ) : (
        <img
          src="/images/story_background.png"
          className={styles.profileImage}
        />
      )}
    </>
  );
}
