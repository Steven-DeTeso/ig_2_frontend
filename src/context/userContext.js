import React, { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import API_BASE_URL from "../api";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserFirstName, setCurrentUserFirstName] = useState("");
  const [currentUserLastName, setCurrentUserLastName] = useState("");
  const [currentUserProfilePicture, setCurrentUserProfilePicture] =
    useState("");
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: loggedInUser, setUrl } = useFetch();

  useEffect(() => {
    if (loggedInUser) {
      setUrl(`${API_BASE_URL}/users/current/`);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = sessionStorage.getItem("userId");
      const storedUsername = sessionStorage.getItem("username");
      const storedFirstName = sessionStorage.getItem("firstName");
      const storedLastName = sessionStorage.getItem("lastName");
      const storedUserProfilePicture =
        sessionStorage.getItem("userProfilePicture");
      const storedCurrentUserFollowing = sessionStorage.getItem(
        "currentUserFollowing"
      );
      const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
      if (storedUserId) setCurrentUserId(parseInt(storedUserId));
      if (storedUsername) setCurrentUsername(storedUsername);
      if (storedFirstName) setCurrentUserFirstName(storedFirstName);
      if (storedLastName) setCurrentUserLastName(storedLastName);
      if (storedUserProfilePicture)
        setCurrentUserProfilePicture(storedUserProfilePicture);
      if (storedCurrentUserFollowing)
        setCurrentUserFollowing(JSON.parse(storedCurrentUserFollowing));
      if (storedIsLoggedIn) setIsLoggedIn(storedIsLoggedIn === "true");
    }
  }, []);

  useEffect(() => {
    if (loggedInUser && "id" in loggedInUser) {
      setCurrentUserId(loggedInUser.id);
      setCurrentUsername(loggedInUser.username);
      setCurrentUserFirstName(loggedInUser.first_name);
      setCurrentUserLastName(loggedInUser.last_name);
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
      sessionStorage.setItem("firstName", currentUserFirstName);
      sessionStorage.setItem("lastName", currentUserLastName);
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
        currentUserFirstName,
        currentUserLastName,
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
