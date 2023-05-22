import React from "react";
import { Stack } from "@mui/material";
import styles from "./Stories.module.css";

export default function Stories({ suggestedProfiles }) {
  return (
    <div className={styles.storiesContainer}>
      <Stack direction="row" spacing={2}>
        {suggestedProfiles.map((suggestedProfile, index) => {
          const username = suggestedProfile.props.username;
          const displayUsername =
            username.length > 10 ? `${username.substring(0, 10)}...` : username;

          return (
            <div className={styles.story} key={index}>
              <div className={styles.storyContent}>
                <img
                  src={suggestedProfile.props.profilePicture}
                  alt={`${username}'s story`}
                  className={styles.storyProfilePicture}
                />
                <img
                  src="../../images/story_background.png"
                  className={styles.storyBackground}
                />
                <p>{displayUsername}</p>
              </div>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}
