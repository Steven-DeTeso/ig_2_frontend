import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Input,
} from "@mui/material";

export default function CreatePostDialog({ open, onClose, onPostCreated }) {
  const { setToken } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    image: null,
    caption: "",
  });

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

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
      const postFormData = new FormData();
      postFormData.append("image", formData.image);
      postFormData.append("caption", formData.caption);

      const response = await fetch("http://localhost:8000/posts/", {
        method: "POST",
        credentials: "include",
        body: postFormData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error creating the post:", errorText);
        return;
      }

      const data = await response.json();
      onClose();
      onPostCreated();
    } catch (error) {
      console.log("Error: ", error);
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
              <Button variant="contained" component="span">
                Upload Image
              </Button>
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
              <Button type="submit" color="primary" variant="contained">
                Create Post
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
