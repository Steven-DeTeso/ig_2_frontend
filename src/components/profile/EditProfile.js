import React, { useState } from "react";
import { refreshAuthToken } from "../../api";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/userContext";
import API_BASE_URL from "../../api";
import LeftSidebar from "../Home/LeftSidebar";
import styles from "./EditProfile.module.css";
import globalStyles from "../../../globalStyles.module.css";

const EditProfile = ({ userData }) => {
  const router = useRouter();
  const { currentUserId } = useUser();
  const userId = currentUserId;

  const [formData, setFormData] = useState({
    user: userData.id,
    first_name: userData.first_name,
    last_name: userData.last_name,
    username: userData.username,
    email: userData.email,
    image: userData.profile_pic,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

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

    let retryResponse = null;
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${userData.id}/update_profile/`,
        {
          method: "PUT",
          credentials: "include",
          body: form,
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        refreshAuthToken();
        const retryResponse = await fetch(
          `${API_BASE_URL}/users/${userData.id}/update_profile/`,
          {
            method: "PUT",
            credentials: "include",
            body: form,
          }
        );
      }
      const retryData = retryResponse ? await retryResponse.json() : null;

      if (!response.ok || (retryResponse && !retryResponse.ok)) {
        throw new Error(data.error || "Failed to update profile");
      }

      console.log("Profile updated successfully", data);

      router.push(`/users/${userId}/`);
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
      <LeftSidebar />
      <h1 className={globalStyles.cloneFont}>Edit Profile</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <div className={styles.formDiv}>
        <p className={(globalStyles.textFont, styles.pText)}>
          Edit your name, usersername, email address or profile picutre below
        </p>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className={styles.editForm}
        >
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={styles.editInput}
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={styles.editInput}
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.editInput}
          />
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
    </div>
  );
};

export default EditProfile;
