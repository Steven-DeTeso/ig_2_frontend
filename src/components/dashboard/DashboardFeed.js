import React, { useState, useEffect } from "react";
import { refreshAccessToken } from "/src/utils/auth";
import Post from "../post/Post";
import styles from "./DashboardFeed.module.css";

export default function MainFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts/", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          // Access token is expired, try to refresh it
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
    <div>
      <h1>Main feed page.</h1>
      <div className={styles.postContainer}>
        {posts.map((post) => (
          <article key={post.id} className={styles.postArticle}>
            <Post post={post} />
          </article>
        ))}
      </div>
    </div>
  );
}  
