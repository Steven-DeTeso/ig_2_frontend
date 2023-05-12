import React, { useState, useEffect, memo } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./HomePage.module.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Stories from "./Stories";
import Post from "../post/Post";
import SuggestedProfile from "../profile/SuggestedProfile";
import useCommentFunctions from "../../hooks/useCommentFunctions";
import { useUser } from "../../context/userContext";
import API_BASE_URL from "../../api";

export default function HomePage({ initialPosts }) {
  const { currentUserId, currentUsername, currentUserProfilePicture } =
    useUser();

  const { data: userData } = useFetch(`${API_BASE_URL}/users/`);

  const loggedInUser = {
    id: currentUserId,
    username: currentUsername,
    profile_pic: { signed_image_url: currentUserProfilePicture },
  };

  const {
    comments,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
  } = useCommentFunctions();
  const [posts, setPosts] = useState(initialPosts || []);
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);

  useEffect(() => {
    if (userData && currentUserId) {
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
  }, [userData, currentUserId]);

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
            loggedInUserProfilePic={currentUserProfilePicture}
            suggestedProfiles={suggestedProfiles}
          />
        </section>
      </div>
    </>
  );
}
