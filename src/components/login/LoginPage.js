import LoginForm from "./LoginForm";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div
      className={styles["login-page-container"]}
      style={{ border: "1px solid red" }}
    >
      <div
        className={styles["login-image-container"]}
        style={{ border: "1px solid blue" }}
      >
        <h1>TEST</h1>
      </div>
      <div
        className={styles["form-container"]}
        style={{ border: "1px solid green" }}
      >
        <h1>Clone-a-gram</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
