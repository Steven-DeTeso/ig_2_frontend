import React, { useState, useEffect } from "react";
import PostPhoto from "../post/PostPhoto";
import PostModal from "../Home/PostModal";
import Link from "next/link";
import LeftSidebar from "../Home/LeftSidebar";
import gloablStyles from "../../../globalStyles.module.css";
import styles from "./ProfilePage.module.css";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import UserListDialog from "./UserListDialog";
import { useUser } from "../../context/userContext";
import { CommentsProvider, useComments } from "../../context/commentsContext";
import { apiCall } from "../../api";

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
        <article key={post.id} className={styles.article}>
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
      console.log(currentUserId);
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
      const response = await apiCall(`users/${userId}/`, {
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

  async function fetchUserPosts() {
    try {
      const response = await apiCall(`posts/user_posts/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  }

  if (!userData) {
    return <div>Error, no user data!</div>;
  }

  return (
    <>
      <CommentsProvider posts={userPosts || []}>
        <div className={styles.pageWrapper}>
          <LeftSidebar loggedInUser={currentUserId} />
          {/* need to pass in props for /profile link to work */}
          <div className={styles.mainSection}>
            {/* Modal pop up for following */}
            <header className={styles.headerSection}>
              <div className={styles.profilePictureContainer}>
                <img
                  className={styles.profilePicture}
                  src={
                    userData && userData.profile_pic
                      ? userData.profile_pic.signed_image_url
                      : "/images/story_background.png"
                  }
                />
              </div>
              <div className={styles.profileInfoContainer}>
                <div className={styles.profileInfoTop}>
                  <h2 className={gloablStyles.textFontLarge}>
                    {userData.username}
                  </h2>
                  {userData.is_current ? (
                    <Link
                      href={{ pathname: "/editprofile", query: { userId } }}
                      className={gloablStyles.noTxtDecoration}
                    >
                      Edit Profile
                    </Link>
                  ) : (
                    ""
                  )}
                  <SettingsTwoToneIcon />
                </div>
                <div className={styles.profileInfoMiddle}>
                  <p>{userPosts.length} posts</p>
                  <p
                    onClick={handleFollowingDialogOpen}
                    className={styles.pointer}
                  >
                    {userData.following.length} following
                  </p>
                  <p
                    onClick={handleFollowersDialogOpen}
                    className={styles.pointer}
                  >
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
                  <p className={gloablStyles.textFont}>
                    {userData.first_name} {userData.last_name}
                  </p>
                  <p className={gloablStyles.textFont}>Bio text placeholder</p>
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
