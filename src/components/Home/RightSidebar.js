import React from "react";
import styles from "./RightSidebar.module.css";
import Link from "next/link";
import Footer from "../login/Footer";
import ProfileImage from "../post/ProfileImage";
import SuggestedProfile from "../profile/SuggestedProfile";

export default function RightSidebar({
  currentUsername,
  loggedInUserProfilePic,
  suggestedProfiles,
}) {
  return (
    <div className={styles.rightContainer}>
      <div className={styles.userProfile}>
        <ProfileImage imageUrl={loggedInUserProfilePic} />
        <p>{currentUsername}</p>
        <Link href="/logout">Switch</Link>
      </div>
      <div>
        <div>
          <p>suggestions for you</p>
        </div>
        <div>{suggestedProfiles}</div>
      </div>
      <div className={styles.rightSidebarFooter}>
        <Footer />
        <p>© 2023 Instagram from Meta</p>
      </div>
    </div>
  );
}
