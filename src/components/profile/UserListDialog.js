import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FollowProfileLink from "./FollowProfileLink";

//modal for list of users in the follower/following link
function UserListDialog({ open, handleClose, userList, title }) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      {userList.map((user) => (
        <FollowProfileLink
          key={user.id}
          userId={user.id}
          username={user.username}
          profilePicture={user.profile_pic.signed_image_url}
          handleClose={handleClose}
        />
      ))}
    </Dialog>
  );
}

export default UserListDialog;
