import React from "react";
import { useState, useEffect } from "react";
import NavButton from "./NavButton";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Input from "@mui/material/Input";

import styles from "./LeftSidebar.module.css";
// style is global css
import style from "/styles.module.css";

export default function LeftSidebar() {
  const [isSmallScren, setIsSmallScreen] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleCreatePostClick = () => {
    setOpenCreatePost(true);
  };

  const handleCloseCreatePost = () => {
    setOpenCreatePost(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle the form submission logic here.
    // This may include uploading the image and caption to your Django backend.

    // Reset the form state and close the dialog when finished.
    setImage(null);
    setCaption("");
    handleCloseCreatePost();
  };

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1264);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navButtons = [
    { href: "/feed", iconComponent: HomeIcon, label: "Home" },
    { href: "/search", iconComponent: SearchOutlinedIcon, label: "Search" },
    { href: "/explore", iconComponent: ExploreOutlinedIcon, label: "Explore" },
    { href: "/reels", iconComponent: GroupWorkOutlinedIcon, label: "Reels" },
    {
      href: "/messages",
      iconComponent: MarkUnreadChatAltOutlinedIcon,
      label: "Messages",
    },
    {
      href: "/notifications",
      iconComponent: NotificationsOutlinedIcon,
      label: "Notifications",
    },
    {
      iconComponent: AddBoxOutlinedIcon,
      label: "Create",
      onClick: handleCreatePostClick,
    },
    {
      href: "/profile",
      iconComponent: AccountCircleIcon,
      label: "Profile",
    },
  ];

  return (
    <section className={styles.leftSidebar}>
      <div className={styles.logo}>
        {isSmallScren ? (
          <LocalSeeOutlinedIcon />
        ) : (
          <h1 className={style.cloneFont}>Clone-a-gram</h1>
        )}
      </div>
      <div className={styles.navLinks}>
        {navButtons.map((button, index) => (
          <NavButton
            key={index}
            href={button.href}
            iconComponent={button.iconComponent}
            label={button.label}
            onClick={button.onClick}
          />
        ))}
        <Dialog open={openCreatePost} onClose={handleCloseCreatePost}>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
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
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <DialogActions>
                <Button onClick={handleCloseCreatePost} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Create Post
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Link href="/settings" className={styles.moreBurger}>
          <MenuOutlinedIcon />
          <p>More</p>
        </Link>
      </div>
    </section>
  );
}
