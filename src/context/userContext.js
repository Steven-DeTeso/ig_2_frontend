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
  const { data: loggedInUser, doFetch } = useFetch();

  useEffect(() => {
    // This code will only run on the client side, after the component is mounted
    if (typeof window !== "undefined") {
      setCurrentUserId(sessionStorage.getItem("userId") || 0);
      setCurrentUsername(sessionStorage.getItem("username") || "");
      setCurrentUserProfilePicture(
        sessionStorage.getItem("userProfilePicture") || ""
      );
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true" || false);
    }
  }, []);

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
