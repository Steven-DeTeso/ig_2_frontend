import React from "react";
import NavButton from "./NavButton";
import styles from "./HomePage.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function LeftSidebar() {
  const navButtons = [
    { href: "/feed", iconComponent: HomeIcon, label: "Home" },
    { href: "/search", iconComponent: SearchOutlinedIcon, label: "Search" },
    { href: "/explore", iconComponent: ExploreIcon, label: "Explore" },
    {
      href: "/notifications",
      iconComponent: NotificationsIcon,
      label: "Notifications",
    },
    { href: "/profile", iconComponent: AccountCircleIcon, label: "Profile" },
  ];

  return (
    <section className={styles.leftSidebar}>
      {navButtons.map((button, index) => (
        <NavButton
          key={index}
          href={button.href}
          iconComponent={button.iconComponent}
          label={button.label}
        />
      ))}
    </section>
  );
}
