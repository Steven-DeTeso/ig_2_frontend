import React from "react";
import { Stack } from "@mui/material";
import styles from "./Stories.module.css";
import globalStyles from "../../../globalStyles.module.css";
import Link from "next/link";

export default function Stories({ suggestedProfiles }) {
  return (
    <div className={styles.storiesContainer}>
      <Stack direction="row" spacing={2}>
        {suggestedProfiles.map((suggestedProfile, index) => {
          const username = suggestedProfile.props.username;
          const userId = suggestedProfile.props.userId;
          const displayUsername =
            username.length > 10 ? `${username.substring(0, 10)}...` : username;

          // remove inline styles for production
          return (
            <div className={styles.story} key={index}>
              <Link
                href={`/users/${userId}`}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.storyContent}>
                  <img
                    src={suggestedProfile.props.profilePicture}
                    alt={`${username}'s story`}
                    className={styles.storyProfilePicture}
                  />
                  <img
                    src="../../images/story_background.png"
                    className={globalStyles.profileCircleBackground}
                  />
                  <p
                    className={
                      (globalStyles.textFont, globalStyles.noTxtDecoration)
                    }
                  >
                    {displayUsername}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}
