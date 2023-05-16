import React, { useState, useEffect, memo } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./HomePage.module.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Stories from "./Stories";
import Post from "../post/Post";
import SuggestedProfile from "../profile/SuggestedProfile";
import { useUser } from "../../context/userContext";
import API_BASE_URL from "../../api";

export default function HomePage({ initialPosts }) {
  const { currentUserId, currentUsername, currentUserProfilePicture } =
    useUser();

  const [posts, setPosts] = useState(initialPosts || []);
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null); // Store current user data
  const [comments, setComments] = useState({});
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

  useEffect(() => {
    const fetchCommentsForPosts = async () => {
      const comments = {};
      for (let post of posts) {
        const response = await fetch(`${API_BASE_URL}/posts/${post.id}/post_comments/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          comments[post.id] = data;
        }
      }
      setComments(comments);
    };

    fetchCommentsForPosts();
  }, [posts]);

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

  const MemoizedPost = memo(Post);

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
            {posts &&
              posts.map((post) => {
                return (
                  <article key={post.id} className={styles.postArticle}>
                    <MemoizedPost
                      post={post}
                      comments={comments[post.id] || []}
                      updatePost={handleUpdatePost}
                      showPostModal={false}
                    />
                  </article>
                );
              })}
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
