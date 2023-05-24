import Link from "next/link";
import FacebookBtn from "../login/FacebookBtn";
import RegisterForm from "./RegisterForm";
import styles from "./RegisterPage.module.css";
import globalStyles from "/globalStyles.module.css";
import Footer from "../login/Footer";

const RegisterPage = () => {
  return (
    <>
      <div className={styles.registerPageWrapper}>
        <div className={styles.registerTopLvl}>
          <h1 className={globalStyles.cloneFont}>Clone-a-gram</h1>
          <h4 className={styles.regTopTxt}>
            Sign up to see photos and videos from your friends.
          </h4>
          <FacebookBtn />
          <div className={styles.orContainer}>
            <div className={styles.orLine}></div>
            <p className={styles.or}>OR</p>
            <div className={styles.orLine}></div>
          </div>
          <RegisterForm />
        </div>
        <div className={styles.registerBottomDiv}>
          <p>Have an account?</p>
          <Link href="/">Log in</Link>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RegisterPage;
