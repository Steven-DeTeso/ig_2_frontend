import React from "react";
import styles from "../register/RegisterPage.module.css";

export default function FacebookBtn() {
  return (
    <>
      <button type="button" className={styles.fbButton}>
        Log in with Facebook
      </button>
    </>
  );
}
