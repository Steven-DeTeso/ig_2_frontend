import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

const Comment = ({
  username,
  commentText,
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

  const handleUpdateComment = async (updatedText) => {
    try {
      await handleCommentEdit(commentId, updatedText);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment");
    }
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await handleCommentDelete(commentId);
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
    <div style={{ display: "flex" }}>
      <p>{username}</p>
      {isEditing ? (
        <>
          <input
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <button onClick={() => handleUpdateComment(editedComment)}>
            Post
          </button>
        </>
      ) : (
        <p>{commentText}</p>
      )}
      {canEditDelete && (
        <>
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
            <MenuItem onClick={(event) => handleDelete(event)}>Delete</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default Comment;
