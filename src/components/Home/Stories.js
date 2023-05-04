import React from "react";
import { Stack } from "@mui/material";
import styles from "./Stories.module.css";

export default function Stories({ suggestedProfiles }) {
  return (
    <div className={styles.storiesContainer}>
      <Stack direction="row" spacing={2}>
        {suggestedProfiles.map((suggestedProfile, index) => (
          <div className={styles.story} key={index}>
            <img
              src={suggestedProfile.props.profilePicture}
              alt={`${suggestedProfile.props.username}'s story`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
        ))}
      </Stack>
    </div>
  );
}
