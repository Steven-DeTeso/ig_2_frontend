import RegisterForm from "./RegisterForm";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <>
      <div className={styles.registerPageWrapper}>
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
