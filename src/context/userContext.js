import React, { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";

const API_BASE_URL = "http://localhost:8000";

// Create a context
export const UserContext = createContext();

// Create a context provider
export function UserProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserProfilePicture, setCurrentUserProfilePicture] =
    useState("");
  const { data: loggedInUser } = useFetch(`${API_BASE_URL}/users/current/`);

  useEffect(() => {
    if (loggedInUser) {
      setCurrentUserId(loggedInUser.id);
      setCurrentUsername(loggedInUser.username);
      setCurrentUserProfilePicture(
        loggedInUser.profile_pic
          ? loggedInUser.profile_pic.signed_image_url
          : null
      );
    }
  }, [loggedInUser]);

  return (
    <UserContext.Provider
      value={{ currentUserId, currentUsername, currentUserProfilePicture }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook to use this context
export function useUser() {
  return useContext(UserContext);
}
