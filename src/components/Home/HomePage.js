import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./HomePage.module.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Stories from "./Stories";
import SuggestedProfile from "../profile/SuggestedProfile";
import HomePageFeed from "./HomePageFeed";
import API_BASE_URL from "../../api";
import { useUser } from "../../context/userContext";
import { CommentsProvider } from "../../context/commentsContext";

export default function HomePage({ initialPosts }) {
  const {
    currentUserId,
    currentUsername,
    currentUserFirstName,
    currentUserLastName,
    currentUserProfilePicture,
    currentUserFollowing,
  } = useUser();

  const [posts, setPosts] = useState(initialPosts || []);
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const { data: userData, setUrl } = useFetch();

  const loggedInUser = {
    id: currentUserId,
    username: currentUsername,
    profile_pic: { signed_image_url: currentUserProfilePicture },
  };

  useEffect(() => {
    console.log("Current User ID:", currentUserId);
    if (currentUserId) {
      setUrl(`${API_BASE_URL}/users/`);
    }
  }, [currentUserId, setUrl]);

  useEffect(() => {
    console.log("User Data:", userData);
    if (userData && currentUserId) {
      const currentUser = userData.find((user) => user.id === currentUserId);
      setCurrentUserData(currentUser);

      const profiles = userData
        .filter(
          (user) =>
            user.id !== currentUserId && user.profile_pic?.signed_image_url
        )
        .slice(0, 8)
        .map((user) => {
          const isFollowing = currentUserFollowing.includes(user.id);
          return (
            <SuggestedProfile
              key={user.id}
              profilePicture={user.profile_pic.signed_image_url}
              username={user.username}
              userId={user.id}
              currentUserId={currentUserId}
              isFollowing={isFollowing}
            />
          );
        });
      setSuggestedProfiles(profiles);
    }
  }, [userData, currentUserId, currentUserFollowing]);

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
            <CommentsProvider posts={posts}>
              <HomePageFeed posts={posts} updatePost={handleUpdatePost} />
            </CommentsProvider>
          </main>
          <RightSidebar
            currentUserId={currentUserId}
            currentUsername={currentUsername}
            currentUserFirstName={currentUserFirstName}
            currentUserLastName={currentUserLastName}
            loggedInUserProfilePic={currentUserProfilePicture}
            suggestedProfiles={suggestedProfiles}
          />
        </section>
      </div>
    </>
  );
}
