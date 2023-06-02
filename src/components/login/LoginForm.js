import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FacebookBtn from "./FacebookBtn";
import { useUser } from "../../context/userContext";
import { RotatingLines } from "react-loader-spinner";
import styles from "./LoginForm.module.css";
import globalStyles from "/globalStyles.module.css";

export default function Login() {
  const { isLoggedIn, setIsLoggedIn } = useUser();
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
      //  in a production environment, use HTTPS for API calls, and make sure your fetch calls include the credentials: 'include' option to ensure cookies are sent with the requests:
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data || response.status === 401) {
        throw new Error("Invalid email or password.");
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/feed");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3500); // keeps spinner going during redirect.
    }
  }, [isLoading]);

  return (
    <>
      <div className={styles.loginFormWrapper}>
        {isLoading ? (
          <RotatingLines
            strokeColor="lightblue"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        ) : (
          <>
            <h1 className={globalStyles.cloneFont}>Clone-a-gram</h1>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <FacebookBtn />
              <div className={styles.orContainer}>
                <div className={styles.orLine}></div>
                <p className={(styles.or, globalStyles.textFont)}>OR</p>
                <div className={styles.orLine}></div>
              </div>
              {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.loginInput}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.loginInput}
              />
              <div className={styles.forgotPasswordContainer}>
                <a href="#">
                  <span className={`${styles.forgotPassword}`}>
                    Forgot Password?
                  </span>
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
              >
                {isLoading ? "Loading..." : "Log in"}
              </button>
            </form>
            <div>
              <p className={styles.signupLink}>
                Don't have an account?{" "}
                <Link href={"/register"}>
                  <span className={styles.signupText}>Sign up</span>
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
