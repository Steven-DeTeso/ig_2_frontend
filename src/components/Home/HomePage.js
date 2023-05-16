import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./HomePage.module.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Stories from "./Stories";
import SuggestedProfile from "../profile/SuggestedProfile";
import { useUser } from "../../context/userContext";
import API_BASE_URL from "../../api";
import Feed from "./Feed";

export default function HomePage({ initialPosts }) {
  const { currentUserId, currentUsername, currentUserProfilePicture } =
    useUser();

  const [posts, setPosts] = useState(initialPosts || []);
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null); // Store current user data
  const { data: userData, doFetch } = useFetch(`${API_BASE_URL}/users/`);

  const loggedInUser = {
    id: currentUserId,
    username: currentUsername,
    profile_pic: { signed_image_url: currentUserProfilePicture },
  };

  useEffect(() => {
    console.log("Current User ID:", currentUserId);
    if (currentUserId) {
      doFetch(`${API_BASE_URL}/users/`);
    }
  }, [currentUserId, doFetch]);

  useEffect(() => {
    console.log("User Data:", userData);
    if (userData && currentUserId) {
      setCurrentUserData(userData.find((user) => user.id === currentUserId)); // Find and store the current user data
      const profiles = userData
        .filter(
          (user) =>
            user.id !== currentUserId && user.profile_pic?.signed_image_url
        ) // Exclude the current user based on id and check if signed image url exists
        .map((user) => (
          <SuggestedProfile
            key={user.id}
            profilePicture={user.profile_pic.signed_image_url}
            username={user.username}
            userId={user.id}
          />
        ));
      setSuggestedProfiles(profiles);
    }
    console.log("Current User Data:", currentUserData);
  }, [userData, currentUserId, currentUserData]);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleUpdatePost = (updatedPost) => {
    if (updatedPost.isDeleted) {
      setPosts(posts.filter((post) => post.id !== updatedPost.id));
    } else {
      // When called, takes the updated post object and maps over the current list of posts. For each post in the list, it checks if the post ID matches the ID of the updated post. If it does, it replaces the current post object with the updated post object. If it doesn't, it keeps the current post object. Sets the state of the Posts with new array.
      const newPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setPosts(newPosts);
    }
  };

  return (
    <>
      <div className={styles.homePageContainer}>
        <LeftSidebar
          onPostCreated={handlePostCreated}
          loggedInUser={loggedInUser}
        />
        <section className={styles.mainContainer}>
          <main className={styles.middleMain}>
            <Stories suggestedProfiles={suggestedProfiles} />
            <Feed posts={posts} updatePost={handleUpdatePost} />
          </main>
          <RightSidebar
            currentUsername={currentUsername}
            loggedInUserProfilePic={currentUserProfilePicture}
            suggestedProfiles={suggestedProfiles}
          />
        </section>
      </div>
    </>
  );
}
