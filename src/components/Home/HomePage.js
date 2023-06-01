import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./HomePage.module.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Stories from "./Stories";
import SuggestedProfile from "../profile/SuggestedProfile";
import HomePageFeed from "./HomePageFeed";
import API_BASE_URL from "../../api";
import { CommentsProvider } from "../../context/commentsContext";

export default function HomePage({ initialPosts, currentUser }) {
  const {
    id: currentUserId,
    username: currentUsername,
    first_name: currentUserFirstName,
    last_name: currentUserLastName,
    profile_pic: currentUserProfilePicture,
    following: currentUserFollowing,
  } = currentUser;

  const [posts, setPosts] = useState(initialPosts || []);
  const [suggestedProfilesData, setSuggestedProfilesData] = useState([]);

  const { data: userData, setUrl } = useFetch();

  const loggedInUser = {
    id: currentUserId,
    username: currentUsername,
    profile_pic: { signed_image_url: currentUserProfilePicture },
  };

  useEffect(() => {
    if (currentUserId) {
      setUrl(`${API_BASE_URL}/users/`);
      console.log(currentUserFollowing);
    }
  }, [currentUserId, setUrl]);

  useEffect(() => {
    console.log("User Data:", userData);
    if (userData && currentUserId) {
      const profilesData = userData
        .filter(
          (user) =>
            user.id !== currentUserId && user.profile_pic?.signed_image_url
        )
        .slice(0, 8)
        .map((user) => ({
          id: user.id,
          profilePicture: user.profile_pic.signed_image_url,
          username: user.username,
          userId: user.id,
          currentUserId: currentUserId,
          isFollowing: currentUserFollowing.some(
            (followedUser) => followedUser.id === user.id
          ),
        }));

      setSuggestedProfilesData(profilesData);
    }
  }, [userData, currentUserId, currentUserFollowing]);

  const suggestedProfiles = suggestedProfilesData.map((profile) => (
    <SuggestedProfile
      key={profile.id}
      profilePicture={profile.profilePicture}
      username={profile.username}
      userId={profile.userId}
      currentUserId={profile.currentUserId}
      isFollowing={profile.isFollowing}
    />
  ));

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleUpdatePost = (updatedPost) => {
    if (updatedPost.isDeleted) {
      setPosts(posts.filter((post) => post.id !== updatedPost.id));
    } else {
      // When called, takes the updated post object and maps over the current list of posts.
      //For each post in the list, it checks if the post ID matches the ID of the updated post.
      //If it does, it replaces the current post object with the updated post object.
      //If it doesn't, it keeps the current post object. Sets the state of the Posts with new array.
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
