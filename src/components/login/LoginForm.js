import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../AuthContext";
import Link from "next/link";
import styles from "./LoginForm.module.css";

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
    <div className={styles.loginWrapper}>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <h1>Clone-a-gram</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
