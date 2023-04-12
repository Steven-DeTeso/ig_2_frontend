import React from "react";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";
import styles from "./Stories.module.css";
import { ClassNames } from "@emotion/react";

export default function Stories() {
  const images = [
    { alt: "Remy Sharp", src: "ig_2_frontend/public/images/avatar-lady.jpg" },
    {
      alt: "Travis Howard",
      src: "/public/images/avatar-mustache.jpg",
    },
    {
      alt: "Cindy Baker",
      src: "/public/images/avatar-yellow.jpg",
    },
  ];

  return (
    <div className={styles.storiesContainer}>
      <Stack direction="row" spacing={2}>
        {images.map((image, index) => (
          <Avatar
            key={index}
            // alt={image.alt}
            // src={image.src}
            sx={{ width: 66, height: 66 }}
          />
        ))}
      </Stack>
    </div>
  );
}
