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

  const handleChange = (event) => {
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
    <div>
      <h1>Register</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              type={key === "password" ? "password" : "text"}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
