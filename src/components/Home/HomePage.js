import React, { useState } from "react";
import styles from "./HomePage.module.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Stories from "./Stories";
import Post from "../post/Post";

export default function HomePage({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleUpdatePost = (updatedPost) => {
    // When called, takes the updated post object and maps over the current list of posts. For each post in the list, it checks if the post ID matches the ID of the updated post. If it does, it replaces the current post object with the updated post object. If it doesn't, it keeps the current post object. Sets the state of the Posts with new array.
    const newPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(newPosts);
  };

  return (
    <>
      <div className={styles.homePageContainer}>
        <LeftSidebar onPostCreated={handlePostCreated} />
        <section className={styles.mainContainer}>
          <main className={styles.middleMain}>
            <Stories />
            {posts &&
              posts.map((post) => {
                return (
                  <article key={post.id} className={styles.postArticle}>
                    <Post
                      key={post.id}
                      post={post}
                      updatePost={handleUpdatePost}
                    />
                  </article>
                );
              })}
          </main>
          <RightSidebar />
        </section>
      </div>
    </>
  );
}
