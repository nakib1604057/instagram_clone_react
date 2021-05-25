import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "../../services/firebase";

const SuggestedProfile = ({
  suggestedUserDocId,
  suggestedUserName,
  suggestedProfileId,
  loggedUserId,
  loggedUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);
  async function handelFollowUser() {
    setFollowed(true);
    console.log("logged user doc id", loggedUserDocId);
    // update current user profile of following
    await updateLoggedInUserFollowing(
      loggedUserDocId,
      suggestedProfileId,
      false
    );

    // update following user followers array

    await updateFollowedUserFollowers(suggestedUserDocId, loggedUserId, false);
  }
  return !followed ? (
    <div className="flex flex-row items-center allign-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${suggestedUserName}.jpg`}
          alt="profile-image"
          className="rounded-full w-8 mr-3 flex"
        />
        <Link to={`/p/${suggestedUserName}`}>{suggestedUserName}</Link>
      </div>
      <div>
        <button
          className="text-xs font-bold text-blue-medium"
          type="button"
          onClick={handelFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  suggestedUserName: PropTypes.string.isRequired,
  suggestedUserDocId: PropTypes.string.isRequired,
  suggestedProfileId: PropTypes.string.isRequired,
  loggedUserId: PropTypes.string.isRequired,
  loggedUserDocId: PropTypes.string.isRequired,
};
export default SuggestedProfile;
