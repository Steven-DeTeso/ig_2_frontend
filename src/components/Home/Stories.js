import React from "react";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";
import styles from "./Stories.module.css";
import { ClassNames } from "@emotion/react";

export default function Stories() {
  const images = [
    { alt: "Remy Sharp", src: "/static/images/avatar/1.jpg" },
    { alt: "Travis Howard", src: "/static/images/avatar/2.jpg" },
    { alt: "Cindy Baker", src: "/static/images/avatar/3.jpg" },
  ];

  return (
    <div className={styles.storiesContainer}>
      <Stack direction="row" spacing={2}>
        {images.map((image, index) => (
          <Avatar
            key={index}
            alt={image.alt}
            src={image.src}
            sx={{ width: 66, height: 66 }}
          />
        ))}
      </Stack>
    </div>
  );
}
