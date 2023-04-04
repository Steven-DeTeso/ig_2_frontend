import React, { useState, useEffect } from "react";
import { refreshAccessToken } from "/src/utils/auth";
import Post from "../post/Post";
import styles from "./HomePage.module.css";
import Link from "next/link";

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
    <>
    <div className={styles.homePageContainer}>
      <section className={styles.leftSidebar}>
        <Link href="/">Home</Link>
        <Link href="/">Search</Link>
        <Link href="/">Explore</Link>
        <Link href="/#">Reels</Link>
        <Link href="/">Messages</Link>
        <Link href="/">Notifications</Link>
        <Link href="/">Create</Link>
        <Link href="/">Profile</Link>
      </section>
      <div className={styles.mainContainer}>
        <main className={styles.middleMain}>
          <div>Top Div</div>
        {posts.map((post) => (
          <article key={post.id} className={styles.postArticle}>
            <Post post={post} />
          </article>
        ))}
        </main>
        <div className={styles.rightContainer}>right container</div>
      </div>
    </div>
    </>
  );
}  
