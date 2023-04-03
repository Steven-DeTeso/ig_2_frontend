import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
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
      const response = await axios.post(
        "http://localhost:8000/users/",
        formData
      );
      console.log(response.data);
      const token = response.data.access;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/feed");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Invalid email or password.");
    }
    setIsLoading(false);
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
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
