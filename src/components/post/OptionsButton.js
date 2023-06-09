import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ButtonBase from "@mui/material/ButtonBase";

const OptionsButton = ({
  post,
  currentUserId,
  isFollowing,
  handleFollowOrUnfollowUser,
  handleDeletePost,
  router,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "options-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List component="nav">
          <ListItem>
            <ButtonBase
              onClick={() => {
                router.push(`/users/${post.author.id}`);
              }}
            >
              <ListItemText primary="Go to Profile" />
            </ButtonBase>
          </ListItem>

          {post.author.id !== currentUserId && (
            <ListItem>
              <ButtonBase onClick={handleFollowOrUnfollowUser}>
                <ListItemText
                  primary={
                    isFollowing
                      ? `Unfollow ${post.author.username}`
                      : `Follow ${post.author.username}`
                  }
                />
              </ButtonBase>
            </ListItem>
          )}

          {post.author.id === currentUserId && (
            <ListItem>
              <ButtonBase onClick={handleDeletePost}>
                <ListItemText primary="Delete post" />
              </ButtonBase>
            </ListItem>
          )}
        </List>
      </Popover>
    </div>
  );
};

export default OptionsButton;
