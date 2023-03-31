import React from "react";
import styles from "./LoginPage.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.loginRegFooter}>
      <Link href="#">Meta</Link>
      <Link href="#">About</Link>
      <Link href="#">Blog</Link>
      <Link href="#">Jobs</Link>
      <Link href="#">Help</Link>
      <Link href="#">API</Link>
      <Link href="#">Privacy</Link>
      <Link href="#">Terms</Link>
      <Link href="#">Top Accounts</Link>
      <Link href="#">Instagram Lite</Link>
      <Link href="#">Contact Uploading & Non-Users</Link>
      <Link href="#">Meta Verified</Link>
    </div>
  );
}
