// components/ProfilePage.js
import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import { useRouter } from "next/router";
import Link from "next/link";

const API_BASE_URL = "http://localhost:8000";

const ProfilePage = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchUserPosts();
    }
  }, [userId]);

  async function fetchUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  console.log(userData);

  async function fetchUserPosts() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/posts/user_posts/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  }

  const handleUpdatePost = (updatedPost) => {
    if (updatedPost.isDeleted) {
      setUserPosts(userPosts.filter((post) => post.id !== updatedPost.id));
    } else {
      // When called, takes the updated post object and maps over the current list of posts. For each post in the list, it checks if the post ID matches the ID of the updated post. If it does, it replaces the current post object with the updated post object. If it doesn't, it keeps the current post object. Sets the state of the Posts with new array.
      const newPosts = userPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setUserPosts(newPosts);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.username}'s Profile</h1>
      {userData.is_current ? (
        <h2>
          <Link href={{ pathname: "/editprofile", query: { userId } }}>
            Edit Profile
          </Link>
        </h2>
      ) : (
        ""
      )}
      <div>
        {userPosts.map((post) => (
          <article key={post.id}>
            <Post key={post.id} post={post} updatePost={handleUpdatePost} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
