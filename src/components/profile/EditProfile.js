import React, { useState } from "react";
import { Input } from "@mui/material";
import styles from "./EditProfile.module.css";
import style from "../../styles.module.css";
import API_BASE_URL from "../../api";

const EditProfile = ({ userData }) => {
  const [formData, setFormData] = useState({
    user: userData.id,
    first_name: userData.first_name,
    last_name: userData.last_name,
    username: userData.username,
    email: userData.email,
    image: userData.profile_pic,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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

    setIsLoading(true);
    const form = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${userData.id}/update_profile_picture/`,
        {
          method: "PUT",
          credentials: "include",
          body: form,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      console.log("Profile updated successfully", data);

      router.push(`/users/${userId}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (!userData) {
    return <div>ERROR, try a differnt route</div>;
  }

  return (
    <div className={styles.editProfileWrapper}>
      <h1 className={style.cloneFont}>Edit Profile</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles.editForm}
      >
        <label htmlFor="first_name" className={styles.editLabel}>
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className={styles.editInput}
        />

        <label htmlFor="last_name" className={styles.editLabel}>
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className={styles.editInput}
        />

        <label htmlFor="username" className={styles.editLabel}>
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={styles.editInput}
        />

        <label htmlFor="email" className={styles.editLabel}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.editInput}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className={styles.editInput}
        />

        <button type="submit" className={styles.editButton}>
          {isLoading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
