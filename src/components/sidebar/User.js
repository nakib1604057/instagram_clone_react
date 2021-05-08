import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const User = ({ fullName, userName }) => {
  return userName || fullName ? (
    <Link
      to={`/profile/${userName}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex item-center justify-between col-span-1">
        <img
          src={`images/avatars/karl.jpg`}
          alt=""
          className="flex rounded-full w-16 mr-3"
        />
      </div>
      <div className="col-span-3">
        <p>{userName}</p>
        <p>{fullName}</p>
      </div>
    </Link>
  ) : (
    <Skeleton count={1} heigh={61} />
  );
};
User.propTypes = {
  fullName: PropTypes.string,
  userName: PropTypes.string,
};
export default User;
