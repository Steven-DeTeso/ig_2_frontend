import React from "react";
import styles from "./RightSidebar.module.css";
import Link from "next/link";
import Footer from "../login/Footer";
import ProfileImage from "../post/ProfileImage";
import globalStyles from "../../../globalStyles.module.css";

export default function RightSidebar({
  currentUserId,
  currentUsername,
  currentUserFirstName,
  currentUserLastName,
  loggedInUserProfilePic,
  suggestedProfiles,
}) {
  return (
    <div className={styles.rightContainer}>
      <div className={styles.userProfile}>
        <Link href={`/users/${currentUserId}/`}>
          <ProfileImage imageUrl={loggedInUserProfilePic.signed_image_url} />
        </Link>
        <div className={styles.names}>
          <Link href={`/users/${currentUserId}/`} className={styles.userLink}>
            <p className={styles.userLink}>{currentUsername}</p>
          </Link>
          <p className={styles.namesLink}>
            {currentUserFirstName} {currentUserLastName}
          </p>
        </div>
        <Link href="/logout" className={styles.switchLink} id="logoutLink">
          Switch
        </Link>
      </div>
      <div>
        <div>
          <p className={`${globalStyles.textFont} ${styles.suggestedColor}`}>
            Suggested for you
          </p>
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
