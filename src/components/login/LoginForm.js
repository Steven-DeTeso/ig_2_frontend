import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../AuthContext";
import styles from "./LoginForm.module.css";
import style from "/styles.module.css";
import Link from "next/link";

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.access) {
        throw new Error("Invalid email or password.");
      }

      const token = data.access;
      setToken(token);
      localStorage.setItem("token", token);
      console.log(`logging token in login.js ${token}`);
      console.log(data);

      router.push("/feed");
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.loginFormWrapper}>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <h1 className={style.cloneFont}>Clone-a-gram</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <button className={styles.fbButton}>Continue with Facebook</button>
          <div className={styles.orContainer}>
            <div className={styles.orLine}></div>
            <p className={styles.or}>OR</p>
            <div className={styles.orLine}></div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.loginInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.loginInput}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? "Loading..." : "Log in"}
          </button>
        </form>
        <div>
          <a href="#">
            <span className={styles.forgotPassword}>Forgot Password?</span>
          </a>
        </div>
        <div>
          <p className={styles.signupLink}>
            Don't have an account?{" "}
            <Link href={"/register"}>
              <span className={styles.signupText}>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
