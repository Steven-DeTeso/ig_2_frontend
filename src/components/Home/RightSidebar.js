import React from "react";
import styles from "./RightSidebar.module.css";
import Link from "next/link";
import Footer from "../login/Footer";

export default function RightSidebar() {
  return (
    <div className={styles.rightContainer}>
      <div className={styles.userProfile}>
        <p>IMG-prof pic</p>
        <p>User's name</p>
        <Link href="/logout">Switch</Link>
      </div>
      <div>
        <div>
          <p>suggestions for you</p>
        </div>
        <div>
          <p>component suggestios</p>
          <p>component suggestios</p>
          <p>component suggestios</p>
          <p>component suggestios</p>
          <p>component suggestios</p>
        </div>
      </div>
      <div className={styles.rightSidebarFooter}>
        <Footer />
        <p>© 2023 Instagram from Meta</p>
      </div>
    </div>
  );
}
