import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit"; // Change this import
import ListItemText from "@mui/material/ListItemText";
import { deleteComment, updateComment } from "../../api";

const Comment = ({
  username,
  commentText,
  authorId,
  currentUserId,
  commentId,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentText);
  const [anchorEl, setAnchorEl] = useState(null);

  const canEditDelete = authorId === currentUserId;

  const handleEdit = () => {
    setIsEditing((prevMode) => !prevMode);
    setAnchorEl(null);
  };

  const handleUpdateComment = async (updatedText) => {
    // Call the API to update the comment (We'll implement this next)
    const success = await updateComment(commentId, updatedText);
    if (success) {
      onEdit(commentId, editedComment);
    } else {
      console.error("Failed to update comment");
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const success = await deleteComment(commentId);
    if (success) {
      onDelete(commentId);
    } else {
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
            Save
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
              onClick={() => {
                handleEdit();
                handleClose();
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default Comment;
