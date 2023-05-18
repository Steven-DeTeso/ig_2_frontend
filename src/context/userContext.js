import React, { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import API_BASE_URL from "../api";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserProfilePicture, setCurrentUserProfilePicture] =
    useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: loggedInUser, setUrl } = useFetch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = sessionStorage.getItem("userId");
      const storedUsername = sessionStorage.getItem("username");
      const storedUserProfilePicture =
        sessionStorage.getItem("userProfilePicture");
      const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
      if (storedUserId) setCurrentUserId(parseInt(storedUserId));
      if (storedUsername) setCurrentUsername(storedUsername);
      if (storedUserProfilePicture)
        setCurrentUserProfilePicture(storedUserProfilePicture);
      if (storedIsLoggedIn) setIsLoggedIn(storedIsLoggedIn === "true");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setUrl(`${API_BASE_URL}/users/current/`);
      console.log(isLoggedIn);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("userId", currentUserId);
      sessionStorage.setItem("username", currentUsername);
      sessionStorage.setItem("userProfilePicture", currentUserProfilePicture);
      sessionStorage.setItem("isLoggedIn", isLoggedIn);
    }
  }, [currentUserId, currentUsername, currentUserProfilePicture, isLoggedIn]);

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

export function useUser() {
  return useContext(UserContext);
}
