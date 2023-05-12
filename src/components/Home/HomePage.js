import React, { useState, useEffect, memo } from "react";
import styles from "./HomePage.module.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Stories from "./Stories";
import Post from "../post/Post";
import useFetch from "../../hooks/useFetch";
import SuggestedProfile from "../profile/SuggestedProfile";
import useCommentFunctions from "../../hooks/useCommentFunctions";

const API_BASE_URL = "http://localhost:8000";

export default function HomePage({ initialPosts }) {
  const {
    comments,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
  } = useCommentFunctions();
  const [posts, setPosts] = useState(initialPosts || []);
  const [currentUserProfilePicture, setCurrentUserProfilePicture] =
    useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);

  const { data: userData } = useFetch(`${API_BASE_URL}/users/`);
  const loggedInUser = userData?.find((user) => user.is_current);
  const loggedInUserProfilePic = currentUserProfilePicture;

  useEffect(() => {
    if (loggedInUser) {
      setCurrentUserProfilePicture(loggedInUser.profile_pic.signed_image_url);
      setCurrentUsername(loggedInUser.username);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (userData) {
      const profiles = userData
        .filter(
          (user) => !user.is_current && user.profile_pic?.signed_image_url
        ) // Exclude the current user and check if signed image url exists
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
  }, [userData]);

  const handleCloseModal = () => {
    setShowPostModal(false);
  };

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
                      updatePost={handleUpdatePost}
                      comments={comments}
                      handleCommentSubmit={handleCommentSubmit}
                      handleCommentEdit={handleCommentEdit}
                      handleCommentDelete={handleCommentDelete}
                      showPostModal={false}
                    />
                  </article>
                );
              })}
          </main>
          <RightSidebar
            currentUsername={currentUsername}
            loggedInUserProfilePic={loggedInUserProfilePic}
            suggestedProfiles={suggestedProfiles}
          />
        </section>
      </div>
    </>
  );
}
