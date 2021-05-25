import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import {
  isUserFollowingProfile,
  toggleFollower,
} from "../../services/firebase";
const Header = ({
  photoCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username: profileUsername,
    fullName,
    following = [],
  },
}) => {
  const { user } = useUser();
  const [isFollowiingProfile, setIsFollowingProfile] = useState(false);
  const activeButton = user.username && user.username !== profileUsername;
  const handelToggelFollow = async () => {
    setIsFollowingProfile((isFollowiingProfile) => !isFollowiingProfile);
    setFollowerCount({
      followerCount: isFollowiingProfile
        ? followerCount - 1
        : followerCount + 1,
    });
    await toggleFollower(
      profileDocId,
      user.userId,
      isFollowiingProfile,
      user.docId,
      profileUserId
    );
  };
  useEffect(() => {
    async function isLoggedOnUserFollowingProfile() {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );

      setIsFollowingProfile(!!isFollowing);
    }
    if (user.username && profileUserId) {
      isLoggedOnUserFollowingProfile();
    }
  }, [profileUserId, user.username]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} profile picture`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-sapn-2 ">
        <div className="container  flex ">
          <p className="text-2xl mr-4 ">{profileUsername}</p>
          {activeButton && (
            <button
              className="bg-blue-medium font-bold text-sm  rounded text-white w-20 h-8"
              type="button"
              onClick={handelToggelFollow}
            >
              {isFollowiingProfile ? "unfollow" : "follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followerCount === undefined || following === undefined ? (
            <Skeleton count={1} width={647} height={25} />
          ) : (
            <>
              <p className="mr-8">
                <span className="font-bold">{photoCount}</span>
                {photoCount <= 1 ? " photo" : " photos"}
              </p>
              <p className="mr-8">
                <span className="font-bold">{followerCount}</span>
                {followerCount <= 1 ? " follower" : " followers"}
              </p>
              <p className="mr-8">
                <span className="font-bold">{following.length} </span>
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? (
              <Skeleton count={1} height={25} width={100} />
            ) : (
              fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  photoCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    username: PropTypes.string,
  }).isRequired,
};
export default Header;
