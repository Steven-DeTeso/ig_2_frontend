import React, { useState, useEffect } from "react";
import PostPhoto from "../post/PostPhoto";
import PostModal from "../Home/PostModal";
import Link from "next/link";
import LeftSidebar from "../Home/LeftSidebar";
import styles from "./ProfilePage.module.css";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import UserListDialog from "./UserListDialog";
import { useUser } from "../../context/userContext";
import { CommentsProvider, useComments } from "../../context/commentsContext";
import API_BASE_URL from "../../api";

// used below in ProfilePage component
const UserPosts = ({ userPosts, currentUserId, handleUpdatePost }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const {
    comments,
    handleCommentSubmit,
    handleCommentDelete,
    handleCommentEdit,
  } = useComments();

  const showModal = () => {
    setShowPostModal(true);
  };

  return (
    <div className={styles.photoDisplay}>
      {userPosts.map((post) => (
        <article key={post.id}>
          <PostPhoto
            id={post.postId}
            key={post.id}
            post={post}
            updatePost={handleUpdatePost}
            showModal={() => {
              setSelectedPost(post);
              showModal();
            }}
          />
        </article>
      ))}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          show={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          currentUserId={currentUserId}
          handleCommentSubmit={handleCommentSubmit}
          handleCommentEdit={handleCommentEdit}
          handleCommentDelete={handleCommentDelete}
          comments={comments[selectedPost?.id]}
        />
      )}
    </div>
  );
};

const ProfilePage = ({ userId }) => {
  const { currentUserId } = useUser();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [followingDialogOpen, setFollowingDialogOpen] = useState(false);
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchUserPosts();
    }
  }, [userId]);

  const handleFollowingDialogOpen = () => {
    setFollowingDialogOpen(true);
  };

  const handleFollowingDialogClose = () => {
    setFollowingDialogOpen(false);
  };

  const handleFollowersDialogOpen = () => {
    setFollowersDialogOpen(true);
  };

  const handleFollowersDialogClose = () => {
    setFollowersDialogOpen(false);
  };

  const handleUpdatePost = (updatedPost) => {
    if (updatedPost.isDeleted) {
      setUserPosts(userPosts.filter((post) => post.id !== updatedPost.id));
    } else {
      const newPosts = userPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setUserPosts(newPosts);
    }
  };

  async function fetchUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  if (!userData) {
    return <div>Downloading...</div>;
  }

  async function fetchUserPosts() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/posts/user_posts/${userId}/`,
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

  return (
    <>
      <CommentsProvider posts={userPosts || []}>
        <div className={styles.pageWrapper}>
          <LeftSidebar />
          {/* need to pass in props for /profile link to work */}
          <div className={styles.mainSection}>
            {/* Modal pop up for following */}
            <header className={styles.headerSection}>
              <div className={styles.profilePictureContainer}>
                <img
                  className={styles.profilePicture}
                  src={userData.profile_pic.signed_image_url}
                />
              </div>
              <div className={styles.profileInfoContainer}>
                <div className={styles.profileInfoTop}>
                  <h2>{userData.username}</h2>
                  {userData.is_current ? (
                    <button>
                      <Link
                        href={{ pathname: "/editprofile", query: { userId } }}
                      >
                        Edit Profile
                      </Link>
                    </button>
                  ) : (
                    ""
                  )}
                  <SettingsTwoToneIcon />
                </div>
                <div className={styles.profileInfoMiddle}>
                  <p>{userPosts.length}posts</p>
                  <p onClick={handleFollowingDialogOpen}>
                    {userData.following.length} following
                  </p>
                  <p onClick={handleFollowersDialogOpen}>
                    {userData.followers.length} followers
                  </p>
                  <UserListDialog
                    open={followingDialogOpen}
                    handleClose={handleFollowingDialogClose}
                    userList={userData.following}
                    title="Following"
                  />
                  <UserListDialog
                    open={followersDialogOpen}
                    handleClose={handleFollowersDialogClose}
                    userList={userData.followers}
                    title="Followers"
                  />
                </div>
                <div className={styles.profileInfoBottom}>
                  <p>
                    {userData.first_name} {userData.last_name}
                  </p>
                  <p>Bio text placeholder</p>
                </div>
              </div>
            </header>
            <UserPosts
              userPosts={userPosts}
              currentUserId={currentUserId}
              handleUpdatePost={handleUpdatePost}
            />
          </div>
        </div>
      </CommentsProvider>
    </>
  );
};

export default ProfilePage;
