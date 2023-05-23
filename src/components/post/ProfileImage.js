import React from "react";
import styles from "./ProfileImage.module.css";
import globalStyles from "../../../globalStyles.module.css";

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
        <p>Upload A Photo</p>
      )}
    </>
  );
}
