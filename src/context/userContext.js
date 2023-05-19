import React, { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import API_BASE_URL from "../api";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserProfilePicture, setCurrentUserProfilePicture] =
    useState("");
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: loggedInUser, setUrl } = useFetch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = sessionStorage.getItem("userId");
      const storedUsername = sessionStorage.getItem("username");
      const storedUserProfilePicture =
        sessionStorage.getItem("userProfilePicture");
      const storedCurrentUserFollowing = sessionStorage.getItem(
        "currentUserFollowing"
      );
      const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
      if (storedUserId) setCurrentUserId(parseInt(storedUserId));
      if (storedUsername) setCurrentUsername(storedUsername);
      if (storedUserProfilePicture)
        setCurrentUserProfilePicture(storedUserProfilePicture);
      if (storedCurrentUserFollowing)
        setCurrentUserFollowing(JSON.parse(storedCurrentUserFollowing));
      if (storedIsLoggedIn) setIsLoggedIn(storedIsLoggedIn === "true");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setUrl(`${API_BASE_URL}/users/current/`);
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
      setCurrentUserFollowing(
        loggedInUser.following
          ? loggedInUser.following.map((follow) => follow.id)
          : []
      );
      setIsLoggedIn(true);
    }
  }, [loggedInUser]);

  const followOrUnfollow = (userId, isFollowing) => {
    if (isFollowing) {
      setCurrentUserFollowing((prevFollowing) =>
        prevFollowing.filter((id) => id !== userId)
      );
    } else {
      setCurrentUserFollowing((prevFollowing) => [...prevFollowing, userId]);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("userId", currentUserId);
      sessionStorage.setItem("username", currentUsername);
      sessionStorage.setItem("userProfilePicture", currentUserProfilePicture);
      sessionStorage.setItem(
        "currentUserFollowing",
        JSON.stringify(currentUserFollowing)
      );
      sessionStorage.setItem("isLoggedIn", isLoggedIn);
    }
  }, [
    currentUserId,
    currentUsername,
    currentUserProfilePicture,
    currentUserFollowing,
    isLoggedIn,
  ]);

  return (
    <UserContext.Provider
      value={{
        currentUserId,
        currentUsername,
        currentUserProfilePicture,
        currentUserFollowing,
        isLoggedIn,
        setIsLoggedIn,
        followOrUnfollow,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
