import React from "react";
import { useState, useEffect } from "react";
import NavButton from "./NavButton";
import HomeIcon from "@mui/icons-material/Home";
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

export default function LeftSidebar() {
  const [isSmallScren, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1023);
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
    { href: "/create", iconComponent: AddBoxOutlinedIcon, label: "Create" },
    { href: "/profile", iconComponent: AccountCircleIcon, label: "Profile" },
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
          />
        ))}
      </div>
      <div className={styles.moreBurger}>
        <MenuOutlinedIcon />
        <p>More</p>
      </div>
    </section>
  );
}
