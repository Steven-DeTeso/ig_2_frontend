import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    first_name: "",
    last_name: "",
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
      const response = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data) {
        throw new Error("Invalid entry");
      }

      router.push("/feed");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerFormContainer}>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          id="firstName"
          name="first_name"
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <input
          id="lastName"
          name="last_name"
          type="text"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
