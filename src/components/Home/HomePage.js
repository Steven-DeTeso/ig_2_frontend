import React, { useState, useEffect } from "react";
import { refreshAccessToken } from "/src/utils/auth";
import Post from "../post/Post";
import styles from "./HomePage.module.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Stories from "./Stories";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts/", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          // Access token is expired, get a new access token with the function below
          await refreshAccessToken();
          // Retry the original request after refreshing the access token
          return fetchPosts();
        }

        if (!response.ok) {
          throw new Error("Error fetching posts.");
        }

        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className={styles.homePageContainer}>
        <LeftSidebar />
        <section className={styles.mainContainer}>
          <main className={styles.middleMain}>
            <Stories />
            {posts.map((post) => (
              <article key={post.id} className={styles.postArticle}>
                <Post post={post} />
              </article>
            ))}
          </main>
          <RightSidebar />
        </section>
      </div>
    </>
  );
}
