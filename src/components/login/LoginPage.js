import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import styles from "./LoginPage.module.css";
import API_BASE_URL from "../../api";
import { useUser } from "../../context/userContext";

const LoginPage = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useUser();

  const verifyToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/token/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        router.push("/feed");
      }
    } catch (error) {
      console.log("Error verifying token:", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <div className={styles.loginPageContainer}>
        <div className={styles.loginPageTopDiv}>
          <p>English</p>
        </div>
        <div className={styles.flex}>
          <div className={styles.loginImageContainer}>
            <img src="/images/IG_login_img.png" alt="ig_logo" />
          </div>
          <div className={styles.loginFormContainer}>
            <LoginForm />
          </div>
        </div>
        <img
          className={styles.metaLogo}
          src="/images/meta-logo.png"
          alt="meta logo"
        />
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;
