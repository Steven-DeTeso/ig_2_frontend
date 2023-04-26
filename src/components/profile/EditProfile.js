import React, { useState } from "react";
import { Input } from "@mui/material";

const EditProfile = ({ userData }) => {
  const API_BASE_URL = "http://localhost:8000";

  const [formData, setFormData] = useState({
    user: userData.id,
    first_name: userData.first_name,
    last_name: userData.last_name,
    username: userData.username,
    email: userData.email,
    image: userData.profile_pic,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const form = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        form.append(key, formData[key]);
      }
    }
    for (const [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${userData.id}/update_profile_picture/`,
        {
          method: "PATCH",
          credentials: "include",
          body: form,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully", data);
        // You can navigate back to the profile page or show a success message
      } else {
        console.error("Error updating profile:", data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="file"
          name="image"
          accept="image/*"
          // style={{ display: "none" }}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
