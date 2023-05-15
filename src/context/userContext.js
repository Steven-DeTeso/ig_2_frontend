import React, { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import API_BASE_URL from "../api";

// Create a context. Can be used to provide and consume user-related data throughout the component tree.
export const UserContext = createContext();

// Create a context provider
export function UserProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserProfilePicture, setCurrentUserProfilePicture] =
    useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: loggedInUser, doFetch } = useFetch();

  useEffect(() => {
    if (isLoggedIn) {
      doFetch(`${API_BASE_URL}/users/current/`);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loggedInUser && "id" in loggedInUser) {
      setCurrentUserId(loggedInUser.id);
      setCurrentUsername(loggedInUser.username);
      setCurrentUserProfilePicture(
        loggedInUser.profile_pic
          ? loggedInUser.profile_pic.signed_image_url
          : null
      );
      setIsLoggedIn(true);
    }
  }, [loggedInUser]);

  return (
    <UserContext.Provider
      value={{
        currentUserId,
        currentUsername,
        currentUserProfilePicture,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook to use this context
export function useUser() {
  return useContext(UserContext);
}
