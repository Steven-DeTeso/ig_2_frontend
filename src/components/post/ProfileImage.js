import React from "react";
import Avatar from "@mui/material/Avatar";
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
        <p>upload a profile image</p>
      )}
      {/* <Avatar
        src={imageUrl}
        variant="circular"
        alt="profile photo"
        sx={{ width: 50, height: 50 }}
      /> */}
    </>
  );
}
