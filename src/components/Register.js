import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // const { setToken } = useContext(AuthContext);
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
      console.log(response);
      // const token = response.data.access;
      // setToken(token);
      // localStorage.setItem("token", token);
      if (!data) {
        throw new Error("Invalid entry");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
    router.push("/feed");
  };

  return (
    <div className="register-wrapper">
      <h1>Register</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="first_name"
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name</label>
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
