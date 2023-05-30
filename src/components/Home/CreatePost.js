import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Input,
} from "@mui/material";

function StyledButton({ hasImage, children, ...props }) {
  return (
    <Button
      {...props}
      sx={{
        backgroundColor: hasImage ? "green" : "",
        "&:hover": {
          backgroundColor: hasImage ? "darkgreen" : "",
        },
      }}
    >
      {children}
    </Button>
  );
}

const createPost = async (postFormData) => {
  return await fetch("http://localhost:8000/posts/", {
    method: "POST",
    credentials: "include",
    body: postFormData,
  });
};

const refreshAuthToken = async () => {
  return await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export default function CreatePostDialog({ open, onClose, onPostCreated }) {
  const [formData, setFormData] = useState({
    image: null,
    caption: "",
  });

  const [uploading, setUploading] = useState(false);

  const setCaption = (event) => {
    const caption = event.target.value;
    setFormData({ ...formData, caption: caption });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setUploading(true);
      const postFormData = new FormData();
      postFormData.append("image", formData.image);
      postFormData.append("caption", formData.caption);

      let response = await createPost(postFormData);

      if (response.status === 401) {
        await refreshAuthToken();
        response = await createPost(postFormData);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error creating the post:", errorText);
        return;
      }

      const data = await response.json();
      onClose();
      onPostCreated(data);
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create A New Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Input
              type="file"
              accept="image/*"
              id="post-image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="post-image">
              <StyledButton
                variant="contained"
                component="span"
                hasImage={!!formData.image}
              >
                {formData.image ? "Image Ready!" : "Upload Image"}
              </StyledButton>
            </label>
            <TextField
              autoFocus
              margin="dense"
              id="caption"
              label="Caption"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.caption}
              onChange={(event) => setCaption(event)}
            />
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Create Post"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
