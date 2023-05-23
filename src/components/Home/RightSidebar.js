import React from "react";
import styles from "./RightSidebar.module.css";
import Link from "next/link";
import Footer from "../login/Footer";
import ProfileImage from "../post/ProfileImage";
import globalStyles from "../../../globalStyles.module.css";

export default function RightSidebar({
  currentUsername,
  currentUserId,
  loggedInUserProfilePic,
  suggestedProfiles,
}) {
  return (
    <div className={styles.rightContainer}>
      <div className={styles.userProfile}>
        <Link href={`/users/${currentUserId}/`}>
          <ProfileImage imageUrl={loggedInUserProfilePic} />
          <p className={globalStyles.textFont}>{currentUsername}</p>
        </Link>
        <Link href="/logout" className={globalStyles.textFont}>
          Switch
        </Link>
      </div>
      <div>
        <div>
          <p className={globalStyles.textFont}>suggestions for you</p>
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
