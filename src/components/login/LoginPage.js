import LoginForm from "./LoginForm";
import styles from "./LoginPage.module.css";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div
      className={styles.loginPageContainer}
      style={{ border: "1px solid red" }}
    >
      <div className={styles.loginImageContainer}>
        <img src="/IG_login_img.png" alt="ig_logo" />
      </div>
      <div className={styles.formContainer}>
        <LoginForm />
        <div>
          <div className={styles.signupContainer}>
            <p className={styles.signupLink}>
              Don't have an account?{" "}
              <Link href={"/register"}>
                <span className={styles.signupText}>Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
