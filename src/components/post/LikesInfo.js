import React, { memo } from "react";
import globalStyles from "../../../globalStyles.module.css";

const LikesInfo = memo(function LikesInfo({ totalLikes, likedUsers }) {
  const likedUsersString = () => {
    return likedUsers.reduce((accumulator, user, index) => {
      const separator = index !== likedUsers.length - 1 ? ", " : "";
      return accumulator + user.username + separator;
    }, "");
  };

  const likedUsersStringWithStyles = () => {
    return <span className={globalStyles.textFont}>{likedUsersString()}</span>;
  };

  return (
    <div>
      {totalLikes ? (
        <>
          <strong className={globalStyles.textFont}>
            {totalLikes} like{totalLikes !== 1 && "s"}
          </strong>{" "}
          {totalLikes >= 2 && (
            <span className={globalStyles.textFont}>by </span>
          )}
          {totalLikes < 8 ? likedUsersStringWithStyles() : null}
        </>
      ) : (
        " "
      )}
    </div>
  );
});

export default LikesInfo;
