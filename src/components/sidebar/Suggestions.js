import { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { getSuggestedProfile } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";
const Suggestions = ({ userId, following, loggedUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  //   find suggested profile
  useEffect(() => {
    async function suggestedProfile() {
      const response = await getSuggestedProfile(userId, following);
      setProfiles(response);
    }
    if (userId) {
      suggestedProfile();
    }
  }, [userId]);
  return !profiles ? (
    <Skeleton cpunt={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-based">Suggestoins for you</p>
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            suggestedUserDocId={profile.docId}
            suggestedUserName={profile.username}
            suggestedProfileId={profile.userId}
            loggedUserId={userId}
            loggedUserDocId={loggedUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};
Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedUserDocId: PropTypes.string,
};
export default Suggestions;
