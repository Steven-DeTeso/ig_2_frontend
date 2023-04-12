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
                    <Post post={post} />
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
