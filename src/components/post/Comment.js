import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import styles from "./Comment.module.css";
import globalStyles from "../../../globalStyles.module.css";

const Comment = ({
  username,
  commentText,
  postId,
  authorId,
  currentUserId,
  commentId,
  handleCommentDelete,
  handleCommentEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentText);
  const [anchorEl, setAnchorEl] = useState(null);

  const canEditDelete = authorId == currentUserId;

  const handleEdit = (event) => {
    event.stopPropagation();
    setIsEditing((prevMode) => !prevMode);
    setAnchorEl(null);
  };

  const handleUpdateComment = async (postId, commentId, updatedText) => {
    try {
      await handleCommentEdit(postId, commentId, updatedText);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment");
    }
  };

  const handleDelete = async (commentId, postId) => {
    try {
      await handleCommentDelete(commentId, postId);
    } catch (error) {
      console.error("Failed to delete comment");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.commentWrapper}>
      <Link href={`/users/${authorId}`} className={styles.commentUsername}>
        <p className={globalStyles.textFont}>{username}</p>
      </Link>
      {isEditing ? (
        <>
          <input
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <button
            onClick={() =>
              handleUpdateComment(commentId, postId, editedComment)
            }
          >
            Post
          </button>
        </>
      ) : (
        <p className={globalStyles.textFont}>{commentText}</p>
      )}
      {canEditDelete && (
        <div className={styles.optionsButton}>
          <MoreHorizIcon onClick={handleClick} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(event) => {
                handleEdit(event);
                handleClose();
              }}
            >
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleDelete(commentId, postId)}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Comment;
