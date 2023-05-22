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

import styles from "./LeftSidebar.module.css";
// style is global css
import style from "/styles.module.css";
import CreatePostDialog from "./CreatePost";

export default function LeftSidebar({ onPostCreated, loggedInUser }) {
  const [profileHref, setProfileHref] = useState("/profile");
  const [isSmallScren, setIsSmallScreen] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      setProfileHref(`/users/${loggedInUser.id}`);
    }
  }, [loggedInUser]);

  const handleCreatePostClick = () => {
    setOpenCreatePost(true);
  };

  const handleCloseCreatePost = () => {
    setOpenCreatePost(false);
  };

  const handlePostCreated = (newPost) => {
    if (onPostCreated) {
      onPostCreated(newPost);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1264);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navButtons = [
    {
      href: "/feed",
      iconComponent: HomeIcon,
      label: "Home",
    },

    {
      href: "/search",
      iconComponent: SearchOutlinedIcon,
      label: "Search",
    },

    {
      href: "/explore",
      iconComponent: ExploreOutlinedIcon,
      label: "Explore",
    },

    {
      href: "/reels",
      iconComponent: GroupWorkOutlinedIcon,
      label: "Reels",
    },

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
      href: profileHref,
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
      <div className={(styles.navLinks, style.textFont)}>
        {navButtons.map((button, index) => (
          <NavButton
            key={index}
            href={button.href}
            iconComponent={button.iconComponent}
            label={button.label}
            onClick={button.onClick}
          />
        ))}
        <CreatePostDialog
          open={openCreatePost}
          onClose={handleCloseCreatePost}
          onPostCreated={handlePostCreated}
        />
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
