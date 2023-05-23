import React from "react";
import styles from "./LeftSidebar.module.css";

export default function NavButton({
  iconComponent: Icon,
  label,
  href,
  onClick,
}) {
  return (
    <a
      className={styles.customLink}
      href={href}
      aria-label={label}
      onClick={onClick}
    >
      <div className={styles.iconContainer}>
        <Icon />
      </div>
      <p className={styles.pText}>{label}</p>
    </a>
  );
}
