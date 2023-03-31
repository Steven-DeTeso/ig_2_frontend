import LoginForm from "./LoginForm";
import Footer from "./Footer";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={styles.loginPageContainer}>
        <div className={styles.loginPageTopDiv}>
          <p>English</p>
        </div>
        {/* <div className={styles.loginImageContainer}>
        <img src="/IG_login_img.png" alt="ig_logo" />
      </div> */}
        <div className={styles.loginFormContainer}>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
