import React from "react";

export default function LikesInfo({ totalLikes, likedUsers }) {
  const likedUsersString = () => {
    return likedUsers.reduce((accumulator, user, index) => {
      const separator = index !== likedUsers.length - 1 ? ", " : "";
      return accumulator + user.username + separator;
    }, "");
  };

  return (
    <div>
      {totalLikes ? (
        <>
          <strong>
            {totalLikes} like{totalLikes !== 1 && "s"}
          </strong>{" "}
          {totalLikes >= 2 && <span>by </span>}
          {totalLikes < 8 ? likedUsersString() : null}
        </>
      ) : (
        " "
      )}
    </div>
  );
}
